const Product = require("../models/product");
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
        res.status(400).send({ message: req.t('invalid_id_exception') });
        return;
    }

    const product = await Product.findOne({ where: { id: id } });


    if (!product) {
        res.status(404).send({ message: req.t('product_not_found_exception') });
        return;
    }

    res.send(product);

}

const createOne = async (req, res) => {

    const { error } = productValidator(req);

    if (error) {
        return res.send(error.message);
    }

    const product = await Product.create(req.body);
    res.send({ product: product, message: req.t('product_create_success') })

}

const editOne = async (req, res) => {

    const id = req.params.id;

    if (Number.isNaN(Number.parseInt(id))) {
        res.status(400).send({ message: req.t('invalid_id_exception') });
        return;
    }

    const body = req.body;

    const product = await Product.update(body, { where: { id } });

    if (product[0] == 0) {
        res.status(404).send({ message: req.t('product_not_found_exception') });
        return;
    }

    res.send({ product: product, message: req.t('product_edit_success') });

}

const deleteOne = async (req, res) => {

    const id = req.params.id;

    if (Number.isNaN(Number.parseInt(id))) {
        res.status(400).send({ message: req.t('invalid_id_exception') });
        return;
    }

    const product = await Product.destroy({ where: { id: id } });

    if (product == 0) {
        res.status(404).send({ message: req.t('product_not_found_exception') });
        return;
    }

    res.send({ message: req.t('product_delete_success') });
}

module.exports = { getAll, getOne, createOne, editOne, deleteOne };