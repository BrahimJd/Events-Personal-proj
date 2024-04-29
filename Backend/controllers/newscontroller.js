const NewsArticle = require("../Modules/NewsArticle").default;

// Controller to create a news article
const CreateNewsArticle = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newsArticle = new NewsArticle({
      title,
      content,
      author: req.user._id,
    });
    const result = await newsArticle.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a single news article by ID
const GetNewsArticles = async (req, res) => {
  try {
    const article = await NewsArticle.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all news articles
const GetAllNewsArticles = async (req, res) => {
  try {
    const articles = await NewsArticle.find().populate("author", "username");
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a news article by ID
const UpdateNewsArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await NewsArticle.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a news article by ID
const DeleteNewsArticle = async (req, res) => {
  try {
    const article = await NewsArticle.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  CreateNewsArticle,
  GetNewsArticles,
  GetAllNewsArticles,
  UpdateNewsArticle,
  DeleteNewsArticle,
};
