import React from "react";
import HighlightText from "./HighlightText";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import Button from "./Button";

const LearningLanguageSection = () => {
  return (
    <div>
      <div className="text-4xl text-center font-semibold my-10">
        Your swiss knife for <HighlightText text={"learning any language"} />
        <div className="mx-auto mt-3 text-base font-medium leading-6 text-richblack-700 lg:w-[75%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="mt-8 flex lg:flex-row flex-col items-center justify-center lg:mt-0 ">
          <img
            src={Know_your_progress}
            alt=""
            className="object-contain lg:-mr-32"
          />
          <img
            src={Compare_with_others}
            alt=""
            className="lg:-mb-10 lg:-mt-0 object-contain"
          />
          <img
            src={Plan_your_lessons}
            alt=""
            className="-mt-16  object-contain lg:-ml-36 lg:-mt-5"
          />
        </div>
      </div>
      <div className="mx-auto -mt-5 mb-8 w-fit lg:mb-20">
        <Button active={true} linkto={"/signup"}>
          <div className="">Learn More</div>
        </Button>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
