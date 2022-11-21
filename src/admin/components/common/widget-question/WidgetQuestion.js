import React, { Component } from 'react';
import styles from './WidgetQuestion.module.css';

export default class WidgetQuestion extends Component{
  render(){
    return(
      <div className={styles.widget}>
        {this.props.children}
      </div>
    );
  }
}