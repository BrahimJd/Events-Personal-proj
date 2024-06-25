// App.js
import CreateEvent from "./Event/CreateEvent";
import StartEvent from "./Event/StartEvent";
import NewsPageCarousel from "./News/NewsPageCarousel";
import NewsPage from "./News/NewsPage";
import Register from "./Login/register";
import Login from "./Login/login";
import Homepage from "./Homepage/Homepage";
import Dashboard from "./Dashboard/Dashboard";
import View from "./Dashboard/View";
import Navbar from "./Homepage/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/news"
          element={
            <div>
              <Navbar />
              <NewsPageCarousel />
              <NewsPage />
            </div>
          }
        />
        <Route
          path="/create-event"
          element={
            <div>
              <Navbar />
              <CreateEvent />
            </div>
          }
        />
        <Route path="/" element={<Homepage />} />
        <Route
          path="/start-event"
          element={
            <>
              <Navbar />
              <StartEvent />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/view" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
