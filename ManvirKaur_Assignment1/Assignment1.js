/*
Author: Manvir Kaur
KUID: 3064194
Date: 09/07/2022
Assignment: Assignment01
Last modified: 09/07/2022
Purpose: Assignment 1
*/

console.log('Looping a Triangle')
// creating a for loop starting with one x and continuing to add until 10 x
for (let x = "x"; x <= "xxxxxxxxxx"; x = x + "x") { // for loop is initialized, condition checked, and the state of loop updated
  console.log(x); // output displayed with increasing number of x
}

console.log('\nExercise 2.2 - FizzBuzz')
// for loop created with if and else if statements to properly display the numbers or the correct statements as needed
for (let x = 1; x <= 100; x += 1) { // for loop is initialized with binding, condition checked, and the state of loop updated 
  if (x % 4 === 0 && x % 7 === 0) console.log("Divisible by both 4 and 7"); // if statement with condition to check both numbers
  else if (x % 4 === 0) console.log("Divisible by 4"); // checks if x is divisible by only 4 and displays output accordingly
  else if (x % 7 === 0) console.log("Divisible by 7"); // checks if x is divisible by only 7 and displays output accordingly
  else console.log(x); // if number is not divisible by 4 or 7 then it will just be displayed in the console as normal.
}

console.log('\nExercise 2.3 – n-by-n Grid')
// declare size variable and an empty "grid" string and display the size of grid
var size = 8; // size is set equal to 8
var grid = ""; // the grid variable is an empty string
console.log("size = 8") // display the size of the grid in the console

// creating outerloop for rows
for (let i = 1; i <= size; i++) { // for loop is initialized, condition checked, and the state of loop updated
  // creating inner loop for columns
  for (let j = 1; j <= size; j++) { // for loop is initialized, condition checked, and the state of loop updated
    if ((i + j) % 2 === 0) { // check if column is even by checking the remainder
      grid += " "; // a space is added if column is even
    } 
    else { // if column is odd
      grid += "*"; // an astrick is added if the column is odd.
    }
  }
  grid += "\n"; // jump to next row once the current row is complete
}
console.log(grid); // display the completed grid

// declare size variable and an empty "grid" string and display the size of grid
var size = 14; //size is set equal to 14
var grid = ""; // the grid variable is an empty string
console.log("\nsize = 14") // displays the size of the grid in the console

// creating outerloop for rows
for (let i = 1; i <= size; i++) { // for loop is initialized, condition checked, and the state of loop updated
    // creating inner loop for columns
    for (let j = 1; j <= size; j++) { // for loop is initialized, condition checked, and the state of loop updated
      if ((i + j) % 2 === 0) { // check if column is even by checking the remainder
        grid += " "; // a space is added if column is even
      } 
      else { // if column is odd
        grid += "*"; // an astrick is added if the column is odd.
      }
    }
    grid += "\n"; // jump to next row once the current row is complete
  }
  console.log(grid); // display the completed grid