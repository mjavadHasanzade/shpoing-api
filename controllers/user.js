const User = require("../models/user");
const userValidator = require("../validators/user");
// const userValidator = require("../validators/user");

const getAll = async (req, res) => {

    const { size, page } = req.pagination;

    const users = await User.findAndCountAll({
        limit: size,
        offset: page * size,
        attributes: {
            exclude: ['password']
        }
    });

    res.send({ users: users.rows, page: Math.ceil(users.count / size) });

}

const getOne = async (req, res) => {

    const id = req.params.id;


    if (Number.isNaN(Number.parseInt(id))) {
        res.status(400).send({ message: req.t('invalid_id_exception') });
        return;
    }

    const user = await User.findOne({
        where: { id: id },
        attributes: {
            exclude: ['password']
        }
    });


    if (!user) {
        res.status(404).send({ message: req.t('user_not_found_exception') });
        return;
    }

    res.send(user);

}

const createOne = async (req, res) => {

    const { error } = userValidator(req);

    if (error) {
        return res.send(error.message);
    }

    const userCheck = await User.findOne({ where: { email: req.body.email } })

    if (userCheck)
        return res.status(400).send({ message: req.t('user_taken') })

    const user = await User.create(req.body);
    res.send({ user: user, message: req.t('user_create_success') })

}

const editOne = async (req, res) => {

    const id = req.params.id;

    if (Number.isNaN(Number.parseInt(id))) {
        res.status(400).send({ message: req.t('invalid_id_exception') });
        return;
    }

    const body = req.body;

    const user = await User.update(body, { where: { id } });

    if (user[0] == 0) {
        res.status(404).send({ message: req.t('user_not_found_exception') });
        return;
    }

    res.send({ user: user, message: req.t('user_edit_success') });

}

const deleteOne = async (req, res) => {

    const id = req.params.id;

    if (Number.isNaN(Number.parseInt(id))) {
        res.status(400).send({ message: req.t('invalid_id_exception') });
        return;
    }

    const user = await User.destroy({ where: { id: id } });

    if (user == 0) {
        res.status(404).send({ message: req.t('user_not_found_exception') });
        return;
    }

    res.send({ message: req.t('user_delete_success') });
}

module.exports = { getAll, getOne, createOne, editOne, deleteOne };