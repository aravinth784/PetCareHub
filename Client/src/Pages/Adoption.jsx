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

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/adoption");
      const shuffled = res.data.sort(() => 0.5 - Math.random());
      setPets(shuffled.slice(0, 3));
    } catch (err) {
      console.error("Error fetching pets", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/adoption", form);
      setPets(prev => [res.data, ...prev].slice(0, 3));
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

  const handleAdopt = (id) => {
    setPets(pets.filter(pet => pet._id !== id));
  };

  const PetCard = ({ pet }) => (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure>
        <img src={pet.image} alt={pet.name} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{pet.name}</h2>
        <p>Breed: {pet.breed}</p>
        <p>Age: {pet.age}</p>
        <p>{pet.description}</p>
        <p className="text-sm text-gray-400">Posted by: {pet.postedBy}</p>
        <button
          className="btn btn-success mt-2"
          onClick={() => handleAdopt(pet._id)}
        >
          Adopt
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      <h2 className="text-3xl font-bold text-center">Adoption Center</h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {pets.map(pet => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>

      <div className="bg-base-100 p-4 rounded shadow space-y-4 mt-8">
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
    </div>
  );
}
