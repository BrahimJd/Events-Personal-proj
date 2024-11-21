import React, { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import { Search } from "lucide-react";

const ConcertsPage = () => {
  const [featuredConcerts, setFeaturedConcerts] = useState([]);
  const [allConcerts, setAllConcerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCity, setSelectedCity] = useState("New York");
  const [searchCity, setSearchCity] = useState("");
  const [showCitySearch, setShowCitySearch] = useState(false);
  const CLIENT_ID = import.meta.env.VITE_SEATGEEK_CLIENT_ID;

  const popularCities = [
    "New York",
    "Los Angeles",
    "London",
    "Paris",
    "Tokyo",
    "Sydney",
    "Toronto",
    "Berlin",
  ];

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.seatgeek.com/2/events?venue.city=${encodeURIComponent(
            selectedCity
          )}&type=concert&client_id=${CLIENT_ID}&page=${page}&per_page=10`
        );
        if (!response.ok) throw new Error("Failed to fetch concerts");
        const data = await response.json();

        setFeaturedConcerts(data.events.slice(0, 3));
        setAllConcerts(data.events);
        setTotalPages(Math.ceil(data.meta.total / data.meta.per_page));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching concerts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConcerts();
  }, [page, selectedCity]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowCitySearch(false);
    setPage(1); // Reset to first page when changing city
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      handleCitySelect(searchCity.trim());
      setSearchCity("");
    }
  };

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
          Error loading concerts: {error}
        </p>
      </div>
    );
  }

  const formatDate = (datetime) => {
    return new Date(datetime).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <div className="flex justify-center items-center gap-4 mb-6">
            <h1 className="text-4xl font-bold text-purple-400 text-center">
              Concerts in {selectedCity}
            </h1>
            <button
              onClick={() => setShowCitySearch(!showCitySearch)}
              className="p-2 rounded-full hover:bg-primary transition-colors"
            >
              <Search className="w-6 h-6 text-purple-400" />
            </button>
          </div>

          {showCitySearch && (
            <div className="max-w-lg mx-auto mb-8">
              <form onSubmit={handleCitySearch} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder="Enter city name..."
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-foreground border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-500 text-foreground rounded-lg font-semibold hover:bg-purple-600 transition-all"
                >
                  Search
                </button>
              </form>
              <div className="flex flex-wrap gap-2">
                {popularCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCity === city
                        ? "bg-purple-500 text-foreground"
                        : "bg-primary text-gray-light hover:bg-purple-500/20"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-gray-light text-center text-lg">
            Discover upcoming concerts in {selectedCity}
          </p>
        </div>

        {/* Featured Concerts Carousel */}
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
            {featuredConcerts.map((event, index) => (
              <div key={index} className="relative h-full">
                <img
                  src={event.performers[0]?.image || "/api/placeholder/800/500"}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-purple-400 text-2xl font-bold mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-light mb-4">
                    {event.venue.name} - {formatDate(event.datetime_local)}
                  </p>
                  <div className="flex gap-4">
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-purple-500 text-foreground px-6 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-all shadow-lg hover:shadow-purple-500/25"
                    >
                      Get Tickets
                    </a>
                    {event.stats.lowest_price && (
                      <span className="inline-block bg-purple-900 text-foreground px-6 py-2 rounded-lg font-semibold">
                        From ${Math.floor(event.stats.lowest_price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Concerts Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:gap-12">
          {allConcerts.map((event, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 bg-primary rounded-lg p-6 hover:shadow-lg transition-all"
            >
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-56 w-full md:w-48 shrink-0 overflow-hidden rounded-lg"
              >
                <img
                  src={event.performers[0]?.image || "/api/placeholder/400/320"}
                  loading="lazy"
                  alt={event.title}
                  className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-105"
                />
              </a>

              <div className="flex flex-col gap-3">
                <span className="text-sm text-gray-light">
                  {formatDate(event.datetime_local)}
                </span>

                <h2 className="text-xl font-bold text-purple-400">
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-500 transition-colors"
                  >
                    {event.title}
                  </a>
                </h2>

                <p className="text-gray-light">
                  {event.venue.name}
                  <br />
                  {event.venue.address}, {event.venue.postal_code}{" "}
                  {selectedCity}
                </p>

                {event.performers.length > 1 && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-light">
                      Artists: {event.performers.map((p) => p.name).join(", ")}
                    </span>
                  </div>
                )}

                <div className="flex gap-4 mt-auto">
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-purple-500 hover:text-purple-600 transition-colors"
                  >
                    Get Tickets
                  </a>
                  {event.stats.lowest_price && (
                    <span className="text-gray-light">
                      From ${Math.floor(event.stats.lowest_price)}
                    </span>
                  )}
                </div>
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

export default ConcertsPage;
