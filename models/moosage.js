const daoBoards = require("../daos/boards");
const daoMoosages = require("../daos/moosages");
const daoUsers = require("../daos/users");

module.exports = {
  getAllMoosages,
  getActiveMoosages,
  getDeletedMoosages,
  getBoardMoosages,
  getPublicBoardMoosages,
  getUserMoosages,
  getUserPublicMoosages,
  createMoosage,
  updateMoosage,
  removeMoosage,
  deleteMoosage,
};

// only admins will be able to see all moosages
async function getAllMoosages() {
  const AllMoosages = await daoMoosages.find({});

  if (!AllMoosages || AllMoosages.length === 0) {
    return (message = "No moosages available.");
  }
  return AllMoosages;
}

// only admins will be able to see all active or soft-deleted moosages
function getActiveMoosages() {
  return daoMoosages.find({ status: "active" });
}

function getDeletedMoosages() {
  return daoMoosages.find({ status: "deleted" });
}

// Get all active moosages by a user (include private boards)
async function getUserMoosages(userId) {
  const UserMoosages = await daoMoosages.find({
    userId: userId,
    status: "active",
  });

  if (!UserMoosages || UserMoosages.length === 0) {
    return (message = "User has not made any moosages.");
  }
  return UserMoosages;
}

// Get all public & active moosages created by a user
async function getUserPublicMoosages(userId) {
  const UserMoosages = await daoMoosages.find({
    userId: userId,
    status: "active",
    is_public: true,
  });

  if (!UserMoosages || UserMoosages.length === 0) {
    return (message = "User has not made any moosages.");
  }
  return UserMoosages;
}

// Get all active moosages for a board by boardId (include private moosages)
async function getBoardMoosages(boardId) {
  const board = await daoBoards.findById(boardId);
  if (!board || board.status !== "active") {
    return null; // board not found or is not active
  }

  const BoardMoosages = await daoMoosages
    .find({
      boardId: boardId,
      status: "active",
    })
    .populate({
      path: "userId",
      select: "preferredName nickName",
    })
    .populate({
      path: "boardId",
      select: "title",
    })
    .sort({ createdAt: -1 });

  if (!BoardMoosages || BoardMoosages.length === 0) {
    return (message = "Board has no moosages available.");
  }
  return BoardMoosages;
}

// Get all public & active moosages for a public board by boardId
async function getPublicBoardMoosages(boardId) {
  const BoardMoosages = await daoMoosages
    .find({
      boardId: boardId,
      status: "active",
      is_public: true,
    })
    .populate({
      path: "userId",
      select: "preferredName nickName",
    })
    .populate({
      path: "boardId",
      select: "title",
    })
    .sort({ createdAt: -1 });

  if (!BoardMoosages || BoardMoosages.length === 0) {
    return (message = "Board has no moosages available.");
  }
  return BoardMoosages;
}

async function createMoosage(userId, boardId, moosageData) {
  const board = await daoBoards.findById(boardId);
  const user = await daoUsers.findById(userId);

  if (!board || !user) {
    return (message = "Board or user does not exist.");
  }

  const moosage = await daoMoosages.create({
    userId: userId,
    boardId: boardId,
    message: moosageData.message,
    moodUrl: moosageData.moodUrl,
    status: moosageData.status,
    is_public: moosageData.is_public,
  });

  board.moosages.push(moosage._id);
  user.moosages.push(moosage._id);
  await board.save();
  await user.save();
  return moosage;
}

// Update a moosage via the moosageId.
async function updateMoosage(id, moosageData) {
  const moosage = await daoMoosages.findById(id);

  if (!moosage) {
    return { message: "Moosage does not exist." };
  } else {
    const updatedMoosage = await daoMoosages.findByIdAndUpdate(
      id,
      moosageData,
      { new: true }
    );

    const board = await daoBoards.findOne({ moosages: id });

    if (!board) {
      return { message: "Moosage does not exist." };
    }

    return { message: "Moosage updated successfully.", updatedMoosage };
  }
}

async function removeMoosage(id) {
  // Set moosage status to "deleted"
  const updatedMoosage = await daoMoosages.findByIdAndUpdate(
    id,
    { status: "deleted" },
    {
      new: true,
    }
  );

  if (!updatedMoosage) {
    return "Moosage does not exist.";
  }

  // Remove moosage ID from user's moosages array
  await daoUsers.findByIdAndUpdate(updatedMoosage.userId, {
    $pull: { moosages: id },
  });

  // Remove moosage ID from board's moosages array
  await daoBoards.findByIdAndUpdate(updatedMoosage.boardId, {
    $pull: { moosages: id },
  });

  return updatedMoosage;
}

async function deleteMoosage(id) {
  const moosage = await daoMoosages.findById(id);
  if (!moosage) {
    throw new Error("Moosage not found.");
  }
  if (moosage.status !== "deleted") {
    throw new Error(
      "Moosage status must be marked as deleted before it can be hard deleted."
    );
  }
  const result = await daoMoosages.findByIdAndDelete(id);
  if (!result) {
    throw new Error("Failed to delete moosage.");
  }
  return {
    success: true,
    message: "Moosage successfully deleted from database.",
  };
}
