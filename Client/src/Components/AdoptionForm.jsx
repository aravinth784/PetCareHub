import { useState } from "react";

export default function AdoptionForm({ addPet }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    age: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.type) return alert("Please fill all required fields.");
    addPet(formData);
    setFormData({ name: "", type: "", age: "", description: "", image: "" });
  };

  return (
    <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 font-semibold">Pet Name*</label>
        <input
          type="text"
          name="name"
          className="input input-bordered w-full"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Pet Type*</label>
        <select
          name="type"
          className="select select-bordered w-full"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select pet type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold">Age (years)</label>
        <input
          type="number"
          name="age"
          className="input input-bordered w-full"
          value={formData.age}
          onChange={handleChange}
          min="0"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          name="description"
          className="textarea textarea-bordered w-full"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Image URL</label>
        <input
          type="url"
          name="image"
          className="input input-bordered w-full"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/pet-image.jpg"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post for Adoption
      </button>
    </form>
  );
}
