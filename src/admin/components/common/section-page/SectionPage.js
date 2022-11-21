import React from 'react';
import styles from './SectionPage.module.css';

export default function SectionPage(props){
  return (
    <section className={styles.section}>
      {props.children}
    </section>
  )
}
