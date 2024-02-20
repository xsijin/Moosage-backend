const modelMoosages = require("../models/moosage");

module.exports = {
  getAllMoosages,
  getActiveMoosages,
  getDeletedMoosages,
  getBoardMoosages,
  getUserMoosages,
  getUserPublicMoosages,
  createMoosage,
  updateMoosage,
  removeMoosage,
  deleteMoosage,
};

async function getAllMoosages(req, res) {
  try {
    const moosages = await modelMoosages.getAllMoosages();

    res.status(200).json({ moosages: moosages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

async function getActiveMoosages(req, res) {
  try {
    const moosages = await modelMossages.getActiveMoosages();

    res.status(200).json({ moosages: moosages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

async function getDeletedMoosages(req, res) {
  try {
    const moosages = await modelMoosages.getDeletedMoosages();

    res.status(200).json({ moosages: moosages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

async function getUserMoosages(req, res) {
  try {
    const userId = req.params.userId;
    const moosages = await modelMoosages.getUserMoosages(userId);

    res.status(200).json({ moosages: moosages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

async function getUserPublicMoosages(req, res) {
    try {
      const userId = req.params.userId;
      const moosages = await modelMoosages.getUserPublicMoosages(userId);
      res.status(200).json({ moosages: moosages });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMsg: error.message });
    }
  }

async function getBoardMoosages(req, res) {
  try {
    const boardId = req.params.boardId;
    const moosages = await modelMoosages.getBoardMoosages(boardId);

    res.status(200).json(moosages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

async function createMoosage(req, res) {
  try {
    const userId = req.body.user;

    if (!userId) {
      return res.status(404).json({ errorMsg: "User not found." });
    }

    const moosage = await modelMoosages.createMoosage(
      userId,
      req.params.boardId,
      req.body
    );
    res.status(201).json(moosage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

async function updateMoosage(req, res) {
  try {
    const updatedMoosage = await modelMoosages.updateMoosage(
      req.params.moosageId,
      req.body
    );
    res.status(200).json(updatedMoosage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

async function removeMoosage(req, res) {
  try {
    await modelMoosages.removeMoosage(req.params.id);
    res.status(200).json({
      message:
        "Moosage status set to deleted. Use deleteMoosage to hard delete from database.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function deleteMoosage(req, res) {
  try {
    await modelMoosages.deleteMoosage(req.params.id);
    res.status(200).json({ message: "Moosage deleted from database." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}
