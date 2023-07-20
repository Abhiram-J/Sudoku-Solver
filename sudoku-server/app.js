const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res)=> {
    res.sendFile("/home/abhiram/Projects/Sudoku-Solver/website/main.html"); 
})

app.get('/main.js', (req, res)=> {
    res.sendFile("/home/abhiram/Projects/Sudoku-Solver/website/main.js"); 
})

app.get('/main.css', (req, res)=> {
 
    res.sendFile("/home/abhiram/Projects/Sudoku-Solver/website/main.css"); 
})


const N = 9;


function isSafe(grid,  r,  c,  num)
{

    for (let x = 0; x < N; x++)
        if (grid[r][x] == num)
            return false;

    for (let x = 0; x < N; x++)
        if (grid[x][c] == num)
            return false;

    let sr = r - r % 3, sc = c - c % 3;

    for (let i = sr; i < 3 + sr; i++)
        for (let j = sc; j < 3 + sc; j++)
            if (grid[i][j] == num)
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

    if (grid[r][c] > 0)
        return solveSudoku(grid, r, c + 1);

    for (let num = 1; num <= N; num++)
    { 

        if (isSafe(grid, r, c, num))
        {
            grid[r][c] = num;
            if (solveSudoku(grid, r, c + 1))
                return true;
        }
        grid[r][c] = 0;
    }
    return false;
}


app.post('/', (req, res) => {
    let solution = req.body;
    console.log(solution);
    let ispossible = solveSudoku(solution, 0, 0);
    // res.send(JSON.stringify(solution));
    res.send(JSON.stringify(solution));
})

app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})


