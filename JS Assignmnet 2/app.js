$(window).on("load", function () {
    //set up time variables
    var counter;
    var time;
    //set up holders to track questions and answers
    var presentQuestion;
    var rightAnswer;
    var wrongAnswer;
    var notAnswered;
    var answered;
    var selection;
    //set up arrays
    var gameQuestions = [{
        question: 'When was XXXTENTACION released song Look At Me in 2017 recorded"?',/*1*/
        answerArray: ['2017', '2016', '2015', '2014'],
        answer: 2
    },
    {
        question: 'Which of these rappers thought they were too good for XXL?',//2
        answerArray: ['Trippie Redd', 'Asap Rocky', 'Kanye West','Nicki Minaj'],
        answer: 1
    },
    {
        question: 'Who was voted the peoples choice during 2017XXL?',//3
        answerArray: ['Ugly God', 'XXXTENTACION', 'PlayBoi Carti', 'PnP Rock'],
        answer: 1
    },
    {
        question: 'Which XXL year was the most popular?',//4
        answerArray: ['2016', '2018', '2017', '2015'],
        answer: 0
    },
    {
        question: 'Whos freestyle was the shortest during 2016 XXL?',//5
        answerArray: ['21 Savage', 'Kodak Black', 'Denzel Curry', 'LiL Uzi Vert'],
        answer: 1
    },
    ];

    var pictureArray = ['question1', 'question2', 'question3', 'question4', 'question5',];
    var messages = {
        correct: "Correct!",
        incorrect: "Nope!",
        endTime: "Out of time!",
        finished: "All done. Here's how you did:"
    }

    $('#resetBtn').hide();
    //hide start and start over buttons, empty div's to start game
    $('#startGameBtn').on('click', function () {
        $(this).hide();
        $('#resetBtn').hide();
        startingGame();
    });

    $('#resetBtn').on('click', function () {
        $(this).hide();
        startingGame();
    });

    function startingGame() {
        $('#finalMessage').empty();
        $('#rightAnswers').empty();
        $('#wrongAnswers').empty();
        $('#notAnswered').empty();
        presentQuestion = 0;
        rightAnswer = 0;
        wrongAnswer = 0;
        notAnswered = 0;
        nextQuestion();
    }

    //clears the previous question and sets up new question.  
    function nextQuestion() {
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#gif').empty();
        answered = true;


        $('.question').html('<h2>' + gameQuestions[presentQuestion].question + '</h2>');

        //append answer options on screen
        for (var i = 0; i < 4; i++) {
            var options = $('<div>');
            options.html('<p>' + gameQuestions[presentQuestion].answerArray[i] + '</p>');
            options.attr({ 'data-index': i });
            options.addClass('thisChoice');
            $('.answerArray').append(options);
        }
        countdown();
        //clicking an answer will pause the time and setup answer Page
        $('.thisChoice').on('click', function () {
            selection = $(this).data('index');
            clearInterval(time);
            promptAnswer();
        });
    }

    //define the countdown
    function countdown() {
        counter = 30;
        $('#timeLeft').html('<h3>Time Remaining: ' + counter + '</h3>');
        answered = true;
        //sets timer to one second intervals
        time = setInterval(showCountdown, 1000);
    }

    //show the countdown
    function showCountdown() {
        counter--;
        $('#timeLeft').html('<h3>Time Remaining: ' + counter + '</h3>');
        if (counter < 1) {
            clearInterval(time);
            answered = false;
            promptAnswer();
        }
    }

    //sets up the answer page once the question has been answered
    function promptAnswer() {
        $('#presentQuestion').empty();
        $('.thisChoice').empty();
        $('.question').empty();

        var rightText = gameQuestions[presentQuestion].answerArray[gameQuestions[presentQuestion].answer];
        var rightIdx = gameQuestions[presentQuestion].answer;//index to find the right answer in the above array
        $('#gif').html('<img href = "mbland@trilogyed.com">');
        //logic for questions to see what is right,wrong and not answered
        if ((selection == rightIdx) && (answered == true)) {
            rightAnswer++;
            $('#message').html(messages.correct);
        } else if ((selection != rightIdx) && (answered == true)) {
            wrongAnswer++;
            $('#message').html(messages.incorrect);
            $('#correctedAnswer').html('The correct answer is: ' + rightText);
        } else {
            notAnswered++;
            $('#message').html(messages.endTime);
            $('#correctedAnswer').html('The correct answer is: ' + rightText);
            answered = true;
        }


        //timer for answer screen
        if (presentQuestion == (gameQuestions.length - 1)) {
            setTimeout(score, 3800)
        } else {
            presentQuestion++;
            setTimeout(nextQuestion, 3800);
        }
    }
    //shows final scores page
    function score() {
        $('#timeLeft').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#gif').empty();

        $('#finalMessage').html(messages.finished);
        $('#rightAnswers').html("Correct Answers: " + rightAnswer);
        $('#wrongAnswers').html("Incorrect Answers: " + wrongAnswer);
        $('#notAnswered').html("Questions not Answered: " + notAnswered);
        $('#resetBtn').addClass('reset');
        $('#resetBtn').show();
        $('#resetBtn').html('Start Over?');
    }
})