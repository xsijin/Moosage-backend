const modelBoards = require("../models/board");

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

async function getAllBoards(req, res) {
    try {
        const boards = await modelBoards.getAllBoards();

        res.status(200).json(boards);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMsg: error.message });
    }
}

async function getActiveBoards(req, res) {
  try {
    const boards = await modelBoards.getActiveBoards();
    res.json({ boards: boards });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

async function getDeletedBoards(req, res) {
  try {
    const boards = await modelBoards.getDeletedBoards();
    res.json({ boards: boards });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

async function getBoard(req, res) {
  try {
    const board = await modelBoards.getBoard(req.params.id);
    res.json({ board: board });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

async function getUserBoards(req, res) {
  try {
    const userId = req.params.userId;
    const boards = await modelBoards.getUserBoards(userId);
    res.status(200).json({ boards: boards });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

async function getUserPublicBoards(req, res) {
    try {
      const userId = req.params.userId;
      const boards = await modelBoards.getUserPublicBoards(userId);
      res.status(200).json({ boards: boards });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMsg: error.message });
    }
  }

async function createBoard(req, res) {
  try {
    const userId = req.params.userId;
    const boardData = req.body;
    const board = await modelBoards.createBoard(userId, boardData);
    res.status(201).json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

async function updateBoard(req, res) {
  try {
    updatedBoard = await modelBoards.updateBoard(req.params.id, req.body);
    res.status(200).json(updatedBoard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

async function removeBoard(req, res) {
  try {
    await modelBoards.removeBoard(req.params.id);
    res.status(200).json({
      message:
        "Board status set to deleted. Use deleteBoard to hard delete from database. All moosages in this board have been set status:deleted but not yet hard deleted from database. Use deleteMoosage to hard delete moosages from database if necessary.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function deleteBoard(req, res) {
  try {
    await modelBoards.deleteBoard(req.params.id);
    res.status(200).json({ message: "Board deleted from database." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}
