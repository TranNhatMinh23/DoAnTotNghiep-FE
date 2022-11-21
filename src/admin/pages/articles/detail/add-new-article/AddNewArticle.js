import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../../../components/loading/Loading';
import * as actions from '../../../../../store/actions/index';
import CKEditor from 'react-ckeditor-component';
import { Form, Input, Button, Select, Row, Col, Icon } from 'antd';
import CustomPageHeader from '../../../../components/common/custom-page-header/CustomPageHeader';
import styles from './AddNewArticle.module.css';
import {
  emptyMessage,
} from '../../../../../constants/validateInputMessage';
import TextArea from 'antd/lib/input/TextArea';
import WidgetPage from '../../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';

class AddNewArticle extends Component {
  state = {
    imageExamPreview: null,
    imageFile: null,
    content: ''
  };

  componentDidMount() {
    this.props.getAllCategory();
  }

  changeImageExamPreview = (e) => {
    let file = e.target.files[0];
    if (file) {
      this.setState({
        imageExamPreview: URL.createObjectURL(file),
        imageFile: file,
      });
    }
  }

  onChangeEditor = (event) => {
    var newContent = event.editor.getData();
    this.setState({
      content: newContent
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {
          title: values.title,
          content: this.state.content,
          description: values.description,
          category_id: values.category_id,
          image_preview: this.state.imageFile
        };
        this.props.createNewArticle(data);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, listAllCategories, t } = this.props;
    const { imageExamPreview, content } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 3 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        md: {
          offset: 3
        },
        sm: {
          span: 16,
          offset: 3,
        },
      },
    };

    if (!listAllCategories) {
      return <Loading />;
    } else {
      return (
        <WidgetPage>
          <CustomPageHeader to="/articles" title={t('addNewArticle')} />    
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className={styles.addUserForm}>
            <Row>
              <Col sm={24} md={24}>
                <Form.Item label={t('category')}>
                  {getFieldDecorator('category_id', {
                    rules: [
                      { required: true, message: emptyMessage("Category") }
                    ]
                  })(
                    <Select 
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {listAllCategories.map(category => {
                        return <Select.Option key={category.id} value={category.id}>{category.name} - <i style={{fontSize: '12px'}}>{category.description}</i></Select.Option>;
                      })}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label={t('title')}>
                  {getFieldDecorator('title', {
                    rules: [
                      { required: true, message: emptyMessage("Title") },
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label={t('description')}>
                  {getFieldDecorator('description', {
                    rules: [
                      { required: true, message: emptyMessage("Description") }
                    ]
                  })(<TextArea rows={3} />)}
                </Form.Item>
                <Form.Item label={t('content')}>
                  {getFieldDecorator('content')(
                    <CKEditor
                      activeClass="p10" 
                      content={content}
                      events={{
                        "change": this.onChangeEditor
                      }}
                    />
                  )}
                </Form.Item>
                <Form.Item label={t('previewImage')}>
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
                  {
                    imageExamPreview &&
                    <img className={styles.imagePreview} id="ImageExamPreview" src={imageExamPreview} alt="" />
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
      )
    }
  }
}

const WrappedAddNewArticle = Form.create({ name: 'add_new_article' })(AddNewArticle);

const mapStateToProps = state => ({
  listAllCategories: state.categoryReducer.listAllCategories,
  isLoading: state.articlesReducer.isLoadingCreate,
  err: state.articlesReducer.err,
  message: state.articlesReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllCategory: () => dispatch(actions.getAllCategory()),
  createNewArticle: (data) => dispatch(actions.createNewArticle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedAddNewArticle));