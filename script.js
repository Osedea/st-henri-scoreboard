var equipeA = null;
var equipeB = null;

var penalties = [];

var pointA = 0; //Pointage pour les equipe
var pointB = 0;

var minPeriode = 15;
var secPeriode = 0;
var periode = 0;

var gameTimerId = null;



var timer1 = {
  "element": $("#timer"),
  "sec": 0,
  "min": 0,
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


function checkIfPenaltiesOver() {
  var penalty = null;
  for(var penaltyIndex in penalties) {
    penalty = penalties[penaltyIndex];
    if(penalty.min === 0 && penalty.sec === 0) {
      stopTimer(penalty);
      penalty.element.remove();
      penalty = undefined;
    }
  }
}

setInterval(function(){
  checkIfPenaltiesOver();
}, 1000);

function addPenalty() {

  var penalty = {
    "element": $("<div></div>"),
    "sec": 0,
    "min": 0,
    "intervalKey": null
  };
  
  $(".penalties").append(penalty.element);
  
  resetTimer(penalty);
  startTimer(penalty);
  
  penalties.push(penalty);
}

function startTimer(timer) {
  timer.intervalKey = setInterval(function () {
      if (timer.sec === 0) {
        if (timer.min === 0) {
          stopTimer(timer);
        } else {
          timer.sec = 59;
          timer.min--;
        }
      } else {
      	timer.sec--;
    	}
    timer.element.html(timer.min + ":" + timer.sec);
  }, 1000);
}

function resetTimer(timer) {
  timer.min = 15;
  timer.sec = 0;
  stopTimer(timer);
  timer.element.html(timer.min + ":" + timer.sec);
};

function stopTimer(timer) {
	clearInterval(timer.intervalKey);
}


function changePeriode(){
  
}







  

function startGame() {
  console.log("start game");
  gameTimerId = startTimer(minPeriode, secPeriode);
}

function pauseGame() {
  console.log("pause game");
  clearInterval(gameTimerId);
}

function clearGame() {
  console.log("Clear game");
  pointA = 0; //Pointage pour les equipe
  pointB = 0;
  
	stopTimer(gameTimerId);
  
  var node = $("#timer");
  	node.html("Compteur a zero")
  
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
  startTimer(penalty.minute, penalty.seconde);
  penalties.push(penalty);
}