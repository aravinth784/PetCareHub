import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Adoption from "./pages/Adoption";
import Care from "./pages/Care";
import Locator from "./pages/Locator";

export default function App() {
  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/care" element={<Care />} />
          <Route path="/locator" element={<Locator />} />
        </Routes>
      </div>
    </div>
  );
}
