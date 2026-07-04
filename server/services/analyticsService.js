const User = require("../models/User")
const Product = require("../models/Product")
const Order = require("../models/Order")
const PAYMENT_STATUS = require("../constants/paymentStatus")

const dashboard = async () => {
  const [users, products, orders, paidOrders] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
    Order.find({ paymentStatus: { $in: [PAYMENT_STATUS.PAID, PAYMENT_STATUS.COD] } }),
  ])

  const revenue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0)
  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(8).populate("user", "name email")

  return { users, products, orders, revenue, recentOrders }
}

const revenueAnalytics = async () => {
  const monthlyRevenue = await Order.aggregate([
    { $match: { paymentStatus: { $in: [PAYMENT_STATUS.PAID, PAYMENT_STATUS.COD] } } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        revenue: { $sum: "$totalAmount" },
        orders: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ])

  const bestSellingProducts = await Order.aggregate([
    { $unwind: "$items" },
    { $group: { _id: "$items.product", quantity: { $sum: "$items.quantity" }, revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } } } },
    { $sort: { quantity: -1 } },
    { $limit: 10 },
    { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
    { $unwind: "$product" },
  ])

  return { monthlyRevenue, bestSellingProducts }
}

module.exports = { dashboard, revenueAnalytics }
