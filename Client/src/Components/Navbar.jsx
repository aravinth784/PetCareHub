import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) setUserName(storedUser);
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Pet Care Hub
        </Link>
      </div>

      <div className="flex-none gap-2 hidden md:flex">
        <Link to="/" className="btn btn-ghost">Home</Link>
        <Link to="/adoption" className="btn btn-ghost">Adoption</Link>
        <Link to="/care" className="btn btn-ghost">Pet Care</Link>
        <Link to="/locator" className="btn btn-ghost">Vet Locator</Link>

        {userName ? (
          <span className="btn btn-ghost cursor-default">Hello, {userName}</span>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-primary">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}
