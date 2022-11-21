import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import { withTranslation } from 'react-i18next';
import styles from './EmailInviteToExam.module.css';
import { Icon, Table, Button } from 'antd';
import Column from 'antd/lib/table/Column';
import * as defineConst from '../../../../../constants/defineConst';
import ModalDeleteInvitation from '../modal-delete-invitation/ModalDeleteInvitation';
import moment from 'moment';
import SearchComponent from '../../../../components/common/search/Search';
import { searchByEmail } from '../../../../../shared/function';

class EmailInviteToExam extends Component {
  state = {
    visible: false,
    dataDelete: null,
    dataTable: this.props.listEmailInvited
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataTable: nextProps.listEmailInvited
    });
  }

  onDeleteInvitation = (dataInvite) => {
    this.setState({
      visible: true,
      dataDelete: dataInvite
    });
  }

  onCloseDialog = () => {
    this.setState({
      visible: false
    });
  }

  onImportExcelListEmail = (e) => {
    let file = e.target.files[0];
    this.props.importEmailInvitationFile(this.props.examsId, file);
  }

  handleSearch = (searchText = '') => { 
    let matchingData = searchByEmail(this.props.listEmailInvited, searchText); 
    this.setState({
      dataTable: matchingData
    }); 
  }

  render() {
    const { t, isLoading } = this.props;
    const { dataDelete, visible, dataTable } = this.state;

    return (
      <div>
        <div className={styles.titleAndButtonImport}>
          <p className={styles.title}><Icon className={styles.iconTitle} type="border-outer" />{t('listEmailInvitedExam')}</p>
          <div> 
            <Button loading={isLoading} icon="upload" type="default" className={styles.btnImportScoreFile}>
              <label htmlFor="import-list-email-invitation">
                &nbsp;{t('importListEmailInvitation')}
              </label>
            </Button>
            <input
              id="import-list-email-invitation"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={this.onImportExcelListEmail}
              className="input-file"
              type="file"
            /> 
            <SearchComponent placeholder={t('search')} onSearch={this.handleSearch} />
          </div>
        </div>
        <Table
          rowKey="id"
          dataSource={dataTable}
          pagination={{
            defaultPageSize: 30,
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS,
            showSizeChanger: true
          }}
        >
          <Column width={20} title="#" key="#" render={(text, record, index) => index + 1} />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title={t('dateInvite')} dataIndex="created_at" key="created_at" render={date => moment(date).format('HH:mm:ss A - DD/MM/YYYY')} />
          <Column
            width={140}
            title={t('action')} dataIndex="id" key="action"
            align="center"
            render={(item, row) => (
              <Button onClick={() => this.onDeleteInvitation(row)} type="danger" size="small"><Icon type="delete" /></Button>
            )}
          />
        </Table>
        {visible && <ModalDeleteInvitation visible={visible} dataDelete={dataDelete} onCloseDialog={this.onCloseDialog} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.examScheduleReducer.isLoadingImportExcelInvite,
  err: state.examScheduleReducer.err,
  message: state.examScheduleReducer.message,
});

const mapDispatchToProps = dispatch => ({
  importEmailInvitationFile: (examsId, files) => dispatch(actions.importEmailInvitationFile(examsId, files))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(EmailInviteToExam));