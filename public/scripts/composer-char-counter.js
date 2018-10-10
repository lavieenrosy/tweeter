$(document).ready(function() {
  const tweetbox = document.querySelector('.new-tweet textarea');
  tweetbox.addEventListener("keyup", function(event) {
    const textEntered = this.value;
    const characterCount = textEntered.length;
    const charactersLeft = 140 - characterCount;
    let counterText = this.parentNode.querySelector('.new-tweet span');
    counterText.innerText = charactersLeft;

    //style counter red if no characters are left

    if (charactersLeft < 0) {
      counterText.className = "red";
    } else {
      counterText.className = "counter";
    }

  });
});

