import React, { Component } from 'react';
import { Table, Icon, Tooltip, Badge } from 'antd';
import Column from 'antd/lib/table/Column';
import { Link } from 'react-router-dom';
import styles from './ScreenReports.module.css';
import * as defineConst from '../../../../constants/defineConst';
import { withTranslation } from 'react-i18next';
import moment from 'moment';

class ReportsTable extends Component {
  state = {
    visible: false,
    sortedInfo: null
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  };

  render() {
    const { listReports, t } = this.props;
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    return (
      <div className={styles.table}>
        <div className={styles.note}>
          <Badge size="large" color="green" status="processing" /><span>{t('_onGoing')}</span>
          <Badge className={styles.stopIcon} status="error" /><span>{t('stopExams')}</span>
        </div>
        <Table
          rowKey="id"
          dataSource={listReports}
          onChange={this.handleChange}
          pagination={{
            defaultPageSize: defineConst.INDEX_PAGE_SIZE_DEFAULT,
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS,
            showSizeChanger: true
          }}
          className="table-reports"
        >
          <Column title="#" key="#" render={(text, record, index) => index + 1} />
          <Column width={250} title={t('examName')} dataIndex="name" sorter={(a, b) => a.name.length - b.name.length} sortOrder={sortedInfo.columnKey === 'name' && sortedInfo.order} key="name" />
          <Column width={200} title={t('description')} dataIndex="description" key="description" />
          <Column title={t('fromDate')} dataIndex="from_date" key="from_date" render={date => date ? moment(date).format("DD/MM/YYYY") : '- - -'} />
          <Column title={t('toDate')} dataIndex="to_date" key="to_date" render={date => date ? moment(date).format("DD/MM/YYYY") : '- - -'} />
          <Column
            title={t('status')} dataIndex="status" key="status"
            align="center"
            sorter={(a, b) => a.status - b.status}
            sortOrder={sortedInfo.columnKey === 'status' && sortedInfo.order}
            render={status => (status === "1" || status) ? <Badge size="large" color="green" status="processing" /> : <Badge status="error" />}
          />
          <Column width={150} align="center" title={t('participants')} dataIndex="participants" sorter={(a, b) => a.participants - b.participants} sortOrder={sortedInfo.columnKey === 'participants' && sortedInfo.order} key="participants" />
          <Column
            width={100}
            title={t('detail')} dataIndex="examId" key="action"
            render={(item, row) => (
              <Tooltip title={t('seeDetail')}>
                <Link to={`/detail-reports?examId=${row.id}`} >
                  <Icon className="iconEye" type="eye" />
                </Link>
              </Tooltip>
            )}
          />
        </Table>
      </div>
    )
  }
}

export default withTranslation()(ReportsTable);