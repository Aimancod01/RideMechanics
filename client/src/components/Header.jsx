import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Header() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("userinfo");
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }
  return (
    <header className="bg-orange-500 p-5">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="text-xl font-bold">Explore Ride Mechanics</h1>
        </Link>
        <div className="flex items-center space-x-3">
          {/* User Avatar */}
          <img
            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=200" // Gravatar placeholder for user avatar
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          {/* Logout Button */}
          <Link className="bg-orange-700 hover:bg-orange-800 transition-all font-semibold px-6 rounded-lg py-2 text-white" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
