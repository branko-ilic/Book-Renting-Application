const mongoose = require('mongoose');

const shema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        required: true
    }
}, {collection: "books"});

const Book = mongoose.model('Book', shema);

module.exports.Book = Book;

async function getAllBooks(){

    const allBooks = await Book.find().sort({name: 1}).exec();
    if(allBooks.length === 0){
        return null;
    }

    return allBooks;
}

module.exports = {
    getAllBooks
};