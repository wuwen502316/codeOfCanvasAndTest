// window.onload = function() {
// 	var clocks = document.getElementsByClassName("clock")
// 	var ctx = []
// 	var timestr = ""
// 	var particleArray = []
// 	var colors = ["#1e90ff", "#1e90ff", "#2ed573", "#2ed573", "#ffa502", "#ffa502"]
// 	var fonts = []
// 	var m = Math.pow(10, -3); /*精度*/
// 	var countOk = []; /*粒子已经到达目标位置的*/
// 	var countfalse = []; /*粒子未到达最终位置时,省去的执行次数*/
// 	var countAll = []; /*粒子执行的总次数*/
// 	function init() {
// 		/*初始化，获取40px下字体为Arial时数字的宽度计算横纵轴粒子的行列数*/
// 		for (var i = 0; i < clocks.length; i++) {
// 			clocks[i].width = 250
// 			clocks[i].height = 400
// 			ctx[i] = clocks[i].getContext("2d")
// 			ctx[i].fillStyle = colors[i]
// 			particleArray.push([])
// 		}
// 		var width = ctx[0].measureText(i).width | 0;
// 		for (var i = 0; i < 10; i++) {
// 			ctx[0].font = "40px Arial"
// 			var width = ctx[0].measureText(i).width | 0;
// 			ctx[0].fillText(i, 0, 40)
// 			var data = ctx[0].getImageData(0, 0, width, 40).data;
// 			var len = data.length
// 			var tdata = []
// 			for (var j = 0; j < len / 4; j++) {
// 				if (data[j * 4 + 3] != 0) {
// 					/*rgba中的a!= 0 非空白处即字体部分*/
// 					var x = j % width | 0
// 					var y = j / width | 0
// 					tdata.push([x, y])
// 				}
// 			}
// 			fonts.push(tdata);
// 			ctx[0].clearRect(0, 0, 40, 40)
// 		}
// 	}

// 	function timestring() {
// 		/*处理时间返回hh-mm--ss格式*/
// 		var d = new Date()
// 		return ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2) + ("0" + d.getSeconds()).slice(-2)
// 	}
// 	init();
// 	window.fonts = fonts;
// 	console.log(fonts)
// 	class particle {
// 		constructor(x, y) {
// 			/*这里的加减数字改变的时初始位置粒子的位置。*/
// 			this.x = Math.random() * 25 - 2.5 /*单个粒子的初始位置X*/
// 			this.y = Math.random() * 40 + 5 /*单个粒子的初始位置Y*/
// 			this.ex = x /*单个粒子的终点X轴坐标*/
// 			this.ey = y /*单个粒子的终点Y轴坐标*/
// 		}
// 		update() {
// 			/*单个数字更新快慢*/
// 			let t = 5
// 			this.x -= (this.x - this.ex) / t
// 			this.y -= (this.y - this.ey) / t;
// 		}
// 		draw(i) {
// 			/*更新每帧粒子位置*/
// 			ctx[i].fillStyle = colors[i]
// 			ctx[i].beginPath()
// 			ctx[i].arc(this.x * 10 + 25, this.y * 10 - 50, 2, 0, Math.PI * 2, 0); /*+25向右，-50向上为整体移动的距离*/
// 			ctx[i].fill()
// 		}
// 	}

// 	function change(ind, pi) {
// 		/*控制粒子的密度比如0变化成1,需要的粒子数不同,要及时去除*/
// 		var newcount = fonts[ind].length - particleArray[pi].length;
// 		if (newcount >= 0) {
// 			/*如果从前一个变化成现在的数字所需的粒子数变多*/
// 			for (var i = 0; i < newcount; i++) {
// 				particleArray[pi].push(new particle())
// 			}
// 		}
// 		if (newcount < 0) {
// 			/*如果从前一个变化成现在的数字所需的粒子数变少*/
// 			particleArray[pi].splice(0, -newcount)
// 		}
// 		for (var i = 0; i < fonts[ind].length; i++) {
// 			particleArray[pi][i].ex = fonts[ind][i][0]
// 			particleArray[pi][i].ey = fonts[ind][i][1]
// 		}
// 		particleArray[pi].sort(function(a, b) {
// 			return Math.random() - 0.5
// 		}) /*通过改变数组排序(>0大到小;<0小到大)，影响单个粒子运动的方向直观体现为粒子整体的方向性，从而达到整体的整个变化过程的无序性*/
// 	}

// 	function draw() {
// 		var timer = timestring()
// 		for (var i = 0; i < timer.length; i++) {
// 			/*更改第i个字符*/
// 			if (timer.charAt(i) != timestr.charAt(i)) {
// 				change(timer.charAt(i), i);
// 			}
// 		}
// 		timestr = timer /*更新事件字符串*/
// 		for (var i = 0; i < clocks.length; i++) {
// 			ctx[i].fillStyle = "rgba(0,0,0,0.1)"
// 			ctx[i].fillRect(0, 0, 250, 400)
// 			//ctx[i].clearRect(0, 0, 250, 400)
// 			for (var j = 0; j < particleArray[i].length; j++) {
// 				var p = particleArray[i][j];
// 				const xx = Math.abs(p.x - p.ex) >= m;
// 				const yy = Math.abs(p.y - p.ey) >= m;
// 				if (xx || yy) {
// 					/*判断单个粒子(x,y两个方向轴)是否已经到达最终位置，若有一个轴的精度小于设定值就会继续执行update。没有该判断会一直执行update*/
// 					p.update();
// 				} else {
// 					countOk.push(p);
// 				}
// 				countAll.push(this)
// 				p.draw(i)
// 			}
// 		}
// 	}
// 	var timer = setInterval(draw, 1000 / 30);
// 	var t = 5 //秒
// 	//setTimeout(function(){clearInterval(timer);console.log(`${t}s内执行的总次数${countAll.length}，其中${t}s内省去执行部分代码的次数${countOk.length},占比为${(countOk.length/countAll.length*100).toFixed(2)}%`)},t*1000)

// 	setTimeout(function() {
// 		alert(`${t}s内执行的总次数${countAll.length}，其中${t}s内省去执行部分代码的次数${countOk.length},占比为${(countOk.length/countAll.length*100).toFixed(2)}%`)
// 	}, t * 1000)






// }
const body = document.querySelector("body");
const width = body.offsetWidth;
const height = body.offsetHeight;
const input = document.querySelector("input[name='word']");
const myCanvas = document.getElementById("myCanvas");
const myCtx = myCanvas.getContext("2d");
myCanvas.width = width;
myCanvas.height = height;

const color = ["black", "white"];
input.focus();
input.addEventListener("change", (e) => {
	new GetParticlePosition(e.target.value, myCanvas)
})

function setStyle(dom, styleArr) {
	for (let attr in styleArr) {
		dom.style[attr] = styleArr[attr]
	}
}

class SetPosition {
	constructor(arg) {
		this.px //最终位置x轴
		this.py //最终位置y轴
		this.ox //初始坐标x
		this.oy //初始坐标y
	}

}

class GetParticlePosition {
	constructor(text, canvas) {
		this.canvas = canvas;
		this.positionArr = [];
		this.data = [];
		this.fontSize = 16;
		this.text = text;
		this.fontWidth = 0;
		this.fontHeight = 0;
		this.baselines = ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom'];
		this.init();
	}
	init() {
		const canvasDom = document.createElement('canvas');
		canvasDom.width = width;
		canvasDom.height = height;
		const styleArr = {
			'zIndex': -99,
			'position': 'absolute',
			'top': 0
		}
		setStyle(canvasDom, styleArr)
		const pcanvas = document.getElementById('pcanvas');
		pcanvas.appendChild(canvasDom);
		const canvas = document.querySelector('#pcanvas canvas');
		const ctx = canvas.getContext('2d');
		ctx.font = `${this.fontSize}px Arial`;
		ctx.textBaseline = this.baselines[4];
		// ctx.fillStyle = '#ffffff';
		// ctx.clearRect(0, 0, width, height);
		const ctxMeasureText = ctx.measureText(this.text)
		this.fontWidth = ctxMeasureText.width | 0;
		this.fontHeight = ctxMeasureText.fontBoundingBoxAscent + ctxMeasureText.fontBoundingBoxDescent
		ctx.fillText(this.text, 0, this.fontHeight);
		this.data = ctx.getImageData(0, 0, this.fontWidth, this.fontHeight).data;
		// ctx.clearRect(0, 0, width, height);
		document.querySelector('#pcanvas').removeChild(canvas)
		this.ParticlePositon();
	}
	ParticlePositon(){
		const fontWidth = this.fontWidth;
		const data = this.data;
		const len = data.length / 4;
		let i = 0;
		let arr = [];
		while (i < len) {
			const k = i % fontWidth | 0;
			const j = i / fontWidth | 0;
			const val = 4 * i + 3;
			if (k == 0) {
				let obj = [];
				arr.push(obj);
			}
			if (data[val] == 0) {
				arr[j][k] = 0
			} else {
				arr[j][k] = 1
			}
			i++
		}
		this.positioArr = arr;
		this.data = [];
		this.computeFontSize();
		this.draw();
	}
	computeFontSize(){
		console.log(width,height, this.fontWidth)
	}
	draw() {
		const ctx = this.canvas.getContext("2d");
		ctx.fillStyle = 'red';
		console.log(this.positioArr)
	}


}

class UpdatePosition {
	constructor(arg) {

	}
}

function draw(px, py, r, colorType = 0) {
	ctx.beginPath();
	ctx.moveTo(px, py);
	ctx.fillStyle = color[colorType];
	ctx.arc(px, py, r, 0, Math.PI * 2, 1);
	ctx.fill();
}

function initData(str) {
	const r = 2;
	const whiteWidth = 8;
	const lens = arr.length;
	ctx.clearRect(0, 0, width, height);
	arr.map((val_h, ind_h) => { //ind_h*40当前行的第一个
		val_h.map((val_v, ind_v) => { //ind_v当前行的第ind_v个
			if (val_v) {
				draw((ind_v + r) * whiteWidth, (ind_h + r) * whiteWidth, r, val_v)
			} else {
				draw((ind_v + r) * whiteWidth, (ind_h + r) * whiteWidth, r, val_v)
			}
		})
	})
}
