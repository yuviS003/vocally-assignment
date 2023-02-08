const {
  addBooks,
  getAllBooks,
  getSingleBook,
  deleteSingleBook,
  deleteAllBooks,
  updateBook,
  updateBookIssuedStatus,
} = require("../controllers/LibraryControllers");
const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Library:
 *       type: object
 *       required:
 *         - bookName
 *         - bookAuthor
 *         - bookEdition
 *         - bookPrice
 *         - isBookIssued
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the books
 *         bookName:
 *           type: string
 *           description: The book title
 *         bookAuthor:
 *           type: string
 *           description: The book author
 *         bookEdition:
 *           type: number
 *           description: The edition number of the book
 *         isBookIssued:
 *           type: boolean
 *           description: Book Issue Status
 *       example:
 *         id: 63e337ce55fcb291b6c265a9
 *         bookName: Harry potter
 *         bookAuthor: JK
 *         bookEdition: 22
 *         bookPrice: 300
 *         isBookIssued: false
 */

/**
 * @swagger
 * tags:
 *   name: Library
 *   description: The books managing API
 */

/**
 * @swagger
 * /library/addBooks:
 *   post:
 *     summary: Create a new book
 *     tags: [Library]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Library'
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       409:
 *         description: The book already exists
 */

router.post("/addBooks/", addBooks);

/**
 * @swagger
 * /library/getAllBooks:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Library]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Library'
 */
router.get("/getAllBooks/", getAllBooks);

/**
 * @swagger
 * /library/getSingleBook/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Library]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Library'
 *       404:
 *         description: The book was not found
 */
router.get("/getSingleBook/:id", getSingleBook);

/**
 * @swagger
 * /library/deleteSingleBook/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Library]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       204:
 *         description: The book was not found
 */
router.delete("/deleteSingleBook/:id", deleteSingleBook);

/**
 * @swagger
 * /library/deleteAllBooks:
 *   delete:
 *     summary: Remove all the books
 *     tags: [Library]
 *
 *     responses:
 *       200:
 *         description: Book delete successfully
 *       204:
 *         description: No books available
 */
router.delete("/deleteAllBooks", deleteAllBooks);

/**
 * @swagger
 * /library/updateBook/{id}:
 *  put:
 *    summary: Update the book by the id
 *    tags: [Library]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Library'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Library'
 *      204:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */
router.put("/updateBook/:id", updateBook);

/**
 * @swagger
 * /library/updateBookIssuedStatus:
 *  put:
 *    summary: Update the book issue status
 *    tags: [Library]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Library'
 *    responses:
 *      200:
 *        description: The book issue status was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Library'
 *      204:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */
router.put("/updateBookIssuedStatus/", updateBookIssuedStatus);

module.exports = router;
