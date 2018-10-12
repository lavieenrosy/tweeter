"use strict";

// Requiring a JSON file automatically parses it and returns the data

const db = {
  tweets: require("../data-files/initial-tweets")
}

module.exports = db;

