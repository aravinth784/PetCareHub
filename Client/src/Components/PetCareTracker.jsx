import { useEffect, useState } from "react";
import axios from "axios";

export default function PetCareTracker() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [newPet, setNewPet] = useState({
    name: "",
    breed: "",
    age: "",
    vaccineDate: "",
    image: "",
    medicalHistory: ""
  });

 
  useEffect(() => {
    axios.get("http://localhost:5000/api/pets")
      .then(res => {
        if (res.data.length > 0) {
          setPets(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching pet data:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPet(prev => ({ ...prev, [name]: value }));
  };

  const isEmpty = (str) => !str || str.trim() === "";

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      isEmpty(newPet.name) ||
      isEmpty(newPet.breed) ||
      isEmpty(newPet.age) ||
      isEmpty(newPet.vaccineDate) ||
      isEmpty(newPet.image) ||
      isEmpty(newPet.medicalHistory)
    ) {
      alert("Please fill all fields");
      return;
    }

    if (isNaN(newPet.age) || Number(newPet.age) <= 0) {
      alert("Please enter a valid positive number for age");
      return;
    }

    const payload = {
      name: newPet.name.trim(),
      breed: newPet.breed.trim(),
      age: Number(newPet.age),
      vaccineDate: newPet.vaccineDate,
      image: newPet.image.trim(),
      medicalHistory: newPet.medicalHistory.split(',').map(e => e.trim()).filter(e => e)
    };

    try {
      const res = await axios.post("http://localhost:5000/api/pets", payload);
      setPets(prev => [...prev, res.data]);
      setFormVisible(false);
      setNewPet({ name: "", breed: "", age: "", vaccineDate: "", image: "", medicalHistory: "" });
    } catch (err) {
      console.error("Submit failed:", err.response?.data || err.message);
      alert("Failed to add pet. Please check your inputs.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <button onClick={() => setFormVisible(!formVisible)} className="btn btn-primary mb-4">
        {formVisible ? "Cancel" : "Add Your Pet"}
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-100 p-4 rounded-lg">
          <input name="name" value={newPet.name} onChange={handleChange} placeholder="Name" className="input input-bordered" />
          <input name="breed" value={newPet.breed} onChange={handleChange} placeholder="Breed" className="input input-bordered" />
          <input name="age" type="number" value={newPet.age} onChange={handleChange} placeholder="Age" className="input input-bordered" />
          <input name="vaccineDate" type="date" value={newPet.vaccineDate} onChange={handleChange} className="input input-bordered" />
          <input name="image" value={newPet.image} onChange={handleChange} placeholder="Image URL" className="input input-bordered col-span-2" />
          <input name="medicalHistory" value={newPet.medicalHistory} onChange={handleChange} placeholder="Medical History (comma-separated)" className="input input-bordered col-span-2" />
          <button type="submit" className="btn btn-success col-span-2">Submit Pet</button>
        </form>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading pets...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      )}
    </div>
  );
}
