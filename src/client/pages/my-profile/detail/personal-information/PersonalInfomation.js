import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as actions from '../../../../../store/actions/index';
import styles from './PersonalInfomation.module.css';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Radio,
} from 'antd';
import { emptyMessage } from '../../../../../constants/validateInputMessage';
import { withTranslation } from 'react-i18next';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const buttonItemLayout = {
  wrapperCol: { span: 18, offset: 6 },
};

const dateFormat = 'DD/MM/YYYY';
class PersonalInfomation extends Component {
  state = {
    birthday: this.props.userInfo.birthday
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          name: values.name,
          birthday: this.state.birthday,
          gender: values.gender
        };
        let userId = this.props.userInfo.id;
        this.props.updateInfo(userId, data);
      }
    });
  };

  onChangeBirthday = (date, dateString) => {
    this.setState({
      birthday: dateString
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userInfo, isLoading, t } = this.props;

    return (
      <div className={`user-info-page ${styles.personalInfo}`}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              initialValue: userInfo.email,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label={t('fullName')}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: emptyMessage("Full name") }],
              initialValue: userInfo.name,
            })(
              <Input placeholder="Full name" />,
            )}
          </Form.Item>
          <Form.Item label={t('dateOfBirth')} className={styles.chooseBirthday}>
            {getFieldDecorator('birthday', {
              rules: [{ required: true, message: emptyMessage("Birthday") }],
              initialValue: userInfo.birthday ? moment(userInfo.birthday, dateFormat) : null
            })(<DatePicker onChange={this.onChangeBirthday} className={styles.chooseBirthday} format={dateFormat} />)}
          </Form.Item>
          <Form.Item label={t('gender')}>
            {getFieldDecorator('gender',  {
              rules: [{ required: true, message: emptyMessage("Gender") }],
              initialValue: userInfo.gender,
            })(
              <Radio.Group>
                <Radio value="male">{t('male')}</Radio>
                <Radio value="female">{t('female')}</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit" loading={isLoading}>{t('submit')}</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'PersonalInfomation' })(PersonalInfomation);

WrappedRegistrationForm.propTypes = {
  userInfo: PropTypes.object,
}

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoadingUpdate,
  err: state.authReducer.err,
  message: state.authReducer.message,
});

const mapDispatchToProps = dispatch => ({
  updateInfo: (userId, data) => dispatch(actions.updateInfo(userId, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedRegistrationForm));