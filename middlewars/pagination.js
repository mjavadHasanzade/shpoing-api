const pagination = (req, res, next) => {

    const { size = 10, page = 0 } = req.query;

    if (size < 0 || Number.isNaN(size))
        size = 10;

    if (page < 0 || Number.isNaN(page))
        page = 0;

    req.pagination = {
        page, size
    }

    next();
}

module.exports = pagination;