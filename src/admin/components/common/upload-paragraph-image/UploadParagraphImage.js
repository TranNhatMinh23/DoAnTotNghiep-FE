import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { Button, Icon, message } from 'antd';
import loadingGif from '../../../../assets/icons/spinner2.gif';
import styles from './UploadParagraphImage.module.css';
import { withTranslation } from 'react-i18next';

class UploadParagraphImage extends Component {
  state = {
    idQuestionFocus: null
  }

  changeImageQuestion = (e, questionId) => {
    let files = e.target.files;
    const { paragraphNo } = this.props;
    if (files) {
      this.setState({ idQuestionFocus: questionId }, () => {
        this.props.uploadParagraphImage(questionId, paragraphNo, files[0]);
      });
    } else {
      message.error("No files!");
    }
  }

  deleteParagraphImage = (questionId) => {
    const { paragraphNo } = this.props;
    this.props.deleteParagraphImage(questionId, paragraphNo);
  }

  render() {
    const { isUploadParagraphImage, question, paragraphNo, t } = this.props;
    const { idQuestionFocus } = this.state;
    return (
      <Fragment>
        <div className={`row ${styles.displayImage}`}>
          <div className="col-md-12 image-preview">
            {
              (isUploadParagraphImage && idQuestionFocus === question.id) ?
                <div className="dialog-image">
                  <img className="img-loading" src={loadingGif} alt="" />
                </div>
                : question[`paragraph_image${paragraphNo}`] ?
                  <div className="dialog-image">
                    <img id={`Image${question.id}`} src={process.env.REACT_APP_URL_API + question[`paragraph_image${paragraphNo}`]} alt="" />
                    <p className="close-classic" onClick={() => this.deleteParagraphImage(question.id)}></p>
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
              <Icon type="upload" /> {t('uploadImage')}
            </label>
          </Button>
        </p>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isUploadParagraphImage: state.detailPartReducer.isUploadParagraphImage,
  err: state.detailPartReducer.err,
  message: state.detailPartReducer.message
});

const mapDispatchToProps = dispatch => ({
  uploadParagraphImage: (questionId, paragraphNo, files) => dispatch(actions.uploadParagraphImage(questionId, paragraphNo, files)),
  deleteParagraphImage: (questionId, paragraphNo) => dispatch(actions.deleteParagraphImage(questionId, paragraphNo))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UploadParagraphImage));