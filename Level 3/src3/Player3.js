import MovingDirection from "./MovingDirection3.js";

var coinc2 = 0;
var timer = 0;
export {coinc2 };
import { coinc } from "./game3.js";
const ScoreElement=document.querySelector(".Score");
const TimeElement = document.querySelector(".Time");

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

    draw(ctx, pause) {
       if(!pause){
        timer++;
        TimeElement.innerHTML=`Time: ${timer}`;
        this.#move();
        this.#danimate();
        this.#ranimate();
        this.#uanimate();
        this.#lanimate();
        
       }
       this.eatgoodCoin(coinc);
       this.eatbadCoin(coinc);
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
        rplayerImg1.src = "Assets 3/right1.png";
    
        const rplayerImg2 = new Image();
        rplayerImg2.src = "Assets 3/right2.png";
    
        const rplayerImg3 = new Image();
        rplayerImg3.src = "Assets 3/right3.png";
    
        const rplayerImg4 = new Image();
        rplayerImg4.src = "Assets 3/right4.png";
    
        this.rplayerImgs = [
          rplayerImg1,
          rplayerImg2,
          rplayerImg3,
          rplayerImg4,
        ];

        this.rplayerImgIndx = 0;

        //left

        const lplayerImg1 = new Image();
        lplayerImg1.src = "Assets 3/left1.png";
    
        const lplayerImg2 = new Image();
        lplayerImg2.src = "Assets 3/left2.png";
    
        const lplayerImg3 = new Image();
        lplayerImg3.src = "Assets 3/left3.png";
    
        const lplayerImg4 = new Image();
        lplayerImg4.src = "Assets 3/left4.png";
    
        this.lplayerImgs = [
          lplayerImg1,
          lplayerImg2,
          lplayerImg3,
          lplayerImg4,
        ];
    
        this.lplayerImgIndx = 0;
        //up

        const uplayerImg1 = new Image();
        uplayerImg1.src = "Assets 3/up1.png";
    
        const uplayerImg2 = new Image();
        uplayerImg2.src = "Assets 3/up2.png";
    
        const uplayerImg3 = new Image();
        uplayerImg3.src = "Assets 3/up3.png";
    
        const uplayerImg4 = new Image();
        uplayerImg4.src = "Assets 3/up4.png";
    
        this.uplayerImgs = [
          uplayerImg1,
          uplayerImg2,
          uplayerImg3,
          uplayerImg4,
        ];
    
        this.uplayerImgIndx = 0;

        //down

        const dplayerImg1 = new Image();
        dplayerImg1.src = "Assets 3/down1.png";
    
        const dplayerImg2 = new Image();
        dplayerImg2.src = "Assets 3/down2.png";
    
        const dplayerImg3 = new Image();
        dplayerImg3.src = "Assets 3/down3.png";
    
        const dplayerImg4 = new Image();
        dplayerImg4.src = "Assets 3/down4.png";
    
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
        //  this.madeFirstMove =true;

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
    eatgoodCoin(coinc)
    {
      if(this.tileMap.eatgoodCoin(this.x,this.y))
      {
        coinc++;
        coinc2 = coinc2 + coinc;
        console.log(coinc2);
        ScoreElement.innerHTML=`Score: ${coinc2}`;
      }
     
    }
    eatbadCoin(coinc)
    {
      if(this.tileMap.eatbadCoin(this.x,this.y))
      {
        coinc--;
        coinc2 = coinc2 + coinc;
        console.log(coinc2);
        ScoreElement.innerHTML=`Score: ${coinc2}`;
      }
    }
    #eatKey()
    {
      if(this.tileMap.eatKey(this.x,this.y))
      {
        
      }
    }
  }