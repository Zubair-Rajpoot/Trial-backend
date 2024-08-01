import Product from "../models/product.model.js"

export const addProduct = async (req, res) => {
    const { name, sizes } = req.body
    const product = await Product.create({
        name,
        sizes
    })
    await product.save()
    res.send(product)
}