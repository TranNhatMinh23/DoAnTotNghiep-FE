import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { Table, Tag, Button, Icon } from 'antd';
import Column from 'antd/lib/table/Column';
import styles from './UsersManagementIndex.module.css';
import { Link } from 'react-router-dom';
import ModalDeleteUser from '../detail/modal-delete/ModalDeleteUser';
import * as defineConst from '../../../../constants/defineConst';
import { withTranslation } from 'react-i18next';

class UsersManagementTable extends Component {
  state = {
    visible: false,
    userDelete: null,
    sortedInfo: null,
    currentSelectedItem: null
  }

  onDeleteUser = (user) => {
    this.setState({
      visible: true,
      userDelete: user
    })
  }

  onCloseDialog = () => {
    this.setState({
      visible: false
    })
  }

  toggleActiveUserStatus = (id) => {
    this.setState({
      currentSelectedItem: id
    }, () => {
      this.props.toggleActiveUserStatus(id);
    });
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  };

  tagName = (role) => {
    switch (role.name) {
      case "Admin":
        return <Tag color="green">{role.description}</Tag>
      case "Manager":
        return <Tag color="purple">{role.description}</Tag>
      default:
        return <Tag color="blue">{role.description}</Tag>
    }
  }

  render() {
    const { listAllUsers, t, isLoading } = this.props;
    let { visible, userDelete, sortedInfo, currentSelectedItem } = this.state;
    sortedInfo = sortedInfo || {};
    
    return (
      <>
        <Table 
          rowKey="id" 
          dataSource={listAllUsers} 
          onChange={this.handleChange} 
          pagination={{ 
            defaultPageSize: defineConst.INDEX_PAGE_SIZE_DEFAULT, 
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS, 
            showSizeChanger: true 
          }}
        >
          <Column title="#" key="#" render={(text, record, index) => index + 1} />
          <Column title={t('name')} dataIndex="name" sorter={(a, b) => a.name.length - b.name.length} sortOrder={sortedInfo.columnKey === 'name' && sortedInfo.order} key="name" />
          <Column title="Email" dataIndex="email" sorter={(a, b) => a.email.length - b.email.length} sortOrder={sortedInfo.columnKey === 'email' && sortedInfo.order} key="email" />
          <Column title={t('gender')} dataIndex="gender" render={gender => gender ? gender : "---"} sorter={(a, b) => a.email.length - b.email.length} key="gender" />
          <Column title={t('company')} dataIndex="company.name" sorter={(a, b) => a.length - b.length} sortOrder={sortedInfo.columnKey === 'company' && sortedInfo.order} key="company" />
          <Column
            title={t('role')} dataIndex="role" key="role"
            sorter={(a, b) => a.role.name.length - b.role.name.length}
            sortOrder={sortedInfo.columnKey === 'role' && sortedInfo.order}
            render={(role, i) => (
              <span key={i}> 
                {this.tagName(role)}
              </span>
            )}
          />
          <Column
            width={130}
            title={t('status')} dataIndex="active_status" key="active_status"
            sorter={(a, b) => a.active_status - b.active_status}
            sortOrder={sortedInfo.columnKey === 'active_status' && sortedInfo.order}
            render={(active_status, row) => (
              <span key={active_status}>
                <Tag onClick={() => this.toggleActiveUserStatus(row.id)} className={styles.tagActiveUser} color={active_status === true ? "#87d068" : "#f50"} key={active_status}>
                  {isLoading && currentSelectedItem === row.id && <Icon type="loading" spin />}&nbsp;{active_status === true ? t('_active') : t('_disabled') }
                </Tag>
              </span>
            )}
          />
          <Column
            title={t('action')} dataIndex="id" key="action"
            render={(userId, row) => (
              <span>
                <Link to={`/users-management/edit-user/${userId}`}>
                  <Button type="primary" size="small"><Icon type="edit" /></Button>
                </Link>&nbsp;
                <Button onClick={() => this.onDeleteUser(row)} type="danger" size="small"><Icon type="delete" /></Button>
              </span>
            )}
          />
        </Table>
        {visible && <ModalDeleteUser visible={visible} userDelete={userDelete} onCloseDialog={this.onCloseDialog} />}
      </>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.userReducer.isUpdatingStatus,
  err: state.userReducer.err,
  message: state.userReducer.message,
});

const mapDispatchToProps = dispatch => ({
  toggleActiveUserStatus: (userId) => dispatch(actions.toggleActiveUserStatus(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UsersManagementTable));