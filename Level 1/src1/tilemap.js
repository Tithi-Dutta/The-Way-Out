
import Player from "./Player.js";
import Fire from "./Fire.js";//extra
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";
var flagbox=false;
const coin_collect = new Audio("sounds1/coin collection.mp3");
const key_collect = new Audio("sounds1/key.mp3");


export default class TileMap {
    constructor(tileSize) {
      this.tileSize = tileSize;
  
      
  
      this.path = new Image();
      //this.path.src = "Assets/path.png";
      this.path.src = "Assets1/room_path.png"
      this.wall = new Image();
      this.wall.src = "Assets1/room_wall.png";
      //this.wall.src = "Assets/wall.png";
      
      this.rwall = new Image();
      this.rwall.src = "Assets1/room_wall.png";
      this.lwall = new Image();
      this.lwall.src = "Assets1/room_wall.png";
      
      this.coin=new Image();
      this.coin.src="Assets1/coinf2.png";

      this.yellowKey=new Image();
      this.yellowKey.src="Assets1/keyf.png";

      this.treasure=new Image();
      this.treasure.src="Assets1/treasure_box_closed.png";

      this.treasurewin=new Image();
      this.treasurewin.src="Assets1/treasure_box_open.png";

    }
    //1 - wall
    //0 - path
    //7- coin
    //8 - key
    //2 - fire
    //3 - treasure
    //4 - player
    //6 -enemy
    maze=[
      [4,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,7,7,0,0,0,0,0,0,1,1,1],
      [0,0,0,1,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
      [0,1,0,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
      [0,1,7,7,0,7,7,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
      [0,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,7,7,7,7],
      [1,0,2,7,7,7,0,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,2,0,0,0,1,0,1,0,0,0,0,1,0],
      [1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0],
      [1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,2,0,0,0,0,0,0,0,0,0,0,1,0],
      [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,8,0,1,1,1,1,1,1,1,1,1,1,0],
      [1,0,1,0,1,7,1,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [1,0,1,0,1,7,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,7],
      [1,0,1,1,1,7,1,0,1,0,1,0,0,0,0,0,1,2,7,7,7,7,7,7,0,0,0,0,1,7],
      [1,0,1,0,0,0,1,0,1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,0,1,0,1,7],
      [1,0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,2],
      [1,0,1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,1],
      [1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,0,0,0],
      [1,0,0,2,7,7,7,7,7,7,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,7,1,3],

  ];
  maze1=[

    [4,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,7,7,0,0,0,0,0,1,1,1],
    [0,0,0,1,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
    [0,1,0,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
    [0,1,7,7,0,7,7,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
    [0,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,7,7,7,7],
    [1,0,2,7,7,7,0,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,2],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,2,0,0,0,1,0,1,0,0,0,0,1,0],
    [1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0],
    [1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,2,0,0,0,0,0,0,0,0,0,0,1,0],
    [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,8,0,1,1,1,1,1,1,1,1,1,1,0],
    [1,0,1,0,1,7,1,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,1,0,1,7,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,7],
    [1,0,1,1,1,7,1,0,1,0,1,0,0,0,0,0,1,2,7,7,7,7,7,7,0,0,0,0,1,7],
    [1,0,1,0,0,0,1,0,1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,0,1,0,1,7],
    [1,0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,2],
    [1,0,1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,1],
    [1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,0,0,0],
    [1,0,0,2,7,7,7,7,7,7,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,7,1,3],

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
          else if(tile==7)
          {
            this.#drawCoin(ctx, column, row,this.tileSize);
          }
          else if(tile==8)
          {
            this.#drawKey(ctx, column, row,this.tileSize);
          }
          else if(tile==3)
          {
            this.#drawTreasure(ctx, column, row,this.tileSize);
          }
          else if(column===(this.maze.length-1))
          {
            this.#drawwalllw(ctx, column, row, this.tileSize);
          }
          else {
            this.#drawBlank(ctx, column, row, this.tileSize);
          }
        //   ctx.strokeStyle = "yellow";
        // ctx.strokeRect(
        //   column * this.tileSize,
        //   row * this.tileSize,
        //   this.tileSize,
        //   this.tileSize
        // );
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

     #drawBlank(ctx, column,row, size){
         //ctx.fillStyle = "#9ec129";
         //ctx.fillRect( column * this.tileSize, row *this.tileSize, size,size);
        // this.#drawpath(ctx, column, row, this.tileSize);
        this.#drawpath(column * this.tileSize, row * this.tileSize, size, size);
     }
    #drawCoin(ctx, column, row, size)
    {
      
      ctx.drawImage(
        this.coin,
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
      else if(this.flagkey==true && flagbox==true){
        ctx.drawImage(
          this.treasurewin,
          column * this.tileSize,
          row * this.tileSize,
          size,
          size
        );
        }
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
    getFire() {
      const fires=[];
      for (let row = 0; row < this.maze.length; row++) {
        for (let column = 0; column < this.maze[row].length; column++) {
          let tile = this.maze[row][column];
          if (tile === 2) {
            this.maze[row][column] = 0;
            fires.push(new Fire(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              this
            )
            );
          }
        }
      }
      return fires;
    }

    eatCoin(x,y)
    {
      const row = y/this.tileSize;
      const column =x/this.tileSize;
      if(Number.isInteger(row) && Number.isInteger(column))
      {
        if(this.maze[row][column] == 7){
          // coin_collect.play();
          //  setTimeout(() => coin_collect.play(), 100); 
          this.maze[row][column]=0;
          return true;
        }
        else 
          return false;


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
        canvas.width = 960;//this.map[0].length * this.tileSize;
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
      didCollideWithFire(x, y,direction) {
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
          const tile = this.maze1[row][column];
          if (tile === 2) {
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
            flagbox=true;
          }
        }
        return false;
      }
}

  