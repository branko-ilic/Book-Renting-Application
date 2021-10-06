const mongoose = require('mongoose');

const shema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    index: {
        type: String,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    rentingDate: {
        type: Date,
        required: true
    },
    returningDate: {
        type: Date,
        required: true
    }
}, {collection: "rents"});

const Rent = mongoose.model('Rent', shema);

module.exports.Rent = Rent;

async function showBooks(index){
    const allBooks = await Rent.find({index: index}).populate('book', 'name authors').sort({returningDate: 1, }).exec();

    return allBooks;
}

async function rentBook(index, id, returningDate){

    const newRent = new Rent({
        _id: new mongoose.Types.ObjectId(),
        index: index,
        book: id,
        returningDate: returningDate,
        rentingDate: new Date()
    });

    await newRent.populate('book', 'name authors').save();
}

module.exports = {
    showBooks,
    rentBook
};