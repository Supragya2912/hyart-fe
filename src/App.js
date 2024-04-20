import { Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import LoadingBar from 'react-top-loading-bar';
import toast, { Toaster } from 'react-hot-toast';
import RequireUser from "./utils/RequireUser"
import RequireLogin from "./utils/RequireLogin";

import Header from "./pages/Header";
import Search from "./pages/Search";
import Footer from "./pages/Footer";
import SpecialCase from "./pages/SpecialCase";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/Forgot_Password";
import UpdatePassword from "./pages/Update_Password";
import Otp from "./pages/Otp";
import Cart from "./components/Cart/Cart";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import Shop from "./pages/Shop";
import Error from "./pages/Error";
import SingleProduct from "./pages/SingleProduct";
import Dashboard from "./dashboard/Dashboard";
import Products from "./dashboard/components/Products";
import Customers from "./dashboard/components/Customers";
import Categories from "./dashboard/components/Categories";
import Orders from "./dashboard/components/Orders";
import Coupons from "./dashboard/components/Coupons";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Update from "./pages/Update";
import Settings from "./pages/Settings";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/Wishlist";

const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <Search />
      <SpecialCase />
      <Outlet />
      <Footer />
    </div>
  );
};

export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";

function App() {
  const loadingRef = useRef(null);
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const toastData = useSelector((state) => state.appConfigReducer.toastData);

  useEffect(() => {
    if(isLoading)
      loadingRef.current?.continuousStart();   
    else
      loadingRef.current?.complete();
  }, [isLoading]);

  useEffect(() => {
    switch (toastData.type) {
        case TOAST_SUCCESS:
            toast.success(toastData.message);
            break;
        case TOAST_FAILURE:
            toast.error(toastData.message);
            break;
        default:
    }
  }, [toastData]);

  return (
  <div className="nourd-text">
    <LoadingBar color='#5f9fff' ref={loadingRef} />
    <div><Toaster/></div>
    <Routes>
      <Route element={<RequireUser/>}>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />}></Route>
            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/product/:id" element={<SingleProduct />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/update" element={<Update />}></Route>
            <Route path="/payments/:status" element={<Payment />}></Route>
            <Route path="/terms-conditions" element={<TermsConditions />}></Route>
            <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/myorders" element={<MyOrders />}></Route>
            <Route path="/wishlist" element={<Wishlist />}></Route>
            <Route path="*" element={<Error />} />
          </Route>
          <Route path="/admin/dashboard" element={<Dashboard />} >
              <Route path="products" element={<Products />} />
              <Route path="customers" element={<Customers />} />
              <Route path="categories" element={<Categories />} />
              <Route path="orders" element={<Orders />} />
              <Route path="coupons" element={<Coupons />} />
          </Route>
      </Route>
      <Route element={<RequireLogin/>}>
          <Route path="/otp" element={<Otp/>}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />} ></Route>
          <Route path="/reset-password/:id" element={<UpdatePassword />} ></Route>
          <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </div>
  );
}

export default App;