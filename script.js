var equipeA = null;
var equipeB = null;

var penalties = [];

var pointA = 0; //Pointage pour les equipe
var pointB = 0;

var minPeriode = 15;
var secPeriode = 0;
var periode = 0;

var gameTimerId = false;

var penaltyNumber = 1;



var timer1 = {
  "element": $("#timer"),
  "sec": 0,
  "min": 15,
  "intervalKey": null
};
var timer2 = {
  "element": $("#timer2"),
  "sec": 0,
  "min": 0,
  "intervalKey": null
};

function stopPenalties(){
  for(var penaltyIndex in penalties) {
    stopTimer(penalties[penaltyIndex]);
  }
}

// function startPenalties(){
//   for(var penaltyIndex in penalties) {
//     startTimer(penalties[penaltyIndex]);
//   }
// }

function startPenalties(){
  for(var penaltyIndex in penalties) {
    startTimer(penalties[penaltyIndex], "#penalty-" + penalties[penaltyIndex].element.attr("data-index"));
  }
}

function removePenalty(penaltyIndex){
  console.log('in in ');
  penalty = penalties[penaltyIndex];

  stopTimer(penalty);
  $('#penalty-index-' + penaltyIndex).remove();
  penalty = undefined;

}


function checkIfPenaltiesOver() {
  var penalty = null;
  for(var penaltyIndex in penalties) {
    penalty = penalties[penaltyIndex];
    if(penalty.min === 0 && penalty.sec === 0) {
      stopTimer(penalty);
      $('#penalty-index-' + penaltyIndex).remove();
      penalty = undefined;
    }
  }
}

setInterval(function(){
  checkIfPenaltiesOver();
}, 1000);

function addPenalty(team) {

  var min = 2;
  var teamName = '';

  if (team == 'home') {
    if ($('#home-penalty-minutes').val()) {
      console.log($('#home-penalty-minutes').val());
      min = $('#home-penalty-minutes').val();
    }
    else {
      return;
    }

    teamName = $("#home-team-input").val() ? $("#home-team-input").val() : "Home";
  }
  else if (team == 'visitor') {
    if ($('#visitor-penalty-minutes').val()) {
      console.log($('#visitor-penalty-minutes').val());
      min = $('#visitor-penalty-minutes').val();
    }
    else {
      return;
    }

    teamName = $("#visitor-team-input").val() ? $("#visitor-team-input").val() : "Visitor";
  }


  var penalty = {
    "element" : $('<div data-index="'+penalties.length+'" id="penalty-index-' + penalties.length + '" class="penalty penaltyText flex left "><h2>' + teamName + '</h2><div class="timepenalty" onClick="removePenalty(' + penalties.length + ')"><h2 id="penalty-' + penalties.length + '"></h2></div></div>'),
    "sec": 0,
    "min": min,
    "intervalKey": null
  };

  if (team == 'home') {
    $(".penalties").append(penalty.element);
  }
  else if (team == 'visitor') {
    $(".penalties").append(penalty.element);
  }

  if(typeof min === "undefined"){
    resetTimer(penalty);
  }


  // startTimer(penalty, '#penalty-' + penalties.length);
  $("#penalty-"+penalties.length).html(formatTime(penalty.min, 0));

  penalties.push(penalty);
}

function startTimer(timer, idHtml) {
  console.log("start timer");

  var secString = "";
  timer.intervalKey = setInterval(function () {
      if (timer.sec == 0) {
        if (timer.min == 0) {
          stopTimer(timer);
        } else {
          timer.sec = 59;
          timer.min--;
        }
      } else {
        timer.sec--;
      }


    
    $(idHtml).html(formatTime(timer.min, timer.sec));
  }, 1000);
  return timer.intervalKey;
}

function resetTimer(timer) {
  timer.min = 15;
  timer.sec = 0;

  if ($('#period-minutes').val()) {
    timer.min = parseInt($('#period-minutes').val());
  }
  if ($('#period-seconds').val()) {
    timer.sec = parseInt($('#period-seconds').val());
  }

  stopTimer(timer);
  gameTimerId = false;


  $('#timerPeriod').html(formatTime(timer.min, timer.sec));
};

function stopTimer(timer) {
  clearInterval(timer.intervalKey);
}


function changePeriod(period) {
  stopTimer(timer1);
  stopPenalties();
    gameTimerId = false;
  resetTimer(timer1);

  $('#period').text(period);
}


function startGame() {
  if(! gameTimerId){
    console.log("start game");

    startPenalties();
    gameTimerId = startTimer(timer1, '#timerPeriod');
    console.log(gameTimerId);
  }
}

function pauseGame() {
  console.log("pause game");
  clearInterval(gameTimerId);
  gameTimerId= false;
  stopPenalties();
}

function clearGame() {
  console.log("Clear game");
  pointA = 0; //Pointage pour les equipe
  pointB = 0;

  stopTimer(gameTimerId);

  var node = $("#timer");
    node.html("Compteur a zero");

  minPeriode = 15;
  secPeriode = 0;
  periode = 1;

  equipeA = null;
  equipeB = null;

  gameTimerId = null;
  penatlties = [];

}

function ajusterPointage(pointage, ajustement) {
  if (pointage + ajustement >= 0) {
    return;
  }
  pointage = pointage + ajustement;
}

function ajusterPeriode(ajustement) {
  if (ajustement <= 0) {
    return;
  }
  periode = ajustement;
}

function ajusterEquipe(equipe, ajustement) {
  equipe = ajustement;
}

function ajouterPenalty(minute, seconde, equipe) {
  var penalty = {
    minute: minute,
    seconde: seconde,
    equipe: equipe
  };

  penalties.push(penalty);

}

function formatTime(min, sec) {
  var minString = String(min),
      secString = "";
  if(sec <= 9) {
      secString = "0" + sec;
    } else {
      secString = sec;
    }

  return minString + ":" + secString;
}

function changeName() {
  $( ".home-team" ).text( $("#home-team-input").val() );
  $( ".visitor-team" ).text( $("#visitor-team-input").val() );
}

function calculateScore(point, team) {
  if (team === "home") {
    var currentScore = $( "#home-score").text()
    $( "#home-score").text(parseInt(currentScore) + point);

    if(point <= 0){
      return 0;
    }

  }else {
    var currentScore = $( "#visitor-score").text()
    $( "#visitor-score").text(parseInt(currentScore) + point);

  }

}
