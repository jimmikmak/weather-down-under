const express = require("express");
// Next we set up the Router
const router = express.Router();

// require Our Model - Remember Model is
// a representation of our data
// The model should capitalized
const Book = require("../models/book");
// Creating the index route
// index route should show all the fruits
router.get("/", async (req, res, next) => {
  // req.body this is from the fetch request
  console.log(req.body, " this is get all");
  try {
    const allBooks = await Book.find();

    // This is the response to react
    res.json({
      status: {
        code: 200,
        message: "Success",
      },
      data: allBooks,
    });
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body, " this is req.body");
    const createdBook = await Book.create(req.body);
    console.log("response happening?");
    res.json({
      status: {
        code: 201,
        message: "Resource successfully created",
      },
      data: createdBook,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const foundBook = await Book.findById(req.params.id);
    res.json({
      status: {
        code: 200,
        message: "Success",
      },
      data: foundBook,
    });
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      status: {
        code: 201,
        message: "Resource successfully updated",
      },
      data: updatedBook,
    });
  } catch (err) {
    res.send(err);
  }
});

// Delete route
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndRemove(req.params.id);
    res.json({
      status: {
        code: 200,
        message: "Resource successfully deleted",
      },
      data: deletedBook,
    });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
