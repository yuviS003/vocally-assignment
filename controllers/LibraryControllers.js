const Library = require("../models/LibraryModel");

const addBooks = async (req, res) => {
  const { bookName, bookAuthor, bookEdition, bookPrice, isBookIssued } =
    req.body;
  console.log(req.body);

  const checkDuplicity = await Library.findOne({ bookName }).exec();
  if (checkDuplicity) return res.send({ message: "Book Already Exists" });

  try {
    const createBook = await Library.create({
      bookName,
      bookAuthor,
      bookEdition,
      bookPrice,
      isBookIssued,
    });
    res.send({
      message: "New Book Created",
      newBookID: createBook._id,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllBooks = async (req, res) => {
  const books = await Library.find();
  if (!books) return res.status(204).json({ message: "no books found" });
  res.json(books);
};

const getSingleBook = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: `Book ID required` });
  try {
    const book = await Library.findOne({ _id: req.params.id }).exec();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res
      .status(204)
      .json({ message: `No book matches ID ${req.params.id}` });
  }
  res.json(book);
};

const deleteSingleBook = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: `Book ID required` });

  const book = await Library.findOne({ _id: req.params.id }).exec();

  if (!book) {
    return res
      .status(204)
      .json({ message: `No book matches ID ${req.body.id}` });
  }

  const result = await book.deleteOne({ _id: req.params.id });

  res.json({ message: "Book delete successfully", deletedBookId: result._id });
};

const deleteAllBooks = async (req, res) => {
  const book = await Library.find({ _id: req.params.id }).exec();

  if (!book) {
    return res.status(204).json({ message: `No books available` });
  }

  const result = await Library.deleteMany({});

  res.json({
    message: "Book delete successfully",
    result,
  });
};

const updateBook = async (req, res) => {
  if (!req?.params?.id)
    return res
      .status(400)
      .json({ message: `Book ID ${req.body.id} not found` });

  const book = await Library.findOne({ _id: req.params.id }).exec();

  if (!book) {
    return res
      .status(204)
      .json({ message: `No book matches ID ${req.params.id}` });
  }
  if (req.body?.bookName) book.bookName = req.body.bookName;
  if (req.body?.bookAuthor) book.bookAuthor = req.body.bookAuthor;
  if (req.body?.bookEdition) book.bookEdition = req.body.bookEdition;
  if (req.body?.bookPrice) book.bookPrice = req.body.bookPrice;
  if (req.body?.isBookIssued) book.isBookIssued = req.body.isBookIssued;

  const result = await book.save();
  res.json(result);
};

module.exports = {
  addBooks,
  getAllBooks,
  getSingleBook,
  deleteSingleBook,
  deleteAllBooks,
  updateBook,
};
