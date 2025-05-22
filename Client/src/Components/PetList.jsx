export default function PetList({ pets }) {
  if (!pets.length)
    return <p className="text-center text-gray-600">No pets available for adoption.</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pets.map((pet) => (
        <div key={pet.id} className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src={pet.image || "https://place-puppy.com/400x400"}
              alt={pet.name}
              className="rounded-t-lg"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{pet.name}</h2>
            <p>Type: {pet.type}</p>
            <p>Age: {pet.age || "N/A"}</p>
            <p>{pet.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-success">Adopt</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
