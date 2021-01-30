///////////////////////////////////////////////////////base canvas part //////////// 
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = document.documentElement.clientWidth-10;
var height = canvas.height = document.documentElement.clientHeight-10;
ctx.fillStyle = 'rgba(0,0,0,1)'; //背景 黑
ctx.fillRect(0,0,width,height);

var score = 0;
var level = 1;
var speed = 1+ (Math.ceil(level/2)*0.5);

 //消除畫布
function clearall(){
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,width,height);
	word();
}

function word() {
    ctx.font = "30px sans-serif"; // 字型
    ctx.fillStyle = "#ffffff"; // 總分字體顏色
    ctx.fillText("Score: "+score, 50, 50); // 在座標 (50,50)繪字
	ctx.fillText("Level: "+level, width-190, 50);
}
///////////////////////////////////////////////////////base canvas part //////////// #

///////////////////////////////////////////////////////keyevent part //////////// 
//方向鍵操作
function keyFunction(x) {
	if(x==true){
		if (event.keyCode==37) {//左 綠
			for(j=0;j<10;j++){
				if(matchleft(j)){
					clearall();
					raf(false);
					drawball();}
			}
		} else if (event.keyCode==38) {//上 藍
			for(j=0;j<10;j++){
				if(matchup(j)){
					clearall();
					raf(false);
					drawball(); }
			}
		} else if (event.keyCode==39) {//右 紅
			for(j=0;j<10;j++){
				if(matchright(j)){
					clearall();
					raf(false);
					drawball();}
			}
		} else if (event.keyCode==40) {//下 黃
			for(j=0;j<10;j++){
				if(matchdown(j)){
					clearall();
					raf(false);
					drawball();}
				}
		}
	}
}
///////////////////////////////////////////////////////keyevent part //////////// #


///////////////////////////////////////////////////////ball part ////////////
//初始球
var balls = [];
//四方向鍵代表的球色
var dirs =['rgb(37,230,37)','rgb(37,37,230)','rgb(230,37,37)','rgb(230,230,37)']; 

function Ball(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
}

function ballinitial() {
	//創球
	for(j=0;j<balls.length;j++){	
		var bn=0;
		// 定義每次random產生球數
		var num = level+4;
		var initialy = Math.ceil( Math.random()*10 ) * ( (height-100) /10)+50;
		var initialx = Math.ceil(-(600+j*300));
		while(balls[j].length < num) {
			var dn = Math.floor(Math.random()*4);
			var ball = new Ball(initialx+bn*60,initialy, dirs[dn])
			balls[j].push(ball);
			bn++;
		}
	}
	drawball();
	word();
	document.onkeyup=function() {keyFunction(true)};
}


function drawball(){
	for(j=0;j<balls.length;j++){
	//畫球 
		for(i = 0; i < balls[j].length; i++) {
		balls[j][i].draw(); 
		drawarrow(j);
		balls[j][i].x += speed;
		}
	}
  	raf(true);
	failtest();

}

// 畫球
Ball.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, 30, 0, 2 * Math.PI);
	ctx.fill();
};
//畫球上箭頭
function drawarrow (j){
	var actx = canvas.getContext('2d');
    actx.beginPath();
	if(balls[j][i].color ==dirs[0]){ //左
		actx.moveTo(balls[j][i].x-5,balls[j][i].y);
		actx.lineTo(balls[j][i].x+5,balls[j][i].y-10);
		actx.lineTo(balls[j][i].x+5,balls[j][i].y+10); }
	if(balls[j][i].color ==dirs[1]){ //上
		actx.moveTo(balls[j][i].x-10,balls[j][i].y+5);
		actx.lineTo(balls[j][i].x+10,balls[j][i].y+5);
		actx.lineTo(balls[j][i].x,balls[j][i].y-5); }
	if(balls[j][i].color ==dirs[2]){ //右
		actx.moveTo(balls[j][i].x+5,balls[j][i].y);
		actx.lineTo(balls[j][i].x-5,balls[j][i].y+10);
		actx.lineTo(balls[j][i].x-5,balls[j][i].y-10); }
	if(balls[j][i].color ==dirs[3]){ //下
		actx.moveTo(balls[j][i].x+10,balls[j][i].y-5);
		actx.lineTo(balls[j][i].x-10,balls[j][i].y-5);
		actx.lineTo(balls[j][i].x,balls[j][i].y+5); }
    actx.fillStyle = '#000000';
	actx.fill();
}

function clear(){ //clear the ball array
	for(i=0; i<10; i++){
		balls[i]=[];
	}
}

function raf(x){   
	if(x==true){  //keep the animation
		raf1 = window.requestAnimationFrame(clearall);
		raf2 = window.requestAnimationFrame(drawball);
		raf3 = window.requestAnimationFrame(word);
	}
	if(x==false){   //to prevent several times calling raf (speed up too much)
		window.cancelAnimationFrame(raf1);
		window.cancelAnimationFrame(raf2);
	}
}

///////////////////////////////////////////////////////ball part //////////// #


///////////////////////////////////////////////////////buttom function part ////////////
document.getElementById('btnre').style.visibility = 'hidden';
function start(){ //start buttom
	document.getElementById('btn').style.visibility = 'hidden';
	clearall();
	var score = 0;
	clear();
	ballinitial();
	levelup();
}

function restart(){ //restart buttom
	document.getElementById('btnre').style.visibility = 'hidden';
	clearall();
	score = 0;
	level = 1;
	clear();
	ballinitial();
}
///////////////////////////////////////////////////////buttom function part //////////// #


///////////////////////////////////////////////////////match part ////////////
function matchleft(j){
	if(!emptytest(j)){
		var lastball = balls[j].pop();
		if(lastball.color == dirs[0]){
			score = score +10;
			word();
			clearall();
			raf(false);
			drawball(); return true;
		}
		else{ balls[j].push(lastball); return false;}
	}
	else{return false;}
}
function matchup(j){
	if(!emptytest(j)){
	var lastball= balls[j].pop();
	if(lastball.color == dirs[1]){
		score = score +10;
		word();
		clearall();
		raf(false);
		drawball(); return true;
	}
	else{ balls[j].push(lastball); return false;}
	}
	else{return false;}	
}
function matchright(j){
	if(!emptytest(j)){
	var lastball = balls[j].pop();
	if(lastball.color == dirs[2]){
		score = score +10;
		word();
		clearall();
		raf(false);
		drawball(); return true;
	}
	else{ balls[j].push(lastball); return false;}
	}
	else{return false;}
}
function matchdown(j){
	if(!emptytest(j)){
	var lastball = balls[j].pop();
	if(lastball.color == dirs[3]){
		score = score +10;
		word();
		clearall();
		raf(false);
		drawball(); return true;
	}
	else{ balls[j].push(lastball); return false;}
	}
	else{return false;}
}
///////////////////////////////////////////////////////match part //////////// #


///////////////////////////////////////////////////////test part ////////////
function emptytest(j){
	if(balls[j]==''){
		return true;
	}
	else{ return false;}
}

function levelup(){
	if(emptytest(9)){
		level +=1;
		clear();
		ballinitial();
	}
	
	var raf4 = window.requestAnimationFrame(levelup);
}

function failtest(){
	for(j=0;j<10;j++){
		if(!emptytest(j)){
			var near = balls[j][balls[j].length-1].x ;
			for(i=j;i<10-j;i++){
				if(balls[i][balls[i].length-1].x >= near ){
					near = balls[i][balls[i].length-1].x ;
				}
			}
			if(near >=width-30){
				fail();
				raf(false);
			}
		}
	}
}

function fail(){
	document.onkeyup=function() {keyFunction(false)};
	document.getElementById('btnre').style.visibility = 'visible';
	ctx.font = "100px sans-serif"; // 字型
    ctx.fillStyle = "#ffffff"; // 總分字體顏色
    ctx.fillText("You Lose!", width/2-200, 300); 
}

///////////////////////////////////////////////////////test part //////////// #