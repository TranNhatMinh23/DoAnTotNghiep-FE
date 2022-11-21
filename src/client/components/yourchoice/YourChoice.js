import React from 'react';
import styles from './YourChoice.module.css';

export default function YourChoice(props) {
  return (
    <div>
      {
        props.yourAnswer ?
          <p className={styles.yourAnswer}>
            You have chosen the answer: <span>{props.yourAnswer}</span>
            {props.isCorrect ?
              <i className={['fa', 'fa-check', styles.correct].join(' ')}></i>
              :
              <i className={['fa', 'fa-close', styles.incorrect].join(' ')}></i>}
          </p>
          :
          <p className={[styles.incorrect, styles.emptyMessage].join(' ')}>You have not chosen any answer</p>
      }
    </div>
  )
}