import React, { useState } from "react";
import styles from "./OpeningLore.module.css";
import { combineClassNames } from "../../util";
import { useMediaQuery } from "react-responsive";

export default function OpeningLore(props) {
  const isWideEnough = useMediaQuery({
    query: "(min-width: 900px)",
  });
  const [hideWarning, setHideWarning] = useState(false);

  return (
    <>
      <div
        className={combineClassNames(
          styles.openingLoreContainer,
          styles.wideLoreContainer,
          !isWideEnough && !hideWarning && styles.hidden
        )}
      >
        <div className={styles.openingLoreIntro}>
          <div className={styles.instructionsContainer}>
            Hello, and welcome to{" "}
            <span className={styles.emphasized}>CSS Hell</span>, where you will
            be subjected to 15 unimaginably torturous CSS puzzles. "What did I
            do to deserve this?", you ask. But you know perfectly well: you
            blasphemed Cascading Style Sheets. I saw that time your friends were
            complaining about CSS and you piled on with "CSS isn't even a{" "}
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
            hole, and each peg must overlap (even just a little) with its
            corresponding hole. To accomplish this, you will add CSS properties
            to certain divs. Click on any div to see its properties and add your
            own. All divs have a limit on the number of properties that can be
            added (usually just one or two), and some are "locked" (no
            properties can be added). In general, <i>any</i> CSS property is
            allowed, with a few exceptions that you may stumble across. For that
            reason, I would recommend keeping the{" "}
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
      <div
        className={combineClassNames(
          styles.openingLoreContainer,
          styles.skinnyLoreContainer,
          (isWideEnough || hideWarning) && styles.hidden
        )}
      >
        <div className={styles.openingLoreIntro}>
          <div className={styles.instructionsContainer}>
            Welcome to CSS Hell, the puzzle game for CSS masochists! So, when I
            made this site as a birthday gift in 2023, I didn't design it for
            smaller screens, so I would recommend opening this site on a
            desktop. If you want to try anyway, though, don't let me stop you.
            <br />
            <br />
            In the meantime, enjoy this gameplay screenshot:
            <br />
            <br />
            <div className={styles.imageContainer}>
              <img
                src="/preview.png"
                alt="A screenshot of the gameplay"
                width="90%"
              />
            </div>
            <br />
            <button
              onClick={() => setHideWarning(true)}
              className={styles.doneButton}
            >
              try me
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
