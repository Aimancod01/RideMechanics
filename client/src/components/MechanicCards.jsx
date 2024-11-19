const MechanicCards = ({ mechanics, selectMechanic }) => {
  return (
    <div className="bg-orange-500 px-5 rounded py-8">
      <h2 className="text-3xl text-white font-bold text-center mb-6">Our Certified Mechanics</h2>
      <div className="container mx-auto flex flex-wrap justify-center gap-4">
        {mechanics.map((mechanic) => (
          <div key={mechanic.id} className="flex items-center bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition duration-300 w-full" onClick={() => selectMechanic(mechanic)}>
            <img
              src={`https://i.pravatar.cc/150?img=${mechanic.id}`} // Replace with mechanic's image source if available
              alt={`${mechanic.name}'s avatar`}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1 ">{mechanic.name}</h3>
              <p className=" mb-1">
                <strong>Specialty:</strong> {mechanic.specialty}
              </p>
              <p className="">
                <strong>Rating:</strong> {mechanic.rating} / 5
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MechanicCards;
