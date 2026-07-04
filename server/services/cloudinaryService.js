const streamifier = require("streamifier")
const cloudinary = require("../config/cloudinary")

const uploadBuffer = (file, folder = "aesthetx-flow/products") =>
  new Promise((resolve, reject) => {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return resolve({
        url: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        publicId: `local-${Date.now()}`,
      })
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error)
        return resolve({ url: result.secure_url, publicId: result.public_id })
      },
    )

    return streamifier.createReadStream(file.buffer).pipe(stream)
  })

const uploadMany = async (files = [], folder) => Promise.all(files.map((file) => uploadBuffer(file, folder)))

const deleteImage = async (publicId) => {
  if (!publicId || publicId.startsWith("local-") || !process.env.CLOUDINARY_CLOUD_NAME) return null
  return cloudinary.uploader.destroy(publicId)
}

module.exports = { uploadBuffer, uploadMany, deleteImage }
