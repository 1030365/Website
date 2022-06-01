$(document).ready(function() {
  /* Tutorial creators should edit the title, author, and list of lesson
     name values appropriately. */
  var title =  "Getting Down with Altair 8800 Assembly Programming";
  var author = "John Newell";
  var lessons = [
               "Declaring Variables",
               "The second lesson",
               "The third lesson",
               "The fourth lesson",
               "The fifth lesson",
               "The sixth lesson",
               "The seventh lesson",
               "The eigth lesson",
               "The last lesson"
               ];

  /* Don't touch anything below here unless you really know what you
     are doing! */
  $('title').text(title);
  $('header h1 a').text(title);
  $('p#author span').text(author);

  var digit = document.URL.substr(-6, 1);
  if (digit >= '0' && digit <= '9') {
    var changed = "s" + digit;
    var num = parseInt(digit);
    document.getElementById(changed).style.background = "#006";
    $('h1#title').text("Lesson " + digit + ": " + lessons[num - 1]);
    $('p#finished span').text(digit);
    if (num < 9) {
      var nlink = "lesson" + (num + 1) + ".html";
      $("a#next").attr('href', nlink);
    };
  } else if (digit == 'x') {
    for (var i = 1; i < 10; i++) {
      $('li#l' + i + ' span').text(lessons[i - 1]);
    };
  };
});
