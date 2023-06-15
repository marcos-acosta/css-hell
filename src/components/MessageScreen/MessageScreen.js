import React, { useRef, useState } from "react";
import styles from "./MessageScreen.module.css";

export default function MessageScreen(props) {
  const { message, audioFileSource, moveToNextLevel } = props;

  const [isListening, setIsListening] = useState(false);
  const [hasFinishedListening, setHasFinishedListening] = useState(
    !Boolean(audioFileSource)
  );
  const audioRef = useRef();

  const audioEnded = () => {
    setHasFinishedListening(true);
    setIsListening(false);
  };

  return (
    <div className={styles.messageScreenContainer}>
      {audioFileSource && (
        <audio
          controls="controls"
          ref={audioRef}
          onEnded={audioEnded}
          className={styles.audioElement}
        >
          <source src={audioFileSource} />
        </audio>
      )}
      <div className={styles.message}>{message}</div>
      <div className={styles.audioContainer}>
        <button className={styles.playAudioButton}>
          {isListening
            ? "playing memory..."
            : hasFinishedListening
            ? "replay memory"
            : "play memory"}
        </button>
      </div>
      {hasFinishedListening && (
        <button className={styles.nextLevelButton} onClick={moveToNextLevel}>
          next
        </button>
      )}
    </div>
  );
}
