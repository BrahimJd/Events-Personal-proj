// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./api/AuthContext.jsx";

// Components
import CreateEvent from "./Event/CreateEvent";
import StartEvent from "./Event/StartEvent";
import NewsPage from "./News/NewsPage";
import Register from "./Login/register";
import Login from "./Login/login";
import Homepage from "./Homepage/Homepage";
import Dashboard from "./Dashboard/Dashboard";
import EventList from "./Event/EventList";
import NavBar from "./Homepage/NavBar";
import EventDetails from "./Event/EventDetails";
import ProtectedRoute from "./api/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/create-event"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/start-event"
            element={
              <ProtectedRoute>
                <StartEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <EventList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/event/:eventId"
            element={
              <ProtectedRoute>
                <EventDetails />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
