
const N = 9;

const solve = document.querySelector(".solve");
const clear = document.querySelector(".clear");
const nums = document.querySelectorAll(".num");


function isSafe(grid,  r,  c,  num)
{

    for (let x = 0; x < N; x++)
        if (grid[r][x].value == num)
            return false;

    for (let x = 0; x < N; x++)
        if (grid[x][c].value == num)
            return false;

    let sr = r - r % 3, sc = c - c % 3;

    for (let i = sr; i < 3 + sr; i++)
        for (let j = sc; j < 3 + sc; j++)
            if (grid[i][j].value == num)
                return false;

    return true;
}

function solveSudoku(grid, r, c)
{

    if (r == N - 1 && c == N) return true;

    if (c == N)
    {
        r++;
        c = 0;
    }

    if (grid[r][c].value > 0)
        return solveSudoku(grid, r, c + 1);

    for (let num = 1; num <= N; num++)
    { 

        if (isSafe(grid, r, c, num))
        {
            grid[r][c].value = num;
            if (solveSudoku(grid, r, c + 1))
                return true;
        }
        grid[r][c].value = 0;
    }
    return false;
}



function fetchValuefromgrid(){
let grid = [];
for (let i = 0; i < N; i++){
    grid[i] = [];
    for(let j = 0; j < N; j++){
        let val = parseInt(nums[i*N+j].value);
        if ( val > 0 && val < 10 )
        grid[i][j] = parseInt(nums[i*N+j].value);
        else
        grid[i][j] = 0;
    }
}


return grid;
}



clear.addEventListener("click", (e) => {
    e.preventDefault();

    for (let i = 0; i < N; i++) 
        for(let j = 0; j < N; j++)
            nums[i*N +j].value = "";
    
});

solve.addEventListener("click", (e) => {
    e.preventDefault();
    let grid = fetchValuefromgrid();
    console.log(grid);
    console.log("clicked");
//    let ispossible = solveSudoku(grid, 0, 0);

   fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(grid)
   }).then(res => res.json()).then(solution => 
    {
        
        for (let i = 0; i < N; i++){
            for(let j = 0; j < N; j++){
                nums[i*N+j].value = solution[i][j] ;
            }
        }

    }) 

    
});

// let ispossible = solveSudoku(grid, 0, 0);