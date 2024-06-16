import React from "react";
import TimelineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const Timeline = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success of company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the Problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex lg:flex-row flex-col gap-20 mb-20 items-center">
        <div className="lg:w-[45%] flex flex-col  gap-14 lg:gap-3">
          {Timeline.map((ele, i) => {
            return (
              <div className="flex flex-col lg:gap-3" key={i}>
                <div className="flex gap-6" key={i}>
                  <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                    <img src={ele.Logo} alt="" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-semibold">{ele.Heading}</h2>
                    <p className="text-base">{ele.Description}</p>
                  </div>
                </div>
                <div
                  className={`${
                    Timeline.length - 1 == i ? "hidden" : "lg:block"
                  } hidden h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}></div>
              </div>
            );
          })}
        </div>
        <div className="relative h-fit w-fit shadow-[0px_0px_30px_0px] shadow-blue-200">
          <div className="absolute flex lg:flex-row flex-col lg:gap-0 gap-4 lg:py-10 py-5 uppercase text-white lg:bottom-0 lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 ">
            <div className="flex items-center gap-5 border-caribbeangreen-300 px-7 lg:border-r lg:px-14">
              <h1 className="font-bold text-3xl w-[75px]">10</h1>
              <h1 className="w-[75px] text-sm text-caribbeangreen-300">
                Years Experiences
              </h1>
            </div>
            <div className="flex items-center gap-5 px-7 lg:px-14">
              <h1 className="font-bold text-3xl w-[75px]">250</h1>
              <h1 className="w-[75px] text-sm text-caribbeangreen-300">
                types of courses
              </h1>
            </div>
          </div>
          <img
            src={TimelineImage}
            alt="TimelineImage"
            className="h-[400px] object-cover shadow-[20px_20px_0px_0px] shadow-white lg:h-fit"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
