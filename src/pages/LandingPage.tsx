import Login from "../components/Login";
import illustrate from "../assets/illustrate.png";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import TypingText from "../components/TypingText";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="bg-stone-400 text-black flex items-center justify-center min-h-screen">
      <div className="bg-stone-100 h-5/6 w-7/12 rounded-3xl p-8 overflow-hidden flex flex-col">
        <nav className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold">Seekr</div>
          <div className="space-x-8">
            <a href="#community" className="text-gray-600 font-semibold">
              Community
            </a>
            <a href="#about" className="text-gray-600 font-semibold">
              About
            </a>
            <a href="#faq" className="text-gray-600 font-semibold">
              FAQ
            </a>
            <button
              onClick={toggleLogin}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-4xl font-bold text-center mb-4">
            Asking Questions Improves Your Learning
          </h1>
          <div className="relative w-full max-w-md">
            <input
              type="text"
              className="w-full border rounded-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Debug my code ?"
            />
            <div className="absolute right-4 top-2"></div>
          </div>
          <div className="mt-8 grid grid-cols-2">
            <img
              src={illustrate}
              alt="Illustration"
              className="w-full max-w-md col-span-1"
            />
            <div className="col-span-1 w-96 mt-6">
            <TypingText text="The best way to get a good answer is to ask a good question." />
            </div>
          </div>
        </div>
      </div>
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={toggleLogin}
            >
              <FaTimes />
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
