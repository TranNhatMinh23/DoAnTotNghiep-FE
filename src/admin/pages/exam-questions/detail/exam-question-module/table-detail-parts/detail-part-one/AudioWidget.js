import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions/index';
import styles from './AudioWidget.module.css';
import { Button, Icon } from 'antd';

class AudioWidget extends Component {

  onUploadAudioFromClient = (e) => {
    let files = e.target.files;
    this.props.uploadAudioForTest(this.props.examQuestionId, files[0]);
  }

  render(){
    const { isUploading, audio} = this.props;
    return (
      <div className={`row ${styles.widgetAudio}`}>
          <div className={`col-md-12 ${styles.uploadAudioBtn}`}>
            <input
              id="upload-audio"
              multiple
              accept="audio/*"
              onChange={(event) => this.onUploadAudioFromClient(event)}
              className="input-file"
              type="file"
            />
            <Button type="primary">
              <label htmlFor="upload-audio" className="lb-input-file">
                <Icon type="sound" /> Upload audio
              </label>
            </Button>
          </div>
          <div className={`col-md-12 ${styles.audioPreview}`}>
            {
              isUploading ?
                <i className="fa fa-spinner fa-spin fa-fw"></i>
                :
                <audio
                  controls>
                  <source src={audio ? process.env.REACT_APP_URL_API + audio : ''}></source>
                </audio>
            }
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  isUploading: state.examquestionReducer.isUploadingAudio,
  err: state.examquestionReducer.err,
  message: state.examquestionReducer.message
});

const mapDispatchToProps = dispatch => ({
  uploadAudioForTest: (examQuestionId, files) => dispatch(actions.uploadAudioForTest(examQuestionId, files))
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioWidget);