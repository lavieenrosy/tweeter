# Tweeter Project

A single-page Twitter clone app developed in Week 3 of the Lighthouse Labs Web Development bootcamp. Built upon a basic Express server starter repo, Tweeter utilises AJAX, jQuery, JS, HTML5, and CSS in the front-end, and MongoDB in the back-end.

## Screenshots

When the Compose button is clicked, the "new tweet" form is toggled up and down:

![GIF displaying the toggle effect on the Compose button](https://github.com/lavieenrosy/tweeter/blob/master/docs/compose-toggle.gif?raw=true)

<br/>

A dynamic character counter allows the user to know how long their tweet is. Blank tweets or tweets over 140 characters cannot be submitted and will display an error message:

![GIF displaying character count feature with error handling](https://github.com/lavieenrosy/tweeter/blob/master/docs/character-count.gif?raw=true)

<br/>

A new tweet is posted to the top of the feed:

![Posting a new tweet GIF](https://github.com/lavieenrosy/tweeter/blob/master/docs/post-tweet.gif?raw=true)

## Dependencies

- Body-parser: 1.15.2
- Chance: 1.0.2
- Express: 4.13.4
- MongoDB: 2.2.33
- md5: 2.1.0
