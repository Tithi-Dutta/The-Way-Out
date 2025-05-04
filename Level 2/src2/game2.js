import TileMap from "./tilemap2.js";

var score = 0;
export {score};
import { score2 } from "./Player2.js";
var timer = 0;
var timer2 = 0;


const tileSize = 28;
const velocity = 2;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const player = tileMap.getPlayer(velocity);
const enemies = tileMap.getEnemies(velocity);





let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio("sounds2/gameover.mp3");
const gameWinSound = new Audio("sounds2/gamewin.mp3");


function gameLoop()
{
    
    tileMap.draw(ctx);
    drawGameEnd();
    player.draw(ctx, pause());
    enemies.forEach((enemy) => enemy.draw(ctx,pause()));
    checkGameOver();
    checkGameWin();
}

function checkGameOver()//checking game over
{
    if(!gameOver){
        gameOver = isGameOver();
       if(gameOver){
               gameOverSound.play();

               timer2 = (1/timer);
               max = coinc2 + timer2;
               

             console.log("coin count = ",coinc2);
             console.log("Time = ",timer2);
             console.log("Present Score = ",(timer2+coinc2));
             console.log("Best Score = ",max);
        }
    }
}

function checkGameWin()
{
    if(!gameWin)
    {
        gameWin=isGameWin();
        if(gameWin)
        {
            gameWinSound.play();
        }
    }
}

function isGameWin()
{
    if(player.flagbox==true && tileMap.flagkey==true)
        return true;
}

function isGameOver()
{
    if(player.flagfire==true || enemies.some(enemy => enemy.collideWith(player)))
        return true;
    if(player.flagbox==true && tileMap.flagkey==false)
        return true;
}



function pause()
{

    return !player.madeFirstMove || gameOver || gameWin;
}
var seconds = 0;
function drawGameEnd()
{
    if(gameOver || gameWin)
    {
        let text = "";
        if(gameOver)
        {
            text="                Game Over!";
            setInterval(displayseconds,1000);
            setTimeout(redirect,2000);
        } 
        else
        {
            text = "                You Win!!";
            setInterval(displayseconds,1000);
            setTimeout(redirectW,2000);
        }
          ctx.fillStyle="black";
          ctx.fillRect(0,canvas.height/5,canvas.clientWidth,100);

          ctx.font="80px comic sans";
          const gradient= ctx.createLinearGradient(0,0,canvas.clientWidth,0);
          gradient.addColorStop('0.4',"green");
          gradient.addColorStop('0.5',"red");
          gradient.addColorStop('0.4',"green");
          

          ctx.fillStyle=gradient;
          ctx.fillText(text, 10,canvas.height/3.2);
          console.log(score2);
    }
}

function displayseconds()
{
    seconds+=1;
}
function redirect()
{
    window.location.href="gameover.html";
}
function redirectW()
{
    window.location.href="gamewin.html";
}
tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000/75);