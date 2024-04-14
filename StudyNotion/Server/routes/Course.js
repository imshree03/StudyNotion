const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controllers/Course");

const {
  auth,
  isAdmin,
  isInstructor,
  isStudent,
} = require("../middlewares/Auth");

const {
  createSection,
  deleteSection,
  updateSection,
} = require("../controllers/Section");

const {
  createSubsection,
  deleteSubSection,
  updateSubSection,
} = require("../controllers/SubSection");

const {
  createCategory,
  categoryPageDetails,
  showAllCategories,
} = require("../controllers/Category");

const {
  createRating,
  getAllRating,
  getAverageRating,
} = require("../controllers/RatingAndReview");

router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

router.post("/addSubSection", auth, isInstructor, createSubsection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);

router.post("/createCategory", auth, isAdmin, createCategory);
router.post("/getCategoryPageDetails", categoryPageDetails);
router.get("/showAllCategories", showAllCategories);

router.post("/createRating", auth, isStudent, createRating);
router.post("/getAverageRating", getAverageRating);
router.post("/getReviews", getAllRating);

module.exports = router;
