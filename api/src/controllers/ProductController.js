const mongoose = require('mongoose');
const Product = mongoose.model('Product');


module.exports = {
  async index(req, res) {
    const products = await Product.find();
    return res.json(products);
  },

  async show(req, res) {
    const {id} = req.params;
    const product = await Product.findById(id);
    return res.json(product);
  },

  async store(req, res) {
    const product = await Product.create(req.body);
    return res.json(product);
  },

  async update(req, res) {
    const {id} = req.params;

    // O USO DO "{ new: true }" RETORNA O PRODUTO ATUALIZADO
    // PARA A VARIÁVEL "product"
    const product = await Product.findByIdAndUpdate(id, req.body, {new: true});
    return res.json(product);
  },

  async destroy(req, res) {
    await Product.findByIdAndRemove(req.params.id);
    return res.json({
      deleted: true
    });
  }
};