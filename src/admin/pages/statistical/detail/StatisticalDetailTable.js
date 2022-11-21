import React, { Component } from 'react';
import { Table, Tooltip, Icon } from 'antd';
import Column from 'antd/lib/table/Column';
import styles from './ScreenStatisticalDetail.module.css';
import * as defineConst from '../../../../constants/defineConst';
import { withTranslation } from 'react-i18next';
import moment from 'moment';

class StatisticalDetailTable extends Component {
  state = {
    visible: false,
    sortedInfo: null
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  };

  compare = (a, b) => {
    if (a.total_score < b.total_score)
      return 1;
    if (a.total_score > b.total_score)
      return -1;
    return 0;
  }  
  
  render() {
    const { detailData, t } = this.props;
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {}; 
    
    return (
      <div className={styles.detailData}>
        <Table
          rowKey="id"
          dataSource={detailData.reverse()}
          onChange={this.handleChange}
          pagination={{
            defaultPageSize: defineConst.INDEX_PAGE_SIZE_DEFAULT,
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS,
            showSizeChanger: true
          }}
        >
          <Column title="#" render={(text, record, index) => index + 1} key="#" />
          <Column width={300} title={t('name')} dataIndex="exams.name" sorter={(a, b) => a.name.length - b.name.length} sortOrder={sortedInfo.columnKey === 'name' && sortedInfo.order} key="name" />
          <Column align="center" title={t('numListening')} dataIndex="num_listening" sorter={(a, b) => a.num_listening - b.num_listening} sortOrder={sortedInfo.columnKey === 'num_listening' && sortedInfo.order} key="num_listening" />
          <Column align="center" title={t('numReading')} dataIndex="num_reading" sorter={(a, b) => a.num_reading - b.num_reading} sortOrder={sortedInfo.columnKey === 'num_reading' && sortedInfo.order} key="num_reading" />
          <Column align="center" title={t('listeningScore')} dataIndex="listening_score" sorter={(a, b) => a.listening_score - b.listening_score} sortOrder={sortedInfo.columnKey === 'listening_score' && sortedInfo.order} key="listening_score" />
          <Column align="center" title={t('readingScore')} dataIndex="reading_score" sorter={(a, b) => a.reading_score - b.reading_score} sortOrder={sortedInfo.columnKey === 'reading_score' && sortedInfo.order} key="reading_score" />
          <Column align="center" title={t('totalScore')} dataIndex="total_score" key="total_score" render={(item, row) => row.listening_score + row.reading_score} />
          <Column align="center" title={t('timeTaken')} dataIndex="created_at" key="created_at" render={date => moment(date).format('HH:mm:ss A - DD/MM/YYYY')} />
          <Column
            width={100}
            align="center"
            title={t('_detail')} dataIndex="id" key="seeDetail"
            render={(item, row) => (
              <span>
                <Tooltip placement="bottom" title={t('seeDetail')}>
                  <a href={`/view-answers?reportId=${row.id}`} rel="noopener noreferrer" target="_blank">
                    <Icon className={styles.iconEye} type="eye" />
                  </a>
                </Tooltip>
              </span>
            )}
          />
        </Table>
      </div>
    )
  }
}

export default withTranslation()(StatisticalDetailTable);