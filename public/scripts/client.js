/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]



const createTweetElement = tweet => {
  const $article = $('<article>');
  const $header = $('<header>');
  const $leftOfHeader = $('<div>');
  const $div = $('<div>');
  const $footer = $('<footer>');
  const $hr = $('<hr>');
  const $flag = $('<i>').addClass('fas fa-flag');
  const $fontAwsomeIcons = $('<span>').addClass('fontAwesome');
  const $retweet = $('<i>').addClass('fas fa-retweet');
  const $like = $('<i>').addClass('fas fa-heart');

  //set the font awesome container
  $fontAwsomeIcons.append($flag);
  $fontAwsomeIcons.append($retweet);
  $fontAwsomeIcons.append($like);

  $('<span>').text(tweet.user.name).addClass('person').appendTo($leftOfHeader);
  $('<span>').text(tweet.user.handle).addClass('atPerson').appendTo($header);

  $leftOfHeader.prepend($('<img>', { src: tweet.user.avatars }));
  $leftOfHeader.addClass('leftContent').prependTo($header);

  $('<p>').text(tweet.content.text).appendTo($article);

  $header.addClass('articleHeader').prependTo($article);
  $article.prependTo($div);
  $hr.addClass('line').appendTo($div);

  //get the time from the given string in database
  let createdTime = new Date(tweet['created_at']);
  // .toString().slice(4, 24)

  $('<p>').addClass('footerText').addClass('timeago').text(jQuery.timeago(createdTime)).prependTo($footer);
  $footer.append($fontAwsomeIcons);
  $footer.appendTo($div);
  $div.addClass(tweet.user.name);
  $div.addClass('tweetBox');
  return $div;

};



const renderTweets = tweets => {
    for (const tweet of tweets) {
      $('.tweetContainer').prepend(createTweetElement(tweet));
      console.log(tweet); 
    };
  }
  //initial tweets
const loadTweets = () => {
    $.get('/tweets')
      .then(data => {
        renderTweets([data[data.length - 1]]);
      });
  };
$(document).ready(() => {
  
//create the error box
const $errorBox = $('<p>').addClass('error').text("!!!Empty tweet!!!");
const $errorBox2 = $('<p>').addClass('error').text('!!!Tweet is too long!!!');
//hide the errorBox
$errorBox.prependTo($('.container')).hide();
$errorBox2.prependTo($('.container')).hide();
  


 $( "form" ).on( "submit", function( event ) {
  event.preventDefault();
  
//empty input error
if ($('textarea').val().length === 0) {
  $errorBox.slideDown();      //open the errorBox
  $errorBox2.hide();          //close the potential other errorBox

  //inputs are too long
} else if ($('textarea').val().length > 140) {
  $errorBox2.slideDown();      //open the errorBox
  $errorBox.hide();            //close the potential other errorBox
} else {


  $errorBox.slideUp();
  $errorBox2.slideUp();

  $.post('/tweets', $( this ).serialize())
  .then(()=> {
    $('.counter').text('140');    //clear the counter
    $('textarea').val("");  
    loadTweets();
  })
  .fail(error => console.log(error));
}
});

$.get('/tweets')
.then((data) => {
  renderTweets(data);
  $('textarea').focus();
});


// toggle effects in create new tweeets on top right corner
$('.write').click(() => {
  $('.new-tweet').toggle("slow", () => {
    $('textarea').focus();
  });
});

//hide the compose tweet box on load in
$('.new-tweet').hide();


});
