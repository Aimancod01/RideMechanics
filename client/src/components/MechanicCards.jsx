const MechanicCards = ({ mechanics, selectMechanic }) => {
  return (
    <div className="bg-white py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Our Certified Mechanics</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {mechanics.map((mechanic) => (
          <div key={mechanic.id} className="bg-orange-500 p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition duration-300" onClick={() => selectMechanic(mechanic)}>
            <h3 className="text-xl font-bold mb-2">{mechanic.name}</h3>
            <p>
              <strong>Specialty:</strong> {mechanic.specialty}
            </p>
            <p>
              <strong>Rating:</strong> {mechanic.rating} / 5
            </p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MechanicCards;
