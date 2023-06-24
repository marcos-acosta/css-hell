import React, { useState } from "react";
import styles from "./OpeningLore.module.css";

export default function OpeningLore(props) {
  const [textStage, setTextStage] = useState(1);

  const incrementTextStage = () => setTextStage((s) => s + 1);

  return (
    <div className={styles.openingLoreContainer}>
      <p>
        You're finally awake. Welcome, Anshul- I've waited a long, long time for
        this day.
      </p>
      {textStage >= 2 && (
        <p>
          Well, I suppose there's no point in drawing out the reveal. You,
          Anshul, have fallen directly into the clutches of...{" "}
          <b>
            <i>THE JUSTIFIER</i>
          </b>
          !
        </p>
      )}
      {textStage >= 3 && <p>...</p>}
      {textStage >= 4 && (
        <p>
          Well, ah, I suppose I'm still a bit *underground* for a mainstream
          audience. No mind. You'll take me seriously once you learn the{" "}
          <i>situation</i> you're in.
        </p>
      )}
      {textStage >= 5 && (
        <p>
          I've captured <i>some large subset</i> of your friends and am holding
          them here as captives! Luckily, saving them is quite simple. All you
          will need to do is a little bit of... styling.
        </p>
      )}
      {textStage >= 6 && (
        <p>
          You see, nothing angers me more than prejudice towards frontend
          engineers, and you've crossed me one too many times. Consequently,
          I've devised my masterstroke:
        </p>
      )}
      {textStage >= 7 && (
        <p>
          You will be faced with a series of levels to be solved with{" "}
          <b>
            <i>CSS only</i>
          </b>
          . Each time you solve a level, I'll let one of your friends free.
          Coincidentally, and completely spontaneously, they have coordinated a
          common theme for something they each want to say to you.
        </p>
      )}
      {textStage >= 8 && (
        <p>
          The great trick, however, is that in choosing to save your friends,
          you will become the very thing you despise most...
        </p>
      )}
      {textStage >= 9 && (
        <p>
          A{" "}
          <b>
            <i>code monkey</i>
          </b>
          .
        </p>
      )}
      {textStage < 9 ? (
        <button onClick={incrementTextStage} className={styles.nextButton}>
          ok...
        </button>
      ) : (
        <button onClick={props.setVisited} className={styles.doneButton}>
          alright
        </button>
      )}
    </div>
  );
}
