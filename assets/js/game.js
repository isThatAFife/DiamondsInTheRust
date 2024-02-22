// Import text nodes array from story.js

import textNodes from "./story.js";

//Global variables

let state = {};
let userName = null;
let textNodeIndex = 0;
let bgImage = document.getElementById('bgImage');
const textElement = document.getElementById('text');
const choicesElement = document.getElementById('choice-buttons');
document.body.style.backgroundImage = "url('assets/images/cityscape-1-1280.webp')";
document.body.style.backgroundSize = "cover";

/**
 * The `showTextNode` function is responsible for displaying the text content, background image, and choices based on the provided `textNode` object.
 * Parts of this function inspired by youtube tutorials with additions/changes by me.
 * 
 * @function
 * @name showTextNode
 * @kind function
 * @param {any} textNode
 */

function showTextNode(textNode) {
    textElement.innerText = textNode.text(userName);

    // Set the background image based on the text node, or use a default image if no img property is present
    if (textNode.img) bgImage.style.backgroundImage = `url('${textNode.img}')`;
    else bgImage.style.backgroundImage = `url('assets/images/cityscape-1-1280.webp')`;

    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild);
    }

    /**
     * The `textNode.options.forEach(option => {` is iterating over each option object within the `options` array of the current `textNode`. For each option, it is creating a button element in the HTML with the text of the option, adding a 'btn' class to the button, and attaching a click event listener that calls the `selectOption(option)` function when the button is clicked. This allows the user to interact with the game by selecting different choices presented to them based on the current text node.
     * 
     */
    textNode.options.forEach(option => {
        if (option.requiredState == null || option.requiredState(state)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            if (option.class === 'rubik') {
                button.classList.add('rubik');
            }
            button.addEventListener('click', () => selectOption(option));
            choicesElement.appendChild(button);
        }
    });

    /**
     * The `selectOption(option)` function is responsible for handling the user's choice selection in the game. Here is a breakdown of what the function does:
     * 
     * @function
     * @name selectOption
     * @kind function
     * @memberof showTextNode
     * @param {any} option
     */
    function selectOption(option) {
        const nextTextNodeId = option.nextText;
        if (nextTextNodeId === -1) {
            // Reset the game
            state = {};
            textNodeIndex = 0;
            showTextNode(textNodes[textNodeIndex]);
        } else {
            state = Object.assign(state, option.setState);
            const nextNode = textNodes.find(node => node.id === nextTextNodeId);
            showTextNode(nextNode);
        }
    }
}

/**
 * The `getUserName()` function is responsible for retrieving the user's name from the input element and starting the game. It adds an event listener to the start button so that when the button is clicked, it checks if a name has been entered in the input field. If a name is entered, it sets the `userName` variable to the entered value, hides the welcome screen, displays the game space, and then calls the `showTextNode()` function with the first text node to start the game. If no name is entered, it displays an alert asking the user to enter a name.
 * 
 * @function
 * @name getUserName
 * @kind function
 */
function getUserName() {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', function () {
        const inputElement = document.getElementById('name-input');
        // Checks whether text has been entered to name-input and displays an alert if not
        if (inputElement.value.trim() !== '') {
            userName = inputElement.value;
            document.getElementById('welcome').style.display = 'none';
            document.getElementById('game-space').style.display = 'block';
            showTextNode(textNodes[textNodeIndex]);
        } else {
            alert('Please enter a name');
        }
    });
}

/**
 * Initializes the game by calling the getUserName function.
 */
function initGame() {
    getUserName();
}

initGame();