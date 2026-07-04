const hasUnsafeKey = (key) => key.includes("$") || key.includes(".")

const sanitizeObject = (value) => {
  if (!value || typeof value !== "object") return

  if (Array.isArray(value)) {
    value.forEach(sanitizeObject)
    return
  }

  Object.keys(value).forEach((key) => {
    if (hasUnsafeKey(key)) {
      delete value[key]
      return
    }
    sanitizeObject(value[key])
  })
}

const sanitizeMongo = (req, res, next) => {
  sanitizeObject(req.body)
  sanitizeObject(req.params)
  sanitizeObject(req.query)
  next()
}

module.exports = sanitizeMongo
