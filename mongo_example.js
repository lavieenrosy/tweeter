"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  //program logic invoked here... this is an "entry point" for a database-connected app

  //------------------------------------------------------------

  // db.collection("tweets").find({}, (err, results) => {
  //   if (err) throw err;
  //   console.log("for each item yielded by the cursor:");

    //iterate on the cursor to get results, one at a time:
      //results.each((err, item) => console.log("  ", item));

    //grab results in an array:
      // results.toArray((err, resultsArray) => {
      //   if (err) throw err;
      //   console.log("results.toArray:", resultsArray);
      // });

  //});

  //------------------------------------------------------------

  function getTweets(callback) {
    db.collection("tweets").find().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
      callback(null, tweets);
    });
  }

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }

  db.close();

  });


});