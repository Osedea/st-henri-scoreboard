var equipeA = null;
var equipeB = null;
var pointA = 0; //Pointage pour les equipe
var pointB = 0;
var minPeriode = 15;
var secPeriode = 0;
var periode = 1;

var minPenalty = 2;
var secPenalty = 0;
var gameTimerId = null;

function startTimer (min, sec) {
	var interval = setInterval(function (){
		if(sec === 0){
			if(min === 0){
				stopTimer(interval);
			}else {
				sec=60;
			    min--;
			}
		}else{
			sec--;
		}	
	}, 1000);

	function stopTimer(id) {
		clearInterval(id);
	}

  	return interval;
}

function startGame() {
 	gameTimerId = startTimer(minPeriode, secPeriode);
 }

function pauseGame() {
	clearInterval(gameTimerId);
}

function clearGame() {
	pointA = 0; //Pointage pour les equipe
	pointB = 0;
	
	minPeriode = 15;
	secPeriode = 0;
	periode = 1;
	
	equipeA = null;
	equipeB = null;
	
	minPenalty = 2;
	secPenalty = 0;
	gameTimerId = null;
}

function ajusterPointage(pointage, ajustement) {
	if (pointage + ajustement >= 0) {
		return;
	}
	pointage = pointage + ajustement;
}

function ajusterPeriode(ajustement) {
	if(ajustement <= 0){
		return;
	}
	periode = ajustement;
}

function ajusterEquipe(equipe, ajustement) {
	equipe = ajustement;
}

