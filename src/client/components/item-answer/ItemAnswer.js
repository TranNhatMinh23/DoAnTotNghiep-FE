import React from 'react';
import styles from './ItemAnswer.module.css';

export default function ItemAnswer(props) {
  return (
    <p className={`${props.correct ? styles.correct : ''} ${styles.ItemAnswer}`}>
      ({props.answerLabel}). {props.answerText}
    </p>
  )
}

