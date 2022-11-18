//var questions = [
//    {
//];
// I commented out the questions above because the code actually gets them from a separate script online. //

  //Runs once at the beginning
function setup() {
  var googleSheetLink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlKxJWYO46S_LUHvXOBXq-EF_YxGTeImm8QyAy6LK_-H9iZbXfmJ0R2RmhHs5rjQiWIbDSE1z6j_sn/pub?output=csv";
  trivia.loadGoogleSheet(googleSheetLink).then(displayWelcome);  
}

//Loops continously for background effects and animations. (p5.js)
function draw() {
  if (trivia.state == "welcome") background("yellow");
  else if (trivia.state == "question") background("lightblue");
  else if (trivia.state == "correct") background("green");
  else if (trivia.state == "incorrect") background("red");
  else if (trivia.state == "thankyou") background("orange");
}


function displayWelcome() {
  $(".screen").hide();
  $("#welcome-screen").show();
}

function displayQuestion() {
  $(".screen").hide();
  $("#question-screen").show();
  $("#correctAnswer").removeClass("highlight");
  $("#feedback").hide();
  trivia.insertQuestionInfo();
  trivia.shuffleAnswers();
  time = setInterval(myTimer, 1000);
}

function displayThankyou() {
  $(".screen").hide();
  $("#thankyou-screen").show();
  $("#game-results").html(`You got ${trivia.totalCorrect} of ${trivia.totalAnswered} correct.`);
}

function onClickedAnswer(isCorrect) {
    if (isCorrect) $("#feedback").html(`Correct!`).show();
      else $("#feedback").html(`Wrong/Incorrect.`).show();
    $("#correctAnswer").addClass("highlight"); //highlight right answer
  setTimeout(trivia.gotoNextQuestion, 3000); 
  //wait 3 secs...next question
}

function onClickedStart() {
  displayQuestion();
   
}

  var sec = 120; 
  
  function myTimer() {
      document.getElementById('timer').innerHTML = sec;
      sec--;
      if (sec == -1) {
          clearInterval(time);
          alert("Time out!! :(");
      }
  }

