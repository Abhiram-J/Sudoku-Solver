#include <bits/stdc++.h>
using namespace std;
const int N = 9;

void print(vector<vector<int>>& grid){
    for (int i = 0; i < N; i++){
        for (int j = 0; j < N; j++)
            cout << grid[i][j] << " ";
        cout << "\n";
    }
    cout <<"\n";
}

bool isSafe(vector<vector<int>>& grid, int r, int c, int num){

    for (int x = 0; x < N; x++)
        if (grid[r][x] == num)
            return false;

    for (int x = 0; x < N; x++)
        if (grid[x][c] == num)
            return false;

    int sr = r - r % 3, sc = c - c % 3;

    for (int i = sr; i < 3 + sr; i++)
        for (int j = sc; j < 3 + sc; j++)
            if (grid[i][j] == num)
                return false;

    return true;
}

bool solveSudoku(vector<vector<int>>& grid, int r, int c){

    if (r == N - 1 && c == N)
        return true;

    if (c == N){
        r++;
        c = 0;
    }

    if (grid[r][c] > 0)
        return solveSudoku(grid, r, c + 1);

    for (int num = 1; num <= N; num++){

        if (isSafe(grid, r, c, num)){
            grid[r][c] = num;
            if (solveSudoku(grid, r, c + 1))
                return true;
        }
        grid[r][c] = 0;
    }
    return false;
}

int main()
{
    int m,k;
    vector<vector<int>> grid (9,vector<int> (9));
    cout << "\n\n\tSudoku Solver\n\n";
    cout << "Enter number of known cells : ";
    cin>>m;
    cout << "\n";
    for(int i=0;i<m;i++){
        int x,y ,val;

        cout << "Enter the row number and coloum number of cell number "<<i+1 <<" : ";
        cin>> x >> y;
        
        cout << "Enter the value in cell number "<<i+1<<" : ";
        cin>>val;
        cout << "\n";

        grid[x-1][y-1] = val;
    }
    
 

    do{

    cout << "\n\n\tChoice list \n\n";
    cout << "1. Check whether sudoku is valid \n";
    cout << "2. Print a solution  \n";
    cout << "3. Exit \n\n";
    cout << "Enter a choice number from the above list : ";
    cin>>k;
    cout << "\n";
    switch(k){
        case 1:
            cout << (solveSudoku(grid, 0, 0)? "Yes it is valid\n\n": "No Solution Exists\n\n");
            break;
        case 2:
            if (solveSudoku(grid, 0, 0)) print(grid);
            else cout << "No Solution Exists\n\n";
            break;
        case 3:
            return 0;
        default:
            cout << "Please enter a valid choice! ";
    }

    }while(true);

    return 0;
}
