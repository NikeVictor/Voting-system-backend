const express = require('express');
const votesController = require("../controllers/votes.controller");
const userController = require("../controllers/user.controller");
const candidateController = require("../controllers/candidate.controller");
const router = express.Router();

router.post("/vote", votesController.voteCandidate);
router.get("/check-vote", votesController.checkVoters);
router.get("/voting-stats", votesController.getElectionStats);

router.post("/create-user", userController.register);
router.put("/user/:userId", userController.updateUser);
router.get("/users", userController.getUsers);
router.delete("/delete/user/:userId", userController.deleteUser);

router.post("/create-candidate", candidateController.registerCandidate);
router.put("/candidate/:candidateId", candidateController.updateCandidate);
router.get("/candidates", candidateController.getCandidates);
router.delete("/delete/candidate/:candidateId", candidateController.deleteCandidate);
module.exports = router;