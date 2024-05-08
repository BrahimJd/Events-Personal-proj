const express = require("express");
const router = express.Router();
const newsController = require("../Controllers/newscontroller");
const authMiddleware = require("../Middlewares/authentificationMiddleware");
const {
  authManager,
  authSponsor,
} = require("../Middlewares/authorizationMiddleware");

// Route to create a news article only for managers
router.post(
  "/news",
  authMiddleware,
  authManager,
  newsController.CreateNewsArticle
);
// Route to get all news articles
router.get("/news", authMiddleware, newsController.GetAllNewsArticles);
// Route to get a single news article
router.get("/news/:id", authMiddleware, newsController.GetNewsArticles);
// Route to update a news article by ID for managers
router.put(
  "/news/:id",
  authMiddleware,
  authManager,
  newsController.UpdateNewsArticle
);
// Route to delete a news article by ID for managers
router.delete(
  "/news/:id",
  authMiddleware,
  authManager,
  newsController.DeleteNewsArticle
);

module.exports = router;
