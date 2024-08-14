import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import Order from "../pages/dashboard/Order";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import Login from "../components/Login";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/shop/Payment";
import ProductPage from "../pages/shop/ProductPage"; 
import BlogPage from "../pages/extrapages/Blog"; 
import CustomizeDesign from "../pages/extrapages/CustomizeDesign"; 
import OnlineOrder from "../pages/extrapages/OnlineOrder";
import CustomerSupport from "../pages/extrapages/CustomerSupport";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/customize-design",
        element: <CustomizeDesign />,
      },
      {
        path: "/customer-support",
        element: <CustomerSupport />,
      },
      {
        path: "/online-order",
        element: <OnlineOrder />,
      },
      {
        path: "/order",
        element: <PrivateRoute><Order /></PrivateRoute>,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/cart-page",
        element: <CartPage />,
      },
      {
        path: "/process-checkout",
        element: <Payment />,
      },
      {
        path: "/menu/:id",
        element: <ProductPage /> // add this route
      }
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'add-menu',
        element: <AddMenu />,
      },
      {
        path: 'manage-items',
        element: <ManageItems />,
      },
      {
        path: 'update-menu/:id',
        element: <UpdateMenu />,
        loader: ({ params }) => fetch(`http://localhost:6001/menu/${params.id}`),
      },
    ],
  },
]);

export default router;
