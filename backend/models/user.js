const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Tip = require('../models/tips'); // Importing tip model
const Recipe = require('../models/recipes'); // Importing recipe model

const userSchema = new mongoose.Schema({
  banner: { type: String },
  avatar: { type: String },
  email: { type: String, required: true, unique: true },
  completeName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  description: { type: String },
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  newNotifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notifications' }],
  oldNotifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notifications' }],
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id) {
  return User.findById(id).exec();
};


module.exports.getUserByEmail = function(email) {
  return this.findOne({ email });
}

module.exports.getTotalPostsById = async function (userId) {
  try {
    const user = await this.findById(userId).exec();

    if (!user) {
      throw new Error('User not found');
    }

    const tipsCount = await Tip.countDocuments({ author: userId });
    const recipesCount = await Recipe.countDocuments({ author: userId });

    const totalPosts = tipsCount + recipesCount;

    return totalPosts;
  } catch (error) {
    console.error('Error fetching total posts:', error);
    throw error; // Propagar o erro para que seja tratado onde a função for chamada
  }
};

module.exports.getUserByUsername = async function (username) {
  try {
    const user = await this.findOne({ username }).exec();

    if (!user) {
      throw new Error('User not found');
    }

    const totalPosts = await this.getTotalPostsById(user._id);

    return {
      id: user._id,
      username: user.username,
      completeName: user.completeName,
      avatar: user.avatar,
      banner: user.banner,
      description: user.description,
      gender: user.gender,
      followers: user.followers,
      following: user.following,
      totalPosts: totalPosts,
    };
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw error;
  }
};



module.exports.addUser = function(newUser) {
  return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(newUser.password, salt))
    .then(hash => {
      newUser.password = hash;
      return newUser.save();
    });
}

module.exports.comparePassword = function(candidatePassword, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
}