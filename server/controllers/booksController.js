import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

export const addBook = async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json(newBook);
};

export const updateBook = async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
};

export const deleteBook = async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
};
