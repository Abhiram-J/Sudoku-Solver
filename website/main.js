
const N = 9;

function clearboard(grid)
{
    for (let i = 0; i < N; i++) 
        for(let j = 0; j < N; j++)
            grid[i][j].value = 0;
    
}

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


const nums = document.querySelectorAll(".num");
// console.log(grid);

let grid = Array.from(Array(N), () => new Array(N));

for (let i = 0; i < N; i++) 
    for(let j = 0; j < N; j++)
        grid[i][j] = nums[i*N + j];

const solve = document.querySelector(".solve");
const clear = document.querySelector(".clear");

clear.addEventListener("click", (e) => {
    e.preventDefault();
    clearboard(grid);
});

solve.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked");
   let ispossible = solveSudoku(grid, 0, 0);
    
});

// let ispossible = solveSudoku(grid, 0, 0);