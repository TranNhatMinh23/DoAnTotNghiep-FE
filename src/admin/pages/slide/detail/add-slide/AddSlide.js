import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import * as actions from '../../../../../store/actions/index';
import { Form, Button, Row, Col, Icon } from 'antd';
import styles from './AddSlide.module.css';
import {
  emptyMessage,
} from '../../../../../constants/validateInputMessage';
import TextArea from 'antd/lib/input/TextArea';
import WidgetPage from '../../../../components/common/widget-page/WidgetPage';
import CustomPageHeader from '../../../../components/common/custom-page-header/CustomPageHeader';
import { withTranslation } from 'react-i18next';

class AddSlide extends Component {
  state = {
    imageExamPreview: null,
    imageFile: null
  };

  changeImageExamPreview = (e) => {
    let file = e.target.files[0];
    if (file) {
      this.setState({
        imageExamPreview: URL.createObjectURL(file),
        imageFile: file,
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {
          description: values.description,
          slide: this.state.imageFile
        };
        this.props.addSlide(data); 
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, t } = this.props;
    const { imageExamPreview } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 5 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        md: {
          offset: 5
        },
        sm: {
          span: 16,
          offset: 5,
        },
      },
    };

    return (
      <DocumentTitle title={`Administrator - ${t('addNewSlide')}`}>
        <WidgetPage>
          <CustomPageHeader to="/slides" title={t('addNewSlide')} />  
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className={styles.addUserForm}>
            <Row>
              <Col sm={24} md={24}>
                <Form.Item label={t('description')}>
                  {getFieldDecorator('description', {
                    rules: [
                      { required: true, message: emptyMessage("Description") }
                    ]
                  })(<TextArea rows={3} />)}
                </Form.Item>
                <Form.Item label="Slide">
                  {/* <p className={styles.titleCol}>Upload Slide preview</p> */}
                  {getFieldDecorator('slide', {
                    rules: [
                      { required: true, message: emptyMessage("Slide") }
                    ]
                  })(
                    <div>
                      <input
                        id="image-exam-preview"
                        accept="image/*"
                        onChange={this.changeImageExamPreview}
                        className="input-file"
                        type="file"
                      />
                      <Button type="primary">
                        <label htmlFor="image-exam-preview" className={styles.labelInputFile}>
                          <Icon type="upload" /> {t('uploadImage')}
                    </label>
                      </Button>
                    </div>
                  )}
                  {
                    imageExamPreview &&
                    <img className={styles.imgPreview} id="ImageExamPreview" src={imageExamPreview} alt="" />
                  }
                </Form.Item>
              </Col>
            </Row>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
              {t('createNew')}
              </Button>
            </Form.Item>
          </Form>
        </WidgetPage>
      </DocumentTitle>
    )
  }
}

const WrappedAddSlide = Form.create({ name: 'add_slide' })(AddSlide);

const mapStateToProps = state => ({
  isLoading: state.slideReducer.isLoadingCreate,
  err: state.slideReducer.err,
  message: state.slideReducer.message,
});

const mapDispatchToProps = dispatch => ({ 
  addSlide: (data) => dispatch(actions.addSlide(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedAddSlide));