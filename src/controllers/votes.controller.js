const Candidate = require("../models/candidates.model");
const User = require("../models/users.model");

module.exports = {
    voteCandidate: async (req, res) => {
        try {
            const { phoneNumber, candidateIds } = req.body;
            const user = await User.findOne({ phoneNumber });
            // Ensure candidateIds is an array
            if (!Array.isArray(candidateIds) || candidateIds.length === 0) {
                return res.status(400).json({ message: "Candidate IDs must be a non-empty array" });
            }

            // Find all candidates matching the provided IDs
            const candidates = await Candidate.find({ _id: { $in: candidateIds } });

            // Update each candidate's vote count
            await Promise.all(candidates.map(async (candidate) => {
                candidate.votes += 1;
                await candidate.save();
            }));

            // Mark user as voted
            user.voted = true;
            await user.save();

            return res.status(200).json({ message: "Vote cast successfully", candidates });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", error });
        }
    },

    checkVoters: async (req, res) => {
        try {
            const phoneNumber = req.query.phoneNumber;
            const user = await User.findOne({ phoneNumber });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.voted) {
                return res.status(400).json({ message: "You have already voted" });
            } else {
                res.status(200).json({
                    data: user
                    });
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", error });
        }
    },

    getElectionStats: async (req, res) => {
        try {
            // Count registered voters
            const registeredVoters = await User.countDocuments();
    
            // Fetch all candidates
            const candidates = await Candidate.find();
    
            // Group candidates by position
            const groupedCandidates = candidates.reduce((acc, candidate) => {
                if (!acc[candidate.position]) {
                    acc[candidate.position] = [];
                }
                acc[candidate.position].push({ name: candidate.name, votes: candidate.votes });
                return acc;
            }, {});
    
            // Send the response
            return res.json({
                numberOfRegisteredVoters: registeredVoters,
                candidatesByPosition: groupedCandidates
            });
        } catch (error) {
            console.error('Error fetching election stats:', error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
};
