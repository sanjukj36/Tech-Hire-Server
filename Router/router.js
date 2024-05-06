const express = require("express")
const userController = require('../Controller/userController')
const multerConfig = require('../Middlewares/multerMiddleware')
const multerSingleConfig = require('../Middlewares/multerSingleMiddleware')
const jobController = require('../Controller/jobController')
const jobTrackerController = require('../Controller/jobTrackerController')

const multer = require('multer');

const router = new express.Router()

// register 
router.post("/register", userController.register)

// register-candidate
router.post("/register-candidate", multerConfig, userController.candidateRegister)

router.post("/register-company", multerSingleConfig, userController.RecruiterRegister);


// register 
router.post("/login", userController.login)


// router.put("/candidateProfile", multerConfig.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'resumeUrl', maxCount: 1 }]), userController.candidateProfile)
router.put("/candidateProfile", multerConfig, userController.candidateProfile);


router.put("/recruiterProfile", multerSingleConfig, userController.updateRecruiterProfile);
0
router.put("/userAuthUpdate", userController.userAuthUpdate);



router.get("/profileStatus", userController.updateProfileStatus);

router.post("/job-card", jobController.createJob)

router.get("/job-card-user-show", jobController.jobUserShow)

router.get("/job-card-show", jobController.jobCandidateShow)



router.post("/apply-job", jobTrackerController.applyJob)


router.get("/job-tracker-candidate", jobTrackerController.jobTrackerCandidate)

router.get("/job-tracker-recruiter", jobTrackerController.jobTrackerRecruiter)

router.put("/jobStatusUpdate", jobTrackerController.jobStatusUpdate)

router.post("/getAllUserByType",userController.getAllUserByType )










// export router

module.exports = router