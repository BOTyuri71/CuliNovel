const mongoose = require('mongoose');
const config = require('../config/database');

const tipSchema = new mongoose.Schema({
    type: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    publicationDate: { type: Date, default: Date.now , required: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [
        {
          author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
          comment: { type: String, required: true },
          publicationDate: { type: Date, default: Date.now, required: true },
        }
    ],
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Tip = module.exports = mongoose.model('Tip', tipSchema);