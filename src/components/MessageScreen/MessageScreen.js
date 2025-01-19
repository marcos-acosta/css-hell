import React, { useEffect, useState } from "react";
import styles from "./MessageScreen.module.css";
import { combineClassNames } from "../../util";

export default function MessageScreen(props) {
  const { messageData, moveToNextLevel, isLastLevel } = props;
  const { message } = messageData;

  const [showMessage, setShowMessage] = useState(!isLastLevel);

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
        <div className={styles.message}>{message}</div>
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
      </div>
    </div>
  );
}
