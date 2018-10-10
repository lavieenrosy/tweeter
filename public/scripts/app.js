/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //       },
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //       },
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   },
  //   {
  //     "user": {
  //       "name": "Johann von Goethe",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //       },
  //       "handle": "@johann49"
  //     },
  //     "content": {
  //       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //     },
  //     "created_at": 1461113796368
  //   }
  // ];


  //returns a tweet <article> element containing the entire HTML structure of the tweet

  function createTweetElement(tweet) {

    //create header tree

    const $avatar = $("<img>").addClass("avatar").attr("src", tweet.user.avatars.small);
    const $userName = $("<h2>").text(tweet.user.name);
    const $handle = $("<span>").addClass("handle").text(tweet.user.handle);
    const $header = $("<header>").append($avatar).append($userName).append($handle);

    //create main tree

    const $tweetBody = $("<p>").addClass("tweet-body").text(tweet.content.text);
    const $main = $("<main>").append($tweetBody);

    //create footer tree

    const $createdAt = $("<p>").addClass("created-at").text(tweet.created_at);
    const $flag = $("<img>").addClass("icon").attr("src", "/images/bird.png");
    const $retweet = $("<img>").addClass("icon").attr("src", "/images/bird.png");
    const $heart = $("<img>").addClass("icon").attr("src", "/images/bird.png");
    const $footer = $("<footer>").append($createdAt).append($flag).append($retweet).append($heart);

    //append to article

    const $tweet = $("<article>").append($header).append($main).append($footer);

    return $tweet;
  }

  function renderTweets(tweets) {
    $('.new-tweet textarea').val('');
    for (i = 0; i < tweets.length; i++) {
      const article = createTweetElement(tweets[i]);
      $('.tweets').prepend(article);
    }
  }

  // renderTweets(data);

// var $tweet = createTweetElement(tweetData);

// console.log($tweet); // to see what it looks like
// $('.tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

//Use AJAX to handle POST request upon form submission

$('.new-tweet form').on('submit', function (event) {
  event.preventDefault();
  let newTweet = $('.new-tweet textarea').val();
  if (newTweet === "") {
    alert("Please enter a tweet!");
  } else if (newTweet.length > 140) {
    alert("Your tweet must be less than 140 characters.")
  } else {
    let data = $(event.target).serialize();
    $.ajax('/tweets', { method: 'POST', data: data})
    .then(function () {
      console.log('Success!', data);
      loadTweets();
    });
  }
});

//Responsible for fetching tweets from the /tweets page and receiving the array of tweets as JSON

function loadTweets() {
  $.ajax('/tweets', { method: 'GET'})
  .then(function (data) {
    renderTweets(data);
  });
}

loadTweets();

//Toggle the Compose Tweet section upon clicking "Compose"

$('.compose').on('click', function (event) {
  $('.new-tweet').slideToggle("400", function() {
    $('.new-tweet textarea').focus();
    console.log("Slide complete");
  });
});

});


