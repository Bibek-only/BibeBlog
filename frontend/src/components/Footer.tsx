import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <section className=" w-full py-16 max-lg:py-8 border-t border-[#16181c]">
      <div className="top mb-28 max-lg:mb-6  lg:w-11/12 m-auto flex justify-evenly text-gray-300 max-lg:flex-wrap gap-2">
        <ul className="flex flex-col gap-6">
          <li className="text-2xl font-bold mb-6  text-indigo-500 hover:text-indigo-600 duration-300">Bibe-blog</li>
          <li>about</li>
          <li>features</li>
          <li>career</li>
        </ul>

        <ul className="flex flex-col gap-6">
          <li className="text-xl font-bold mb-6 text-white ">Home</li>
          <li>Services</li>
          <li>Portfolio</li>
          <li>Contact Us</li>
        </ul>

        <ul className="flex flex-col gap-6">
          <li className="text-xl font-bold mb-6 text-white ">Blog</li>
          <li>Guides</li>
          <li>Resources</li>
          <li>Support</li>
        </ul>
        <ul className="flex flex-col gap-6">
          <li className="text-xl font-bold mb-6 text-white ">Dashboard</li>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>
      <div className="lower flex flex-wrap justify-evenly items-center lg:w-11/12 buttom m-auto">
        <ul className="flex max-lg:gap-2 max-lg:flex-wrap items-center gap-8 font-thin text-white">
          <li>
            <FaTwitter />
          </li>
          <li>
            <FaFacebook />
          </li>
          <li>
            <FaInstagram /> 
          </li>
          <li>
            <FaGithub /> 
          </li>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
          <i>Support</i>
        </ul>
        <p className="font-thin text-gray-300">© Copyright 2021, All Rights Reserved by Postcraft</p>
      </div>
    </section>
  );
};

export default Footer;
