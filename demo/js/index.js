window.onload=function(){		
	var _dashoffset = document.querySelector(".dashoffset");
	//console.log(_dashoffset.getAttribute("stroke-dashoffset"))
	var timer = null;
	
	window.addEventListener("keydown",function(e){
		if(e.keyCode === 16){
			timer = timer?timer:setInterval(()=>{ var strokeDashoffset = _dashoffset.getAttribute("stroke-dashoffset");/*console.log(strokeDashoffset);*/ _dashoffset.setAttribute("stroke-dashoffset",1+ Number(strokeDashoffset))},1000/30)
		}else{

			clearInterval(timer);
			timer = null;
		}
	})
	
	//var timer = setInterval(()=>{ var strokeDashoffset = _dashoffset.getAttribute("stroke-dashoffset");console.log(strokeDashoffset); _dashoffset.setAttribute("stroke-dashoffset",1+ Number(strokeDashoffset))},100)
	~(function contextMenuDefault(){
		var audioControls = document.querySelector(".audio_mp3");
		audioControls.addEventListener("contextmenu",function(e){
			  e.preventDefault();
		})
	})()
	
	~(function(){
		 var audioFrontCover = document.querySelector(".audio-frontCover div");
		 var audioControls = document.querySelector(".audio_mp3");
		 var dataUrl = audioControls.getAttribute("data-url");
		 var dataType = audioControls.getAttribute("data-type");
		 setTimeout(()=>{audioControls.setAttribute("src",dataUrl +dataType )},2000)
		 //console.log(audioControls.children);
		 var sources = audioControls.children;
		Array.from(sources).forEach((v,k)=>{
			sources[k].setAttribute('src',sources[k].getAttribute('data-src'))
		})

		function calculateNowWidth(){
			var audioTimeNow = document.querySelector(".audio-time-now");
			var audioControls = document.querySelector(".audio_mp3");
			var num = (audioControls.currentTime/audioControls.duration).toFixed(4)*100
			var percent = num+"%";
			audioTimeNow.style.width = percent;
		}

		function audioPlay(){audioControls.play();window.removeEventListener("click",audioPlay)};
		window.addEventListener("click",audioPlay);

		var timer = null;
		var timerOfCalculateNowWidth = null;
		var initialAngle;
		function rotate(){
			var str = audioFrontCover.style.transform.match(/[0-9]+/);
			
			initialAngle = str === null ? 0 : str[0] * 1;
			//console.log(initialAngle,str[0])
			if(timer && timerOfCalculateNowWidth){
				clearInterval(timer);
				clearInterval(timerOfCalculateNowWidth);
			}
			timer = setInterval(()=>{
				initialAngle = initialAngle>=360 ? 0 : initialAngle;
				audioFrontCover.style.transform = `rotate(${initialAngle+=1}deg)`
			},100)
			timerOfCalculateNowWidth = setInterval(calculateNowWidth,100)
		}
		audioControls.addEventListener("playing",rotate);
		audioControls.addEventListener("pause",()=>{
			clearInterval(timer);
			clearInterval(timerOfCalculateNowWidth);
		})
		
	})()
}
