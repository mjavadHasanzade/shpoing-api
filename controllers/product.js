const Product = require("../models/product");
const { InvalidIdException, InvalidUserException } = require("../utils/exceptions");
const productValidator = require("../validators/product");

const getAll = async (req, res) => {

    const { size, page } = req.pagination;

    const products = await Product.findAndCountAll({
        limit: size,
        offset: page * size
    });

    res.send({ products: products.rows, page: Math.ceil(products.count / size) });

}

const getOne = async (req, res) => {

    const id = req.params.id;

    if (Number.isNaN(Number.parseInt(id))) {
        return new InvalidIdException();
    }

    const user = await Product.findOne({ where: { id: id } });


    // if (!user)
    //     return new InvalidUserException();

    res.send(user)

}

const createOne = async (req, res) => {

    const err = productValidator(req.body);

    if (err) {
        return res.send(err)
    }

    const product = await Product.create(req.body);
    res.send(product)

}

const editOne = async (req, res) => {

    const id = req.params.id;
    const body = req.body;

    const product = await Product.update(body, { where: { id } });

    res.send(product);

}

const deleteOne = async (req, res) => {
    const id = req.params.id;
    await Product.destroy({ where: { id: id } });
    res.send({ message: 'product deleted' });
}

module.exports = { getAll, getOne, createOne, editOne, deleteOne };