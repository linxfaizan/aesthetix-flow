const analyticsService = require("../services/analyticsService")
const asyncHandler = require("../utils/asyncHandler")
const sendResponse = require("../utils/sendResponse")

const dashboard = asyncHandler(async (req, res) => {
  const data = await analyticsService.dashboard()
  sendResponse(res, 200, "Dashboard analytics fetched", data)
})

const analytics = asyncHandler(async (req, res) => {
  const data = await analyticsService.revenueAnalytics()
  sendResponse(res, 200, "Analytics fetched", data)
})

module.exports = { dashboard, analytics }
