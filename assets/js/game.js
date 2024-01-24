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

}

/**
 * Select an option
 */

function selectOption(option) {

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
                setState: {},
                nextText: 2
            },
            {
                text: 'other way',
                setState: {},
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
                setState: {},
                nextText: 3
            },
            {
                text: 'no',
                setState: {},
                nextText: 4
            },
            {
                text: 'other way',
                setState: {},
                nextText: -1
            },
        ]
    }
]

startGame()