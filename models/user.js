const daoUsers = require("../daos/users");
// const utilSecurity = require("../util/security");

module.exports = {
  getAllUsers,
  getUser,
  getLoginDetails,
  loginUser,
  logoutUser,
  createUser,
  updateUser,
  deleteUser,
  removeUser,
};

function getAllUsers(queryFields) {
  return daoUsers.find(queryFields);
}

async function getUser(id) {
  try {
    const user = await daoUsers.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      _id: user._id,
      nickName: user.nickName,
      preferredName: user.preferredName,
      email: user.email,
      boards: user.boards,
      moosages: user.moosages,
      profilePicUrl: user.profilePicUrl,
      is_admin: user.is_admin,
      status: user.status,
      is_banned: user.is_banned,
    };
  } catch (err) {
    console.log(err);
    throw new Error(err.message || "An error occurred");
  }
}

async function getLoginDetails(queryFields) {
  const loginFields = {
    nickName: 1,
    salt: 1,
    iterations: 1,
  };
  if (!queryFields.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  // url decode email '@' -> %40
  const userEmail = decodeURIComponent(queryFields.email);
  const loginFieldsRes = await daoUsers.findOne(
    { email: userEmail },
    loginFields
  );
  return { success: true, data: loginFieldsRes };
}

async function loginUser(body) {
  if (!body.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  if (!body.hasOwnProperty("password")) {
    return { success: false, error: "missing password" };
  }

  const user = await daoUsers.findOne({
    email: body.email,
    password: body.password,
  });
  if (user == null || Object.keys(user).length == 0) {
    return { success: false, error: "Invalid email/password" };
  }
  console.log("user:", user);

  const jwtPayload = {
    user: user.nickName,
    userId: user._id,
    email: user.email,
    is_admin: user.is_admin,
  };

  console.log("jwtPayload:", jwtPayload);

  const token = utilSecurity.createJWT(jwtPayload);
  console.log("token:", token);
  const expiry = utilSecurity.getExpiry(token);
  console.log("expiry:", expiry);
  daoUsers.updateOne(
    { email: body.email },
    { token: token, expire_at: expiry }
  );
  return { success: true, data: token };
}

async function logoutUser(body) {
  if (!body.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  const res = await daoUsers.updateOne(
    { email: body.email },
    { token: null, expire_at: null }
  );
  return { success: true, data: res };
}

async function createUser(body) {
  // Check if user already exists in DB by email
  const userByEmail = await daoUsers.findOne({ email: body.email });
  if (userByEmail) {
    return {
      success: false,
      error: "Email already exists. Please use a different email.",
    };
  }

  // Check if user already exists in DB by nickname
  const userByNickname = await daoUsers.findOne({ nickName: body.nickName });
  if (userByNickname) {
    return {
      success: false,
      error: "Nickname already exists. Please use a different nickname.",
    };
  }

  // If new user, create user profile
  const newUser = await daoUsers.create(body);
  return { success: true, data: newUser };
}

async function updateUser(id, profile) {
  const updatedProfile = await daoUsers.findByIdAndUpdate(id, profile, {
    new: true,
    runValidators: true,
  });
  return updatedProfile;
}

async function removeUser(id) {
  const updatedUser = await daoUsers.findByIdAndUpdate(
    id,
    { status: "deleted" },
    {
      new: true,
    }
  );
  return updatedUser;
}

async function deleteUser(id) {
    const user = await daoUsers.findById(id);
    if (!user) {
        throw new Error("User not found.");
    }
    if (user.status !== "deleted") {
        throw new Error("User status must be marked as deleted before it can be hard deleted.");
    }
    const result = await daoUsers.findByIdAndDelete(id);
    if (!result) {
        throw new Error("Failed to delete user.");
    }
    return {
        success: true,
        message: "User successfully deleted from database.",
    };
}
