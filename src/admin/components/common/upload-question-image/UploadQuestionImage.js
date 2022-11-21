import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { Button, Icon, message } from 'antd';
import loadingGif from '../../../../assets/icons/spinner2.gif';
import styles from './UploadQuestionImage.module.css';

class UploadQuestionImage extends Component {
  state = {
    idQuestionFocus: null,
    currentFile: null
  }

  changeImageQuestion = (e, questionId) => {
    let files = e.target.files;
    if (files) {
      this.setState({ currentFile: files, idQuestionFocus: questionId }, () => {
        this.props.uploadQuestionImage(questionId, files[0]);
      });
    } else {
      message.error("No files!");
    }
  }

  deleteQuestionImage = (questionId) => {
    this.props.deleteQuestionImage(questionId);
  }

  render() {
    const { isUploadQuestionImage, question } = this.props;
    const { idQuestionFocus } = this.state;
    return (
      <Fragment>
        <div className={`row ${styles.displayImage}`}>
          <div className="col-md-12 image-preview">
            {
              (isUploadQuestionImage && idQuestionFocus === question.id) ?
                <img className="loading-icon" src={loadingGif} alt="" />
                : question.question_image ?
                  <div className="dialog-image">
                    <img id={`Image${question.id}`} src={process.env.REACT_APP_URL_API + question.question_image} alt="" />
                    <p className="close-classic" onClick={() => this.deleteQuestionImage(question.id)}></p>
                  </div>
                  : ''
            }
          </div>
        </div>
        <p>
          <input
            id={`upload-image-${question.id}`}
            accept="image/*"
            onChange={(e) => this.changeImageQuestion(e, question.id)}
            className="input-file"
            type="file"
          />
          <Button type="primary">
            <label htmlFor={`upload-image-${question.id}`} className="lb-input-file">
              <Icon type="upload" /> Upload image
            </label>
          </Button>
        </p>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isUploadQuestionImage: state.detailPartReducer.isUploadQuestionImage,
  err: state.detailPartReducer.err,
  message: state.detailPartReducer.message
});

const mapDispatchToProps = dispatch => ({
  uploadQuestionImage: (questionId, files) => dispatch(actions.uploadQuestionImage(questionId, files)),
  deleteQuestionImage: (questionId) => dispatch(actions.deleteQuestionImage(questionId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadQuestionImage);