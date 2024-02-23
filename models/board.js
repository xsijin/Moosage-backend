const daoBoards = require("../daos/boards");
const daoMoosages = require("../daos/moosages");
const daoUsers = require("../daos/users");

module.exports = {
  getAllBoards,
  getActiveBoards,
  getDeletedBoards,
  getBoard,
  getUserBoards,
  getUserPublicBoards,
  createBoard,
  updateBoard,
  removeBoard,
  deleteBoard,
};

// only admins will be able to see all boards
async function getAllBoards() {
  const allBoards = await daoBoards.find({}).populate({
    path: "userId",
    select: "nickName preferredName -_id",
  });

  if (!allBoards || allBoards.length === 0) {
    return "No boards available.";
  }

  return allBoards.map((board) => ({
    ...board._doc,
    userId: board.userId._id,
    nickName: board.userId.nickName,
    preferredName: board.userId.preferredName,
  }));
}

// only admins will be able to see all active or soft-deleted boards
function getActiveBoards() {
  return daoBoards.find({ status: "active" });
}

function getDeletedBoards() {
  return daoBoards.find({ status: "deleted" });
}

// only get particular active board (deleted boards will not show up)
async function getBoard(id) {
  try {
    const board = await daoBoards
      .findOne({ _id: id, status: "active" })
      .populate("userId");

    if (!board) {
      throw new Error("Board not found");
    }

    return {
      _id: board._id,
      userId: board.userId._id, // return the user's id
      userPreferredName: board.userId.preferredName, // return the user's preferred name
      userNickName: board.userId.nickName, // return the user's nickname
      title: board.title,
      moosages: board.moosages,
      status: board.status,
      is_public: board.is_public,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "An error occurred");
  }
}

// Get all active boards created by a user (include private boards)
async function getUserBoards(userId) {
  const boards = await daoBoards.find({ userId: userId, status: "active" });
  return boards;
}

// Get all public & active boards created by a user
async function getUserPublicBoards(userId) {
  const boards = await daoBoards.find({
    user: userId,
    status: "active",
    is_public: true,
  });

  return boards;
}

async function createBoard(userId, boardData) {
  const user = await daoUsers.findById(userId);

  if (!user) {
    return (message = "User does not exist / please login first.");
  }

  const newBoard = await daoBoards.create({
    userId: userId,
    title: boardData.title,
    is_public: boardData.is_public,
  });

  user.boards.push(newBoard._id);
  await user.save();

  return newBoard;
}

async function updateBoard(id, board) {
  const updatedBoard = await daoBoards.findByIdAndUpdate(id, board, {
    new: true,
  });
  return updatedBoard;
}

async function removeBoard(id) {
  // Set board status to "deleted" and remove moosages IDs from board's moosages array
  const updatedBoard = await daoBoards.findByIdAndUpdate(
    id,
    { 
      $set: { status: "deleted" },
      $pull: { moosages: { $in: moosages.map(moosage => moosage._id) } }
    },
    {
      new: true,
    }
  );

  if (!updatedBoard) {
    return "Board does not exist.";
  }

  // Set status of all moosages in the board to "deleted"
  await daoMoosages.updateMany({ boardId: id }, { status: "deleted" });

  // Remove board ID from user's boards array
  await daoUsers.findByIdAndUpdate(updatedBoard.userId, {
    $pull: { boards: id },
  });

  // Get all moosages in the board
  const moosages = await daoMoosages.find({ boardId: id });

  // Remove moosages IDs from user's moosages array
  for (let moosage of moosages) {
    await daoUsers.findByIdAndUpdate(moosage.user, {
      $pull: { moosages: moosage._id },
    });
  }

  return updatedBoard;
}

async function deleteBoard(id) {
  const board = await daoBoards.findById(id);
  if (!board) {
    throw new Error("Board not found.");
  }
  if (board.status !== "deleted") {
    throw new Error(
      "Board status must be marked as deleted before it can be hard deleted."
    );
  }
  const result = await daoBoards.findByIdAndDelete(id);
  if (!result) {
    throw new Error("Failed to delete board.");
  }
  return {
    success: true,
    message:
      "Board successfully deleted from database. All moosages in this board have been set status:deleted but not yet hard deleted from database. Use deleteMoosage to hard delete moosages from database if necessary.",
  };
}
