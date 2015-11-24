

var time = function() {

var sec = 0;
var min = 0;

function startTimer (min, sec) {
	setInterval(function (){
		if(sec === 0){
			if(min === 0){
				clearInterval(this);
			}else {
				sec=60;
			    min--;
			}
			
			
		}
		sec--;
		console.log(min, sec);	
	}, 1000);

}

	starTimer(min, sec);
	//Prochaine fois, remplacer focntion for par setInterval (lien:http://www.xul.fr/ecmascript/settimeout.php/)//

};


 
