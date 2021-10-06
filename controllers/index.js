function showIndex(req, res, next){
    try{

        res.render('index.ejs');
    }catch(err){
        next(err);
    }
}

module.exports = {
    showIndex
};