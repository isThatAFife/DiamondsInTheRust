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
                nextText: 6
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
                text: '"Housekeeping!"',
                nextText: 17
            },
            {
                text: '"Assassin! I\'\m here to kill you!"',
                nextText: 18
            },
            {
                text: 'It\'\sh yer besht friend, Bill! Let me in old buddy! (hic)',
                requiredState: (currentState) => currentState.drunk,
                nextText: 17
            }
        ]
    },
    {
        id: 16,
        text: () => 'You slam your boot into the door and it swings open. Sitting on the bed in front of you is the man your cyberbrain is telling you to kill. You aim the pistol at his head.',
        img: 'assets/images/motelroom.webp',
        options: [{
                text: 'Pull the trigger',
                class: 'rubik',
                nextText: 19
            },
            {
                text: 'Pull the trigger',
                class: 'rubik',
                nextText: 19
            },
            {
                text: 'Pull the trigger',
                class: 'rubik',
                nextText: 19
            },
            {
                text: 'Pull the trigger',
                class: 'rubik',
                nextText: 19
            }
        ]
    },
    {
        id: 17,
        text: () => '"No thank you!" the man shouts from behind the door. Looks like that isn\'\t going to work...',
        img: 'assets/images/motel.webp',
        options: [{
            text: 'Kick the door down and rush in gun-first',
            nextText: 16
        },
        {
            text: '"Assassin! I\'\m here to kill you!"',
            nextText: 18
        },
        {
            text: 'It\'\sh yer besht friend, Bill! Let me in old buddy! (hic)',
            requiredState: (currentState) => currentState.drunk,
            nextText: 17
        }]
    },
    {
        id: 18,
        text: () => '"Okay, just a second!" he shouts from behind the door. Huh, who knew it would be that easy? Suddenly there\'\s a loud bang. You look down and notice a hole in the door that wasn\'\t there before. There\'\s also a hole in your chest that wasn\'\t there before. Whoops.',
        options: [{
            text: 'Game over',
            nextText: -1
        }]
    },
    {
        id: 19,
        text: (value) => `As you begin to squeeze the trigger the words "OVERRIDE ENABLED" begin flashing in your field of vision and you notice that you no longer have control over your muscles. You are completely frozen in place. The man sitting on the bed lets out a sigh of relief. "You cut it pretty close this time, don\'\t you think?" A second voice responds from behind you, "Not to worry, the tech boys were pretty confident there would be zero latency this time." The second man steps in front of you and leans in close to you "thanks for helping us test out our new CyberImmobilizer5000, ${value}. Nothing provides data like a real field-test. Okay! We're done with this one. You can break them down for parts." You hear more footsteps behind you as the second man takes out a small remote and flicks a switch. The click of the switch is the last thing you hear before your senses are shut off one by one.`,
        img: 'assets/images/motelroom.webp',
        options: [{
            text: 'The End',
            nextText: -1
        }]
    }
];

export default textNodes;