import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssignmentList from "./pages/AssignmentList";
import AssignmentAttempt from "./pages/AssignmentAttempt";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AssignmentList />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/assignment/:id"
          element={
            <ProtectedRoute>
              <AssignmentAttempt />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;