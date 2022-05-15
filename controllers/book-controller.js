const Book = require('../model/Book')

const getAllBooks = async (req, res, next) => {
    try {
        let books = await Book.find();

        if (!books) {
            res.status(404).json({ message: "No Products Found" })
        }

        return res.status(200).json({ books })
    } catch (error) {
        console.log(error);
    }
}

const getBookById = async (req, res, next) => {
    try {
        let book = await Book.findById(req.params.id)

        if (!book) {
            res.status(500).json({ message: "No Book Found" })
        }

        res.status(200).json({ book })
    } catch (error) {
        console.log(error);
    }
}

const addBook = async (req, res, next) => {

    const { name, author, description, price, available,image } = req.body;

    try {
        let book = new Book({
            name,
            author,
            description,
            price,
            available,
            image
        })

        await book.save();

        if (!book) {
            res.status(500).json({ message: "Unable to  add" })
        }

        res.status(200).json({ book })
    } catch (error) {
        console.log(error);
    }
}

const updateBook = async (req, res, next) => {

    const id = req.params.id;
    const { name, author, description, price, available,image } = req.body;


    try {
        let book = await Book.findByIdAndUpdate(id, {
            name,
            author,
            description,
            price,
            available,
            image
        })

        await book.save();

        if (!book) {
            res.status(404).json({ message: "Unable to  update by this id" })
        }

        res.status(200).json({ book })
    } catch (error) {
        console.log(error);
    }
}

const deleteBook = async (req, res, next) => {
    const id = req.params.id;

    try {
        let book = await Book.findByIdAndDelete(id);

        if (!book) {
            res.status(404).json({ message: "Unable to  delete by this id" })
        }

        res.status(200).json({ message: "Book deleted successfully" })
    } catch (error) {

    }
}

exports.getAllBooks = getAllBooks
exports.addBook = addBook
exports.getBookById = getBookById
exports.updateBook = updateBook
exports.deleteBook = deleteBook