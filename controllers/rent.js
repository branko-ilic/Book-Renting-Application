const modelBook = require('../models/book');
const modelRent = require('../models/rent');

async function showBooks(req, res, next){
    try{
        const index = req.query.index;
        const rentedBooks = await modelRent.showBooks(index);
        const allBooks = await modelBook.getAllBooks();

        const allAuthors = [];
        for(const book of allBooks){
            allAuthors.push(book.authors.split('\n'));
        }

        // console.log(allAuthors);

        res.render('books.ejs', {
            index: index,
            rentedBooks: rentedBooks,
            allBooks: allBooks,
            allAuthors: allAuthors,
        });
    }catch(err){
        next(err);
    }
}

async function rentBook(req, res, next){
    try{
        const index = req.body.indeks;
        const id = req.body.id;
        const returningDate = req.body.datumVracanja;

        await modelRent.rentBook(index, id, returningDate);

        res.redirect(`/rent/books?index=${index}`);
    }catch(err){
        next(err);
    }
}

module.exports = {
    showBooks,
    rentBook
};