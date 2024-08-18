import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";

import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import Forgotpassword from "../components/Forgotpassword";
import Order from "../pages/dashboard/Order";

import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import Login from "../components/Login";

import Payment from "../pages/shop/Payment";

import BlogPage from "../pages/extrapages/Blog"; 
import CustomizeDesign from "../pages/extrapages/CustomizeDesign"; 
import OnlineOrder from "../pages/extrapages/OnlineOrder";
import CustomerSupport from "../pages/extrapages/CustomerSupport";
import VerifyEmail from "../components/VerifyEmail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
   
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
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
    element: <Order />,
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
    path: "/home",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgotpassword",
    element: <Forgotpassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  
]);

export default router;
