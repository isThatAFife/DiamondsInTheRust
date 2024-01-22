# Diamonds in the Rust
A choose-your-own-adventure style game set in a cyberpunk future.

Find the live site [here]

[here]: https://isthatafife.github.io/

![screenshot of site responsiveness](docs/screenshots/screenshot.png)

## Contents

* [User Experience](#user-experience-ux)
  * [User Stories](#user-stories)

* [Design](#design)
  * [Typography](#typography)
  * [Imagery](#imagery)
  * [Wireframes](#wireframes)

* [Features](#features)
  * [General Features on Each Page](#general-features-on-each-page)
  * [Future Implementations](#future-implementations)
  * [Accessibility](#accessibility)

* [Technologies Used](#technologies-used)
  * [Languages Used](#languages-used)
  * [Frameworks, Libraries & Programs Used](#frameworks-libraries--programs-used)

* [Deployment & Local Development](#deployment--local-development)
  * [Deployment](#deployment)
  * [Local Development](#local-development)
    * [How to Fork](#how-to-fork)
    * [How to Clone](#how-to-clone)

* [Testing](#testing)

* [Credits](#credits)
  * [Code Used](#code-used)
  * [Content](#content)
  * [Media](#media)
  * [Acknowledgements](#acknowledgements)

  ---

  ## User Experience (UX)

  ### Initial Discussion

  This website aims to craft a user-led story by providing detailed descriptions of each scene and offering the player choices that can either drive the story forward, change future outcomes by collecting items or end in a game over screen.

  #### Key Areas Covered

    - A website design that reflects the near-future setting of the game.
    - Background images which give the user an idea of the scene they are currently in.
    - A number of choices for the player to make in order to drive the story forward.
        - These will be presented as clickable buttons using Javascript to change to the appropriate scene after clicking.
    - An ending screen (either good or bad) which reflects the player's path through the story and includes a button to restart from the beginning.

## User Stories

### Client Goals

- To be able to view the site on a range of device sizes.
- To make it easy for users to understand what the site is about.
- To make the design and layout visually appealing to maintain interest.
- To allow users to craft their own story utilising choices they make.

### First Time Visitor Goals

- I want to quickly and clearly find out what the site is about.
- I want to be able to navigate the site easily.
- I want to be able to make meaningful choices to propel the story forward.
- I want to be able to start again from the beginning in order to make different choices.

### Returning Visitor Goals

- I want to have a new experience by making different choices.

---

## Design

The website uses many typical "cyberpunk" design choices - The background images contrast a grungy, dirty cityscape with bright neon pink and blue hues while the main game area is made to look like an old-school computer terminal with a dot matrix font and typing animations.

### Typography

Google Fonts was used for the following fonts:

  - Dot-gothic is used for most text on the site. It is a sans-serif font.
  - Tektur is used for the choice button text. It is a sans-serif font.
  - Rubik Glitch is used for certain interactions. It is a sans-serif font.

### Imagery

Imagery will be AI generated using fooocus and will reflect the gritty, near-future world that the player finds themself in.

### Wireframes

Wireframes were created for mobile and desktop.

[Mobile]

[Desktop]

[Mobile]: docs/wireframes/mm-wireframe-1.png
[Desktop]: docs/wireframes/mm-wireframe-2.png

## Features

The website will be a single page and all navigation will be done through 2-4 "choice" buttons presented to the player. Once a choice is made (button clicked), the scene will change, including the background image, text box and choice buttons.

The player will be able to make choices early on that will affect what other choices will be available to them later on. For example, they can choose to take or leave an item in scene 2 which will determine whether or not they will have another choice to make later on.

Once players reach the end by either completing the story or reaching a GAME OVER screen, they will be presented with a button to restart from the beginning.

Choices can be made either by clicking the buttons or using number keys 1-4.

### Future Implementations

  - Add a soundtrack and sound effects to further immerse the player.

## Accessibility

I have been mindful during coding to ensure that the website is as accessible friendly as possible. I have achieved this by:

  - Using semantic HTML.
  - Using descriptive alt attributes on images on the site.
  - Ensuring that there is a sufficient colour contrast throughout the site.

  ---