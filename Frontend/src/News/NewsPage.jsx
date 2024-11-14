import React, { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";

const NewsPage = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [carouselArticles, setCarouselArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCarouselNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=3&apiKey=fd223798983845b0ae0110aefc3f0496"
        );
        if (!response.ok) throw new Error("Failed to fetch news for carousel");
        const data = await response.json();
        setCarouselArticles(data.articles);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching carousel news:", err);
      }
    };
    fetchCarouselNews();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=10&page=${page}&apiKey=fd223798983845b0ae0110aefc3f0496`
        );
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setAllArticles(data.articles);
        setTotalPages(Math.ceil(data.totalResults / 10));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching news:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [page]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex justify-center items-center">
        <p className="text-red-500 font-semibold">
          Error loading news: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h1 className="text-4xl font-bold text-purple-400 mb-4 text-center">
            Latest Technology News
          </h1>
          <p className="text-gray-light text-center text-lg">
            Stay informed about the latest breakthroughs and developments in
            technology
          </p>
        </div>

        {/* Featured News Carousel */}
        <div className="mb-16 h-[500px] bg-primary rounded-lg overflow-hidden">
          <Carousel
            className="rounded-xl"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 transform -translate-x-2/4 z-50 flex gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i
                        ? "w-8 bg-purple-400"
                        : "w-4 bg-purple-400/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            {carouselArticles.map((article, index) => (
              <div key={index} className="relative h-full">
                <img
                  src={article.urlToImage || "/api/placeholder/400/320"}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-purple-400 text-2xl font-bold mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-light mb-4">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-purple-500 text-foreground px-6 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-all w-fit shadow-lg hover:shadow-purple-500/25"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* News Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:gap-12">
          {allArticles.map((article, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 bg-primary rounded-lg p-6 hover:shadow-lg transition-all"
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-56 w-full md:w-48 shrink-0 overflow-hidden rounded-lg"
              >
                <img
                  src={article.urlToImage || "/api/placeholder/400/320"}
                  loading="lazy"
                  alt={article.title}
                  className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-105"
                />
              </a>

              <div className="flex flex-col gap-3">
                <span className="text-sm text-gray-light">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>

                <h2 className="text-xl font-bold text-purple-400">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-500 transition-colors"
                  >
                    {article.title}
                  </a>
                </h2>

                <p className="text-gray-light">{article.description}</p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-purple-500 hover:text-purple-600 transition-colors mt-auto"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page === 1}
            className="px-6 py-2 bg-purple-500 text-foreground rounded-lg font-semibold hover:bg-purple-600 transition-all disabled:opacity-50 disabled:hover:bg-purple-500"
          >
            Previous
          </button>
          <span className="flex items-center text-gray-light">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => page < totalPages && setPage(page + 1)}
            disabled={page === totalPages}
            className="px-6 py-2 bg-purple-500 text-foreground rounded-lg font-semibold hover:bg-purple-600 transition-all disabled:opacity-50 disabled:hover:bg-purple-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
