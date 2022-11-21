import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { Table, Button, Icon, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { Link } from 'react-router-dom';
import ModalDeleteExamSchedule from '../detail/modal-delete/ModalDeleteExamSchedule';
import * as defineConst from '../../../../constants/defineConst';
import { withTranslation } from 'react-i18next';
import moment from 'moment';

class ExamScheduleTable extends Component {
  state = {
    visible: false,
    examScheduleDelete: null,
    sortedInfo: null,
    currentSelectedItem: null
  }

  toggleActiveExamStatus = (examScheduleId) => {
    this.setState({
      currentSelectedItem: examScheduleId
    }, () => {
      this.props.updateExamScheduleStatus(examScheduleId);
    });
  }

  toggleViewAnswerStatus = (id) => {
    this.setState({
      currentSelectedItem: id
    }, () => {
      this.props.changeViewAnswerExamStatus(id)
    });
  }

  onDeleteExamSchedule = (examSchedule) => {
    this.setState({
      visible: true,
      examScheduleDelete: examSchedule
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
    const { listExamSchedule, t, isUpdatingStatus, isLoading } = this.props;
    let { sortedInfo, visible, examScheduleDelete, currentSelectedItem } = this.state;
    sortedInfo = sortedInfo || {};

    return (
      <>
        <Table
          rowKey="id"
          dataSource={listExamSchedule}
          onChange={this.handleChange}
          pagination={{
            defaultPageSize: defineConst.INDEX_PAGE_SIZE_DEFAULT,
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS,
            showSizeChanger: true
          }}
        >
          <Column width={20} title="#" key="#" render={(text, record, index) => index + 1} />
          <Column width={200} title={t('name')} dataIndex="name" sorter={(a, b) => a.name.length - b.name.length} sortOrder={sortedInfo.columnKey === 'name' && sortedInfo.order} key="name" />
          <Column width={250} title={t('description')} dataIndex="description" sorter={(a, b) => a.description.length - b.description.length} sortOrder={sortedInfo.columnKey === 'name' && sortedInfo.order} key="description" />
          <Column width={150} title={t('examQuestionUsed')} dataIndex="exam_question.name" sorter={(a, b) => a.name.length - b.name.length} sortOrder={sortedInfo.columnKey === 'exam_question' && sortedInfo.order} key="exam_question" />
          <Column width={150} title={t('fromDate')} dataIndex="from_date" key="from_date" render={date => moment(date).format("DD/MM/YYYY")} />
          <Column width={150} title={t('toDate')} dataIndex="to_date" key="to_date" render={date => moment(date).format("DD/MM/YYYY")} />
          <Column
            title={t('status')} dataIndex="status" key="status"
            width={140}
            sorter={(a, b) => a.status - b.status}
            sortOrder={sortedInfo.columnKey === 'status' && sortedInfo.order}
            render={(status, row) => (
              <span key={status}>
                <Tag onClick={() => this.toggleActiveExamStatus(row.id)} className="hover-tag" color={status ? "#87d068" : "#f50"} key={row.id}>
                  {isUpdatingStatus && currentSelectedItem === row.id && <Icon type="loading" spin />}&nbsp;{status ? t('_onGoing') : t('_stop')}
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
            width={140}
            title={t('action')} dataIndex="id" key="action"
            render={(item, row) => (
              <span>
                <Link to={`/exam-schedules/edit/${item}`}>
                  <Button type="primary" size="small"><Icon type="edit" /></Button>
                </Link>&nbsp;
                <Button onClick={() => this.onDeleteExamSchedule(row)} type="danger" size="small"><Icon type="delete" /></Button>
              </span>
            )}
          />
        </Table>
        {visible && <ModalDeleteExamSchedule visible={visible} examScheduleDelete={examScheduleDelete} onCloseDialog={this.onCloseDialog} />}
      </>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.examScheduleReducer.isUpdating,
  isUpdatingStatus: state.examScheduleReducer.isUpdatingStatus,
  err: state.examScheduleReducer.err,
  message: state.examScheduleReducer.message,
});

const mapDispatchToProps = dispatch => ({
  updateExamScheduleStatus: (examScheduleId) => dispatch(actions.updateExamScheduleStatus(examScheduleId)),
  changeViewAnswerExamStatus: (examScheduleId) => dispatch(actions.changeViewAnswerExamStatus(examScheduleId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ExamScheduleTable));