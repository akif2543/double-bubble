# Double Bubble

## Background

Double Bubble is a clone of the popular early 2000s web game [Bubble Trouble](https://www.miniclip.com/games/bubble-trouble/en/). It is a 1-2 player game where the objective is to pop bubbles without being hit yourself. Players start with x number of lives and each time they are hit they lose a life. Although referred to as bubbles, the objects in this game really behave more like balls, arcing as they fall through the air and bouncing against surfaces. When burst, a bubble breaks up into two smaller bubbles, and these smaller bubbles break up into smaller bubbles themselves, up to a point. On the first level, players are faced with a small starting bubble, but on each subsequent level, the starting bubble's size is increased so that as bubbles are popped and broken up into smaller bubbles, there are more bubbles bouncing around the gamespace at any given time, making it more likely a player will be hit. After the first few levels, other obstacles are introduced, such as more than one starting bubble and partitioned game spaces. Players are also awarded points for each bubble they pop. When playing solo, this score is eligible to be saved to a high scores table. As a bonus feature, when a bubble is popped there is a chance it will drop a random powerup that will provide a benefit to the player that picks it up before it expires.

## Functionality & MVP

1. Bubbles start at a fixed position and fall according to gravity
2. Bubbles bounce off walls and the floor
3. Players can fire a projectile to pop bubbles
4. Bubbles burst and break up into smaller bubbles when popped
5. Players lose a life if they make contact with a bubble
6. If a player loses a life and has remaining lives, the level restarts, otherwise the game ends
7. The level increments when all bubbles have been popped

In addition, this project will include:

- A production README

## Wireframes

This app will consist of a single page with a nav header that includes the name of the game, a link to the original, and links to my Github and LinkedIn. The gamespace will appear below in the center of the page. Information such as player lives, score, and level will appear below the gamespace.

![Wireframe](https://i.imgur.com/NJib4wX.png)

## Architecture & Technologies

This project will be implemented with the following technologies:

- `JavaScript` for game logic
- `Canvas API` for rendering graphics
- `Webpack` for bundling js files

In addition to the entry file, the project will also include the following JavaScript files:

- `game_view.js`: this file will hold the logic for animating the game and setting key handlers
- `game.js`: this file will hold the elements currently active in the gamespace, including bubbles and players
- `player.js`: this file will hold the logic for moving and firing
- `bubble.js`: this file will hold the logic for the way the bubbles fall/bounce/burst

## Implementation Timeline

**_Day 1:_** Set up webpack and work on adding a gravitational force on the bubble object

- **_Goal for the day:_** Implement the falling and bouncing physics for the bubbles

**_Day 2:_** Introduce the player object and work on the core game functionality

- **_Goal for the day:_** Implement moving and firing functionality for the player and bursting functionality for the bubbles

**_Day 3:_** Build out the core functionality by adding logic for additional levels, two players, and a high scores table

- **_Goal for the day:_** Allow players to proceed to the next level after completing the current one and have the difficulty increase on each subsequent level

## Bonus features

- Players can customize their key bindings
- Burst bubbles have a chance to drop a random powerup that will temporarily enhance the player that picks it up
