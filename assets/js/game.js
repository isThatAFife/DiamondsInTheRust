//Global variables

let state = {};
let userName = null;
let textNodeIndex = 0;
let bgImage = document.getElementById('bgImage');
const textElement = document.getElementById('text');
const choicesElement = document.getElementById('choice-buttons');
document.body.style.backgroundImage = "url('assets/images/cityscape-1-1280.webp')";
document.body.style.backgroundSize = "cover";

// Text nodes array

const textNodes = [{
        id: 1,
        text: (value) => `"Hey! Hey, ${value}! Wake up, we've got a job to do!"
        You slowly open your eyes to find yourself lying in a damp alleyway with no memory of how you got there. A man in a leather jacket with some cheap-looking eye augmentations is waving at you. You don't recognise him but he seems to know who you are. He is motioning for you to follow him. You notice that someone decided to toss some coins on you while you were unconscious. What do you do?`,
        img: 'assets/images/alley.webp',
        options: [{
                text: 'Follow the man',
                nextText: 2
            },
            {
                text: 'Run the other way',
                nextText: 5
            },
            {
                text: 'Pick up the change',
                setState: {
                    coins: true
                },
                nextText: 4
            }
        ]
    },
    {
        id: 2,
        text: () => 'You push yourself to your feet and follow the man. Upon closer inspection you notice his mechanical prosthetic eye. This is somewhat less of a shock to you than his odor. "Alright, you must be the guy. They told me you\'\d be here. The name\'\s Skrunk. Come on, let\'\s go inside and get started." He motions to the door of a nearby bar and ushers you inside.',
        img: 'assets/images/bar.webp',
        options: [{
            text: 'Go inside',
            nextText: 3
        }, ]
    },
    {
        id: 3,
        text: () => 'You enter the bar and your senses are immediately assailed from all sides. There is RustPunk music blaring from speakers in the corner while the various occupants of the bar drink and/or fight each other. You notice a man with heavy metal prosthetics lying on a pool table in the corner while his "friends" appear to be performing impromptu surgery on him. The bartender looks at you and asks "What\'\ll it be?',
        img: 'assets/images/bar.webp',
        options: [{
                text: 'Nothing',
                nextText: 6
            },
            {
                text: 'A glass of water please',
                nextText: 7
            },
            {
                text: '(Use the loose coins) "Give me the strongest thing you have"',
                requiredState: (currentState) => currentState.coins,
                setState: {
                    coins: false,
                    drunk: true
                },
                nextText: 8
            }
        ]
    },
    {
        id: 4,
        text: () => 'You gather the coins into the pocket of your jacket.',
        img: 'assets/images/alley.webp',
        options: [{
                text: 'Follow the man',
                nextText: 2
            },
            {
                text: 'Run away',
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        text: () => 'You turn and run as fast as you can. Right into oncoming traffic. You die.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 6,
        text: () => '"Fair enough" He says',
        img: 'assets/images/bar.webp',
        options: [{
            text: 'Continue',
            nextText: 9
        }]
    },
    {
        id: 7,
        text: () => 'The barkeep squints at you for a moment before reaching under the counter and placing a glass full of murky, yellowish "water" in front of you. You take a sip and your organs immediately shut down due to the extreme toxicity of the tap water. That was a bad idea. Game over.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 8,
        text: () => 'He reaches behind the bar and places a tiny shot glass full of brown liquid in front of you. As you pick it up the vapours begin to sting your eyes. You down the glass in one and immediately feel a warm fuzzy feeling rise up inside you. Skrunk eyes you as if to ask whether that was a good idea or not but doesn\'\t say anything. He leads you to the back of the bar and through a door with KEEP OUT scratched into it.',
        options: [{
                text: 'option 1',
                nextText: 9
            },
            {
                text: 'option 2',
                nextText: 10
            },
            {
                text: 'This option only appears if you are drunk',
                requiredState: (currentState) => currentState.drunk,
                nextText: 11
            }
        ]
    }
]

/**
 * The `showTextNode` function is responsible for displaying the text content, background image, and choices based on the provided `textNode` object.
 * 
 * @function
 * @name showTextNode
 * @kind function
 * @param {any} textNode
 */

function showTextNode(textNode) {
    textElement.innerText = textNode.text(userName)

    // Set the background image based on the text node, or use a default image if no img property is present
    if (textNode.img) bgImage.style.backgroundImage = `url('${textNode.img}')`;
    else bgImage.style.backgroundImage = `url('assets/images/cityscape-1-1280.webp')`;

    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild)
    }
    
    /**
     * The `textNode.options.forEach(option => {` is iterating over each option object within the `options` array of the current `textNode`. For each option, it is creating a button element in the HTML with the text of the option, adding a 'btn' class to the button, and attaching a click event listener that calls the `selectOption(option)` function when the button is clicked. This allows the user to interact with the game by selecting different choices presented to them based on the current text node.
     * 
     */
    textNode.options.forEach(option => {
        if (option.requiredState == null || option.requiredState(state)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            choicesElement.appendChild(button)
        }
    })

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
            alert('Please enter a name')
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