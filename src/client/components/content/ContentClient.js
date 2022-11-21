import React from 'react';
import styles from './ContentClient.module.css';

function ContentClient(props) {
  return (
    <section className={`container ${styles.contentClient}`}>
      {props.children}
    </section>
  )
}

export default ContentClient;