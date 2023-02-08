const {
  addBooks,
  getAllBooks,
  getSingleBook,
  deleteSingleBook,
  deleteAllBooks,
  updateBook,
} = require("../controllers/LibraryControllers");
const router = require("express").Router();

router.post("/addBooks/", addBooks);

router.get("/getAllBooks/", getAllBooks);
router.get("/getSingleBook/:id", getSingleBook);

router.delete("/deleteSingleBook/:id", deleteSingleBook);
router.delete("/deleteAllBooks", deleteAllBooks);

router.put("/updateBook/:id", updateBook);

module.exports = router;
