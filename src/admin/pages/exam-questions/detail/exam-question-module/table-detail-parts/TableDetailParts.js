import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';
import Column from 'antd/lib/table/Column';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { withTranslation } from 'react-i18next';

class TableDetailParts extends Component {
  state = {
    visible: false,
    examQuestionDelete: null,
    sortedInfo: null
  }

  onDeleteExamQuestion = (examQuestion) => {
    this.setState({
      visible: true,
      examQuestionDelete: examQuestion
    })
  } 

  onCloseDialog = () => {
    this.setState({
      visible: false
    })
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  };

  render() {
    const { detailExamQuestionParts, examQuestionId, t } = this.props;
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    
    return (
      <>
        <Table rowKey="id" dataSource={detailExamQuestionParts} onChange={this.handleChange} pagination={false}>
          <Column title="#" key="#" render={(text, record, index) => index + 1} />
          <Column title={t('name')} dataIndex="part_no" render={part_no => t('part') + ' ' + part_no} sorter={(a, b) => a.part_no - b.part_no} sortOrder={sortedInfo.columnKey === 'name' && sortedInfo.order} key="name" />
          <Column title={t('questionAmount')} align="center" dataIndex="amount" sorter={(a, b) => a.amount - b.amount} sortOrder={sortedInfo.columnKey === 'amount' && sortedInfo.order} key="amount" />
          <Column title={t('createdAt')} dataIndex="created_at" render={date => moment(date).format('DD/MM/YYYY')} sorter={(a, b) => new Date(a.created_at) - new Date(b.created_at)} sortOrder={sortedInfo.columnKey === 'created_at' && sortedInfo.order} key="created_at" />
          <Column title={t('updatedAt')} dataIndex="updated_at" render={date => moment(date).format('DD/MM/YYYY')} sorter={(a, b) => new Date(a.updated_at) - new Date(b.updated_at)} sortOrder={sortedInfo.columnKey === 'updated_at' && sortedInfo.order} key="updated_at" /> 
          <Column
            title={t('action')} dataIndex="id" key="action"
            align="center"
            render={(id, row) => (
              <span>
                <Link to={`/exam-questions/${examQuestionId}/part${row.part_no}-${id}`}>
                  <Button type="primary" size="small"><Icon type="edit" /></Button>
                </Link>
              </span>
            )}
          />
        </Table>
      </>
    )
  }
}

export default withTranslation()(TableDetailParts);