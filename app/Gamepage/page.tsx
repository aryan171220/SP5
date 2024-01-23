"use client";
import React, { useState, useEffect } from "react";
import bg from "../assets/bg.gif";
import pfp from "../assets/pfp.jpg";
import PaL from "../assets/PaLx.png";
import ScL from "../assets/ScLx.png";
import StL from "../assets/StLx.png";
import PaR from "../assets/PaRx.png";
import ScR from "../assets/ScRx.png";
import StR from "../assets/StRx.png";
import Up from "../assets/green-up.png";
import Down from "../assets/red-down.png";
import Equal from "../assets/equal.png";
import kuchni from "../assets/Logo.png";
import game from "../JsonFiles/game.json";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
const Gamepage: React.FC = () => {
  //states
  const [youHand, setYouHand] = useState<StaticImageData | string>(PaL);
  const [comHand, setComHand] = useState<StaticImageData | string>(PaR);
  const [youScore, setYouScore] = useState<number>(5);
  const [comScore, setComScore] = useState<number>(5);
  const [res, setRes] = useState<StaticImageData | string>(kuchni);
  const [resVisible, setResVisible] = useState<Boolean>(false);
  //useeffect for animation
  useEffect(() => {
    let animationTimeout: NodeJS.Timeout;

    // Add the class to trigger the animation
    const youHandElement = document.getElementById("youHand");
    const comHandElement = document.getElementById("comHand");

    if (youHandElement && comHandElement) {
      youHandElement.classList.remove("animate-wiggle");
      comHandElement.classList.remove("animate-wiggle");
      youHandElement.classList.add("animate-fade");
      comHandElement.classList.add("animate-fade");

      // Set a timeout to remove the class after the animation duration (in milliseconds)
      animationTimeout = setTimeout(() => {
        youHandElement.classList.remove("animate-fade");
        comHandElement.classList.remove("animate-fade");
        youHandElement.classList.add("animate-wiggle");
        comHandElement.classList.add("animate-wiggle");
      }, 1000); // Change 1000 to match your animation duration in milliseconds
      // Clean up the timeout if the component unmounts or if isActive changes before the animation completes
    }
    return () => {
      clearTimeout(animationTimeout);
    };
  }, [youHand, comHand]);

  const DrawResult = () => {
    //display Result
    setRes(Equal);
  };
  const WinResult = () => {
    //Display Result
    setRes(Up);
    setYouScore(youScore + 1);
    setComScore(comScore - 1);
  };
  const LossResult = () => {
    //Display Result
    setRes(Down);
    setYouScore(youScore - 1);
    setComScore(comScore + 1);
  };

  useEffect(() => {
    if (res != kuchni) {
      let visi: NodeJS.Timeout;
      setResVisible(true);
      visi = setTimeout(() => {
        setResVisible(false);
      }, 250);
      return () => {
        clearTimeout(visi);
      };
    }
  }, [res]);

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("Losses") == null) {
      localStorage.setItem("Losses", "0");
    }
    if (localStorage.getItem("Wins") == null) {
      localStorage.setItem("Wins", "0");
    }
    if (youScore == 10) {
      const wins: string | null = localStorage.getItem("Wins");
      if (wins) {
        localStorage.setItem("Wins", JSON.stringify(parseInt(wins) + 1));
      }
      localStorage.setItem("result", "WON");
      router.push("/Resultpage");
    } else if (comScore == 10) {
      const Losses: string | null = localStorage.getItem("Losses");
      if (Losses) {
        localStorage.setItem("Losses", JSON.stringify(parseInt(Losses) + 1));
      }
      localStorage.setItem("result", "LOST");
      router.push("/Resultpage");
    }
  }, [youScore, comScore]);

  const result = (element1: any, element2: any) => {
    if (element1 == PaL) {
      if (element2 == PaR) {
        DrawResult();
      } else if (element2 == ScR) {
        LossResult();
      } else if (element2 == StR) {
        WinResult();
      }
    } else if (element1 == ScL) {
      if (element2 == PaR) {
        WinResult();
      } else if (element2 == ScR) {
        DrawResult();
      } else if (element2 == StR) {
        LossResult();
      }
    } else if (element1 == StL) {
      if (element2 == PaR) {
        LossResult();
      } else if (element2 == ScR) {
        WinResult();
      } else if (element2 == StR) {
        DrawResult();
      }
    }
  };

  const shuffleComHand = () => {
    const i: number = Math.floor(Math.random() * 3);
    if (i == 0) {
      setComHand(ScR);
    } else if (i == 1) {
      setComHand(StR);
    } else {
      setComHand(PaR);
    }
  };

  const onclickHandle = (element: any) => {
    setYouHand(element);
    shuffleComHand();
    setRes(kuchni);
  };
  useEffect(() => {
    result(youHand, comHand);
  }, [youHand, comHand]);
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-screen h-screen flex flex-row"
    >
      <Image
        src={res}
        alt="result"
        className={`${
          resVisible ? "" : "hidden"
        } absolute z- top-0 bottom-0 left-0 right-0 10 m-auto drop-shadow-2xl drop-shadow-black backdrop-blur-md p-3 rounded-md h-[200px] w-[200px]`}
      />
      <div className="leftBox w-[50%] h-screen">
        <div className="aboutPlayer h-[15%] flex backdrop-blur-sm shadow-md">
          <div className="pfp w-[15%]">
            <Image src={pfp} alt="You" className="w-[100%] h-[100%]"></Image>
          </div>
          <h1 className="w-[20%] text-1xl xl:text-6xl md:text-5xl sm:text-3xl flex flex-col-reverse">
            YOU
          </h1>
          <div className="game w-[50%]">
            <div
              style={{
                backgroundImage: `url(${game.images[youScore]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "right",
              }}
              className="emoji w-[100%] h-[100%]"
            ></div>
          </div>
          <div className="w-[15%] h-[100%] place-self-start scorecard flex justify-center items-center">
            <h1 className="h-[100%] text-3xl xl:text-9xl md:text-7xl sm:text-3xl text-white">
              {youScore - 5}
            </h1>
          </div>
        </div>
        <div className="hand w-[100%] h-[69%] grid content-center">
          <div className="handElement flex justify-start">
            <Image
              src={youHand}
              alt="Hand"
              id="youHand"
              className="w-[60%] h-full animate-wiggle ml-1"
            ></Image>
          </div>
        </div>
        <div className="chooseHand w-[100%] h-[15%] flex flex-row ">
          <a
            className=" cursor-pointer "
            onClick={() => {
              onclickHandle(PaL);
            }}
          >
            <Image
              src={PaL}
              alt="Hand"
              className="p-1 rotate-[300deg] w-full h-[70%] hover:scale-110 hover:animate-pulse "
            ></Image>
          </a>
          <a
            className=" cursor-pointer "
            onClick={() => {
              onclickHandle(ScL);
            }}
          >
            <Image
              src={ScL}
              alt="Hand"
              className="p-1 rotate-[300deg] w-full h-[70%] hover:scale-110 hover:animate-pulse "
            ></Image>
          </a>
          <a
            className=" cursor-pointer "
            onClick={() => {
              onclickHandle(StL);
            }}
          >
            <Image
              src={StL}
              alt="Hand"
              className="p-1 rotate-[300deg] w-full h-[70%] hover:scale-110 hover:animate-pulse "
            ></Image>
          </a>
        </div>
      </div>

      <div className="rightBox w-[50%] h-screen">
        <div className="aboutPlayer h-[15%] flex flex-row-reverse backdrop-blur-sm shadow-md">
          <div className="pfp w-[15%]">
            <Image
              src={pfp}
              alt="computer"
              className="w-[100%] h-[100%]"
            ></Image>
          </div>
          <h1 className="w-[20%] text-1xl xl:text-6xl md:text-5xl sm:text-3xl flex flex-col-reverse text-right">
            CPU
          </h1>
          <div className="game w-[50%]">
            <div
              style={{
                backgroundImage: `url(${game.images[comScore]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "left",
              }}
              className="emoji w-[100%] h-[100%]"
            ></div>
          </div>
          <div className="w-[15%] h-[100%] place-self-start scorecard flex justify-center items-center">
            <h1 className="h-[100%] text-3xl xl:text-9xl md:text-7xl sm:text-3xl text-white">
              {comScore - 5}
            </h1>
          </div>
        </div>
        <div className="hand w-[100%] h-[69%] grid content-center">
          <div className="handElement flex justify-end">
            <Image
              src={comHand}
              alt="Hand"
              width="100"
              height="100"
              id="comHand"
              className="w-[60%] h-full animate-wiggle mr-1"
              unoptimized
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gamepage;
