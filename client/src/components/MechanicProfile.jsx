const MechanicProfile = ({ mechanic }) => {
  const placeholderImage = "https://via.placeholder.com/300x200.png"; // Placeholder image URL

  return (
    <div className="flex flex-col h-full p-4 bg-white shadow-lg rounded-lg w-[1000px] max-w-md mx-auto">
      <img src={mechanic.image ? `http://localhost:5000/${mechanic.image.replace(/\\/g, "/")}` : placeholderImage} alt={`${mechanic.name} Shop`} className="w-full h-48 object-cover rounded-lg mb-4" />

      <h1 className="text-3xl font-bold text-orange-600 break-words">{mechanic.title}</h1>
      <h2 className="text-2xl font-bold break-words">{mechanic.name}</h2>
      <p className="text-gray-600 text-lg">{mechanic.specialty}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-yellow-500 text-lg font-bold">&#9733;</span>
        <p className="text-gray-600">4 / 5</p>
      </div>
      <p className="text-gray-600 mt-2 break-words">
        <strong>Phone:</strong> {mechanic.phone}
      </p>

      <p className="text-gray-600">
        <strong>Working Hours:</strong> {mechanic.workingHours || "9 AM - 6 PM"}
      </p>
      <div className="flex flex-col gap-2 mt-4">
        <button className="bg-orange-600 text-white rounded-lg px-4 py-2 hover:bg-orange-700 transition" onClick={() => alert(`Calling ${mechanic.phone}`)}>
          Contact
        </button>
      </div>
    </div>
  );
};

export default MechanicProfile;
