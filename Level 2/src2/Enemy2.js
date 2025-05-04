import MovingDirection from "./MovingDirection2.js";

export default class Enemy 
{

    constructor(x,y,tileSize,velocity,tileMap)
    {
        this.x=x;
        this.y=y;
        this.tileSize = tileSize;
        this.velocity= velocity/2;
        this.tileMap=tileMap;


        this.#loadImages();

        this.movingDirection = Math.floor(
            Math.random() * Object.keys(MovingDirection).length
            );

         this.directionTimerDefault = this.#random(10,50);
         this.directionTimer = this.directionTimerDefault;

         this.newMoveDirection = null;
         
         this.enemyAnimationTimerDefault = 14;
      this.enemyAnimationTimer = null;
    }

    draw(ctx, pause)
    {
        if(!pause){
            this.#move();
            this.#changeDirection();
            // this.#danimate();
            // this.#ranimate();
            // this.#uanimate();
            // this.#lanimate();
        }
        // this.#move();
         //this.#changeDirection();
          //ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
         //this.#setImage(ctx, pacman);
         if(this.movingDirection==null)
        {
          ctx.drawImage(this.denemyImages[0],
                this.x,
                this.y,
                this.tileSize,
                this.tileSize);
        }
        if(this.movingDirection==MovingDirection.right)
        {
          
          this.#ranimate();
          
          ctx.drawImage(
            this.renemyImages[this.renemyImageIndex],
            this.x,
            this.y,
            this.tileSize,
            this.tileSize
          );
        }
        else if(this.movingDirection==MovingDirection.left)
        {
          this.#lanimate();
        
          ctx.drawImage(
            this.lenemyImages[this.lenemyImageIndex],
            this.x,
            this.y,
            this.tileSize,
            this.tileSize
          );
        }
        else if(this.movingDirection==MovingDirection.up)
        {
          
          this.#uanimate();
          
          ctx.drawImage(
            this.uenemyImages[this.uenemyImageIndex],
            this.x,
            this.y,
            this.tileSize,
            this.tileSize
          );
        }

        if(this.movingDirection==MovingDirection.down)
        {
          
          this.#danimate();
          
          ctx.drawImage(
            this.denemyImages[this.denemyImageIndex],
            this.x,
            this.y,
            this.tileSize,
            this.tileSize
          );
         }
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
        //let newMoveDirection = null;
        if (this.directionTimer == 0){
            this.directionTimer = this.directionTimerDefault;
            this.newMoveDirection = Math.floor(
                Math.random() * Object.keys(MovingDirection).length
                );
        }

        if(this.newMoveDirection != null && this.movingDirection != this.newMoveDirection){
            if(
                Number.isInteger(this.x/this.tileSize) && 
                Number.isInteger(this.y/ this.tileSize)
                ){
                    if(
                        !this.tileMap.didCollideWithEnvironment(
                            this.x,
                            this.y,
                            this.newMoveDirection
                        )
                    ){
                        this.movingDirection = this.newMoveDirection;
                    }
                    // if(
                    //     this.tileMap.didCollideWithEnvironment(
                    //         this.x,
                    //         this.y,
                    //         this.newMoveDirection
                    //     )
                    // )
                    // {
                    //     this.enemyAnimationTimer==null;
                    //     return;
                    // }
                    else if(this.newMoveDirection!=null && this.enemyAnimationTimer==null)
                    {
                        this.enemyAnimationTimer=this.enemyAnimationTimerDefault;
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
                ) && 
                !this.tileMap.didCollideWithTreasureEnemy(
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

        //   this.normalGhost = new Image();
        //   this.normalGhost.src= "Assets/enemy1.png";

        //   this.scaredGhost = new Image();
        //   this.scaredGhost.src= "Assets/enemy2.png";

        //   this.scaredGhost2 = new Image();
        //   this.scaredGhost2.src= "Assets/edown1.png";

        //   this.image = this.normalGhost;
          //this.image = this.scaredGhost;
          //this.image = this.scaredGhost2;

          const renemyimg1 = new Image();
        renemyimg1.src = "Assets 2/eright1.png";
    
        const renemyimg2 = new Image();
        renemyimg2.src = "Assets 2/eright2.png";
    
        const renemyimg3 = new Image();
        renemyimg3.src = "Assets 2/eright3.png";
    
    
        this.renemyImages = [
          renemyimg1,
          renemyimg2,
          renemyimg3,
        ];

        this.renemyImageIndex = 0;

        //left

        const lenemyimg1 = new Image();
        lenemyimg1.src = "Assets 2/eleft1.png";
    
        const lenemyimg2 = new Image();
        lenemyimg2.src = "Assets 2/eleft2.png";
    
        const lenemyimg3 = new Image();
        lenemyimg3.src = "Assets 2/eleft3.png";
    
    
        this.lenemyImages = [
          lenemyimg1,
          lenemyimg2,
          lenemyimg3,
        ];
    
        this.lenemyImageIndex = 0;
        //up

        const uenemyimg1 = new Image();
        uenemyimg1.src = "Assets 2/eup1.png";
    
        const uenemyimg2 = new Image();
        uenemyimg2.src = "Assets 2/eup2.png";
    
        const uenemyimg3 = new Image();
        uenemyimg3.src = "Assets 2/eup3.png";
    
    
        this.uenemyImages = [
          uenemyimg1,
          uenemyimg2,
          uenemyimg3,
        ];
    
        this.uenemyImageIndex = 0;

        //down

        const denemyimg1 = new Image();
        denemyimg1.src = "Assets 2/edown1.png";
    
        const denemyimg2 = new Image();
        denemyimg2.src = "Assets 2/edown2.png";
    
        const denemyimg3 = new Image();
        denemyimg3.src = "Assets 2/edown3.png";
    
    
        this.denemyImages = [
          denemyimg1,
          denemyimg2,
          denemyimg3,
        ];
    
        this.denemyImageIndex = 0;




    }
    #ranimate()
    {
      if(this.enemyAnimationTimer==null)
        return;
      this.enemyAnimationTimer--;
      if(this.enemyAnimationTimer==0){
        this.enemyAnimationTimer=this.enemyAnimationTimerDefault;
        this.renemyImageIndex++;
        if(this.renemyImageIndex==this.renemyImages.length)
          this.renemyImageIndex=0;
      }
    }
    #lanimate()
    {
      if(this.enemyAnimationTimer==null)
        return;
      this.enemyAnimationTimer--;
      if(this.enemyAnimationTimer==0){
        this.enemyAnimationTimer=this.enemyAnimationTimerDefault;
        this.lenemyImageIndex++;
        if(this.lenemyImageIndex==this.lenemyImages.length)
          this.lenemyImageIndex=0;
      }
    }
    #uanimate()
    {
      if(this.enemyAnimationTimer==null)
        return;
      this.enemyAnimationTimer--;
      if(this.enemyAnimationTimer==0){
        this.enemyAnimationTimer=this.enemyAnimationTimerDefault;
        this.uenemyImageIndex++;
        if(this.uenemyImageIndex==this.uenemyImages.length)
          this.uenemyImageIndex=0;
      }
    }
    #danimate()
    {
      if(this.enemyAnimationTimer==null)
        return;
      this.enemyAnimationTimer--;
      if(this.enemyAnimationTimer==0){
        this.enemyAnimationTimer=this.enemyAnimationTimerDefault;
        this.denemyImageIndex++;
        if(this.denemyImageIndex==this.denemyImages.length)
          this.denemyImageIndex=0;
      }
    }
}