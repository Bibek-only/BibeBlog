import  { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <div className="main min-h-screen w-full bg-black text-white ">
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
        <Toaster position='top-right'></Toaster>
      </div>
    </>
  );
};

export default App;
