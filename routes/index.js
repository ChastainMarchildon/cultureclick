const express = require("express");
const surveyController = require("../controllers/surveyController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const emailController = require("../controllers/emailController");

const router = express.Router();

/* GET home page. */
router.get("/", surveyController.homePage);

router.get("/surveys", surveyController.getSurveys);

router.get("/admin", authController.isLoggedIn, surveyController.admin);
router.get("/admin/delete/:id", surveyController.deleteSurvey);
router.get("/admin/edit/:id", surveyController.editSurvey);
router.post("/admin/edit/:id", surveyController.updateSurvey);

router.get("/add", authController.isLoggedIn, surveyController.addSurvey);
router.post("/add", authController.isLoggedIn, surveyController.createSurvey);

router.get("/register", userController.registerForm);
router.post("/register", userController.register, authController.login);

router.get("/login", userController.loginForm);
router.post("/login", authController.login);

router.get("/viewSurvey/:surveyid", surveyController.viewSurvey);
router.get("/generateLink/:surveyid", surveyController.generateLink);
router.get("/answerSurvey/:id", surveyController.answerSurvey);
router.post("/generateLink/send", emailController.generateLink);

router.get("/contact/:id", surveyController.contact);
router.post("/contact/send", emailController.contact);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
