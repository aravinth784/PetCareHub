import { useState } from "react";
import AdoptionForm from "../Components/AdoptionForm";
import PetList from "../Components/PetList";

export default function Adoption() {
  const [pets, setPets] = useState([]);

  const addPetForAdoption = (pet) => {
    setPets((prev) => [...prev, { id: Date.now(), ...pet }]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold">Adoption Center</h2>
      <AdoptionForm addPet={addPetForAdoption} />
      <PetList pets={pets} />
    </div>
  );
}
