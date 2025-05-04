import Player from "./Player3.js";
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection3.js";
var flagdoor=false;
const coin_collect = new Audio("sounds3/fruit.mp3");
const coin_poison = new Audio("sounds3/poison_fruit.mp3");
const key_collect = new Audio("sounds3/key.mp3");

export default class TileMap {
    constructor(tileSize) {
      this.tileSize = tileSize;
  
      
  
      this.path = new Image();
      this.path.src = "Assets 3/snow_path.png"
      this.wall = new Image();
      this.wall.src = "Assets 3/snow_wall.png";
      
      this.rwall = new Image();
      this.rwall.src = "Assets 3/snow_wall.png";
      this.lwall = new Image();
      this.lwall.src = "Assets 3/snow_wall.png"; 

      this.goodCoin = new Image();
      this.goodCoin.src = "Assets 3/good_fruit.png";

      this.badCoin = new Image();
      this.badCoin.src = "Assets 3/evil_fruit.png";

      this.yellowKey=new Image();
      this.yellowKey.src="Assets 3/keyf.png";


      ///////////////////door///////////

      this.doorul=new Image();
      this.doorul.src="Assets 3/doorul.png";

      this.doorur=new Image();
      this.doorur.src="Assets 3/doorur.png";

      this.doordl=new Image();
      this.doordl.src="Assets 3/doordl.png";

      this.doordr=new Image();
      this.doordr.src="Assets 3/doordr.png";

       this.openul=new Image();
       this.openul.src="Assets 3/openul.png";

      this.openur=new Image();
      this.openur.src="Assets 3/openur.png";

      this.opendl=new Image();
      this.opendl.src="Assets 3/opendl.png";

      this.opendr=new Image();
      this.opendr.src="Assets 3/opendr.png";






    }
    //1 - wall
    //0 - path
    //7- coin
    //8 - key
    //2 - fire
    //3 - treasure
    //4 - player
    //6 -enemy
    //9-evil coin

  maze=[

    [4,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1],
    [1,0,1,0,7,7,7,9,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,7,0,1,0,1,1,1],
    [1,9,1,0,0,0,0,6,0,0,0,0,1,1,7,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,8,1,0,1,0,1,0,7,0,1,0,1,0,0],
    [1,7,1,0,1,1,1,1,1,1,1,0,1,7,7,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,7,0,1,0,1,1,1],
    [1,7,1,0,1,0,0,0,0,0,1,0,1,7,7,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,7,0,1,0,1,0,0],
    [1,7,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,0],
    [1,7,1,0,1,0,7,7,1,0,1,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,7,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,7,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,0,0,7,1,1,1,1,1,1,1,1,1],
    [1,0,0,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,7,1,0,1,7,7,7,7,7,0,0,0,1,0,1,7,9,9,9,9,9,9,7,9,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,9,1,1,1,1,1,1,7,1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,1,1,1,9,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,7,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,9,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,9,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,7,7,1,0,1,0,0,0,0,1,0,1],
    [1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,1,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,9,7,7,7,7,7,7,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,19,20],
    [0,0,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,7,7,7,7,7,7,7,9,1,1,1,0,0,0,0,0,1,21,22],//made 3 zero for door experiment
  ];

    draw(ctx) {
      for (let row = 0; row < this.maze.length; row++) 
      {
        for (let column = 0; column < this.maze[row].length; column++)
        {
          let tile = this.maze[row][column];
          if (tile === 0) {
            this.#drawpath(ctx, column, row, this.tileSize);
          }
          else if(tile === 1)
          {
            this.#drawwall(ctx, column, row, this.tileSize);
          }
          else if(column===0)
          {
            this.#drawwallrw(ctx, column, row, this.tileSize);
          }
          else if(column===(this.maze.length-1))
          {
            this.#drawwalllw(ctx, column, row, this.tileSize);
          }
          else if(tile === 7)
          {
            this.#drawgoodCoin(ctx, column, row, this.tileSize)
          }
          else if(tile === 9)
          {
            this.#drawbadCoin(ctx, column, row, this.tileSize)
          }
          
          else if(tile===8)
          {
            this.#drawKey(ctx, column, row,this.tileSize);
          }

          /////door////
          else if(tile===22)
          {
            
            this.#drawdr(ctx, column, row, this.tileSize);
          }
          else if(tile===20)
          {
            this.#drawur(ctx, column, row, this.tileSize);
          }
          else if(tile===21)
          {
            this.#drawdl(ctx, column, row, this.tileSize);
          }
          else if(tile===19)
          {
            this.#drawul(ctx, column, row, this.tileSize);
          }

          ////////////////////
          
          else {
            this.#drawBlank(ctx, column, row, this.tileSize);
          }
        //     ctx.strokeStyle = "yellow";
        // ctx.strokeRect(
        //   column * this.tileSize,
        //   row * this.tileSize,
        //   this.tileSize,
        //   this.tileSize
        // );
        }
      }
    }
    

////////////door////////////
#drawul(ctx, column, row, size)//for the upper and lower border wall
{
  if(this.flagkey==false){
    ctx.drawImage(
    this.doorul,
    column * this.tileSize,
    row * this.tileSize,
    size,
    size
  );
  }
  else if(this.flagkey==true && flagdoor==true){
    ctx.drawImage(
      this.openul,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
    }
}
#drawur(ctx, column, row, size)//for the upper and lower border wall
{
  if(this.flagkey==false){
    ctx.drawImage(
    this.doorur,
    column * this.tileSize,
    row * this.tileSize,
    size,
    size
  );
  }
  else if(this.flagkey==true && flagdoor==true){
    ctx.drawImage(
      this.openur,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
    }
}
#drawdl(ctx, column, row, size)//for the upper and lower border wall
{
  if(this.flagkey==false){
    ctx.drawImage(
    this.doordl,
    column * this.tileSize,
    row * this.tileSize,
    size,
    size
  );
  }
  else if(this.flagkey==true && flagdoor==true){
    ctx.drawImage(
      this.opendl,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
    }
}
#drawdr(ctx, column, row, size)//for the upper and lower border wall
{
  if(this.flagkey==false){
    ctx.drawImage(
    this.doordr,
    column * this.tileSize,
    row * this.tileSize,
    size,
    size
  );
  }
  else if(this.flagkey==true && flagdoor==true){
    ctx.drawImage(
      this.opendr,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
    }
}


///////////////////////////////
    
    #drawwall(ctx, column, row, size)//for the upper and lower border wall
    {
      ctx.drawImage(
        this.wall,
        column * this.tileSize,
        row * this.tileSize,
        size,
        size
      );
    }

    
    #drawwallrw(ctx, column, row, size)//for the right border wall
    {
      ctx.drawImage(
        this.wallrw,
        column * this.tileSize,
        row * this.tileSize,
        size,
        size
      );
    }

    
    #drawwalllw(ctx, column, row, size)//for the left border wall
    {
      ctx.drawImage(
        this.walllw,
        column * this.tileSize,
        row * this.tileSize,
        size,
        size
      );
    }

    #drawpath(ctx, column, row, size)
    {
      ctx.drawImage(
        this.path,
        column * this.tileSize,
        row * this.tileSize,
        size,
        size
      );
    }
    #drawgoodCoin(ctx, column, row, size)
    {
      ctx.drawImage(
        this.goodCoin,
        column * this.tileSize,
        row * this.tileSize,
        size,
        size
      );
    }
    eatgoodCoin(x,y)
    {
      const row = y/this.tileSize;
      const column =x/this.tileSize;
      if(Number.isInteger(row) && Number.isInteger(column))
      {
        if(this.maze[row][column] == 7){
          coin_collect.play();
          this.maze[row][column]=0;
          return true;
        }
        else 
          return false;
      }
    }
    #drawbadCoin(ctx, column, row, size)
    {
      ctx.drawImage(
        this.badCoin,
        column * this.tileSize,
        row * this.tileSize,
        size,
        size
      );
    }
    eatbadCoin(x,y)
    {
      const row = y/this.tileSize;
      const column =x/this.tileSize;
      if(Number.isInteger(row) && Number.isInteger(column))
      {
        if(this.maze[row][column] == 9){
          coin_poison.play();
          this.maze[row][column]=0;
          return true;
        }
        else 
          return false;
      }
    }
    #drawKey(ctx, column, row, size)
    {
      
      ctx.drawImage(
        this.yellowKey,
        column * this.tileSize,
        row * this.tileSize,
        size,
        size
      );
        
    }
    
    flagkey=false;
    eatKey(x,y)
    {
      const row = y/this.tileSize;
      const column =x/this.tileSize;
      if(Number.isInteger(row) && Number.isInteger(column))
      {
        if(this.maze[row][column] == 8){
          key_collect.play();
          this.maze[row][column]=0;
          this.flagkey=true;
          return true;
        }
        else 
          return false;


      }
    }
    #drawBlank(ctx, column, row, size)
    {
      this.#drawpath(ctx, column, row, this.tileSize);
    }

    getPlayer(velocity) {
      for (let row = 0; row < this.maze.length; row++) {
        for (let column = 0; column < this.maze[row].length; column++) {
          let tile = this.maze[row][column];
          if (tile === 4) {
            this.maze[row][column] = 0;
            return new Player(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              velocity,
              this
            );
          }
        }
      }
    }

    getEnemies(velocity)
    {
      const enemies = [];

      for(let row =0; row<this.maze.length; row++)
      {
        for(let column=0;column<this.maze[row].length; column++)
        {
          const tile =this.maze[row][column];
          if(tile==6)
          {
            this.maze[row][column] =0;
            enemies.push(
              new Enemy(
                column * this.tileSize, 
                row * this.tileSize, 
                this.tileSize, 
                velocity, 
                this
                )
            );
          }
        }
      }
    return enemies;

    }

    setCanvasSize(canvas) {
        canvas.width = this.maze[0].length * this.tileSize;
        canvas.height = this.maze.length * this.tileSize;
      }

      didCollideWithEnvironment(x, y, direction) {
        if (direction == null) {
          return;
        }
        
        if (
          Number.isInteger(x / this.tileSize) &&
          Number.isInteger(y / this.tileSize)
        ) {
      
          let column = 0;
          let row = 0;
          let nextColumn = 0;
          let nextRow = 0;
    
          switch (direction) {
            case MovingDirection.right:
              nextColumn = x + this.tileSize;
              column = nextColumn / this.tileSize;
              row = y / this.tileSize;
              break;
            case MovingDirection.left:
              nextColumn = x - this.tileSize;
              column = nextColumn / this.tileSize;
              row = y / this.tileSize;
              break;
            case MovingDirection.up:
              nextRow = y - this.tileSize;
              row = nextRow / this.tileSize;
              column = x / this.tileSize;
              break;
            case MovingDirection.down:
              nextRow = y + this.tileSize;
              row = nextRow / this.tileSize;
              column = x / this.tileSize;
              break;
          }
          if(row<0 || column<0  || row == this.maze.length || column==this.maze[row].length)
          {
            return true;
          }
          const tile = this.maze[row][column];
          if (tile === 1) {
            return true;
          }
        }
        return false;
      }
    
      didCollideWithTreasure(x, y,direction) {
        if (direction == null) {
          return;
        }
        
        if (
          Number.isInteger(x / this.tileSize) &&
          Number.isInteger(y / this.tileSize)
        ) {
      
          let column = 0;
          let row = 0;
          let nextColumn = 0;
          let nextRow = 0;
    
          switch (direction) {
            case MovingDirection.right:
              nextColumn = x + this.tileSize;
              column = nextColumn / this.tileSize;
              row = y / this.tileSize;
              break;
            case MovingDirection.left:
              nextColumn = x - this.tileSize;
              column = nextColumn / this.tileSize;
              row = y / this.tileSize;
              break;
            case MovingDirection.up:
              nextRow = y - this.tileSize;
              row = nextRow / this.tileSize;
              column = x / this.tileSize;
              break;
            case MovingDirection.down:
              nextRow = y + this.tileSize;
              row = nextRow / this.tileSize;
              column = x / this.tileSize;
              break;
          }
          
          if(row == (this.maze.length-1) && column==(this.maze[row].length-1))
          {
            return true;
          }
          if(row == (this.maze.length-2) && column==(this.maze[row].length-1))
          {
            return true;
          }
          if(row == (this.maze.length-3) && column==(this.maze[row].length-2))
          {
            flagdoor=true;
          }
          if(row == (this.maze.length-3) && column==(this.maze[row].length-3))
          {
            flagdoor=true;
          }
        }
        return false;
      }
}
  