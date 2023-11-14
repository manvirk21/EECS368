/*
Author: Manvir Kaur
KUID: 3064194
Date: 09/16/2022
Assignment: Assignment02
Last modified: 09/19/2022
Purpose: Assignment 2
*/

class Group  // creating a class called Group to perform set functions
{
    constructor()  // creates a constructor to create an array performing the set functions
    {
        this.group = []; //create an empty set using an array called group
    }

    has(item)  // this method returns true if the item is a member of the group and false otherwise
    {
        return this.group.includes(item)  // returns whether group has item or not
    }

    add(item)  //method that adds the given value to the group
    {
        if (!this.has(item))  // this will check the Boolean value by calling the has function
        {
            this.group.push(item);  // if has is false then the item will be pushed into the group array
        }
    }

    delete(item)  // this method deletes the given item from the group array
    {
        let length = this.group.length;  // the length variable is created which is the number of elements in the group
        
        for (let i = 0; i < length; i++)  // for loop created to iterate through the array
        {
            if (this.group[i] === item)  // if the element at the position is equal to the item passed in (an item to delete exists)
            {
                if (i === (length - 1))  // if i is equal to the last index of the array element:
                {
                    this.group.pop();  // the last element in the array is removed because it was equal to the item
                }
                else  // if i is not equal to the last index of the array element
                {
                    for (i; i < length; i++)  // for loop created starting from i and ends at the last index of the array
                    {
                        this.group[i] = this.group[i + 1];  // changing value of element at position i to the one ahead of it
                    }
                    this.group.pop();  // deleting the last element because that value is now in the spot before it
                }
            }
        }
    }

    union(group2)  // method that returns the union of the current group and given group
    {
        let newgroup = new Group();  // creates a new group to become the union set of the two groups
        
        for (let i = 0; i < group2.group.length; i++)  // for loop created to stop at the length of the 2nd group's array
        {
            newgroup.group.push(group2.group[i]);  // adds each element in group2 to the new group
        }

        for (let i = 0; i < this.group.length; i++)  // for loop created that stops at the length of the other group's array
        {
            newgroup.add(this.group[i])  // calls the add function on the new group and adds the element of the first group at index i
        }
        return newgroup;  // the new group is returned
    }

    intersection(group2)  // this method returns the intersection of 2 groups
    {
        let newgroup = new Group();  // creates a new group to become the intersection set of the two groups

        for (let i = 0; i < this.group.length; i++)  // for loop created to run from 0 until less than the first group's array length
        {
           for (let j = 0; j < group2.group.length; j++)  // for loop created to run from 0 until less than 2nd group's array length
           {
            if (this.group[i] === group2.group[j])  // if the element is in both groups:
            {
                j = group2.group.length +1;  // changing the value of j
                newgroup.add(this.group[i]);  // adding the intersecting value to the new group
            }
           }
        }
        return newgroup;  // the new group is returned
    }

    difference(group2)  // method that returns the difference of the group and the argument
    {
        let newgroup = new Group();  // creates a new group to become the difference of the 2 groups

        for(let i = 0; i < this.group.length; i++)  // for loop created to run from 0 to less than this array's length
        {
            let test = 0;  // creates a variable test that will help later
            for (let j = 0; j < group2.group.length; j++)  // for loop created to run from 0 to less than group2's array length
            {
                if (this.group[i] !== group2.group[j])  // if the two groups' index values at i and j are not equal to each other:
                {
                    test += 1  // the test value will be increased by one
                }
            }
            if (test === group2.group.length)  // if the value of test is equal to group 2's length then there weren't any equivelent elements at index i.
            {
                newgroup.add(this.group[i]);  // hence it can be added to the new group
            }
        }
        return newgroup;  // returns the new group
    }
    
}


// the following code is what was provided to check if the above code is working:
{
let group1 = new Group(); 
let group2 = new Group(); 
group1.add(1); 
group1.add(2); 
group1.add(3); 
console.log(group1); 
group2.add(2); 
group2.add(3); 
group2.add(5); 
group2.add(2); 
console.log(group2); 
console.log(group1.has(5)); 
console.log(group2.has(3)); 
console.log(group1.union(group2)); 
console.log(group1.intersection(group2)); 
console.log(group1.difference(group2)); 
group1.delete(1); 
console.log(group1); 
group2.delete(1); 
console.log(group2); 
}
