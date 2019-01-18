var card = $("#quiz-area");
var countStartNumber = 30;

// Questions hard code with answers, image 
var questions = [{
  question: "Who has won the most 'Acting' Academy Awards?",
  answers: ["Ingrid Bergman", "Jack Nicholson", "Katharine Hepburn", "Meryl Streep"],
  correctAnswer: "Katharine Hepburn",
  image: "assets/images/Katharine Hepburn.gif",
  explain: "Katharine Hepburn has won 4 acting awards: Best Actress- Morning Glory (1933), Guess Who's Coming to Dinner? (1967), The Lion in Winter (1968), On Golden Pond (1981). Jack Nicholson, Ingrid Bergman, and Walter Brennan all have won 3 acting Academy Awards."
}, {
  question: "Who has won the most Academy Awards?",
  answers: ["Walt Disney", "Meryl Streep", "Jack Nicholson", "Katharine Hepburn"],
  correctAnswer: "Walt Disney",
  image: "assets/images/Walt Disney.gif",
  explain: "Walt Disney won the most Academy Awards, with 22 competitive and 4 honorary."
}, {
  question: "Which film series has won more than one Academy Award for Best Picture?",
  answers: ["James Bond", "Rocky", "The Lord of the Rings", "The Godfather"],
  correctAnswer: "The Godfather",
  image: "assets/images/The Godfather.gif",
  explain: "The Godfather series is the only film series to win more than one Best Picture award, for The Godfather (1972) and The Godfather: Part II (1974)."
}, {
  question: "Who hosted or co-hosted the Academy Awards 18 times during his career?",
  answers: ["Billy Crystal", "Bob Hope", "Johnny Carson", "Chris Rock"],
  correctAnswer: "Bob Hope",
  image: "assets/images/Bob Hope.gif",
  explain: "Bob Hope hosted the Academy Awards a record 19 times."

}, {
  question: "Which actor has the most Oscar nominations for his performances?",
  answers: ["Spencer Tracy", "Laurence Olivier", "Al Pacino", "Jack Nicholson"],
  correctAnswer: "Jack Nicholson",
  image: "assets/images/Jack Nicholson.gif",
  explain: "Jack Nicholson has been nominated 12 times for his performances."

}, {
  question: "Which of these films did not win a record 11 Oscars?",
  answers: ["Ben-Hur", "Titanic", "Lord of the Rings: The Return of the King", "West Side Story"],
  correctAnswer: "West Side Story",
  image: "assets/images/West Side Story.gif",
  explain: "Titanic (1997), Ben-Hur (1959), and The Lord of the Rings: The Return of the King (2003) all have won an Academy Awards high 11 Oscars."

}, {
  question: "What is the most recent film which the lead actor and actress both won Academy Awards?",
  answers: ["Shakespeare in Love", "The Silence of the Lambs", "American Beauty", "As Good as It Gets"],
  correctAnswer: "As Good as It Gets",
  image: "assets/images/As Good as It Gets.gif",
  explain: "Both Jack Nicholson and Helen Hunt won Oscars for As Good as It Gets (1997)."

}, {
  question: "Which film was the first to win Academy Awards for Best Picture, Best Director, Best Actor, Best Actress, and Best Screenplay?",
  answers: ["The Silence of the Lambs", "One Flew Over the Cuckoo's", "It Happened One Night", "Gone With the Wind"],
  correctAnswer: "It Happened One Night",
  image: "assets/images/It Happened One Night.gif",
  explain: "Frank Capra's influential romantic comedy It Happened One Night became the first film to perform a clean sweep of the top five categories; Best Picture, Best Director, Best Actor, Best Actress and Best Screenplay. This feat would later be duplicated by One Flew Over the Cuckoo's Nest in 1976 and The Silence of the Lambs in 1992."

}];

// Variable to hold set interval timer
var timer;

// Set Game Up

var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

//   set game timer to go off if reach '0' with out answer, log 'times up'

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("YOUR TIME FOR THIS QUESTION IS UP");
      game.timeUp();
    }
  },

//   load question with botton to highlight questions when hovered over

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

//   load next question

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

//   times up function - give answer, wait 10 seconds, move to next question

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append("<h3>The Correct Answer Was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");
    card.append("<h4>Answer: " + questions[this.currentQuestion].explain);


    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 10 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 10 * 1000);
    }
  },

//   show score at end of game: number correct/incorrect and unanswered  - show 'start over' button

  results: function() {

    clearInterval(timer);

    card.html("<h2>Congratulations! Well Done <br> Here's how you did:</h2>");

    $("#counter-number").text(game.counter);

    card.append("<h3>Correct Answers: " + game.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

//   clicked answer correct or incorrect?

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

//   if answered Incorrectly

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    card.html("<h2>Sorry, Wrong Answer</h2>");
    card.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");
    card.append("<h4>Answer: " + questions[this.currentQuestion].explain);

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 10 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 10 * 1000);
    }
  },

//    if answered correctly

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    card.html("<h2>Your Are Correct!</h2>");
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");
    card.append("<h4>As you know: " + questions[this.currentQuestion].explain);

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 10 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 10 * 1000);
    }
  },

//   Recset game to 0

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});
