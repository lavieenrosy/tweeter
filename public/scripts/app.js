/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //hide form validation error messages

  $('.form-validation').hide();

  //returns a tweet <article> element containing the entire HTML structure of the tweet
// function createTweetElement({ user: { avatars, handle }, content, created_at }) {
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
  $('.form-validation').hide();
  let newTweet = $(this).find('textarea').val();
  if (newTweet === "") {
    $('.form-validation').text('Please enter a tweet').slideDown("medium");
  } else if (newTweet.length > 140) {
    $('.form-validation').text('Your tweet must be less than 140 characters').slideDown("medium");
  } else {
    let data = $(this).serialize();
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


