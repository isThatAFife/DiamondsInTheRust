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

/**
 * Array of objects for the story/choices
 */

const textNodes = [
    {
        id: 1,
        text: 'You wake up in an alley with no memories. On one side a man is telling you to follow him. [[follow]] The other direction leads to a busy road. [[other way]]',
        options: [
            {
                text: 'follow',
                nextText: 2
            },
            {
                text: 'other way',
                nextText: -1
            }
        ]
    },
    {
        id: 2,
        text: 'He ushers you into a dingy bar populated by scum & villainy. Tells you to wait at the bar for a minute. While waiting, the bartender asks if you want a [[drink]]. If you say [[no]], he leaves you alone and you notice a card in front of you behind the bar. You can also run the [[other way]] ',
        options: [
            {
                text: 'drink',
                nextText: 3
            },
            {
                text: 'no',
                nextText: 3
            },
            {
                text: 'other way',
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
        text: 'Game over',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
]

startGame()