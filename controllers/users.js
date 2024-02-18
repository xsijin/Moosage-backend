const modelUsers = require("../models/user");

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
  deleteUser,
  getLoginDetails,
  loginUser,
  logoutUser,
};

async function getAllUsers(req, res) {
  try {
    const userData = await modelUsers.getAllUsers(req.query);
    res.json({ users: userData });
  } catch (err) {
    res.status(500).json({ errorMsg: err.essage });
  }
}

async function getUser(req, res) {
  try {
    const user = await modelUsers.getUser(req.params.id);
    res.json({ user: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function createUser(req, res) {
  try {
    const userData = await modelUsers.createUser(req.body);

    res.status(201).json(userData);
    console.log(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const updatedProfile = await modelUsers.updateUser(req.params.id, req.body);
    res.status(200).json(updatedProfile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function removeUser(req, res) {
  try {
    await modelUsers.removeUser(req.params.id);
    res.status(200).json({
      message:
        "User status set to deleted. Use deleteUser to hard delete from database. All boards and moosages created by user has been set status:deleted but not yet hard deleted from database. Use deleteBoard and deleteMoosage to hard delete boards and moosages from database if necessary.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    await modelUsers.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted from database." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getLoginDetails(req, res) {
  try {
    const loginDetails = await modelUsers.getLoginDetails(req.query);
    if (loginDetails.success != true) {
      res.status(400).json({ errorMsg: loginDetails.error });
      return;
    }
    res.json(loginDetails.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const token = await modelUsers.loginUser(req.body);
    console.log(token);
    if (!token.success) {
      res.status(400).json({ errorMsg: token.error });
      return;
    }
    res.json(token.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function logoutUser(req, res) {
  try {
    const result = await modelUsers.logoutUser(req.body);
    if (!result.success) {
      res.status(400).json({ errorMsg: result.error });
      return;
    }
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}
