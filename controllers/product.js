const Product = require("../models/product");
const { InvalidIdException, InvalidUserException } = require("../utils/exceptions");

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

    console.log(Number.parseInt(id));
    if (Number.isNaN(Number.parseInt(id))) {
        return new InvalidIdException();
    }

    const user = await Product.findOne({ where: { id: id } });


    // if (!user)
    //     return new InvalidUserException();

    res.send(user)

}

module.exports = { getAll, getOne }