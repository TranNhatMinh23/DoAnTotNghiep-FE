import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Form, Icon, Input, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { emptyMessage, incorrectEmailFormat } from '../../../constants/validateInputMessage';
import { withTranslation } from 'react-i18next';

class WrapperContactForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.sendContact(values);
      }
    });
  };

  componentWillReceiveProps(nextProps) { 
    if (nextProps.sendSuccess) { 
      this.props.form.resetFields();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, t } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: emptyMessage("Your name") }]
            })(
              <Input
                prefix={<Icon type="user" />}
                placeholder={t('yourName')}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: emptyMessage("Your email") },
                { type: 'email', message: incorrectEmailFormat },
              ]
            })(
              <Input
                prefix={<Icon type="mail" />}
                placeholder={t('yourMail')}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: emptyMessage("Content") }]
            })(<TextArea placeholder={t('content')} rows="3" />)}
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {t('send')} &nbsp;<i className="fa fa-send-o"></i>
          </Button>
        </Form>
      </div>
    );
  }
}

const ContactForm = Form.create({ name: 'contact_form' })(WrapperContactForm);

const mapStateToProps = state => ({
  isLoading: state.userClientReducer.isLoading,
  sendSuccess: state.userClientReducer.sendSuccess
});

const mapDispatchToProps = dispatch => ({
  sendContact: (data) => dispatch(actions.sendContact(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ContactForm)); 