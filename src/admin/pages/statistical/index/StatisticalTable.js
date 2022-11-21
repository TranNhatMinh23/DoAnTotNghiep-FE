import React, { Component } from 'react';
import { Table, Icon, Tooltip } from 'antd';
import Column from 'antd/lib/table/Column';
import { Link } from 'react-router-dom';
import styles from './ScreenStatistical.module.css';
import * as defineConst from '../../../../constants/defineConst';
import { withTranslation } from 'react-i18next';
// import moment from 'moment';

class StatisticalTable extends Component {
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
    const { listData, t } = this.props;
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    return (
      <div className={styles.table}>  
        <Table
          rowKey="id"
          dataSource={listData}
          onChange={this.handleChange}
          pagination={{
            defaultPageSize: defineConst.INDEX_PAGE_SIZE_DEFAULT,
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS,
            showSizeChanger: true
          }}
          className="table-reports"
        >
          <Column title="#" key="#" render={(text, record, index) => index + 1} />
          <Column title={t('fullName')} dataIndex="name" sorter={(a, b) => a.name.length - b.name.length} sortOrder={sortedInfo.columnKey === 'name' && sortedInfo.order} key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column
            align="center"
            title={t('timeParticipated')}
            dataIndex="exam_reports"
            key="participants"
            render={item => item.length}
            sorter={(a, b) => a.length - b.length}  
          />
          <Column
            title={t('latestParticipation')}
            dataIndex="exam_reports"
            key="exam_reports"
            render={item => item[0] && item[0].created_at}
          />  
          <Column
            width={100}
            align="center"
            title={t('_detail')} dataIndex="examId" key="action"
            render={(item, row) => (
              <Tooltip title={t('seeDetail')}>
                <Link to={`/statistical/${row.id}`} >
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

export default withTranslation()(StatisticalTable);