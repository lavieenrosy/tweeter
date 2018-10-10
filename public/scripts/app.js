/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


//returns a tweet <article> element containing the entire HTML structure of the tweet

function createTweetElement(tweet) {

  const name = tweet.user.name;
  const avatar = tweet.user.avatars.small;
  const handle = tweet.user.handle;
  const tweetText = tweet.content.text;
  const createdAt = tweet.created_at;

  //create header tree

  const img = $("<img>").addClass("avatar").attr("src", avatar);
  console.log("img: ", img);
  const h2 = $("<h2>").text(name);
  const span = $("<span>").addClass("handle").text(handle);
  const header = $("<header>").append(img).append(h2).append(span);
  console.log("header: ", header);

  //create main tree

  const mainParagraph = $("<p>").addClass("tweet-body").text(tweetText);
  const main = $("<main>").append(mainParagraph);
  console.log("main: ", main);

  //create footer tree
  const footerParagraph = $("<p>").addClass("days-ago").text(createdAt);
  const footer = $("<footer>").append(footerParagraph);
  console.log("footer: ", footer);

  //append to article

  const $tweet = $("<article>").append(header).append(main).append(footer);

  return $tweet;
}

function renderTweets(tweets) {
  for (i = 0; i < tweets.length; i++) {
    const article = createTweetElement(tweets[i]);
    $('.tweets').append(article);
  }
}

renderTweets(data);

// var $tweet = createTweetElement(tweetData);

// console.log($tweet); // to see what it looks like
// $('.tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
