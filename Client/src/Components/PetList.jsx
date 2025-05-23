const PetList = ({ pets }) => {
  const PetCard = ({ pet }) => (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure><img src={pet.image} alt={pet.name} className="h-48 w-full object-cover" /></figure>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {pets.map((pet) => (
        <PetCard key={pet._id} pet={pet} />
      ))}
    </div>
  );
};
