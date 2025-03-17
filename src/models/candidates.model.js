const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { 
        type: String, 
        required: true,
     },
    votes: { type: Number, default: 0 },
}, { timestamps: true });

const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;
