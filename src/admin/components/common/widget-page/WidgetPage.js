import React, { Component } from 'react';
import styles from './WidgetPage.module.css';

class WidgetPage extends Component {
  render() {
    return (
      <div className={styles.widget} style={{borderTopColor: this.props.borderTopColor}}>
        {this.props.children}
      </div>
    );
  }
}

export default WidgetPage;