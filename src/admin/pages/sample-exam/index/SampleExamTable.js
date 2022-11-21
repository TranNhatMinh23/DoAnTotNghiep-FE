import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { Table, Button, Icon, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { Link } from 'react-router-dom'; 
import ModalDeleteSampleExam from '../detail/modal-delete/ModalDeleteSampleExam';
import * as defineConst from '../../../../constants/defineConst';
import { withTranslation } from 'react-i18next';

class SampleExamTable extends Component {
  state = {
    visible: false,
    sampleExamDelete: null,
    sortedInfo: null,
    currentSelectedItem: null
  }

  toggleActiveSampleExamStatus = (sampleExamId) => {
    this.setState({
      currentSelectedItem: sampleExamId
    }, () => {
      this.props.changeStatusSampleExam(sampleExamId);
    });
  }

  toggleViewAnswerStatus = (id) => {
    this.setState({
      currentSelectedItem: id
    }, () => {
      this.props.changeViewAnswerStatus(id)
    });
  }

  onDeleteSampleExam = (sampleExam) => {
    this.setState({
      visible: true,
      sampleExamDelete: sampleExam
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
    const { listSampleExams, t, isLoading, isLoadingStatus } = this.props;
    let { sortedInfo, visible, sampleExamDelete, currentSelectedItem } = this.state;
    sortedInfo = sortedInfo || {};
    return (
      <>
        <Table 
          rowKey="id" 
          dataSource={listSampleExams} 
          onChange={this.handleChange} 
          pagination={{ 
            defaultPageSize: defineConst.INDEX_PAGE_SIZE_DEFAULT, 
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS, 
            showSizeChanger: true 
          }}
        >
          <Column title="#" key="#" render={(text, record, index) => index + 1} />
          <Column title={t('name')} dataIndex="name" sorter={(a, b) => a.name.length - b.name.length} sortOrder={sortedInfo.columnKey === 'name' && sortedInfo.order} key="name" />
          <Column width={300} title={t('description')} dataIndex="description" sorter={(a, b) => a.description.length - b.description.length} sortOrder={sortedInfo.columnKey === 'name' && sortedInfo.order} key="description" />
          <Column title={t('examQuestionUsed')} dataIndex="exam_question.name" sorter={(a, b) => a.name.length - b.name.length} sortOrder={sortedInfo.columnKey === 'exam_question' && sortedInfo.order} key="exam_question" />
          <Column
            width={140}
            title={t('status')} dataIndex="status" key="status"
            sorter={(a, b) => a.status - b.status}
            sortOrder={sortedInfo.columnKey === 'status' && sortedInfo.order}
            render={(status, row) => (
              <span key={status}>
                <Tag onClick={() => this.toggleActiveSampleExamStatus(row.id)} className="hover-tag" color={status ? "#87d068" : "#f50"} key={row.id}>
                {isLoadingStatus && currentSelectedItem === row.id && <Icon type="loading" spin />}&nbsp;{status ? t('_onGoing') : t('_stop')}
                </Tag>
              </span>
            )}
          />
          <Column 
           width={140}
            title={t('viewAnswer')} dataIndex="is_allow_view_answer" key="is_allow_view_answer"
            sorter={(a, b) => a.is_allow_view_answer - b.is_allow_view_answer}
            sortOrder={sortedInfo.columnKey === 'is_allow_view_answer' && sortedInfo.order}
            render={(is_allow_view_answer, row) => (
              <span key={is_allow_view_answer}>
                <Tag onClick={() => this.toggleViewAnswerStatus(row.id)} className="hover-tag" color={is_allow_view_answer ? "#87d068" : "#f50"} key={row.id}>
                  {isLoading && currentSelectedItem === row.id && <Icon type="loading" spin />}&nbsp;{is_allow_view_answer ? t('allow') : t('deny')}
                </Tag>
              </span>
            )}
          />
          <Column
            width={100}
            title={t('action')} dataIndex="id" key="action"
            render={(item, row) => (
              <span>
                <Link to={`/sample-exams/edit/${item}`}>
                  <Button type="primary" size="small"><Icon type="edit" /></Button>
                </Link>&nbsp;
                <Button onClick={() => this.onDeleteSampleExam(row)} type="danger" size="small"><Icon type="delete" /></Button>
              </span>
            )}
          />
        </Table>
        {visible && <ModalDeleteSampleExam visible={visible} sampleExamDelete={sampleExamDelete} onCloseDialog={this.onCloseDialog} />}
      </>
    )
  }
}

const mapStateToProps = state => ({ 
  isLoading: state.sampleExamReducer.isUpdating,
  isLoadingStatus: state.sampleExamReducer.isUpdatingStatus, 
  err: state.sampleExamReducer.err,
  message: state.sampleExamReducer.message,
});

const mapDispatchToProps = dispatch => ({
  changeStatusSampleExam: (sampleExamId) => dispatch(actions.changeStatusSampleExam(sampleExamId)),
  changeViewAnswerStatus: (sampleExamId) => dispatch(actions.changeViewAnswerStatus(sampleExamId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SampleExamTable));