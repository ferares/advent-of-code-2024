# Advent of Code - Typescript framework 

## Start of a day

1. `pnpm start <day number>`

This will create a new "day folder" with 2 ts files inside, one for each part of the day's puzzle.

2. Create a txt file inside the `input` folder named `<day number>.txt` with the day's input.

3. Code your solution for each puzzle inside the `solution` function of the corresponding puzzle file.

  - This function should return the string/number that you'll then copy and paste to Advent of Code for validation.
  - The solution function recieves an `input` parameter with the contents of the `input/<day number>.txt` file.

## Run a puzzle's solution

`pnpm start <day number> <solution number>`