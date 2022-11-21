import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BackLink.module.css';

export default function BackLink(props){
  return(
    <Link to={props.linkTo} className={styles.backLink}>
      <i className="fa fa-arrow-left"></i>&nbsp; Back
    </Link>
  )
}