-- Author: Manvir Kaur
-- KUID: 3064194
-- Date: 11/14/2022
-- Assignment: Assignment06
-- Purpose: Creating various different Haskell Function

--main starting 
main :: IO() 


-- start of the replicate function
-- Replicate_func is a function that takes two arguments, the first argument is an integer and the second argument is a value. 
-- The function returns a list of the second argument repeated the number of times as the first argument.
replicate_func :: Int -> n -> [n] -- replicate function declaration
-- The function returns a list of b repeated the number of times as a.
replicate_func a b = [b | _ <- [1..a]]


-- start of the perfect function
-- Perfects function checks if the total is equal to the number in the range where both match by calling total
-- A function that takes an integer and returns a list of integers.
perfects :: Int -> [Int]  -- perfects function declaration
-- Creating a list of numbers from 1 to a, where a is the input.
perfects a = [number | number <- [1..a], total number == number]
-- A function that takes a number and returns the sum of all the numbers that divide the input number.
total a = sum [number | number <- [1..a], a `mod` number == 0, number /= a]


-- start of the find function
-- A function that takes a value and a list of tuples and returns a list of values that are associated with the given key in the table.
find :: Eq a => a -> [(a, b)] -> [b]
find k fn = [n | (k', n) <- fn, k == k'] -- returns the list of all values associated with k in fn


-- start of the positions function
-- A function that takes a value and a list of tuples and returns a list of values that are associated with the given key in the table.
positions:: Eq a => a -> [a] -> [Int]
-- Taking the value, f, and a list of tuples, fs, and returning a list of values that are associated with f.
positions f fs = find f (zip fs [0..n])
-- A where clause that is used to define the variable n that is used in the function.
                 where n = length fs - 1


-- start of the scalar products function
-- A function that takes two lists of integers and returns the scalar product of the two lists.
scalarproduct :: [Int] -> [Int] -> Int
-- Taking two lists of integers, xs and ys, and returning the scalar product of the two lists.
scalarproduct xs ys = sum [k * v | (k, v) <- zip xs ys]


--funcion call block 
main = do  --The main function that is called when the program is run.

-- printing all of the answers for each function problem
print $ replicate_func 5 "test code" -- Calling the replicate_func function and printing the result.
print $ perfects 9000 -- Calling the perfects function and printing the result.
-- Calling the find function and passing in the value 'c' and a list of tuples; printing the result.
print $ find 'c' [('a',1),('b',2),('c',3),('b',4),('c',25)] 
-- The positions function takes a value and a list of tuples and returns a list of values that are associated with the given key in the table.
print $ positions 1 [1,0,0,1,0,1,1,0] 
-- The scalarproduct function takes two lists of integers and returns the scalar product of the two lists; printing the result.
print $ scalarproduct [-1,2,3] [-4,-5,6]  