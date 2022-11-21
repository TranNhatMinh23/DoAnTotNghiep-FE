import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions/index';
import { Input } from 'antd';
import styles from './GroupButtonAndInpuForFirst.module.css';
import loadingGif from '../../../../../../assets/icons/spinner2.gif';
import UploadImage from './UploadImage';

class GroupButtonAndInpuForFirst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listImageForFirstQuestionGroup: [
        { id: 1, value: this.props.question.paragraph_image1 },
        { id: 2, value: this.props.question.paragraph_image2 },
        { id: 3, value: this.props.question.paragraph_image3 }
      ],
      imageFocus: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentQuestion = nextProps.question;
    let data = [
      { id: 1, value: currentQuestion.paragraph_image1 },
      { id: 2, value: currentQuestion.paragraph_image2 },
      { id: 3, value: currentQuestion.paragraph_image3 }
    ];

    this.setState({
      listImageForFirstQuestionGroup: data,
    });

  }

  changeImageFromClient = (e, paragraphNo) => {
    const questionId = this.props.question.id;
    let files = e.target.files;
    if (files.length === 1) {
      this.setState({ imageFocus: questionId + '-' + paragraphNo }, () => {
        this.props.uploadParagraphImage(questionId, paragraphNo, files[0]);
      });
    }
  }

  deleteParagraphImage = (paragraphNo) => {
    const questionId = this.props.question.id;
    this.setState({ imageFocus: questionId + '-' + paragraphNo }, () => {
      this.props.deleteParagraphImage(questionId, paragraphNo);
    });
  }

  render() {
    const { listImageForFirstQuestionGroup } = this.state;
    const { question } = this.props;
    return (
      <div className="row">
        <div className="col-md-12 image-preview">
          {
            listImageForFirstQuestionGroup.map(item => {
              return (
                (this.props.isUploadParagraphImage && this.state.imageFocus === `${question.id + '-' + item.id}`) ?
                  <div className="dialog-image" key={item.id}>
                    <img className="img-loading" src={loadingGif} alt="" />
                  </div>
                  : item.value ?
                    <div className="dialog-image" key={item.id}>
                      <img id={`Image${question.id + '-' + item.id}`} src={process.env.REACT_APP_URL_API + item.value} alt="" />
                      <span className="index-image">{item.id}</span>
                      <p className="close-classic" onClick={() => this.deleteParagraphImage(item.id)}></p>
                    </div>
                    : ''
              )
            })
          }
        </div>
        <div className={`col-md-12 ${styles.groupButtonUploadImage}`}>
          {listImageForFirstQuestionGroup.map(item => {
            return (
              <UploadImage
                key={item.id}
                item={item}
                imageFocus={this.state.imageFocus}
                questionId={question.id}
                changeImageFromClient={this.changeImageFromClient}
              />
            )
          })}
        </div>
        <div className={`col-md-12 ${styles.groupDecriptionQuestion}`}>
          <Input
            onChange={(e) => this.props.onChangeGroupDescription(e, question.id)}
            defaultValue={question.group_desc}
            placeholder="Input group description"
          />
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupButtonAndInpuForFirst);