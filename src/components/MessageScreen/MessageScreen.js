import React, { useEffect, useRef, useState } from "react";
import styles from "./MessageScreen.module.css";
import { combineClassNames } from "../../util";

export default function MessageScreen(props) {
  const { messageData, moveToNextLevel, isLastLevel } = props;
  const { message, showDuringListen, postAudioMessage, audioFileSource } =
    messageData;

  const [isListening, setIsListening] = useState(false);
  const [hasFinishedListening, setHasFinishedListening] = useState(false);
  const [showMessage, setShowMessage] = useState(!isLastLevel);
  const audioRef = useRef();

  const audioEnded = () => {
    setHasFinishedListening(true);
    setIsListening(false);
  };

  const playAudio = () => {
    if (audioRef.current) {
      setIsListening(true);
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (isLastLevel) {
      setTimeout(() => setShowMessage(true), 3 * 1000);
    }
  }, [isLastLevel, setShowMessage]);

  return (
    <div className={styles.messageScreenContainer}>
      <div
        className={combineClassNames(
          styles.defaultMessageVisibility,
          showMessage && styles.messageVisible
        )}
      >
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
          {audioFileSource && (
            <button
              className={combineClassNames(
                styles.playAudioButton,
                isListening && styles.listening
              )}
              onClick={playAudio}
              disabled={isListening}
            >
              {isListening
                ? "listening..."
                : hasFinishedListening
                ? "listen again"
                : "listen"}
            </button>
          )}
        </div>
        {((showDuringListen && isListening) || hasFinishedListening) &&
          postAudioMessage && (
            <div className={styles.postAudioMessage}>{postAudioMessage}</div>
          )}
        {(hasFinishedListening || !audioFileSource) && (
          <button className={styles.nextLevelButton} onClick={moveToNextLevel}>
            <span
              className={combineClassNames(
                "material-symbols-outlined",
                styles.nextLevelSymbol
              )}
            >
              skip_next
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
