import { useState, useEffect } from "react";
import axios from "axios";

export default function Adoption() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    description: "",
    image: "",
    postedBy: "",
  });

  // Fetch pets from backend on load
  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pets");
      setPets(res.data);
    } catch (err) {
      console.error("Error fetching pets", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/pets", form);
      setPets([...pets, res.data]);
      setForm({
        name: "",
        breed: "",
        age: "",
        description: "",
        image: "",
        postedBy: "",
      });
    } catch (err) {
      console.error("Error posting pet", err);
    }
  };

  // Pet card component
  const PetCard = ({ pet }) => (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure>
        <img
          src={pet.image}
          alt={pet.name}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{pet.name}</h2>
        <p>Breed: {pet.breed}</p>
        <p>Age: {pet.age}</p>
        <p>{pet.description}</p>
        <p className="text-sm text-gray-400">Posted by: {pet.postedBy}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      <h2 className="text-3xl font-bold text-center">Adoption Center</h2>

      {/* Post a pet for adoption */}
      <div className="bg-base-100 p-4 rounded shadow space-y-4">
        <h3 className="text-xl font-semibold">Post a Pet for Adoption</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input input-bordered w-full"
            name="name"
            placeholder="Pet Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            className="input input-bordered w-full"
            name="breed"
            placeholder="Breed"
            value={form.breed}
            onChange={handleChange}
          />
          <input
            className="input input-bordered w-full"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
          />
          <input
            className="input input-bordered w-full"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />
          <input
            className="input input-bordered w-full"
            name="postedBy"
            placeholder="Posted By (Your Name)"
            value={form.postedBy}
            onChange={handleChange}
          />
          <textarea
            className="textarea textarea-bordered w-full md:col-span-2"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Post Pet
        </button>
      </div>

      {/* Display available pets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
}
