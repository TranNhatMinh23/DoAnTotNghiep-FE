import React from 'react';
import styles from './TitleFrame.module.css';

function TitleFrame(props) {
  return (
    <div className={styles.titleFrame}>
      <span>
        {props.children}
      </span>
      {props.description && <p>- {props.description}</p>}
    </div>
  )
}

export default TitleFrame;