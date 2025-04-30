const credentials = (res, req, next) => {
    res.header('Access-Control-Allow-Credentials', true);
}

module.exports = credentials;