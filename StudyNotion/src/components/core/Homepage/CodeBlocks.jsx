import React from "react";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  btn1,
  btn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  // console.log(codeblock);
  return (
    <div
      className={`flex lg:flex-row flex-col ${position}  my-20 justify-between gap-10 lg:gap-10`}>
      <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
          {subheading}
        </div>

        <div className="flex gap-7 mt-7">
          <Button active={btn1.active} linkto={btn1.link}>
            <div className="flex items-center gap-2">
              {btn1.btnText}
              <FaArrowRight />
            </div>
          </Button>
          <Button active={btn2.active} linkto={btn2.link}>
            {btn2.btnText}
          </Button>
        </div>
      </div>
      <div
        className="code-border relative flex flex-row py-3 text-[10px] sm:text-sm leading-[18px]
      sm:leading-6  lg:w-[470px]  w-[100%] h-fit">
        {backgroundGradient}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
