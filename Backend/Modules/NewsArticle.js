const mongoose = require("mongoose");

const newsArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const NewsArticle = mongoose.model("NewsArticle", newsArticleSchema);

module.exports = NewsArticle;
