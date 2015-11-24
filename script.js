
var minPeriode = 15;
var secPeriode = 0;
var periode = 1;

var minPenalty = 2;
var secPenalty = 0;


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
};

	startTimer("Game Time:", minPeriode, secPeriode);
	startTimer("Penalty Time:", minPenalty, secPenalty);
	//Prochaine fois, remplacer focntion for par setInterval (lien:http://www.xul.fr/ecmascript/settimeout.php/)//


 
