const users = require("../Models/usersModel")
const upload = require('../Middlewares/multerMiddleware'); // Import multer configuration


//register
exports.register = async (req, res) => {
  console.log("Inside Register Request!!!");
  const { username, email, password, type, auth } = req.body
  console.log(username, email, password, type, auth);
  try { //check email is present in database or not
    const existingUser = await users.findOne({ email })
    //if email is present then existing user
    console.log(existingUser);
    if (existingUser) {
      res.status(406).json("User Already Exists")
    } else {
      //else store /insert data to db
      const newUser = new users({
        username, email, password, type, auth
      })
      await newUser.save()
      res.status(200).json(newUser)
    }
    //to store data to mongodb from mongoose model
  } catch (err) {
    res.status(401).json(err)

  }

}

//Candidate register
exports.candidateRegister = async (req, res) => {
  console.log("Inside candidate Register Request!!!");
  const { username, email, password, type, auth, aboutYou, domain, git, linkedIn, phoneNumber, place, portfolio } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(406).json("User Already Exists");
    }

    // Create a new user instance
    const newUser = new users({
      username,
      email,
      password,
      type,
      auth,
      aboutYou,
      domain,
      git,
      linkedIn,
      phoneNumber,
      place,
      portfolio
    });

    // Store profileImage if available
    if (req.files && req.files['profileImage']) {
      newUser.profileImage = req.files['profileImage'][0].path;
      console.log("Profile Image stored:", newUser.profileImage);
    }

    // Store resumeUrl if available
    if (req.files && req.files['resumeUrl']) {
      newUser.resumeUrl = req.files['resumeUrl'][0].path;
      console.log("Resume URL stored:", newUser.resumeUrl);
    }

    // Save the new user to the database
    await newUser.save();
    console.log("User saved:", newUser);
    return res.status(200).json(newUser);
  } catch (err) {
    console.error("Error:", err);
    return res.status(401).json(err);
  }
};


// RecruiterRegister(working)
exports.RecruiterRegister = async (req, res) => {
  console.log("Inside Register Request!!!");
  const { username, email, password, type, auth, companyName, aboutCompany, companyWebsite, linkedIn, location, domain } = req.body;
  console.log(username, email, password, type, auth, companyName, aboutCompany, companyWebsite, linkedIn, location, domain);
  
  try {
    // Check if the user already exists
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(406).json("User Already Exists");
    }

    // Create a new user instance
    const newUser = new users({
      username, email, password, type, auth, companyName, aboutCompany, companyWebsite, linkedIn, location, domain
    });

    // Store companyLogo if available
    if (req.file) {
      newUser.companyLogo = req.file.path;
      console.log("Company Logo stored:", newUser.companyLogo);
    }

    // Save the new user to the database
    await newUser.save();
    console.log("User saved:", newUser);
    return res.status(200).json(newUser);
  } catch (err) {
    console.error("Error:", err);
    return res.status(401).json(err.message);
  }
};



//login
exports.login = async (req, res) => {
  console.log("Inside login Request!!!");
  const { email, password } = req.body
  console.log(email, password);

  try {
    //checking email is present or not
    const existingUser = await users.findOne({ email, password })
    if (existingUser) {
      //user can login
      //generate token
      //    const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
      res.status(200).json({ existingUser })
    } else {
      //if email or password is incorrect
      res.status(404).json("incorrect email/password")
    }
  } catch (err) {
    res.status(401).json(err)
  }
}

// Candidate Profile
exports.candidateProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);

    const existingUser = await users.findById(userId);

    if (!existingUser) {
      return res.status(404).json("User not found");
    }

    existingUser.aboutYou = req.body.aboutYou;
    existingUser.domain = req.body.domain;
    existingUser.email = req.body.email;
    existingUser.git = req.body.git;
    existingUser.linkedIn = req.body.linkedIn;
    existingUser.password = req.body.password;
    existingUser.phoneNumber = req.body.phoneNumber;
    existingUser.place = req.body.place;
    existingUser.portfolio = req.body.portfolio;

    if (req.files['profileImage']) {
      existingUser.profileImage = req.files['profileImage'][0].path;
    }
    if (req.files['resumeUrl']) {
      existingUser.resumeUrl = req.files['resumeUrl'][0].path;
    }
    existingUser.username = req.body.username;


    await existingUser.save();
    console.log(existingUser);

    res.status(200).json(existingUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.updateRecruiterProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const existingUser = await users.findById(userId);
    if (!existingUser) {
      return res.status(404).json("User not found");
    }
    existingUser.companyName = req.body.companyName;
    existingUser.aboutCompany = req.body.aboutCompany;
    existingUser.companyWebsite = req.body.companyWebsite;
    existingUser.linkedIn = req.body.linkedIn;
    existingUser.companyLogo = req.file.path;
    existingUser.location = req.body.location;
    existingUser.domain = req.body.domain;

    await existingUser.save();
    res.status(200).json({ existingUser });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateProfileStatus = async (req, res) => {
  try {
    const { userId } = req.query;

    const existingUser = await users.findById(userId);

    if (!existingUser) {
      return res.status(404).json("User not found");
    } else {
      res.status(200).json({ message: "Profile status updated successfully", companyDetails: existingUser, candidateDetails: existingUser });
    }
  } catch (error) {
    console.error("Error updating profile status:", error);
    res.status(500).json({ error: "An error occurred while updating profile status" });
  }
};


exports.getAllUserByType = async (req, res) => {
  try {
    const { type } = req.body;
    console.log(type);
    if (type === "Recruiter") {
      const recruiters = await users.find({ type: "Recruiter" });
      console.log(recruiters);
      return res.status(200).json(recruiters);
    } if (type === "Candidate") {
      const recruiters = await users.find({ type: "Candidate" });
      console.log(recruiters);
      return res.status(200).json(recruiters);
    } else {
      return res.status(400).json({ error: "Type is missing in the request body" });
    }
  } catch (error) {
    console.error("Error occurred while getting recruiters:", error);
    return res.status(500).json({ error: "An error occurred while getting recruiters" });
  }
}


exports.userAuthUpdate = async (req, res) => {
  try {
    const { _id, auth } = req.body;
    const existingUser = await users.findById(_id);
    console.log(existingUser, _id, auth);
    if (!existingUser) {
      return res.status(404).json("User not found");
    }
    existingUser.auth = req.body.auth;
    await existingUser.save();
    res.status(200).json({ existingUser });
  } catch (err) {
    res.status(500).json(err);
  }
};