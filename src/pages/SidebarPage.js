import React, { useState, useEffect } from "react";
import Flag from "react-world-flags";
import AuthComponent from "../components/AuthComponent";
import { FaBars } from "react-icons/fa";
import { useIsMobile } from "../hooks/useIsMobile";
import { useAuth } from "../hooks/AuthProvider";
import { useTranslation } from "react-i18next";

const SidebarPage = ({ onDifficultyChange, onOpenPopup }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const auth = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    console.log(`Language changed to: ${lang}`);
  };

  return (
    <div
      className={` h-full 
       ${isMobile ? "" : "w-1/4"} `}
    >
      {/* Menu icon for small screens */}
      {isMobile && (
        <div className="p-4 fixed top-0 left-0 z-50 w-3">
          <FaBars className="text-2xl cursor-pointer" onClick={toggleSidebar} />
        </div>
      )}
      <div
        className={`
          fixed top-0 left-0 h-full bg-cyan-100 text-white p-4 
          transition-transform duration-300 ease-in-out
          ${isMobile ? "w-64 z-40" : "w-1/4 max-w-[300px] min-w-[200px]"}
          ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        <div className="w-full  text-white flex justify-end py-2 mb-2">
          <button
            onClick={() => handleLanguageChange("en")}
            className={` ml-2 p-2 rounded-lg ${
              language === "en" ? "bg-yellow-200" : "bg-gray-200 "
            }`}
          >
            <Flag code="US" alt="English" className="h-6 w-6" />
          </button>
          <button
            onClick={() => handleLanguageChange("ko")}
            className={`ml-2 p-2 rounded-lg ${
              language === "ko" ? "bg-yellow-200" : "bg-gray-200 "
            }`}
          >
            <Flag code="KR" alt="Korean" className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4 ">
          <h3 className="text-lg mb-2 font-bold text-black text-center">
            {t("Welcome")} {auth.user ? ", " + auth.user?.nickName : ""}
          </h3>
        </div>

        <h2 className="text-lg font-bold text-black text-center mb-2 mt-5">
          {t("Menu")}
        </h2>

        <button
          onClick={() => {
            onDifficultyChange("Easy");
            setIsOpen(false);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
        >
          {t("Easy")}
        </button>
        <button
          onClick={() => {
            onDifficultyChange("Medium");
            setIsOpen(false);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
        >
          {t("Medium")}
        </button>
        <button
          onClick={() => {
            onDifficultyChange("Hard");
            setIsOpen(false);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
        >
          {t("Hard")}
        </button>

        <button
          className="text-black bg-yellow-200 hover:bg-yellow-500 font-bold py-2 px-4 rounded mb-2 w-full mt-5"
          onClick={onOpenPopup}
        >
          How to play
        </button>
        <div className="min-h-72">
          {auth.user ? (
            <button
              onClick={() => auth.handlelogOut()}
              size="sm"
              className="bg-red-100 hover:bg-red-400 text-black font-bold py-2 px-4 rounded mb-2 w-full mt-5"
            >
              {t("Log Out")}
            </button>
          ) : (
            <AuthComponent />
          )}
        </div>
        <div className="flex items-center justify-between w-full mt-10">
          <img
            src="/EDMIKYLogoWhiteBG2.png"
            alt="Logo"
            className="w-12 h-12 mr-2"
          />

          <span className="text-sm text-gray-700 underline font-bold truncate w-full">
            edmiky99@gmail.com
          </span>
        </div>
      </div>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default SidebarPage;
