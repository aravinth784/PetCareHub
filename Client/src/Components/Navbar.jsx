import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          🐾 PetCare App
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/" className="btn btn-ghost">Home</Link>
        <Link to="/adoption" className="btn btn-ghost">Adoption</Link>
        <Link to="/care" className="btn btn-ghost">Pet Care</Link>
        <Link to="/locator" className="btn btn-ghost">Vet Locator</Link>
      </div>
    </div>
  );
}
