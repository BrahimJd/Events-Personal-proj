// App.js
import React from "react";
import CreateEvent from "./Event/CreateEvent";
import StartEvent from "./Event/StartEvent";
import NewsPageCarousel from "./News/NewsPageCarousel";
import NewsPage from "./News/NewsPage";
function App() {
  return (
    <div>
      <NewsPageCarousel />
      <NewsPage />
    </div>
  );
}

export default App;
