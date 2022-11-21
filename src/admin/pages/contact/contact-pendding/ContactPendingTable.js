import React, { Component, Fragment } from 'react';
import { Table, Tag, Button, Icon } from 'antd'; 
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import moment from 'moment';
import ModalDeleteContact from '../modal-delete/ModalDeleteContact';
import Column from 'antd/lib/table/Column';
import ModalDetailContact from '../modal-detail/ModalDetailContact';
import * as defineConst from '../../../../constants/defineConst';
import { withTranslation } from 'react-i18next';

class ContactPendingTable extends Component {
  state = {
    displayDelete: false,
    displayDetail: false,
    detailInfo: null,
    sortedInfo: null
  } 

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  };

  onDeleteContact = (contact) => {
    this.setState({
      displayDelete: true,
      detailInfo: contact
    })
  } 

  onCloseDialog = () => {
    this.setState({
      displayDelete: false,
      displayDetail: false
    })
  }

  onDetailContact = (contact) => {
    this.setState({
      displayDetail: true,
      detailInfo: contact
    })
  }

  changeContactStatus = (id) => {
    this.props.changeContactStatus(id, "Pending");
  }

  render() {
    const { listPenddingContacts, t } = this.props;
    let { sortedInfo, displayDetail, displayDelete, detailInfo } = this.state; 
    sortedInfo = sortedInfo || {};

    return (
      <Fragment>
        <Table 
          rowKey="id" 
          dataSource={listPenddingContacts} 
          onChange={this.handleChange} 
          pagination={{ 
            defaultPageSize: defineConst.INDEX_PAGE_SIZE_DEFAULT, 
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS, 
            showSizeChanger: true 
          }}
        >
          <Column title="#" key="#" render={(text, record, index) => index + 1} />
          <Column title={t('name')} width={200} dataIndex="username" sorter={(a, b) => a.username.length - b.username.length} sortOrder={sortedInfo.columnKey === 'username' && sortedInfo.order} key="username" />
          <Column title={t('content')} dataIndex="content" width={300} key="content" />
          <Column title={t('sentDate')} dataIndex="created_at" render={date => moment(date).format('DD/MM/YYYY, hh:mm:ss A')} sorter={(a, b) => new Date(a.created_at) - new Date(b.created_at)} sortOrder={sortedInfo.columnKey === 'created_at' && sortedInfo.order} key="created_at" />
          <Column
            title={t('status')} dataIndex="status" key="status"
            sorter={(a, b) => a.status - b.status}
            sortOrder={sortedInfo.columnKey === 'status' && sortedInfo.order}
            render={(status, row) => (
              <span key={status}>
                <Tag onClick={() => this.changeContactStatus(row.id)} className="hover-tag" color="#87d068" key={row.id}>
                  {t('pendding')}
                </Tag>
              </span>
            )}
          />
          <Column
            title={t('action')} dataIndex="id" key="action"
            width={120}
            render={(contactId, row) => (
              <span>
                <Button onClick={() => this.onDetailContact(row)} type="primary" size="small"><Icon type="eye" /></Button> &nbsp;
                <Button onClick={() => this.onDeleteContact(row)} type="danger" size="small"><Icon type="delete" /></Button>
              </span>
            )}
          />
        </Table>
        {displayDetail && <ModalDetailContact visible={displayDetail} detailInfo={detailInfo} onCloseDialog={this.onCloseDialog} />}
        {displayDelete && <ModalDeleteContact visible={displayDelete} contactType={detailInfo.status} contactId={detailInfo.id} onCloseDialog={this.onCloseDialog} />}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isLoaded: !state.contactManagementReducer.isUpdating,
  err: state.contactManagementReducer.err,
  message: state.contactManagementReducer.message,
});

const mapDispatchToProps = dispatch => ({
  changeContactStatus: (contactId) => dispatch(actions.changeContactStatus(contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ContactPendingTable));