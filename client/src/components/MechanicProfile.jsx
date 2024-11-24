const MechanicProfile = ({ mechanic, messages, setMessages, sendMessage }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold text-orange-600">{mechanic.name}</h2>
      <p className="text-gray-600">{mechanic.specialty}</p>
      <p className="text-gray-600">Rating: {mechanic.rating}</p>
      <p className="text-gray-600">Phone: {mechanic.phone}</p>

      {/* Chat Box */}
      <div className="flex flex-col mt-4 border border-gray-300 rounded-md overflow-hidden flex-grow">
        <div className="flex-grow overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 flex items-center ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "mechanic" && <img src="https://cdn-icons-png.flaticon.com/512/64/64572.png" alt="Mechanic Avatar" className="w-8 h-8 rounded-full mr-2" />}
              <div className={`p-2 rounded-md ${msg.sender === "user" ? "bg-orange-100 text-right" : "bg-gray-100 text-left"}`}>{msg.text}</div>
              {msg.sender === "user" && <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Avatar" className="w-8 h-8 rounded-full ml-2" />}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex items-center border-t border-gray-300 p-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow p-2 border border-gray-300 rounded-md"
            value={messages.newMessage}
            onChange={(e) =>
              setMessages((prev) => ({
                ...prev,
                newMessage: e.target.value,
              }))
            }
          />
          <button type="submit" className="ml-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MechanicProfile;
