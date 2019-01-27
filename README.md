# Boggle Challenge

## What is boggle challenge
Boggle is a word game that is played on a 4x4 board with 16 letter tiles.
The goal is to find as many words as possible given a time constraint.  

For this exercise, we are making **one modification**.  
```
Now it is possible for one or more of the letter tiles to be blank (denoted by *).
```  

When a tile is **blank**, it can be treated as **any other letter**.  Note that in one game it does not have to be the same character for each word.  

For example, if the tiles C, T, and * are adjacent.  The words *cot*, *cat*, and *cut* can all be used.
You will be given a text file containing all valid English words (a dictionary).
You will also be given an initial board configuration as a text file with commas separating the letters. Use this as a guide for how to set up the board.

For example a file may contain:

`A, C, E, D, L, U, G, *, E, *, H, T, G, A, F, K`

This is equivalent to the board:
```
A C E D
L U G *
E * H T
G A F K
```

Some sample words from this board are *ace*, *dug*, *eight*, *hole*, *huge*, *hug*, *tide*.  

Implement the user interface for a single person Boggle game.  The player should be able to enter a word and then the program will validate that the word is actually in the board and is a valid English word.  This is a very open-ended problem as it is meant to show how you think about the user and your frontend development skills.

## Requirement understanding

### Brief
- Making a board game named Boggle. https://en.wikipedia.org/wiki/Boggle
- Modification: `*` tile treated as any other letter
- Allow users submit as many words as possible
	- is accepted combination of given tiles
	- is in given dictionary
- Time constraint

### Insight - Design studio
In order to get more insight of the game, I refers to some online game Boggle
	- [Boggle game online](https://www.boggle.online/)
	- [Puzzle game online boggle](https://www.puzzle-words.com/boggle-4x4/)
	- [WorldWist game online boggle](https://www.wordtwist.org/html5.php?u=11931af6736c4f5d96b015da9c7b944e1548366680)

Look like I understand how to play the game clearly. It's time for Design Studio. To get as many as possible actions, comments, thinking, I will create 4 versions from 4-stars design to 7-stars design.

---
#### :star::star::star::star:
Specs:
- Display a board 4x4 button with tiles and a accepted (words) result list
- Allow user to click on any tile at position [i, j]
	- When user click on any tile
		- either DISABLE all tiles "far away" or already in the current sequence (not allow to choose next)
		- either HIGHLIGHT all tiles "closed" and not in the current sequence (allow to choose next)
- When user decide to stop with a chosen word
	- Allow user submit by enter/ click on a submit button
		- if word is not in result list YET AND is in dictionary
			- SUCCESS state + append to result list
		- else
			- FAIL state
		- Toast
- Time out: Display dialog to stop the game and summary. Allow user to continue next game

|      PROS      |CONS                           |
|----------------|-------------------------------|
|Do not need to check the word is combinable|The modification blank tile becomes meaningless. Just imagine when user chooses `*` title. Not a real word.            |
|Straightforward to traditional game BOGGLE          |Not encourage users to input more words            |
| Interact with board and get immediately feedback about next possible chosen tiles          ||

*p/s: Table doesn't  mean corresponding item. Only for split colspan.*

---
#### :star::star::star::star::star:
Specs:
- Display a board 4x4 button with tiles and a accepted (words) result list
- Display a form with single text field allow user to input
- Allow user to input the form to combine word
- When user decide to stop with a chosen word
	- Allow user submit by enter/ click on a submit button
		- if word is not in result list YET AND is in dictionary
			- SUCCESS state + append to result list
		- else
			- FAIL state
		- Toast
- Time out: Display dialog to stop the game and summary. Allow user to continue next game

|      PROS      |CONS                           |
|----------------|-------------------------------|
|The modification blank is meaningful|Need to check if word is combinable            |
|Encourage user to input more and more word|Not interact with the board can make the game become boring as it's a single person game            |
|Quick input. More words per minute||

---
#### :star::star::star::star::star::star:
Specs:
- Upgrade from 5-stars design
- While user type, synchronous checking
	- either highlight possible sequence can combine word
	- either display errors if there is no such any combination on the board

|      PROS      |CONS                           |
|----------------|-------------------------------|
|The modification blank is meaningful|Need to check if word is combinable            |
|Encourage user to input more and more word|Need to check current sequence            |
|Quick input. More words per minute||
|Interact with the board by highlight current sequence||

---
#### :star::star::star::star::star::star::star:
Specs:
- Upgrade from 6stars design
- While user type, suggestions will appear as clickable buttons
	- Ex: **if** typing `c` **then** suggest `ca`, `ce`, `co` if the sequence is possible and that word may exist in dictionary
	- Ex: **if** typing `ca` **then** suggest `cat`, `can`, `cap` if the sequence is possible and that word may exist in dictionary


|      PROS      |CONS                           |
|----------------|-------------------------------|
|*inherit 6stars PROS*|*inherit 6stars CONS*|
|Lightening and guidance purpose for children|May not hard enough|

## Data understanding

- Given tiles as an array of *16 elements*
	- tile `*` represents any alphabet
- Given dictionary as list of words *~ 80k words*
- A word is accepted if
    - not YET in result list
	- is possible combination from tiles
	- exists in dictionary

## KICKOFF on project
- Choose 6-stars design as a **MVP**

|      EPIC      |TECH FEASIBLE                           |
|----------------|-------------------------------|
|Display board and result list|:checkered_flag:|
|Display form with input field and allow user to input|:checkered_flag:|
|Synchronous check if word is accepted |:checkered_flag:|
|Highlight current sequence|:checkered_flag:|
|Allow user to submit word|:checkered_flag:|

- Tasks and ACs on Trello: https://trello.com/b/7U9shhDV/bogglegame
## DEVELOPMENT

### POC
- Load tiles
- Load dictionary
- Check combination is possible
- Search in dictionary
- Time constraint

### SPEC
- Test selectors
- Test thunks
- Test rootReducer
- Test epics
- Test utils functions

### STYLING

### QA
- board
- form
- result list
- time constraint
- notification

## DEPLOYMENT
Use https://zeit.co/now

Production: https://bogglegame.now.sh/

## RETROSPECTIVE

### FUN
- Game challenge
- Modification `*`

### FRUSTRATING
- fs on FE
- date-fns on different node version and with browser, too (8. vs 10.)

### ENHANCEMENTS IN FUTURE
- Split BE with API support
	- GET /tiles
	- POST /check_combination
- Multiple player with slack bot
