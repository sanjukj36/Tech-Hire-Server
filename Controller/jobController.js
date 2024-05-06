const jobs = require("../Models/jobModel")
const users = require("../Models/usersModel")


//register
exports.createJob = async (req, res) => {
    console.log("Inside createJob Request!!!");
    const { title, experience, location, jobMode, qualification, salary, jobDescription, companyName, recruiterId } = req.body
    console.log(title, experience, location, jobMode, qualification, salary, jobDescription, companyName, recruiterId);
    const _id = recruiterId
    try { //check email is present in database or not
        const existingUser = await users.findOne({ _id })
        //if email is present then existing user
        console.log(existingUser);
        if (existingUser) {
            //else store /insert data to db
            const newJob = new jobs({
                title, experience, location, jobMode, qualification, salary, jobDescription, companyName, recruiterId
            })
            await newJob.save()
            res.status(200).json(newJob)

        } else {
            res.status(406).json("Not a User")

        }
        //to store data to mongodb from mongoose model
    } catch (err) {
        res.status(401).json(err)

    }

}



exports.jobUserShow = async (req, res) => {
    try {
        const recruiterId  = req.query;


        // const jobDetails = await jobs.find(recruiterId);
        const jobDetails = await jobs.find({ recruiterId: recruiterId.userId});

        console.log(jobDetails);

        if (!jobDetails) {
            return res.status(404).json("Jobs not found");
        } else {
            res.status(200).json({ message: "success f ", jobDetails: jobDetails });
            //             console.log(jobDetails);


        }
    } catch (error) {
        // If an error occurs, send an error response
        console.error("Error updating profile status:", error);
        res.status(500).json({ error: "An error occurred while updating profile status" });
    }
};


exports.jobCandidateShow = async (req, res) => {
    try {
      
        const jobDetails = await jobs.find();
        console.log(jobDetails);

        if (!jobDetails) {
            return res.status(404).json("Jobs not found");
        } else {
            res.status(200).json({ message: "success ", jobDetails: jobDetails });
        }
    } catch (error) {
        console.error("Error updating profile status:", error);
        res.status(500).json({ error: "An error occurred while updating profile status" });
    }
};
