import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 
import * as actions from '../../../../../store/actions/index';
import styles from './CompanyInfomation.module.css'; 
import {
  Form,
  Input,
  Button 
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
 
class CompanyInfomation extends Component { 

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          name: values.companyName,
          address: values.address,
          phone: values.phone
        };
        let companyId = this.props.userInfo.company && this.props.userInfo.company.id; 
        this.props.updateCompanyInfo(companyId, data);
      }
    });
  }; 
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { userInfo, isLoading, t } = this.props;

    return (
      <div className={`user-info-page row ${styles.personalInfo}`}> 
        <div className="col-md-12">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label={t('companyName')}>
              {getFieldDecorator('companyName', {
                rules: [{ required: true, message: emptyMessage("Company name") }],
                initialValue: userInfo.company && userInfo.company.name,
              })(<Input />)}
            </Form.Item>
            <Form.Item label={t('address')}>
              {getFieldDecorator('address', {
                rules: [{ required: true, message: emptyMessage("Address") }],
                initialValue: userInfo.company && userInfo.company.address,
              })(
                <Input placeholder={t('address')} />,
              )}
            </Form.Item> 
            <Form.Item label={t('phone')}>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: emptyMessage("Phone") }],
                initialValue: userInfo.company && userInfo.company.phone,
              })(
                <Input placeholder={t('phone')} />,
              )}
            </Form.Item>  
            <Form.Item {...buttonItemLayout}>
              <Button type="primary" htmlType="submit" loading={isLoading}>{t('submit')}</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedAccountForm = Form.create({ name: 'CompanyInfomation' })(CompanyInfomation);

WrappedAccountForm.propTypes = {
  userInfo: PropTypes.object,
}

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoadingUpdateCompanyInfo,
  err: state.authReducer.err,
  message: state.authReducer.message,
});

const mapDispatchToProps = dispatch => ({
  updateCompanyInfo: (companyId, data) => dispatch(actions.updateCompanyInfo(companyId, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedAccountForm));