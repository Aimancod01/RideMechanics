const MechanicProfile = ({ mechanic, carDetails, setCarDetails, handleRequest }) => {
  if (!mechanic) return <p className="text-center">No mechanic selected.</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-2">{mechanic.name}</h2>
      <p className="mb-2">
        <strong>Specialty:</strong> {mechanic.specialty}
      </p>
      <p className="mb-2">
        <strong>Rating:</strong> {mechanic.rating} / 5
      </p>
      <p className="mb-2">
        <strong>Phone:</strong> {mechanic.phone}
      </p>

      <h3 className="text-lg font-bold mt-4">Car Details</h3>
      <form className="space-y-4" onSubmit={handleRequest}>
        <input className="border p-2 w-full" type="text" placeholder="Car Model" value={carDetails.model} onChange={(e) => setCarDetails({ ...carDetails, model: e.target.value })} />
        <input className="border p-2 w-full" type="text" placeholder="Car Make" value={carDetails.make} onChange={(e) => setCarDetails({ ...carDetails, make: e.target.value })} />
        <textarea className="border p-2 w-full" placeholder="Describe the issue" value={carDetails.issue} onChange={(e) => setCarDetails({ ...carDetails, issue: e.target.value })} />
        <button className="bg-orange-500 text-white p-2 w-full rounded-md">Request Assistance</button>
      </form>
    </div>
  );
};

export default MechanicProfile;
