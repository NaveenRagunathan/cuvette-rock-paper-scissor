# Rock Paper Scissors Game

A modern, interactive Rock Paper Scissors game built with vanilla HTML, CSS, and JavaScript.

## Live Demo

[Play the game here](https://naveenragunathan.github.io/cuvette-rock-paper-scissor/)

## Features

- Clean, responsive design with green color theme
- Score persistence using localStorage
- Triangular choice layout with connecting lines
- Winner glow effect animation
- Celebration page for wins
- Rules modal popup
- Two-screen win flow (result page then celebration)

## Project Structure

```
├── index.html          # Main HTML structure
├── styles/
│   ├── main.css       # Base styles and layout
│   ├── game.css       # Game-specific styles
│   └── modal.css      # Rules modal styles
├── scripts/
│   ├── game.js        # Game logic and flow
│   ├── storage.js     # LocalStorage management
│   └── modal.js       # Modal functionality
└── README.md          # Project documentation
```

## How to Play

1. Open `index.html` in a web browser or visit the live demo
2. Click on Rock, Paper, or Scissors
3. View the result against the computer's choice
4. Click "PLAY AGAIN" to play another round
5. Click "NEXT" on wins to see the celebration page
6. Click "RULES" to view game rules

## Game Rules

- Rock beats Scissors
- Scissors beats Paper
- Paper beats Rock
- Scores are saved automatically

## Design Features

- Bright green background (#56C15A)
- Color-coded choice borders (Blue, Pink, Orange)
- Black hand symbols
- Dark green rules modal (#004429)
- Smooth animations and transitions
- Mobile responsive layout

## Technologies Used

- HTML5
- CSS3 (Flexbox, Animations, Filters)
- Vanilla JavaScript (ES6+)
- LocalStorage API

## Browser Support

Works on all modern browsers that support ES6 and CSS3 features.

## Deployment

The game is deployed using GitHub Pages. To deploy your own version:

1. Fork this repository
2. Go to Settings > Pages
3. Select "main" branch as source
4. Save and wait for deployment
