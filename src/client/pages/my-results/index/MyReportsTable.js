import React, { Component } from 'react';
import { Table, Icon, Tooltip } from 'antd';
import Column from 'antd/lib/table/Column';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as defineConst from '../../../../constants/defineConst';
import styles from './MyReportsTable.module.css';
import { withTranslation } from 'react-i18next';
import SearchComponent from '../../../../admin/components/common/search/Search';
import { searchByExamName } from '../../../../shared/function';

class MyReportsTable extends Component { 
  constructor(props){
    super(props);
    this.state = {
      sortedInfo: null,
      searchingData: this.props.listMyReports
    }
  } 

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  };

  handleSearch = (searchText = '') => {
    let matchingData = searchByExamName(this.props.listMyReports, searchText); 
    this.setState({
      searchingData: matchingData
    });
  }

  render() {
    const { searchingData } = this.state;
    const { t } = this.props;

    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    return (
      <div className={styles.widgetTable}>
        <div className={styles.headerTableWidget}>
          <p className={styles.titleTable}>{t('reportExamsTaking')}</p>
          <SearchComponent placeholder={t('search')} onSearch={this.handleSearch} />
        </div>
        <Table
          className={styles.table}
          rowKey="id"
          dataSource={searchingData}
          onChange={this.handleChange}
          pagination={{
            defaultPageSize: defineConst.INDEX_PAGE_SIZE_DEFAULT,
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS,
            showSizeChanger: true
          }}
        >
          <Column title="#" key="#" render={(text, record, index) => index + 1} />
          <Column title={t('examName')} dataIndex="exam.name" key="name" />
          <Column align="center" title={t('numListening')} dataIndex="num_listening" sorter={(a, b) => a.num_listening - b.num_listening} sortOrder={sortedInfo.columnKey === 'num_listening' && sortedInfo.order} key="num_listening" />
          <Column align="center" title={t('numReading')} dataIndex="num_reading" sorter={(a, b) => a.num_reading - b.num_reading} sortOrder={sortedInfo.columnKey === 'num_reading' && sortedInfo.order} key="num_reading" />
          <Column align="center" title={t('listeningScore')} dataIndex="listening_score" sorter={(a, b) => a.listening_score - b.listening_score} sortOrder={sortedInfo.columnKey === 'listening_score' && sortedInfo.order} key="listening_score" />
          <Column align="center" title={t('readingScore')} dataIndex="reading_score" sorter={(a, b) => a.reading_score - b.reading_score} sortOrder={sortedInfo.columnKey === 'reading_score' && sortedInfo.order} key="reading_score" />
          <Column align="center" title={t('totalScore')} dataIndex="total_score" sorter={(a, b) => a.total_score - b.total_score} sortOrder={sortedInfo.columnKey === 'total_score' && sortedInfo.order} key="total_score" />
          <Column title={t('timeTaken')} dataIndex="created_at" render={date => moment(date).format('hh:mm:ss A - DD/MM/YYYY')} sorter={(a, b) => new Date(a.created_at) - new Date(b.created_at)} sortOrder={sortedInfo.columnKey === 'created_at' && sortedInfo.order} key="created_at" />
          <Column
            width={100}
            title={t('action')} dataIndex="id" key="action"
            render={(item, row) => (
              <span>
                <Tooltip placement="bottom" title={t('seeDetail')}>
                  <Link to={`/view-answers?reportId=${row.id}`}>
                    <Icon className={styles.iconEye} type="eye" /> 
                  </Link>
                </Tooltip>
              </span>
            )}
          />
        </Table>
      </div>
    )
  }
}

export default withTranslation()(MyReportsTable);