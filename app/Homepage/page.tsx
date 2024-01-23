"use client";
import React, { useState } from "react";
import home from "../JsonFiles/home.json";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/Logo.png";

const Homepage: React.FC = () => {
  const [bgimg, setBgimg] = useState(
    JSON.stringify(
      home.images[Math.floor(Math.random() * Math.floor(home.images.length))]
    )
  );
  const stl = {
    backgroundImage: `url(${bgimg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "bottom",
  };
  return (
    <>
      <div
        style={stl}
        className="h-screen w-screen flex justify-center items-center"
      >
        <div className="container backdrop-blur-xl rounded-lg w-[40%] h-[600px] p-4 min-w-[850px]">
          <div className="Ucon h-[30%] flex justify-center items-center shadow-lg	min-w-[800px]">
            <Image
              src={Logo}
              alt="computer"
              className="max-w-[100%] max-h-[100%]"
            ></Image>
            <h1 className=" text-9xl text-indigo-100">
              S<span className="text-sm">tone</span>P
              <span className="text-sm">apper</span>S
              <span className="text-sm">cissors</span>5
              <span className="text-sm">Rounds</span>
            </h1>
          </div>
          <div className="Lcon flex justify-center items-center h-[70%]">
            <Link
              href="/Gamepage"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-9xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Play
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
