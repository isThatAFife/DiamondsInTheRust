const textElement = document.getElementById('text');
const choicesElement = document.getElementById('choice-buttons');

//  Empty state object to keep track of choices made

let state = {}

// Start the game

function startGame() {
    state = {}
    showTextNode(1)
}

// Display option(s)

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    // Remove all options before adding the ones we need
    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            choicesElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

// Select an option

function selectOption(option) {
    const nextTextNodeId = option.nextText
    // Check for game over state
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    // Take our state, add option.state and override anything there
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

// Change background
function changeBackground(imageUrl) {
    document.body.style.backgroundImage = "url('" + imageUrl + "')";
}

//  Array of objects for the story/choices

const textNodes = [{
        id: 1,
        text: `You awake to find yourself lying in a damp alleyway with no memory of how you got here. You look around and notice a man at one end of the alleyway motioning for you to follow him. The other side of the alley leads to a busy road. Looking around more you notice someone has dumped some small change on you while you were unconscious. What do you do?`,
        imageUrl: '../images/alley.png',
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
        text: 'You push yourself to your feet and follow the man. Upon closer inspection you notice his mechanical prosthetic eye. This is somewhat less of a shock to you than his odor. "Alright, you must be the guy. They told me you\'\d be here. The name\'\s Skrunk. Come on, let\'\s go inside and get started." He motions to the door of a nearby bar and ushers you inside.',
        imageUrl: '../images/bar.png',
        options: [{
            text: 'Go inside',
            nextText: 3
        }, ]
    },
    {
        id: 3,
        text: 'You enter the bar and your senses are immediately assailed from all sides. There is RustPunk music blaring from speakers in the corner while the various occupants of the bar drink and/or fight each other. You notice a man with heavy metal prosthetics lying on a pool table in the corner while his "friends" appear to be performing impromptu surgery on him. The bartender looks at you and asks "What\'\ll it be?',
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
        text: 'You gather the coins into the pocket of your leather jacket. "Alright, you must be the guy. They told me you\'\d be here. The name\'\s Skrunk. Come on, let\'\s go inside and get started." He motions to the door of a nearby bar and ushers you inside.',
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
        text: 'You turn and run as fast as you can. Right into oncoming traffic. You die.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 6,
        text: 'Game over',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 7,
        text: 'The barkeep squints at you for a moment before reaching under the counter and placing a glass full of murky, yellowish "water" in front of you. You take a sip and your organs immediately shut down due to the extreme toxicity of the tap water. That was a bad idea. Game over.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 8,
        text: 'He reaches behind the bar and places a tiny shot glass full of brown liquid in front of you. As you pick it up the vapours begin to sting your eyes. You down the glass in one and immediately feel a warm fuzzy feeling rise up inside you. Skrunk eyes you as if to ask whether that was a good idea or not but doesn\'\t say anything. He leads you to the back of the bar and through a door with KEEP OUT scratched into it.',
        options: [
            {
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

startGame()