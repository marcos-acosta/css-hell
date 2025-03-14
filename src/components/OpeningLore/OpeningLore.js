import React from "react";
import styles from "./OpeningLore.module.css";

export default function OpeningLore(props) {
  return (
    <>
      <div className={styles.openingLoreContainer}>
        <div className={styles.openingLoreIntro}>
          <div className={styles.instructionsContainer}>
            Hello, and welcome to{" "}
            <span className={styles.emphasized}>CSS Hell</span>, where you will
            be subjected to 15 unimaginably torturous CSS puzzles. "What did I
            do to deserve this?", you ask. But you know perfectly well: you
            blashpemized Cascading Style Sheets. I saw that time your friends
            were complaining about CSS and you piled on with "CSS isn't even a{" "}
            <i>real</i> programming language". It is. I saw you upvote that{" "}
            <a
              href="https://www.reddit.com/r/ProgrammerHumor/comments/8igmxy/whenever_i_try_vertically_centering_anything/"
              target="_blank"
              rel="noreferrer"
            >
              Reddit meme
            </a>{" "}
            about vertically aligning a div. Just use a flexbox. I saw you
            chuckle sensibly at those{" "}
            <a
              href="https://css-tricks.com/css-is-awesome/"
              target="_blank"
              rel="noreferrer"
            >
              CSS Is Awesome
            </a>{" "}
            designs. I couldn't stand to let Håkon Wium Lie's divine creation be
            slandered in this way, so I decided to show the nonbelievers like
            you the wrath of CSS's unhinged power.
            <br />
            <br />
            The mechanics of the puzzles are simple: for each peg, there is a
            hole, and each peg must overlap with its corresponding hole. To
            accomplish this, you will add CSS properties to certain divs. Click
            on any div to see its properties and add your own. All divs have a
            limit on the number of properties that can be added (usually just
            one or two), and some are "locked" (no properties can be added). In
            general, <i>any</i> CSS property is allowed, with a few exceptions
            that you may stumble across. For that reason, I would recommend
            keeping the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS"
              target="_blank"
              rel="noreferrer"
            >
              MDN CSS Reference
            </a>{" "}
            handy. There is also a hint button and, should you require mercy,
            solutions can be found in the{" "}
            <a
              href="https://github.com/marcos-acosta/code-monkey-game/blob/main/solutions.md"
              target="_blank"
              rel="noreferrer"
            >
              GitHub repository
            </a>
            . I've tested each puzzle on Safari, Firefox, and Chrome (Safari
            requires version 17). You'll never need to open up the developer
            console or modify the page directly.
            <br />
            <br />
            Thus concludes my monologue. Good luck; you'll need it.
          </div>
          <button onClick={props.toMainMenu} className={styles.doneButton}>
            begin →
          </button>
        </div>
      </div>
      <div className={styles.tooSmallContainer}>
        <div className={styles.tooSmallBox}>
          <div className={styles.tooSmallTitle}>Your viewport concerns me.</div>
          <div className={styles.tooSmallBody}>
            Hey! You're seeing this message because of your screen-
            specifically, the width of it. I'm hyped you're here, but this game
            wasn't designed for small screens, and you will <i>not</i> enjoy
            attempting it. I mean, would you write code on your phone? Actually,
            don't answer, because I don't want to know. Anyway, hope to see you
            soon on a desktop.
          </div>
          <div>-Marcos</div>
        </div>
      </div>
    </>
  );
}
