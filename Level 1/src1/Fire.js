export default class Fire {
    constructor(x, y, tileSize, tileMap) {
      this.x = x;
      this.y = y;
      this.tileSize = tileSize;
      this.tileMap = tileMap;


      this.fireAnimationTimerDefault = 14;
      this.fireAnimationTimer = 1;
      this.#loadFireImages();
    }  
    draw(ctx,pause)
    {
        if(!pause)
        {
        this.#animate();
        }
        ctx.drawImage(this.fireImgs[this.fireImgIndex],
            this.x,
            this.y,
            this.tileSize,
            this.tileSize);
        
    }
    #loadFireImages() {
        const fireImg1 = new Image();
        fireImg1.src = "Assets1/fire1.png";
    
        const fireImg2 = new Image();
        fireImg2.src = "Assets1/fire2.png";
    
        const fireImg3 = new Image();
        fireImg3.src = "Assets1/fire3.png";
    
        const fireImg4 = new Image();
        fireImg4.src = "Assets1/fire4.png";
    
        this.fireImgs = [
          fireImg1,
          fireImg2,
          fireImg3,
          fireImg4,
        ];

        this.fireImgIndex = 0;
    }
    
    #animate()
    {
      if(this.fireAnimationTimer==null)
        return;
      this.fireAnimationTimer--;
      if(this.fireAnimationTimer==0){
        this.fireAnimationTimer=this.fireAnimationTimerDefault;
        this.fireImgIndex++;
        if(this.fireImgIndex==this.fireImgs.length)
          this.fireImgIndex=0;
      }
    }
}