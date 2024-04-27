const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const newsController = require("../controllers/newsController");
const authMiddleware = require("../middlewares/authMiddleware");

//Routes
// Route to create a news article
router.post("/", authMiddleware, newsController.CreateNewsArticle);
// Route to get all news articles by ID
router.get("/:id", authMiddleware, newsController.GetNewsArticle);
// Route to get a single news article
router.get("/:id", authMiddleware, newsController.GetAllNewsArticles);
// Route to update a news article by ID
router.put("/:id", authMiddleware, newsController.UpdateNewsArticle);
// Route to delete a news article by ID
router.delete("/:id", authMiddleware, newsController.DeleteNewsArticle);

module.exports = router;
