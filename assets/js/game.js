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
        text: () => 'You push yourself to your feet and follow the man into a nearby bar. There is RustPunk music blaring from speakers in the corner while the various occupants of the bar drink and/or fight each other. The bartender looks at you and asks "What\'\ll it be?',
        img: 'assets/images/bar.webp',
        options: [{
                text: 'Say nothing and continue following the man',
                nextText: 3
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
        id: 3,
        text: (value) => `He leads you to the back through a door with "KEEP OUT" scratched into it. Beyond the door you discover what seems to be a surgery, although everything is crusted in dirt and blood.
        "Alright ${value}, the name's Jimbo. Our client has requested some very specific, very expensive upgrades before you take on this job. Take a seat and I'll get them installed lickety-split"`,
        img: 'assets/images/surgery.webp',
        options: [{
                text: 'Lie down',
                setState: {
                    brief: true
                },
                nextText: 6
            },
            {
                text: 'Refuse',
                nextText: 10
            },
            {
                text: 'Run away',
                nextText: 11
            },
            {
                text: '"Sssssure, shounds great!" (drunk)',
                requiredState: (currentState) => currentState.drunk,
                nextText: 12
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
        text: () => 'You feel a pressure on the back of your neck as Jimbo plugs something into your neuralink jack. All of a sudden it feels like every one of your nerves is on fire but somehow you are unable to move or scream. After what feels like an age, the pain subsides and you begin to see text floating in front of your eyes. There is an address and a photo of a well-dressed man with the word TARGET across his face. "Well, that should be everything you need. All the information has been directly downloaded to your brain." He brings you outside where an autocar is waiting and hands you a gun. "Good luck"',
        img: 'assets/images/surgery.webp',
        options: [{
            text: 'Get into the autocar',
            nextText: 9
        }]
    },
    {
        id: 7,
        text: () => 'The barkeep squints at you for a moment before reaching under the counter and placing a glass full of murky, yellowish "water" in front of you. You take a sip and your organs immediately shut down due to the extreme toxicity of the tap water. That was a bad idea. Game over.',
        img: 'assets/images/bar.webp',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 8,
        text: () => 'He reaches behind the bar and places a tiny shot glass full of brown liquid in front of you. As you pick it up the vapours begin to sting your eyes. You down the glass in one and immediately feel a warm fuzzy feeling rise up inside you.',
        img: 'assets/images/bar.webp',
        options: [{
                text: 'Follow the greasy man to the back of the bar',
                nextText: 3
            },
            {
                text: 'Ask for another',
                requiredState: (currentState) => currentState.drunk,
                nextText: 7
            }
        ]
    },
    {
        id: 9,
        text: () => 'The autocar takes you to a run-down motel on the outskirts of the city. When you arrive it appears to be deserted. What do you do?',
        img: 'assets/images/motel.webp',
        options: [{
                text: 'Start shooting randomly at the motel rooms (drunk)',
                requiredState: (currentState) => currentState.drunk,
                nextText: 11
            },
            {
                text: 'Use the info uploaded by Jimbo to approach the correct room',
                requiredState: (currentState) => currentState.brief,
                nextText: 12
            },
            {
                text: 'Wait and see what happens',
                nextText: 13
            },
            {
                text: 'Start randomly knocking on doors',
                nextText: 14
            }
        ]
    },
    {
        id: 10,
        text: () => 'He says you\'\re crazy for turning it down but he won\'\t force you. He hands you a gun and says there\'\s a car waiting outside for you. They want you to off some corpo type but that\'\s all he knows',
        img: 'assets/images/surgery.webp',
        options: [{
            text: 'Get in the autocar',
            nextText: 9
        }]
    },
    {
        id: 11,
        text: () => 'You start firing wildly at the motel until some of the doors burst open, revealing state of the art security bots. They waste no time in shredding you to pieces in a hail of lead.',
        img: 'assets/images/motel.webp',
        options: [{
            text: 'Game over',
            nextText: -1
        }]
    },
    {
        id: 12,
        text: () => 'You approach the room. You can hear some muffled noises from inside but otherwise all is still and quiet.',
        img: 'assets/images/motel.webp',
        options: [{
                text: 'Kick the door down and rush in gun-first',
                nextText: 16
            },
            {
                text: 'Knock politely',
                nextText: 15
            }
        ]
    },
    {
        id: 13,
        text: () => 'You decide to wait for a while and see what happens. Not much happens until about ten minutes later, when you see a flicker of movement in one of the windows.',
        img: 'assets/images/motel.webp',
        options: [{
                text: 'Start shooting randomly at the motel rooms (drunk)',
                requiredState: (currentState) => currentState.drunk,
                nextText: 11
            },
            {
                text: 'Go to the room where you saw the movement',
                nextText: 12
            },
            {
                text: 'Start randomly knocking on doors',
                nextText: 14
            }
        ]
    },
    {
        id: 14,
        text: () => 'You begin knocking on random doors but it seems the place really is abandoned. There isn\'\t even anyone manning the reception desk. After knocking on various doors for a while you eventually come to room 304. You can hear some muffled noises from inside, the first signs of life you\'\ve noticed here.',
        img: 'assets/images/motel.webp',
        options: [{
                text: 'Knock politely',
                nextText: 15
            },
            {
                text: 'Kick the door down and rush in gun-first',
                nextText: 16
            }
        ]
    },
    {
        id: 15,
        text: () => 'You rap the door three times and after a moment of silence a man\'\s voice answers answers. "Um... Who is it?"',
        img: 'assets/images/motel.webp',
        options: [{
                text: 'Housekeeping!',
                nextText: 17
            },
            {
                text: 'Assassin!',
                nextText: 18
            },
            {
                text: 'It\'\sh yer besht friend, Bill! Let me in old buddy! (hic)',
                requiredState: (currentState) => currentState.drunk,
                nextText: 19
            }
        ]
    },
    {
        id: 16,
        text: () => 'You slam your boot into the door and it swings open. Sitting on the bed in front of you is the man your cyberbrain is telling you to kill. You aim the pistol at his head.',
        img: 'assets/images/motelroom.webp',
        options: [{
            text: 'Pull the trigger',
            nextText: 20
        },
        {
            text: 'Pull the trigger',
            nextText: 20
        },
        {
            text: 'Pull the trigger',
            nextText: 20
        },
        {
            text: 'Pull the trigger',
            nextText: 20
        }]
    },
    {
        id: 17,
        text: () => '',
        options: [{
            
        }]
    }
];

/**
 * The `showTextNode` function is responsible for displaying the text content, background image, and choices based on the provided `textNode` object.
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