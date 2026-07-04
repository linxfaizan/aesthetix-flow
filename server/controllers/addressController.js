const Address = require("../models/Address")
const asyncHandler = require("../utils/asyncHandler")
const sendResponse = require("../utils/sendResponse")

const listAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find({ user: req.user._id }).sort({ isDefault: -1 })
  sendResponse(res, 200, "Addresses fetched", { addresses })
})

const createAddress = asyncHandler(async (req, res) => {
  if (req.body.isDefault) await Address.updateMany({ user: req.user._id }, { isDefault: false })
  const address = await Address.create({ ...req.body, user: req.user._id })
  sendResponse(res, 201, "Address created", { address })
})

const updateAddress = asyncHandler(async (req, res) => {
  if (req.body.isDefault) await Address.updateMany({ user: req.user._id }, { isDefault: false })
  const address = await Address.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, {
    new: true,
    runValidators: true,
  })
  sendResponse(res, 200, "Address updated", { address })
})

const deleteAddress = asyncHandler(async (req, res) => {
  await Address.findOneAndDelete({ _id: req.params.id, user: req.user._id })
  sendResponse(res, 200, "Address deleted")
})

module.exports = { listAddresses, createAddress, updateAddress, deleteAddress }
