import React from 'react';
import styles from './ExamClock.module.css';

function ExamClock(props) {
  return (
    <div className={styles.timerExamerWrapper}>
      <p>{props.time.h + ' h : '+ props.time.m + ' m : '+ props.time.s+' s'}</p>
    </div>
  )
}

export default ExamClock;