window.onload = function stopwatch(){

	document.body.appendChild(document.createElement("div"));
	document.body.lastElementChild.setAttribute('class', 'stopwatchContainer');

	document.querySelector('.stopwatchContainer').appendChild(document.createElement('div'));
	document.querySelector('.stopwatchContainer').firstElementChild.setAttribute('class', 'stopwatchBlock');

	document.querySelector('.stopwatchBlock').appendChild(document.createElement('div'));
	document.querySelector('.stopwatchBlock').firstElementChild.setAttribute('class', 'stopwatch');

	document.querySelector('.stopwatchBlock').appendChild(document.createElement('div'));
	document.querySelector('.stopwatchBlock').lastElementChild.setAttribute('class', 'stopwatchButtonsBlock');

	document.querySelector('.stopwatch').appendChild(document.createElement('input'));
	document.querySelector('.stopwatch').firstElementChild.setAttribute('class', 'time');
	document.querySelector('.stopwatch').firstElementChild.setAttribute('id', 'time');
	document.querySelector('.stopwatch').firstElementChild.setAttribute('readonly', 'readonly');
	document.querySelector('.stopwatch').firstElementChild.value = '00:00:00';

	document.querySelector('.stopwatchButtonsBlock').appendChild(document.createElement('button'));
	document.querySelector('.stopwatchButtonsBlock').firstElementChild.setAttribute('class', 'buttons');
	document.querySelector('.stopwatchButtonsBlock').firstElementChild.setAttribute('id', 'start');
	document.querySelector('#start').innerText = "Start";
	document.querySelector('#start').hidden = false;

	document.querySelector('.stopwatchButtonsBlock').appendChild(document.createElement('button'));
	document.querySelector('.stopwatchButtonsBlock').lastElementChild.setAttribute('class', 'buttons')
	document.querySelector('.stopwatchButtonsBlock').lastElementChild.setAttribute('id', 'stop');
	document.querySelector('#stop').innerText = "Stop";
	document.querySelector('#stop').hidden = true;

	document.querySelector('.stopwatchButtonsBlock').appendChild(document.createElement('button'));
	document.querySelector('.stopwatchButtonsBlock').lastChild.setAttribute('class', 'buttons')
	document.querySelector('.stopwatchButtonsBlock').lastChild.setAttribute('id', 'reset');
	document.querySelector('#reset').innerText = "Reset";
	document.querySelector('#reset').hidden = true;

	document.querySelector('#start').addEventListener('click', start);
	document.querySelector('#stop').addEventListener('click', stop);
	document.querySelector('#reset').addEventListener('click', reset);
	window.addEventListener('dblclick', pasueOrContinue);

	// document.body.appendChild(document.createElement("h1"));
	// document.body.lastElementChild.setAttribute('class', 'title');
	// document.querySelector('.title').innerText = 'Stopwatch';

	document.body.onmousedown = document.body.onselectstart = function(){
  		return false;
	};

	let hours = 0;
	let minutes = 0;
	let seconds = 0;

	let hoursStr = '00';
	let minutesStr = '00';
	let secondsStr = '00';

	let dbClickCounter = 0;
	let dbClick;
	
function timer(){

	seconds += +1;

	if(seconds === 60){
		minutes += 1;
		seconds = 0;
	}
	if(minutes === 60){
		hours += 1;
		minutes = 0;
	}

	if(seconds < 10) secondsStr = "0" + seconds;
	else secondsStr = seconds;
	if(minutes < 10) minutesStr = "0" + minutes;
	else minutesStr = minutes;
	if(hours < 10) hoursStr = "0" + hours;
	else hoursStr = hours;

		document.querySelector('#time').value = hoursStr + ":" + minutesStr + ":" + secondsStr;
	}

let stopwatchInterval;

function start() {
	console.log('start');

	document.querySelector('.stopwatch').firstElementChild.value = '00:00:00';

	stopwatchInterval = setInterval(timer, 1000); 

	document.querySelector('#start').hidden = true;
	document.querySelector('#stop').hidden = false;
	document.querySelector('#reset').hidden = false;
}

function stop() {
	console.log('stop');

	clearTimeout(stopwatchInterval);

	hours = 0;
	minutes = 0;
	seconds = 0;

	hoursStr = '00';
	minutesStr = '00';
	secondsStr = '00';

	document.querySelector('#start').hidden = false;
	document.querySelector('#stop').hidden = true;
	document.querySelector('#reset').hidden = true;

	pauseRemover();
}

function reset() {
	console.log('reset');

	dbClickCounter = 0;
		
	document.querySelector('.stopwatch').firstElementChild.value = '00:00:00';

	hours = 0;
	minutes = 0;
	seconds = 0;

	hoursStr = '00';
	minutesStr = '00';
	secondsStr = '00';

	clearTimeout(stopwatchInterval);
	pauseRemover();

	stopwatchInterval = setInterval(timer, 1000); 
}
	
function pasueOrContinue(){
	dbClick = (dbClickCounter % 2);
	if(dbClick == 0 && document.querySelector('.buttons').hidden == true){ 
		pause();
	}
	else if (dbClick == 1 && document.querySelector('.buttons').hidden == true){
		continueFunction();
	} 
	dbClickCounter += 1;
}

function pause(){
	console.log(dbClickCounter);
	clearTimeout(stopwatchInterval);
	document.querySelector('#time').classList.replace("time", "timePause");
}

function continueFunction(){
	console.log(dbClickCounter);
	stopwatchInterval = setInterval(timer, 1000); 
	document.querySelector('#time').classList.replace("timePause", "time");
	}
}

function pauseRemover(){
	if (document.querySelector('#time').classList.value === "timePause") {
		document.querySelector('#time').classList.replace("timePause", "time");
	}
}