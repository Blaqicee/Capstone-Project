import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    published_year: Number,
    price: Number,
    in_stock: Boolean,
    pages: Number,
    publisher: String
});

export default mongoose.model("Book", BookSchema);
