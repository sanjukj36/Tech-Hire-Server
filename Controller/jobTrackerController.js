const jobTrackers = require("../Models/jobTrackerModel")

exports.applyJob = async (req, res) => {
    console.log("Inside Apply Job Function ");

    const { jobId, jobTitle, company, status, candidateId, candidateName, candidateNumber, candidateEmail,resumeUrl, recruiterId } = req.body;

    try {
        if (jobId || jobTitle || company || status || candidateId || candidateName || candidateNumber || candidateEmail ||resumeUrl || recruiterId) { // Check if jobTitle is present

            const result = await jobTrackers.find({ candidateId: candidateId, jobId: jobId });

            console.log(jobId, jobTitle, company, status, candidateId, candidateName, candidateNumber, candidateEmail, resumeUrl, recruiterId );
            console.log(result.length);

            if (result.length>0) {
                console.log("Alertly Applied",result);
                res.status(401).json("Alertly Applied");

                
            } else {
                console.log("You Can Create",result);
                const jobTrackerNew = new jobTrackers({
                    jobId, jobTitle, company, status, candidateId, candidateName, candidateNumber, candidateEmail, resumeUrl, recruiterId
                });
                await jobTrackerNew.save();

                console.log(jobTrackerNew);
                res.status(200).json(jobTrackerNew);
            }


        } else {
            console.log("Job title is missing");
            res.status(400).json({ error: "Job title is missing" }); // Send an error response if jobTitle is missing
        }
    } catch (err) {
        console.error("Error applying for job:", err);
        res.status(500).json({ error: "An internal server error occurred" }); // Send an error response for any internal server error
    }
}



exports.jobTrackerCandidate = async (req, res) => {
    try {
        const candidateId = req.query.userId;
        console.log("ffff", candidateId);

        const jobTrackDetails = await jobTrackers.find({ candidateId});

        console.log("hyyy", jobTrackDetails);

        if (jobTrackDetails.length === 0) {
            return res.status(404).json("Not Applied");
        } else {
            res.status(200).json({ jobTrackDetails: jobTrackDetails });
        }
    } catch (error) {
        console.error("Error updating profile status:", error);
        res.status(500).json({ error: "An error occurred while updating profile status" });
    }
}

exports.jobTrackerRecruiter = async (req, res) => {
    try {
        const jobId = req.query.jobId;
        console.log("ffff", jobId);

        const jobTrackDetails = await jobTrackers.find({ jobId});

        console.log("hyyy", jobTrackDetails);

        if (jobTrackDetails.length === 0) {
            return res.status(404).json("Not Applied");
        } else {
            res.status(200).json({ jobTrackDetails: jobTrackDetails });
        }
    } catch (error) {
        console.error("Error updating profile status:", error);
        res.status(500).json({ error: "An error occurred while updating profile status" });
    }
}

exports.jobStatusUpdate = async (req, res) => {
    try {
      const { trackingId,status } = req.body;
      const jobTrackersDetails = await jobTrackers.findById(_id=trackingId);
      if (!jobTrackersDetails) {
        return res.status(404).json("jobTrackers User not found");
      }
      jobTrackersDetails.status = req.body.status;
      
  
      await jobTrackersDetails.save();
      res.status(200).json({jobTrackersDetails});
    } catch (err) {
      res.status(500).json(err);
    }
  };
