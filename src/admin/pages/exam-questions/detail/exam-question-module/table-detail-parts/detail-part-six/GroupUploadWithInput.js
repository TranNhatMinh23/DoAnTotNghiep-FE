import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styles from './GroupUploadWithInput.module.css';
import { Input } from 'antd';
import UploadParagraphImage from '../../../../../../components/common/upload-paragraph-image/UploadParagraphImage';

class GroupUploadWithInput extends PureComponent {
  render() {
    const { question } = this.props;
    return (
      <div className={styles.wrapperGroupQuestion}>
        <div className="row">
          <div className="col-md-12">
            <UploadParagraphImage question={question} paragraphNo="1" />
          </div>
          <div className={`col-md-12 ${styles.groupDecriptionQuestion}`}>
            <span>Question {`${question.question_no} - ${question.question_no + 3}`}</span>
            <Input 
              onChange={(e) => this.props.onChangeGroupDescription(e, question.id)}  
              defaultValue={question.group_desc ? question.group_desc : "refer to the following"} 
              />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  err: state.detailPartReducer.err,
  message: state.detailPartReducer.message,
  detailTestModule: state.detailPartReducer.detailTestModule,
  partInfo: state.detailPartReducer.partInfo,
  isLoadingUploadImage: state.detailPartReducer.isLoadingUploadImage,
}); 

export default connect(mapStateToProps, null)(GroupUploadWithInput);