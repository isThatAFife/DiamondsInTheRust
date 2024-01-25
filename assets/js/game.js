// document.addEventListener('DOMContentLoaded', function() {
//    var startButton = document.querySelector('#start-button')
//    var input = document.querySelector('#name-input')
//    var container = document.querySelector('#container')
//    startButton.addEventListener('click', function() {
 
//    })
//    });

const textElement = document.getElementById('text');
const choicesElement = document.getElementById('choice-buttons');

/**
 * Empty state object to keep track of choices made
 */

let state = {}

/**
 * Start the game
 */

function startGame() {
    state = {}
    showTextNode(1)
}

/**
 * Display option(s)
 */

function showTextNode (textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
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

/**
 * Select an option
 */

function selectOption(option) {
    const nextTextNodeId = option.nextText
    /* Check for game over state */
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    /* take our state, add option.state and override anything there */
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

/* Change background */
function changeBackground(imageUrl) {
    document.body.style.backgroundImage = "url('" + imageUrl + "')";
  }

/**
 * Array of objects for the story/choices
 */

const textNodes = [
    {
        id: 1,
        text: `You awake to find yourself lying in a damp alleyway with no memory of how you got here. You look around and notice a man at one end of the alleyway motioning for you to follow him. The other side of the alley leads to a busy road. Looking around more you notice someone has dumped some small change on you while you were unconscious. What do you do?`,
        imageUrl: '../images/alley.png',
        options: [
            {
                text: 'Follow the man',
                nextText: 2
            },
            {
                text: 'Run the other way',
                nextText: 5
            },
            {
                text: 'Pick up the change',
                setState: {change : true},
                nextText: 4
            }
        ]
    },
    {
        id: 2,
        text: 'You push yourself to your feet and follow the man. Upon closer inspection you notice his mechanical prosthetic eye. This is somewhat less of a shock to you than his odor. "Alright, you must be the guy. They told me you\'\d be here. Come on, let\'\s go inside and get started." He motions to the door of a nearby bar and ushers you inside.',
        imageUrl: '../images/bar.png',
        options: [
            {
                text: 'Go inside',
                nextText: 3
            },
            {
                text: 'Ask what\'\s going on',
                nextText: 6
            },
        ]
    },
    {
        id: 3,
        text: 'You enter the bar and your senses are immediately assailed from all sides. There is RustPunk music blaring from speakers in the corner while the various occupants of the bar drink, fight or fornicate. Sometimes you can\'\t tell which. You notice a man with heavy metal prosthetics lying on a pool table in the corner while his "friends" appear to be performing impromptu surgery on him.',
        options: [
            {
                text: 'get in',
                nextText: 2
            },
            {
                text: 'other way',
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: 'You gather the coins into the pocket of your leather jacket. "Hey, hurry up, we don\'\t have all day!" the man shouts gruffly.',
        options: [
            {
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
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'Game over',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 7,
        text: 'Game over',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
]

startGame()