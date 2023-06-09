import React, { useEffect, useRef, useState } from "react";
import styles from "./MemoryScreen.module.css";
import { combineClassNames } from "../../util";

export default function MemoryScreen(props) {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [doneListening, setDoneListening] = useState(true);
  const [noneDisplay, setNoneDisplay] = useState(true);
  const [invisible, setInvisible] = useState(true);

  const playAudio = () => {
    if (audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  const audioEnded = () => {
    setDoneListening(true);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (props.showMemory) {
      if (noneDisplay) {
        setNoneDisplay(false);
        setTimeout(() => setInvisible(false), 0.5 * 1000);
      }
    } else {
      if (!noneDisplay) {
        setInvisible(true);
        setTimeout(() => setNoneDisplay(true), 3 * 1000);
      }
    }
  }, [noneDisplay, props.showMemory]);

  return (
    <>
      <div
        className={combineClassNames(
          styles.memoryFullScreenContainer,
          !noneDisplay && styles.visible,
          !invisible && styles.opaque
        )}
      >
        <audio
          controls="controls"
          ref={audioRef}
          onEnded={audioEnded}
          className={styles.audioElement}
        >
          <source src={props.audioSource} />
        </audio>
        <div className={styles.memoryText}>{props.memoryText}</div>
        <div className={styles.monkeyText}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c ".
          <br />
          \_&nbsp;&nbsp;&nbsp;/A\
          <br />
          &nbsp;&nbsp;\_| ||
        </div>
        <button
          className={combineClassNames(
            styles.playMemory,
            !isPlaying && styles.playMemoryClickable
          )}
          onClick={playAudio}
          disabled={isPlaying}
        >
          {isPlaying
            ? "playing memory..."
            : doneListening
            ? "replay memory"
            : "play memory"}
        </button>
        <div
          className={combineClassNames(
            styles.nextLevelButtonContainer,
            !doneListening && styles.invisible
          )}
        >
          <button
            className={styles.nextLevelButton}
            onClick={props.readyForNextLevel}
          >
            <span
              className={combineClassNames(
                "material-symbols-outlined",
                styles.rightIcon
              )}
            >
              start
            </span>
            level {props.nextLevel}
          </button>
        </div>
      </div>
    </>
  );
}
