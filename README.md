# Sudoko3.com

This is the front-End part of personal project to build and deploy Sudoko puzzle.
1st step is making a high quality puzzle and deploy using AWS.
2nd step is adding advanced functionalities (group competition, ranking, etc)
3rd step is commercialize the app/site

## Tech Stack
ReactJS
NodeJS
MongoDB

- Command to start program
  FronEnd : npm start
  Backend : nodemon server 


  # Notes
  "Puzzle" is initial sudoku state from server.
  "Solution" is completly filled sudoku.
  Puzzle and Solution is received from backend when 1.sudoku starts, 2.difficulty is clicked and 3.new game is clicked.

  "UserInput" has Puzzle + user inputs


# AWS Amplify
Deployed using AWS Amplified.
Manage domain using AWS Route53