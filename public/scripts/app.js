//Client-side JS logic

$(document).ready(function() {

  //hide form validation error messages

  $('.form-validation').hide();

  /* ------------------ FUNCTIONS TO CREATE AND RENDER TWEETS ------------------ */

  //returns an <article> element containing the entire HTML structure of the tweet

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

    const $createdAt = $("<p>").addClass("created-at").text(moment(tweet.created_at).startOf('hour').fromNow());
    const $flag = $("<i>").addClass("icon").attr("data-feather", "flag");
    const $retweet = $("<i>").addClass("icon").attr("data-feather", "repeat");
    const $heart = $("<i>").addClass("icon").attr("data-feather", "heart");
    const $footer = $("<footer>").append($createdAt).append($flag).append($retweet).append($heart);

    //append to <article> element

    const $tweet = $("<article>").append($header).append($main).append($footer);

    return $tweet;

  };

  //renders tweets onto '/' and prepends new tweets to the top

  function renderTweets(tweets) {
    $('.new-tweet textarea').val('');
    $('.counter').text('140');
    for (i = 0; i < tweets.length; i++) {
      const article = createTweetElement(tweets[i]);
      $('.tweets').prepend(article);
    }
  }

  //Responsible for fetching tweets from the /tweets page and receiving the array of tweets as JSON

  function loadTweets() {
    $.ajax('/tweets', { method: 'GET'})
    .then(function (data) {
      renderTweets(data);
      //icon library:
      feather.replace();
    });
  };

  loadTweets();

  /* ---------------- EVENT LISTENERS ---------------- */

  //Use AJAX to handle POST request upon form submission

  $('.new-tweet form').on('submit', function (event) {
    event.preventDefault();
    $('.form-validation').hide();
    const newTweet = $(this).find('textarea').val();

    //form validation

    if (newTweet === "") {
      $('.form-validation').text('Please enter a tweet').slideDown("medium");
    } else if (newTweet.length > 140) {
      $('.form-validation').text('Your tweet must be less than 140 characters').slideDown("medium");
    } else {
      const data = $(this).serialize();

      //AJAX post request

      $.ajax('/tweets', { method: 'POST', data: data})
      .then(function () {
        console.log('Success!', data);
        loadTweets();
      });
    };
  });

  //Toggle the Compose Tweet section upon clicking "Compose"

  $('.compose').on('click', function (event) {
    $('.new-tweet').slideToggle("400", function() {
      $('.new-tweet textarea').focus();
      console.log("Slide complete");
    });
  });

});


