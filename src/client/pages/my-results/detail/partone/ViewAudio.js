import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import styles from './ViewAudio.module.css';

class ViewAudio extends Component { 
  render() {
    const { audio } = this.props;
    return (
      <div className={styles.fullTestAudioWrapper} id="audio">
        <audio
          controls>
          <source src={process.env.REACT_APP_URL_API + audio}></source>
        </audio> 
      </div>
    );
  }
}

ViewAudio.propTypes = {
  audio: PropTypes.string
};

export default ViewAudio;