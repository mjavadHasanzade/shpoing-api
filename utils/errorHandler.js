module.exports = (err, req, res, next) => {

    console.error(err.stack);
    // console.log("nj");
    res
        .status(err.status)
        .send(
            {
                message: err.message,
                timestamp: Date.now(),
                path: req.originalUrl
            });
}