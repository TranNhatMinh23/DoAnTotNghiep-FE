import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './ViewAudio.module.css';

class ViewAudio extends Component {
  constructor(props) {
    super(props);
    this.refAudio = React.createRef();
    this.state = {
      isPlayingAudio: false,
    }
  }

  onPlayAudio = () => {
    this.setState({
      isPlayingAudio: true,
    }, () => {
      this.refAudio.play();
    })
  }

  render() {
    const { audio } = this.props;
    return (
      <div className={styles.fullTestAudioWrapper} id="audio"> 
        <Button shape="circle" onClick={this.onPlayAudio}>
          <i className={`fa ${this.state.isPlayingAudio ? 'fa-volume-up' : 'fa-play-circle-o'}`}></i>
        </Button>
        <audio id="audioTesting" ref={(input) => { this.refAudio = input }}>
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