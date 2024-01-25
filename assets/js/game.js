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
        text: 'You are woken by the feeling of light rain on your eyelids. You open your eyes to find yourself lying in a damp alleyway. The last thing you remember is going to sleep in your apartment. How the hell did you get here? You look around and notice a man at one end of the alleyway motioning for you to follow him. The other side of the alley leads to a busy road. Looking around more you notice someone has dumped some small change on you while you were unconscious. What do you do?',
        imageUrl: '../images/alley.png',
        options: [
            {
                text: 'Follow the man',
                nextText: 2
            },
            {
                text: 'Run the other way',
                nextText: -1
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
                nextText: 4
            },
        ]
    },
    {
        id: 3,
        text: 'He leads you into a back room filled with scattered prosthetic limbs and tells you to [[get in the blood-stained seat]]. Alternatively you can [[fight him and start running]]',
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
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'Game over',
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