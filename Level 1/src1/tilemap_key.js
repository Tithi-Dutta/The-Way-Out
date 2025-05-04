import solution from "./backtrack_key.js";
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
      
      this.pathsol = new Image();
      this.pathsol.src = "Assets1/sol_path.png";
      
    }
    //1 - wall
    //0 - path
    maze=[

      [0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [0,0,0,1,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
      [0,1,0,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
      [0,1,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
      [0,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0],
      [1,0,0,0,0,0,0,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,0],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0],
      [1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0],
      [1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0],
      [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0],
      [1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [1,0,1,1,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0],
      [1,0,1,0,0,0,1,0,1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,0,1,0,1,0],
      [1,0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [1,0,1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,1],
      [1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,0,0,0],
      [1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,0,1,0],

  ];
  

  // solve()
  // {
  //   if(this.solvemaze(this.maze,0,0,this.sol)==flase){
  //     document.write("Solution does'nt exist.");
  //   }
  //   else
  //   {
  //     for (let row = 0; row < this.sol.length; row++) 
  //     {
  //       for (let column = 0; column < this.sol[row].length; column++)
  //       {
  //         document.write(" "+this.sol[row][column]+" ");
  //       }
  //       document.write("<br>");
  //     }
  //   }
  // }
 
    
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
            //   ctx.strokeStyle = "yellow";
            // ctx.strokeRect(
            //   column * this.tileSize,
            //   row * this.tileSize,
            //   this.tileSize,
            //   this.tileSize
            // );
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
        canvas.width = 960;//this.map[0].length * this.tileSize;
        canvas.height = this.maze.length * this.tileSize;
      }

      
}
  