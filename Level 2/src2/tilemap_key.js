import solution from "./backtrack_key.js";
export default class TileMap {
    constructor(tileSize) {
      this.tileSize = tileSize;
  
      
  
      this.path = new Image();
      //this.path.src = "Assets/path.png";
      this.path.src = "Assets 2/grass_path2.png"
      this.wall = new Image();
      this.wall.src = "Assets 2/newtile2.png";
      //this.wall.src = "Assets/wall.png";
      
      this.rwall = new Image();
      this.rwall.src = "Assets 2/newtile2.png";
      this.lwall = new Image();
      this.lwall.src = "Assets 2/newtile2.png";
      
      this.pathsol = new Image();
      this.pathsol.src = "Assets 2/sol_path2.png";
      
    }
    //1 - wall
    //0 - path
    maze=[

      [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0],
      [1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,0,0,0,0,1,0,1,0,1,1,0,1,1,1,1,0,1,1,1],
      [1,0,0,0,0,0,1,0,1,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,1,0,1,1,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,0,1,0,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,1,1,1,1,1,1,0,1,0,0,0,0,1,0,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1],
      [0,1,1,1,1,1,1,1,0,0,0,0,0,1,0,1,1,0,1,0,1,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1],
      [0,1,0,0,0,0,0,0,0,1,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1],
      [0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1],
      [0,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1],
      [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1],
      [0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1,1,1,0,1],
      [0,1,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,0,1,0,1,0,1,1,1],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,1,0,1,0,0,0,0],
      [0,1,0,1,0,1,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,1,1,1],
      [0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0],
      [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0],
  
  ];
  
 
    
    draw(ctx) {
      
      for (let row = 0; row < this.maze.length; row++) 
      {
        for (let column = 0; column < this.maze[row].length; column++)
        {
          let tile = this.maze[row][column];
          let tile1=solution[row][column];
          if(tile1===1){
            if (tile === 0 ) {
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
        
          }
          else
          {
            this.#drawpathsol(ctx, column, row, this.tileSize);
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

    #drawpathsol(ctx, column, row, size)
    {
      ctx.drawImage(
        this.pathsol,
        column * this.tileSize,
        row * this.tileSize,
        size,
        size
      );
    }

    

    setCanvasSize(canvas) {
        canvas.width = this.maze[0].length * this.tileSize;
        canvas.height = this.maze.length * this.tileSize;
      }

      
}
  