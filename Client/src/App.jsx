import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Adoption from "./Pages/Adoption";
import Care from "./Pages/Care";
import Locator from "./Pages/Locator";
import Login from "./Pages/login";
import Signup from "./Pages/signup";

export default function App() {
  const location = useLocation();

  
  const hideNavbar = location.pathname === "/login" || location.pathname === "/";

  return (
    <div className="bg-base-200 min-h-screen">
      {!hideNavbar && <Navbar />}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/care" element={<Care />} />
          <Route path="/home" element={<Home />} />
          <Route path="/locator" element={<Locator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}
