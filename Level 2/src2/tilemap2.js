import Player from "./Player2.js";
import Enemy from "./Enemy2.js";
import MovingDirection from "./MovingDirection2.js";
var flagbox=false;

const coin_collect = new Audio("sounds2/fruit.mp3");
const key_collect = new Audio("sounds2/key.mp3");



export default class TileMap {
    constructor(tileSize) {
      this.tileSize = tileSize;
  
      
  
      this.path = new Image();
      this.path.src = "Assets 2/grass_path2.png"
      
      this.wall = new Image();
      this.wall.src = "Assets 2/newtile2.png";
      this.rwall = new Image();
      this.rwall.src = "Assets 2/newtile2.png";
      this.lwall = new Image();
      this.lwall.src = "Assets 2/newtile2.png";
      
      this.Coin = new Image();
      this.Coin.src = "Assets 2/apple.png";

      this.yellowKey=new Image();
      this.yellowKey.src="Assets 2/key.png";

      this.treasure=new Image();
      this.treasure.src="Assets 2/treasure_box_closed.png";

      this.treasurewin=new Image();
      this.treasurewin.src="Assets 2/treasure_box_opened.png";
    }
    //1 - wall
    //0 - path
  


maze = [
    [4,0,0,0,0,0,1,0,6,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0],
    [1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,0,7,7,7,1,0,1,0,1,1,0,1,1,1,1,0,1,1,1],
    [1,0,0,0,0,0,1,0,1,1,0,0,0,0,0,1,6,7,7,1,0,1,0,1,0,1,1,0,1,1,0,0,6,0,0,1],
    [1,0,1,1,1,1,1,0,1,0,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,1,1,1,1,1,1,0,1,0,0,0,0,1,0,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1],
    [0,1,1,1,1,1,1,1,0,0,0,0,0,1,0,1,1,0,1,0,1,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1],
    [0,1,0,0,0,0,0,0,0,1,1,1,8,1,0,1,1,0,1,0,1,1,0,1,7,7,7,1,0,1,0,1,0,1,0,1],
    [0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [0,1,0,1,0,1,1,1,1,1,7,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1],
    [0,1,0,1,0,1,7,1,7,1,1,1,1,7,1,7,1,0,1,0,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1],
    [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1],
    [0,1,0,1,1,1,1,1,1,1,7,1,7,1,7,1,7,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1,1,1,0,1],
    [0,1,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,0,1,0,1,0,1,1,1],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,1,0,1,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,7,7,1,0,1,0,1,1,1],
    [0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0],
    [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,3],


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
            this.#drawCoin(ctx, column, row, this.tileSize)
          }
          else if(tile===3)
          {
            this.#drawTreasure(ctx, column, row,this.tileSize);
          }
          else if(tile===8)
          {
            this.#drawKey(ctx, column, row,this.tileSize);
          }
          else {
            this.#drawBlank(ctx, column, row, this.tileSize);
          }
        }
      }
    }
    
    
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
        this.rwall,
        column * this.tileSize,
        row * this.tileSize,
        size,
        size
      );
    }

    
    #drawwalllw(ctx, column, row, size)//for the left border wall
    {
      ctx.drawImage(
        this.lwall,
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

    #drawCoin(ctx, column, row, size)
    {
      ctx.drawImage(
        this.Coin,
        column * this.tileSize,
        row * this.tileSize,
        size,
        size
      );
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
    
    #drawTreasure(ctx, column, row, size)
    {
      if(this.flagkey==false){
      ctx.drawImage(
        this.treasure,
        column * this.tileSize,
        row * this.tileSize,
        size,
        size
      );
      }
      else if(this.flagkey==true && flagbox == true)
      {
        ctx.drawImage(
          this.treasurewin,
          column * this.tileSize,
          row * this.tileSize,
          size,
          size
        );
        }
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

    eatCoin(x,y)
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
            flagbox = true;
          }
        }
        return false;
      }

      didCollideWithTreasureEnemy(x, y,direction) {
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

        }
        return false;
      }
}
  