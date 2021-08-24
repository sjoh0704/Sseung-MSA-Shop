module.exports = (req, res, next) => {
    const x_request_id = req.header('x-request-id');
    next();
    if(x_request_id){
        res.header['x-request-id'] = x_request_id;
    }
}