import React, { Component } from 'react';
import { Table, Button, Icon, Tooltip } from 'antd';
import Column from 'antd/lib/table/Column';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ModalDeleteExamQuestionScore from '../detail/modal-delete-exam-question-score/ModalDeleteExamQuestionScore';
import ModalEditExamQuestionScore from '../detail/modal-edit-exam-question-score/ModalEditExamQuestionScore';
import * as defineConst from '../../../../constants/defineConst';
import { withTranslation } from 'react-i18next';

class ExamQuestionScoreTable extends Component {
  state = {
    visible: false,
    examQuestionScoreDelete: null,
    visibleEdit: false,
    examQuestionScoreEdit: null,
    sortedInfo: null
  }

  onDeleteExamQuestionScore = (examQuestionScore) => {
    this.setState({
      visible: true,
      examQuestionScoreDelete: examQuestionScore
    });
  }

  onEditExamQuestionScore = (examQuestionScore) => {
    this.setState({
      visibleEdit: true,
      examQuestionScoreEdit: examQuestionScore
    });
  }

  onCloseDialog = () => {
    this.setState({
      visible: false,
      visibleEdit: false
    })
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  };

  render() {
    const { listExamQuestionScore, t } = this.props;
    let { sortedInfo, visible, examQuestionScoreDelete, visibleEdit, examQuestionScoreEdit } = this.state;
    sortedInfo = sortedInfo || {};
    return (
      <>
        <Table 
          rowKey="id" 
          dataSource={listExamQuestionScore} 
          onChange={this.handleChange} 
          pagination={{ 
            defaultPageSize: defineConst.INDEX_PAGE_SIZE_DEFAULT, 
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS, 
            showSizeChanger: true 
          }}
        >
          <Column title="#" key="#" render={(text, record, index) => index + 1} />
          <Column title={t('name')} dataIndex="name" sorter={(a, b) => a.name.length - b.name.length} sortOrder={sortedInfo.columnKey === 'name' && sortedInfo.order} key="name" />
          <Column title={t('description')} dataIndex="description" sorter={(a, b) => a.name.length - b.name.length} sortOrder={sortedInfo.columnKey === 'description' && sortedInfo.order} key="description" />
          <Column title={t('createdAt')} dataIndex="created_at" render={date => moment(date).format('DD/MM/YYYY')} sorter={(a, b) => new Date(a.created_at) - new Date(b.created_at)} sortOrder={sortedInfo.columnKey === 'created_at' && sortedInfo.order} key="created_at" />
          <Column title={t('updatedAt')} dataIndex="updated_at" render={date => moment(date).format('DD/MM/YYYY')} sorter={(a, b) => new Date(a.updated_at) - new Date(b.updated_at)} sortOrder={sortedInfo.columnKey === 'updated_at' && sortedInfo.order} key="updated_at" />
          <Column
            title={t('action')} dataIndex="id" key="action"
            render={(item, row) => (
              <span>
                <Tooltip placement="bottom" title={t('edit')}>
                  <Button onClick={() => this.onEditExamQuestionScore(row)} type="primary" size="small"><Icon type="edit" /></Button>
                </Tooltip>
                &nbsp;
                <Tooltip placement="bottom" title={t('detail')}>
                  <Link to={`/exam-question-scores/${item}`}>
                    <Button size="small"><Icon type="bars" /></Button>
                  </Link>
                </Tooltip>
                &nbsp;
                <Tooltip placement="bottom" title={t('delete')}>
                  <Button onClick={() => this.onDeleteExamQuestionScore(row)} type="danger" size="small"><Icon type="delete" /></Button>
                </Tooltip>
              </span>
            )}
          />
        </Table>
        {visible && <ModalDeleteExamQuestionScore visible={visible} examQuestionScoreDelete={examQuestionScoreDelete} onCloseDialog={this.onCloseDialog} />}
        {visibleEdit && <ModalEditExamQuestionScore visible={visibleEdit} examQuestionScoreEdit={examQuestionScoreEdit} onCloseDialog={this.onCloseDialog} />}
      </>
    )
  }
}

export default withTranslation()(ExamQuestionScoreTable);