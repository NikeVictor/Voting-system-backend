const Candidate = require("../models/candidates.model");

module.exports = {
    registerCandidate: async (req, res) => {
        try {
            const candidate = new Candidate ({
                name: req.body.name,
                position: req.body.position,
                votes: req.body.votes
            });
            const savedCandidate = await candidate.save();
            res.json({data: savedCandidate});
        } catch (error) {
            console.log(error);
            res.status(500).json({error});
        }
    },

    getCandidates: async (req, res, next) => {
        try {
          const candidates = await Candidate.find({});
          res.status(200).json({
          data: candidates
          });
        } catch (error) {
          next(error)
          }
      },

      updateCandidate: async (req, res, next) => {
        try {
        const update = req.body
        const candidateId = req.params.candidateId;
        await Candidate.findByIdAndUpdate(candidateId, update);
        const candidate = await User.findById(candidateId)
        res.status(200).json({
          data: candidate,
          message: 'candidate has been updated'
        });
        } catch (error) {
        next(error)
        }
    },
     
    deleteCandidate: async (req, res, next) => {
        try {
        const candidateId = req.params.candidateId;
        await Candidate.findByIdAndDelete(candidateId);
        res.status(200).json({
          data: null,
          message: 'Candidate has been deleted'
        });
        } catch (error) {
        next(error)
        }
    }
}