import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#eaeaeb] p-16 max-container dark:bg-[#090a12]">
      <div className="flex max-lg:gap-9 lg:gap-4 flex-wrap max-md:justify-center justify-between">
        <div className="w-[300px] flex flex-col gap-6 max-md:items-center">
          <h1 className="text-[#141624] text-2xl dark:text-[#FFFFFF] ">
            InkSpire
          </h1>

          <p className="text-[14px] text-[#696A75] leading-[1.5]  max-md:text-center dark:text-[#97989F]">
            InkSpire is a user-friendly Content Management System (CMS) that
            allows easy content creation and management. Built with React.js,
            Tailwind CSS, and Django, it offers features like user
            authentication and customizable light/dark themes.
          </p>
        </div>

        <div className="text-[#181A2A] text-[14px] flex flex-col gap-4 px-4 max-md:items-center">
          <p className=" font-semibold text-[16px] dark:text-white">
            Quick Links
          </p>
          <ul className="flex flex-col gap-4  text-[#3B3C4A] max-md:items-center dark:text-[#97989F]">
            <li>
              <Link to="/" className="transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-500">
                About
              </Link>
            </li>
            <li>Blog</li>
            <li>Archived</li>
            <li>Author</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="text-[#181A2A] text-[14px] flex flex-col gap-4 px-4 max-md:items-center">
          <p className=" font-semibold text-[16px] dark:text-white">Popular Categories</p>
          <ul className="flex flex-col gap-4  text-[#3B3C4A] max-md:items-center dark:text-[#97989F]">
            {/* Array Mapping for Dynamic JSX Rendering - array mapping ka use karke dynamically JSX list banare hai, jahan har item ek clickable link hota hai jo category wise filtering enable karta hai.*/}
            
            {["Lifestyle", "Technology", "FullStack", "Business", "Economy", "Sports"].map(category => (
      <li key={category}>
        <Link to={`/?category=${category}`} className="hover:underline">
          {category}
        </Link>
      </li>
    ))}
            
          </ul>
        </div>

        <div className="bg-white w-[350px] px-6 flex flex-col items-center justify-center gap-2  rounded-lg dark:bg-[#242535] py-6">
          <h3 className="font-semibold text-xl  dark:text-white">
            Weekly Newsletter
          </h3>
          <p className="text-[#696A75] text-[16px] mb-5 dark:text-[#97989F]">
            Get blog articles and offers via email
          </p>
          <div className="w-full relative">
            <input
              placeholder="Your Email"
              className="border border-[#DCDDDF] rounded-sm h-[40px] px-3 py-3 w-full text-[14px] dark:bg-[#181A2A] dark:text-white"
            />
            <CiMail className="absolute top-[12px] right-[10px] text-[16px] dark:text-[#97989F]" />
          </div>
          <div className="relative group w-full">
            <button
              className="bg-[#4B6BFB] text-[#FFFFFF] text-[16px] rounded-md w-full py-3 cursor-not-allowed"
              disabled
            >
              Subscribe
            </button>

            {/* Tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-9 w-max bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              Currently service not available
            </div>
          </div>

        </div>
      </div>

      <div className="py-3 flex items-center gap-6 cursor-pointer max-md:mt-6 max-md:justify-center">
        <FaInstagram className="dark:text-white text-[20px] text-[#141624]" />
        <FaFacebookF className="dark:text-white text-[20px] text-[#141624]" />
        <BsTwitterX className="dark:text-white text-[20px] text-[#141624]" />
        <FaYoutube className="dark:text-white text-[20px] text-[#141624]" />
      </div>
    </footer>
  );
};

export default Footer;