import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TrackingPage from "./pages/Tracking";
import AppLayout from "./pages/AppLayout";
import PaymentPage from "./components/PaymentPage";
import Error from "./pages/Error";
import CustomerForm from "./components/CustomerForm";
import MapComponent from "./components/MapComponent";
import Landing from "./pages/Landing";
import DriverCardApp from "./components/DriverCardApp";
import DriverCarCart from "./components/DriverCarCart";
import Login from "./pages/Login";
import adminDriverCard from "./components/adminDriverCard";
import SearchForm from "./components/Search";
import Register from "./pages/Register";
import DriverCard from "./components/DriverCard";
import Dashboard from "./pages/Dashboard";
import CarListDashboard from "./Admin/Cars";
import TourCustomerForm from "./pages/TourCustomerForm.jsx";
import GetPackageList from "./pages/GetPackage.jsx";
import BookingList from "./Admin/BookingList";
import Sidebar from "./pages/Sidebar";
import Reports from "./Admin/Reports";
import MaintenanceSchedule from "./Admin/MaintenanceSchedule";
import Main from "./pages/Main";
import CarList from "./pages/CarList";
import DriverInformationForm from "./components/driver";
import Roadside from "./pages/Roadside";
import CarRentalForm from "./components/admin";
import Cart from "./components/Cart";
import CustomerList from "./components/CustomerList";
import PickDropForm from "./components/PickDropForm";
import AdminPage from "./components/AdminPage";
import CarDetails from "./components/CarDetail";
import CarPage from "./components/CarPage";
import Booking from "./components/Booking";
import ReviewForm from "./components/ReviewForm";
import Chat from "./components/Chat";
import GetBookingsByEmail from "./components/GetBookingsByEmail";
import EditCar from "./Admin/EditCar";
import Confirmation from "./components/Confirmation";
import PackageList from "./Admin/PackageList.jsx";
import UploadPackage from "./Admin/UploadPackage.jsx";
import PaymentWrapper from "./pages/PaymentWrapper.jsx";
import ProtectedRoute from "./pages/ProtectedRoutes.jsx";
import CarForm from "./Admin/CarForm";
import Mechanics from "./pages/Mechanics.jsx";
function App() {
  const rentalId = "unique-rental-id"; // Replace with actual rentalIdTourPackageForm
  const user = "carOwner"; // or 'renter', based on the current user1.0.6
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <ProtectedRoute element={<AppLayout />} />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
        },

        {
          path: "/main",
          element: <Main />,
        },
        {
          path: "/roadside",
          element: <Roadside />,
        },
        {
          path: "/carRental",
          element: <CarRentalForm />,
        },
        {
          path: "/carList",
          element: <CarList />,
        },
        {
          path: "/car/:id",
          element: <CarDetails />,
        },
        {
          path: "/carCart",
          element: <Cart />,
        },
        {
          path: "/driver",
          element: <DriverInformationForm />,
        },
        {
          path: "/driverCard",
          element: <DriverCard />,
        },
        {
          path: "/adminCard",
          element: <adminDriverCard />,
        },
        {
          path: "/",
          element: <DriverCardApp />,
        },
        {
          path: "/car",
          element: <DriverCarCart />,
        },
        {
          path: "/api/car/:id",
          element: <CarPage />,
        },
        {
          path: "/customerList",
          element: <CustomerList />,
        },
        {
          path: "/customer",
          element: <CustomerForm />,
        },
        {
          path: "/payment",
          element: <PaymentPage />,
        },
        {
          path: "/booking",
          element: <Booking />,
        },
        {
          path: "/search",
          element: <SearchForm />,
        },
        {
          path: "/review",
          element: <ReviewForm />,
        },
        {
          path: "/admin",
          element: <AdminPage />,
        },
        {
          path: "/api/cars/:carId",
          element: <MapComponent />,
        },
        {
          path: "/Chat",
          element: <Chat rentalId={rentalId} user={user} />,
        },
        {
          path: "/Dashboard",
          element: <Dashboard />,
        },
        {
          path: "/cars",
          element: <CarListDashboard />,
        },
        {
          path: "/bookings",
          element: <BookingList />,
        },
        {
          path: "/Sidebar",
          element: <Sidebar />,
        },
        ,
        {
          path: "/addCar",
          element: <CarForm />,
        },
        {
          path: "/edit-car/:id",
          element: <EditCar />,
        },
        ,
        { path: "/confirmation", element: <Confirmation /> },
        { path: "/reports", element: <Reports /> },
        { path: "/maintenance", element: <MaintenanceSchedule /> },
        ,
        {
          path: "/track-location/:carId",
          element: <TrackingPage />,
        },
        {
          path: "/upload/package",
          element: <UploadPackage />,
        },
        {
          path: "/packageList",
          element: <PackageList />,
        },
        {
          path: "/getpackageList",
          element: <GetPackageList />,
        },
        {
          path: "/tourPackagePayment",
          element: <PaymentWrapper />,
        },
        {
          path: "/tourCustomerForm",
          element: <TourCustomerForm />,
        },
        {
          path: "/getBookingByEmail",
          element: <GetBookingsByEmail />,
        },
        {
          path: "/mechanics",
          element: <Mechanics />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
