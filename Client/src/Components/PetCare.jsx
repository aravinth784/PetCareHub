import { useEffect, useState } from "react";
import axios from "axios";

export default function PetCareTracker() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/pets")
      .then(res => {
        setPets(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching pet data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading pets...</p>;

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {pets.map(pet => (
        <div key={pet._id} className="card bg-base-100 shadow-xl p-4">
          <figure>
            <img src={pet.image} alt={pet.name} className="rounded-xl h-56 w-full object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl">{pet.name}</h2>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Age:</strong> {pet.age} years</p>
            <p><strong>Vaccine Date:</strong> {new Date(pet.vaccineDate).toDateString()}</p>
            <div className="mt-2">
              <strong>Medical History:</strong>
              <ul className="list-disc list-inside">
                {pet.medicalHistory.map((entry, idx) => (
                  <li key={idx}>{entry}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
