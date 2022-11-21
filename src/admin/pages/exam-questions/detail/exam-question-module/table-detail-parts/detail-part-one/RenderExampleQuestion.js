import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions/index';
import loadingGif from '../../../../../../assets/icons/spinner2.gif';
import { Button, Icon, message, Radio } from 'antd';
import styles from './RenderExampleQuestion.module.css';
import { listFourOption } from '../../../../../../../constants/numberOption';
import { withTranslation } from 'react-i18next';

class RenderExampleQuestion extends Component {
  state = {
    currentFile: null,
    answerKeyExample: this.props.partInfo.ex_answer_key ? this.props.partInfo.ex_answer_key : ''
  }

  changeImageExample = (e) => {
    let partId = this.props.partInfo.id;
    let files = e.target.files;
    if (files) {
      this.setState({ currentFile: files }, () => {
        this.props.uploadExampleImage(partId, files[0]);
      });
    } else {
      message.error("No files!");
    }
  }

  deleteExampleImage = () => {
    let partId = this.props.partInfo.id;
    this.props.deleteExampleImage(partId);
  }

  onChangeAnswerExample = (e) => {
    let value = e.target.value;
    this.setState({
      answerKeyExample: value
    }, () => {
      let partId = this.props.partInfo.id;
      let data = {
        ex_answera: "A",
        ex_answerb: "B",
        ex_answerc: "C",
        ex_answerd: "D",
        ex_answer_key: this.state.answerKeyExample
      };
      this.props.updateAnswerExample(partId, data);
    });
  }

  render() {
    let { answerKeyExample } = this.state;
    const { t } = this.props;
    return (
      <>
        <div className={`row ${styles.displayImage}`}>
          <div className="col-md-12 image-preview">
            {
              this.props.isUploadExampleImage ?
                <div className="dialog-image">
                  <img className="img-loading" src={loadingGif} alt="" />
                </div>
                : this.props.partInfo.ex_question_image ?
                  <div className="dialog-image">
                    <img id="Image0" src={process.env.REACT_APP_URL_API + this.props.partInfo.ex_question_image} alt="" />
                    <p className="close-classic" onClick={this.deleteExampleImage}></p>
                  </div>
                  : ''
            }
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <input
              id="upload-image-example"
              accept="image/*"
              onChange={this.changeImageExample}
              className="input-file"
              type="file"
            />
            <Button type="primary">
              <label htmlFor="upload-image-example" className="lb-input-file">
                <Icon type="upload" /> {t('uploadImage')}
              </label>
            </Button>
          </div>
          <div className={`col-md-6 group-btn-radio ${styles.displayImage} ${styles.answerExample}`}>
            <span>Sample Answer:</span>
            <Radio.Group onChange={this.onChangeAnswerExample} value={answerKeyExample}>
              {listFourOption.map(item => {
                return <Radio key={item.id} value={item.value}>{item.value}.</Radio>
              })}
            </Radio.Group>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  isUploadExampleImage: state.detailPartReducer.isUploadExampleImage,
  err: state.detailPartReducer.err,
  message: state.detailPartReducer.message
});

const mapDispatchToProps = dispatch => ({
  uploadExampleImage: (partId, files) => dispatch(actions.uploadExampleImage(partId, files)),
  deleteExampleImage: (partId) => dispatch(actions.deleteExampleImage(partId)),
  updateAnswerExample: (partId, data) => dispatch(actions.updateAnswerExample(partId, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(RenderExampleQuestion));