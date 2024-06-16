import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Button from "../components/core/Homepage/Button";
import HighlightText from "../components/core/Homepage/HighlightText";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import TimelineSection from "../components/core/Homepage/TimelineSection";
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection";
import InstructorSection from "../components/core/Homepage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/Homepage/ExploreMore";

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col w-11/12 mx-auto max-w-maxContent text-white items-center justify-between  gap-8">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 font-bold bg-richblack-800 text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] rounded-full transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row gap-2.5 rounded-full px-10 py-[5px] items-center group-hover:background-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>
        <div className="text-center w-[90%] -mt-3 text-richblack-300 font-bold text-[20px]">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex lg:flex-row gap-6 mt-4">
          <Button active={true} linkto={"/signup"}>
            Learn More
          </Button>
          <Button active={false} linkto={"/login"}>
            Book a Demo
          </Button>
        </div>

        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            muted
            loop
            autoPlay
            className="shadow-[20px_20px_rgba(255,255,255)">
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* CodeBlocks Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your <HighlightText text={"coding potential"} /> with our
                online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            btn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            btn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="/one">One</a><a href="/two">Two</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>
        {/* CodeBlocks Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            btn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            btn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-blue-25"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        <ExploreMore />
      </div>
      {/* Section 1 Completed */}

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <Button active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </Button>
              <Button active={false} linkto={"/login"}>
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto flex flex-col w-11/12 max-w-maxContent  items-center justify-between gap-8">
          <div className="lg:mt-20 lg:flex-row mt-[-100px] flex flex-col justify-between gap-7 lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand"} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <Button active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </Button>
            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </div>

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <InstructorSection />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
