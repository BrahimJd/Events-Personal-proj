const express = require("express");
const router = express.Router();
const newsController = require("../Controllers/newscontroller");
const authMiddleware = require("../Middlewares/authentificationMiddleware");

// Route to create a news article
router.post("/", authMiddleware, newsController.CreateNewsArticle);
// Route to get all news articles by ID
router.get("/:id", authMiddleware, newsController.GetNewsArticles);
// Route to get a single news article
router.get("/:id", authMiddleware, newsController.GetAllNewsArticles);
// Route to update a news article by ID
router.put("/:id", authMiddleware, newsController.UpdateNewsArticle);
// Route to delete a news article by ID
router.delete("/:id", authMiddleware, newsController.DeleteNewsArticle);

module.exports = router;
