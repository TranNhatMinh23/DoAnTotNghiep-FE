import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';
import Column from 'antd/lib/table/Column';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ModalDeleteExamQuestion from '../detail/modal-delete/ModalDeleteExamQuestion';
import * as defineConst from '../../../../constants/defineConst';
import { withTranslation } from 'react-i18next';

class ExamQuestionsTable extends Component {
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
    const { listExamQuestions, t } = this.props;
    let { sortedInfo, visible, examQuestionDelete } = this.state;
    sortedInfo = sortedInfo || {};
    return (
      <>
        <Table 
          rowKey="id" 
          dataSource={listExamQuestions} 
          onChange={this.handleChange} 
          pagination={{ 
            defaultPageSize: defineConst.INDEX_PAGE_SIZE_DEFAULT, 
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS, 
            showSizeChanger: true 
          }}
        >
          <Column title="#" key="#" render={(text, record, index) => index + 1} />
          <Column title={t('name')} dataIndex="name" sorter={(a, b) => a.name.length - b.name.length} sortOrder={sortedInfo.columnKey === 'name' && sortedInfo.order} key="name" />
          <Column title={t('scoreMapping')} dataIndex="exam_question_score" render={(score) => score ? score.name : "---"} key="exam_question_score" />
          <Column title={t('createdAt')} dataIndex="created_at" render={date => moment(date).format('DD/MM/YYYY')} sorter={(a, b) => new Date(a.created_at) - new Date(b.created_at)} sortOrder={sortedInfo.columnKey === 'created_at' && sortedInfo.order} key="created_at" />
          <Column title={t('updatedAt')} dataIndex="updated_at" render={date => moment(date).format('DD/MM/YYYY')} sorter={(a, b) => new Date(a.updated_at) - new Date(b.updated_at)} sortOrder={sortedInfo.columnKey === 'updated_at' && sortedInfo.order} key="updated_at" /> 
          <Column
            title={t('action')} dataIndex="id" key="action"
            render={(item, row) => (
              <span>
                <Link to={`/exam-questions/${item}`}> 
                  <Button type="primary" size="small"><Icon type="edit" /></Button>
                </Link>&nbsp;
                <Button onClick={() => this.onDeleteExamQuestion(row)} type="danger" size="small">
                  <Icon type="delete" />
                </Button>
              </span>
            )}
          />
        </Table>
        {visible && <ModalDeleteExamQuestion visible={visible} examQuestionDelete={examQuestionDelete} onCloseDialog={this.onCloseDialog} />}
      </>
    )
  }
}

export default withTranslation()(ExamQuestionsTable);