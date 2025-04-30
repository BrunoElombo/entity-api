//Handle file not found
exports.notFoundeHandler = (req, res)=>{
    res.sendStatus(404)
    // if(req.accepts('application/json')){
    //     res.json({error: '404 not Found'});
    // }else if(req.accepts('html')){
    //     res.send(`<p>404 Not found<p>`);
    // }else{
    //     res.send("Not Found");
    // }
}