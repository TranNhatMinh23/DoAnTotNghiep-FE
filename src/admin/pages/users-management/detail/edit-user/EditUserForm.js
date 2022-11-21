import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import { Form, Input, Button, Radio } from 'antd';
import CustomPageHeader from '../../../../components/common/custom-page-header/CustomPageHeader';
import styles from './EditUserForm.module.css';
import { emptyMessage, incorrectEmailFormat } from '../../../../../constants/validateInputMessage';
import avatarDefault from '../../../../../assets/avatars/default.jpg';
import * as defineConst from '../../../../../constants/defineConst';
import WidgetPage from '../../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';

class EditUserForm extends Component {
  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {
          email: values.email,
          name: values.name,
          gender: values.gender,
          role_id: values.role_id,
        };
        this.props.editUserInfo(this.props.detailUser.id, data);
      }
    });
  };

  _renderInfoUserByRole = (role, info) => {
    switch (role) {
      case defineConst.ROLE_ADMIN:
        return <p>{this.props.t('admin')}</p>;
      case defineConst.ROLE_COMPANY_MANAGER:
        return <p>{this.props.t('companyManager') + info.name}</p>;
      default:
        return <p>{this.props.t('_member')}</p>;
    }
  }

  _renderAvatarInfo = detailUser => {
    return (
      <div className={styles.infoAvatar}>
        {detailUser.avatar_url ?
          <img id="avatarAdminImg" src={process.env.REACT_APP_URL_API + detailUser.avatar_url} alt="" />
          :
          <img src={avatarDefault} alt="" />
        }
        {this._renderInfoUserByRole(detailUser.role, detailUser.company)}
      </div>
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, detailUser, t } = this.props;
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
          offset: 8,
        },
      },
    };

    return (
      <DocumentTitle title={`Administrator - ${t('editUser')}`}>
        <WidgetPage>
          <CustomPageHeader to="/users-management" title={t('editUser')} subTitle={detailUser.name} />
          <div className="row">
            <div className={`col-md-3 ${styles.displayAvatar}`}>
              {this._renderAvatarInfo(detailUser)}
            </div>
            <div className="col-md-9">
              <Form {...formItemLayout} onSubmit={this.handleSubmit} className={styles.addUserForm}>
                <Form.Item label={t('fullName')}>
                  {getFieldDecorator('name', {
                    rules: [
                      { required: true, message: emptyMessage("Full name") },
                    ],
                    initialValue: detailUser.name,
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Email">
                  {getFieldDecorator('email', {
                    rules: [
                      { type: 'email', message: incorrectEmailFormat },
                      { required: true, message: emptyMessage("Email") }
                    ],
                    initialValue: detailUser.email,
                  })(<Input />)}
                </Form.Item>
                <Form.Item label={t('gender')}>
                  {getFieldDecorator('gender', {
                    rules: [{ required: true, message: emptyMessage("Gender") }],
                    initialValue: detailUser.gender,
                  })(
                    <Radio.Group>
                      <Radio value="male">{t('male')}</Radio>
                      <Radio value="female">{t('female')}</Radio>
                    </Radio.Group>,
                  )}
                </Form.Item>
                <Form.Item label={t('role')}>
                  {getFieldDecorator('role_id', {
                    initialValue: detailUser.role,
                  })(
                    <Radio.Group>
                      <Radio key="1" value={defineConst.ROLE_ADMIN}>Admin</Radio>
                      <Radio key="2" value={defineConst.ROLE_MEMBER}>{t('member')}</Radio>
                    </Radio.Group>
                  )
                  }
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    {t('edit')}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </WidgetPage>
      </DocumentTitle>
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(EditUserForm);

const mapStateToProps = state => ({
  isLoading: state.userReducer.isLoadingEdit,
  err: state.userReducer.err,
  message: state.userReducer.message,
});

const mapDispatchToProps = dispatch => ({
  editUserInfo: (id, data) => dispatch(actions.editUserInfo(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedRegistrationForm));