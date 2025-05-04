import MovingDirection from "./MovingDirection.js";

export default class Enemy 
{

    constructor(x,y,tileSize,velocity,tileMap)
    {
        this.x=x;
        this.y=y;
        this.tileSize = tileSize;
        this.velocity= velocity;
        this.tileMap=tileMap;


        this.#loadImages();

        this.movingDirection = Math.floor(
            Math.random() * Object.keys(MovingDirection).length
            );

         this.directionTimerDefault = this.#random(10,50);
         this.directionTimer = this.directionTimerDefault;
    }

    draw(ctx, pause)
    {
        if(!pause){
            this.#move();
            this.#changeDirection();
        }
        // this.#move();
         //this.#changeDirection();
          ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
         //this.#setImage(ctx, pacman);
    }

    collideWith(player){
        const size = this.tileSize / 2;
        if(
            this.x < player.x + size &&
            this.x + size >player.x && 
            this.y < player.y + size &&
            this.y + size > player.y
          ){
              return true;
          }
        else{
            return false;
        }  
    }



    #changeDirection(){
        this.directionTimer--;
        let newMoveDirection = null;
        if (this.directionTimer == 0){
            this.directionTimer = this.directionTimerDefault;
            newMoveDirection = Math.floor(
                Math.random() * Object.keys(MovingDirection).length
                );
        }

        if(newMoveDirection != null && this.movingDirection != newMoveDirection){
            if(
                Number.isInteger(this.x/this.tileSize) && 
                Number.isInteger(this.y/ this.tileSize)
                ){
                    if(
                        !this.tileMap.didCollideWithEnvironment(
                            this.x,
                            this.y,
                            newMoveDirection
                        )
                    ){
                        this.movingDirection = newMoveDirection;
                    }
                }
        }
    }

    #move(){
        if(
            !this.tileMap.didCollideWithEnvironment(
                this.x,
                this.y, 
                this.movingDirection
                )
           ) {
              switch(this.movingDirection){
                case MovingDirection.up:
                     this.y -=this.velocity;
                     break;
                case MovingDirection.down:
                    this.y +=this.velocity;
                    break;
                case MovingDirection.left:
                    this.x -=this.velocity;
                    break;
                 case MovingDirection.right:
                    this.x +=this.velocity;
                    break;

              }
        }
    }

    #random(min,max){
        return Math.floor(Math.random() * (max-min+1)) + min;

    }


    #loadImages(){

          this.Ghost1 = new Image();
          this.Ghost1.src= "Assets1/spider2.png";

          this.Ghost2 = new Image();
          this.Ghost2.src= "Assets1/enemy2.png";

          this.image = this.Ghost1;
          //this.image = this.scaredGhost;
          //this.image = this.scaredGhost2;




    }
}