import { useState } from "react";

export default function VetLocator() {
  const [location, setLocation] = useState("");
  const [vets, setVets] = useState([]);

  const dummyVets = [
    { id: 1, name: "Happy Paws Vet Clinic", address: "123 Pet St, Cityville", phone: "123-456-7890" },
    { id: 2, name: "Animal Care Center", address: "456 Fur Rd, Townsville", phone: "987-654-3210" },
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
