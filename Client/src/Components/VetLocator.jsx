import { useState } from "react";

export default function VetLocator() {
  const [location, setLocation] = useState("");
  const [vets, setVets] = useState([]);

  const dummyVets = [
    { id: 1, name: "Happy Paws Vet Clinic", address: "123 7th street,gandhipuram", phone: "9876543210" },
    { id: 2, name: "Animal Care Center", address: "456 raja street, Townhall", phone: "77886232175" },
    { id: 3, name: "Paw clinc", address: "456 near brooksfields", phone: "778566461634" },
    { id: 4, name: "Kovai Pet Clinic", address: "784 near temple,coimbatore", phone: "77886232175" },
    { id: 5, name: "Suriya pet center", address: "sultan street,saibaba Kovil", phone: "77886232175" },
  ];

  const findVets = () => {
   
    if (!location.trim()) {
      alert("Please enter a location");
      return;
    }
    setVets(dummyVets); 
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter your location"
          className="input input-bordered flex-grow"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="btn btn-primary" onClick={findVets}>
          Find Vets
        </button>
      </div>

      {vets.length > 0 && (
        <ul className="space-y-3">
          {vets.map((vet) => (
            <li key={vet.id} className="card bg-base-100 shadow p-4">
              <h3 className="font-semibold text-lg">{vet.name}</h3>
              <p>{vet.address}</p>
              <p>Phone: {vet.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
