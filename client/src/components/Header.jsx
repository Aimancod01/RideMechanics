import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();

  // Retrieve and parse user info from localStorage
  const storedUser = localStorage.getItem("userinfo");
  const user = storedUser ? JSON.parse(storedUser) : null;

  function handleLogout() {
    localStorage.removeItem("userinfo");
    toast.success("Logged out successfully");
    navigate("/login");
  }

  return (
    <header className="bg-orange-500 px-8 py-4 shadow-lg">
      <div className="flex justify-between items-center">
        {/* Logo or Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-orange-500 font-bold text-lg">ER</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Explore Ride Mechanics</h1>
        </Link>

        {/* User Information and Actions */}
        <div className="flex items-center space-x-5">
          {/* User Avatar and Name */}
          <div className="flex items-center space-x-3">
            <img src={user?.avatar || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=200"} alt={`${user?.name || "User"}'s Avatar`} className="w-10 h-10 rounded-full border-2 border-white" />
            <span className="hidden sm:block text-white font-medium">{user?.name || "Guest"}</span>
          </div>

          {/* Logout Button */}
          {user && (
            <button onClick={handleLogout} className="bg-white hover:bg-gray-200 transition-all font-semibold px-5 py-2 rounded-lg text-orange-500 shadow-md">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
