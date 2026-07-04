const PDFDocument = require("pdfkit")

const generateInvoice = (order) =>
  new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 48 })
    const chunks = []

    doc.on("data", (chunk) => chunks.push(chunk))
    doc.on("end", () => resolve(Buffer.concat(chunks)))
    doc.on("error", reject)

    doc.fontSize(22).text("Aesthetx Flow Invoice")
    doc.moveDown()
    doc.fontSize(12).text(`Order: ${order.orderNumber}`)
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`)
    doc.text(`Total: INR ${order.totalAmount}`)
    doc.moveDown()

    order.items.forEach((item) => {
      doc.text(`${item.name} x ${item.quantity} - INR ${item.price * item.quantity}`)
    })

    doc.end()
  })

module.exports = generateInvoice
