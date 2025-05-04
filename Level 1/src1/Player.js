import MovingDirection from "./MovingDirection.js";
var coinc2 = 0;
var coinstore = 0;
export {coinstore };
import {  coinc } from "./game.js";
const ScoreElement=document.querySelector(".Score");
var timer = 0;
var timer1 = 0;
const TimeElement = document.querySelector(".Time");
export {timer};

let startTime = 0;
let elapsedTime = 0;
let timerInterval;

// const coin_collect = new Audio("sounds1/coin collection.mp3");
const coinSounds = Array.from({ length: 10 }, () => new Audio("sounds1/coin collection.mp3"));
let currentSoundIndex = 0;

export default class Player {
    constructor(x, y, tileSize, velocity, tileMap) {
      this.x = x;
      this.y = y;
      this.tileSize = tileSize;
      this.velocity = velocity;
      this.tileMap = tileMap;

      this.currentMovingDirection = null;
      this.requestedMovingDirection = null;

      this.playerAnimationTimerDefault = 14;
      this.playerAnimationTimer = null;

      document.addEventListener("keydown", this.#keydown);
      this.#loadPlayerImages();

      this.madeFirstMove = false;
    }  
    

     start() {
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(() => {
          elapsedTime = Date.now() - startTime;
          console.log(formatTime(elapsedTime));
      }, 10);
  }
  
  stop() {
      clearInterval(timerInterval);
  }
  
  reset() {
      clearInterval(timerInterval);
      elapsedTime = 0;
      return formatTime(elapsedTime);
  }
  
  formatTime(ms) {
      const pad = num => num.toString().padStart(2, '0');
      const hh = pad(Math.floor(ms / 3600000));
      const mm = pad(Math.floor((ms % 3600000) / 60000));
      const ss = pad(Math.floor((ms % 60000) / 1000));
      const mss = pad(Math.floor((ms % 1000) / 10));
      return `${hh}:${mm}:${ss}.${mss}`;
  }
    
    draw(ctx,pause) {
       if(!pause){
        timer1++;
        timer=this.formatTime(timer1);
        TimeElement.innerHTML=`Time: ${timer}`;
        this.#move();
        // this.#danimate();
        // this.#ranimate();
        // this.#uanimate();
        // this.#lanimate();
       }
       this.eatCoin(coinc);
       this.#eatKey();
        if(this.currentMovingDirection==null)
        {
          ctx.drawImage(this.dplayerImgs[0],
                this.x,
                this.y,
                this.tileSize,
                this.tileSize);
        }
        if(this.currentMovingDirection==MovingDirection.right)
        {
          
          this.#ranimate();
          
          ctx.drawImage(
            this.rplayerImgs[this.rplayerImgIndx],
            this.x,
            this.y,
            this.tileSize,
            this.tileSize
          );
        }
        else if(this.currentMovingDirection==MovingDirection.left)
        {
          this.#lanimate();
        
          ctx.drawImage(
            this.lplayerImgs[this.lplayerImgIndx],
            this.x,
            this.y,
            this.tileSize,
            this.tileSize
          );
        }
        else if(this.currentMovingDirection==MovingDirection.up)
        {
          
          this.#uanimate();
          
          ctx.drawImage(
            this.uplayerImgs[this.uplayerImgIndx],
            this.x,
            this.y,
            this.tileSize,
            this.tileSize
          );
        }

        if(this.currentMovingDirection==MovingDirection.down)
        {
          
          this.#danimate();
          
          ctx.drawImage(
            this.dplayerImgs[this.dplayerImgIndx],
            this.x,
            this.y,
            this.tileSize,
            this.tileSize
          );
         }
    }
    #loadPlayerImages() {
        const rplayerImg1 = new Image();
        rplayerImg1.src = "Assets1/right1.png";
    
        const rplayerImg2 = new Image();
        rplayerImg2.src = "Assets1/right2.png";
    
        const rplayerImg3 = new Image();
        rplayerImg3.src = "Assets1/right3.png";
    
        const rplayerImg4 = new Image();
        rplayerImg4.src = "Assets1/right4.png";
    
        this.rplayerImgs = [
          rplayerImg1,
          rplayerImg2,
          rplayerImg3,
          rplayerImg4,
        ];

        this.rplayerImgIndx = 0;

        //left

        const lplayerImg1 = new Image();
        lplayerImg1.src = "Assets1/left1.png";
    
        const lplayerImg2 = new Image();
        lplayerImg2.src = "Assets1/left2.png";
    
        const lplayerImg3 = new Image();
        lplayerImg3.src = "Assets1/left3.png";
    
        const lplayerImg4 = new Image();
        lplayerImg4.src = "Assets1/left4.png";
    
        this.lplayerImgs = [
          lplayerImg1,
          lplayerImg2,
          lplayerImg3,
          lplayerImg4,
        ];
    
        this.lplayerImgIndx = 0;
        //up

        const uplayerImg1 = new Image();
        uplayerImg1.src = "Assets1/up1.png";
    
        const uplayerImg2 = new Image();
        uplayerImg2.src = "Assets1/up2.png";
    
        const uplayerImg3 = new Image();
        uplayerImg3.src = "Assets1/up3.png";
    
        const uplayerImg4 = new Image();
        uplayerImg4.src = "Assets1/up4.png";
    
        this.uplayerImgs = [
          uplayerImg1,
          uplayerImg2,
          uplayerImg3,
          uplayerImg4,
        ];
    
        this.uplayerImgIndx = 0;

        //down

        const dplayerImg1 = new Image();
        dplayerImg1.src = "Assets1/down1.png";
    
        const dplayerImg2 = new Image();
        dplayerImg2.src = "Assets1/down2.png";
    
        const dplayerImg3 = new Image();
        dplayerImg3.src = "Assets1/down3.png";
    
        const dplayerImg4 = new Image();
        dplayerImg4.src = "Assets1/down4.png";
    
        this.dplayerImgs = [
          dplayerImg1,
          dplayerImg2,
          dplayerImg3,
          dplayerImg4,
        ];
    
        this.dplayerImgIndx = 0;

      }
    #keydown = (event) => {
        //up
        if (event.keyCode == 38) {
          if (this.currentMovingDirection == MovingDirection.down)
            this.currentMovingDirection = MovingDirection.up;
          this.requestedMovingDirection = MovingDirection.up;
          this.madeFirstMove = true;

        }
        //down
        if (event.keyCode == 40) {
          if (this.currentMovingDirection == MovingDirection.up)
            this.currentMovingDirection = MovingDirection.down;
          this.requestedMovingDirection = MovingDirection.down;
          this.madeFirstMove = true;
        }
        //left
        if (event.keyCode == 37) {
          if (this.currentMovingDirection == MovingDirection.right)
            this.currentMovingDirection = MovingDirection.left;
          this.requestedMovingDirection = MovingDirection.left;
          this.madeFirstMove = true;
        }
        //right
        if (event.keyCode == 39) {
          if (this.currentMovingDirection == MovingDirection.left)
            this.currentMovingDirection = MovingDirection.right;
          this.requestedMovingDirection = MovingDirection.right;
          this.madeFirstMove = true;
        }
      };
      flagfire=false;
      flagbox=false;
      #move() {
        if (this.currentMovingDirection !== this.requestedMovingDirection) {
          if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
            if (
              !this.tileMap.didCollideWithEnvironment(
                this.x,
                this.y,
                this.requestedMovingDirection
              ) 
            ) 
              this.currentMovingDirection = this.requestedMovingDirection;
          }
        }
    
        if (
            this.tileMap.didCollideWithEnvironment(
              this.x,
              this.y,
              this.currentMovingDirection
            ) 
          ) 
          {
            this.playerAnimationTimer=null;
            return;
          }
          else if(this.tileMap.didCollideWithFire(
            this.x,
            this.y,
            this.currentMovingDirection
          ))
          {
              this.flagfire=true;
              this.playerAnimationTimer=null;
              this.currentMovingDirection = -1;
              this.requestedMovingDirection=-1;
          }
          else if(this.tileMap.didCollideWithTreasure(
            this.x,
            this.y,
            this.currentMovingDirection
          ))
          {
            this.playerAnimationTimer=null;
              this.flagbox=true;
              this.currentMovingDirection = -1;
              this.requestedMovingDirection=-1;
          }
        else if(this.currentMovingDirection!=null && this.playerAnimationTimer==null)
        {
          this.playerAnimationTimer=this.playerAnimationTimerDefault;
        }
        switch (this.currentMovingDirection) {
          case MovingDirection.up:
            this.y -= this.velocity;
            break;
          case MovingDirection.down:
            this.y += this.velocity;
            break;
          case MovingDirection.left:
            this.x -= this.velocity;
            break;
          case MovingDirection.right:
            this.x += this.velocity;
            break;
        }
      }

    #ranimate()
    {
      if(this.playerAnimationTimer==null)
        return;
      this.playerAnimationTimer--;
      if(this.playerAnimationTimer==0){
        this.playerAnimationTimer=this.playerAnimationTimerDefault;
        this.rplayerImgIndx++;
        if(this.rplayerImgIndx==this.rplayerImgs.length)
          this.rplayerImgIndx=0;
      }
    }
    #lanimate()
    {
      if(this.playerAnimationTimer==null)
        return;
      this.playerAnimationTimer--;
      if(this.playerAnimationTimer==0){
        this.playerAnimationTimer=this.playerAnimationTimerDefault;
        this.lplayerImgIndx++;
        if(this.lplayerImgIndx==this.lplayerImgs.length)
          this.lplayerImgIndx=0;
      }
    }
    #uanimate()
    {
      if(this.playerAnimationTimer==null)
        return;
      this.playerAnimationTimer--;
      if(this.playerAnimationTimer==0){
        this.playerAnimationTimer=this.playerAnimationTimerDefault;
        this.uplayerImgIndx++;
        if(this.uplayerImgIndx==this.uplayerImgs.length)
          this.uplayerImgIndx=0;
      }
    }
    #danimate()
    {
      if(this.playerAnimationTimer==null)
        return;
      this.playerAnimationTimer--;
      if(this.playerAnimationTimer==0){
        this.playerAnimationTimer=this.playerAnimationTimerDefault;
        this.dplayerImgIndx++;
        if(this.dplayerImgIndx==this.dplayerImgs.length)
          this.dplayerImgIndx=0;
      }
    }
    eatCoin(coinc)
    {
      // setTimeout(() => {
      if(this.tileMap.eatCoin(this.x,this.y))
      {
        coinc++;
        coinSounds[currentSoundIndex].play();
        currentSoundIndex = (currentSoundIndex + 1) % coinSounds.length; 
        coinc2 = coinc2 + coinc;
        console.log(coinc2);
        ScoreElement.innerHTML=`Score: ${coinc2}`;
        coinstore=coinc2;
      }
    // }, index * 500); 
    }
    
    #eatKey()
    {
      if(this.tileMap.eatKey(this.x,this.y))
      {
        
      }
    }    
  }