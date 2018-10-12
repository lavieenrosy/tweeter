"use strict";

// Defines helper functions for saving and getting tweets using the database `db`

module.exports = function makeDataHelpers(db) {
  return {

    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, function (err) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    },

    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    }

  };
};
