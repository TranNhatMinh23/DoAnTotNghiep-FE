import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { Table, Button, Icon } from 'antd';
import Column from 'antd/lib/table/Column'; 
import * as defineConst from '../../../../constants/defineConst';
import moment from 'moment';
import ModalDeleteCategory from '../detail/modal-delete-category/ModalDeleteCategory';
import ModalEditCategory from '../detail/modal-edit-category/ModalEditCategory';
import { withTranslation } from 'react-i18next';

class CategoryTable extends Component {
  state = {
    visibleModalCategory: false,
    visibleModalEdit: false,
    categoryInfo: null,
    sortedInfo: null
  }

  onEditCategory = (category) => {
    this.setState({
      visibleModalEdit: true,
      categoryInfo: category
    })
  }

  onDeleteCategory = (category) => {
    this.setState({
      visibleModalCategory: true,
      categoryInfo: category
    })
  }

  onCloseDialog = () => {
    this.setState({
      visibleModalCategory: false,
      visibleModalEdit: false
    })
  }
 
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  }; 

  render() {
    const { listAllCategories, t } = this.props;
    let { visibleModalCategory, visibleModalEdit, categoryInfo, sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    return (
      <>
        <Table 
          rowKey="id" 
          dataSource={listAllCategories} 
          onChange={this.handleChange} 
          pagination={{ 
            defaultPageSize: defineConst.INDEX_PAGE_SIZE_DEFAULT, 
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS, 
            showSizeChanger: true 
          }}
        >
          <Column title="#" key="#" render={(text, record, index) => index + 1} />
          <Column title={t('name')} dataIndex="name" sorter={(a, b) => a.name.length - b.name.length} sortOrder={sortedInfo.columnKey === 'name' && sortedInfo.order} key="name" />
          <Column title={t('description')} dataIndex="description" key="description" />
          <Column title={t('createdAt')} dataIndex="created_at" render={date => moment(date).format('DD/MM/YYYY')} sorter={(a, b) => new Date(a.created_at) - new Date(b.created_at)} sortOrder={sortedInfo.columnKey === 'created_at' && sortedInfo.order} key="created_at" />
          <Column title={t('updatedAt')} dataIndex="updated_at" render={date => moment(date).format('DD/MM/YYYY')} sorter={(a, b) => new Date(a.updated_at) - new Date(b.updated_at)} sortOrder={sortedInfo.columnKey === 'updated_at' && sortedInfo.order} key="updated_at" /> 
          <Column
            title={t('action')} dataIndex="id" key="action"
            width={120}
            render={(slideId, row) => (
              <span>
                <Button onClick={() => this.onEditCategory(row)} type="primary" size="small"><Icon type="edit" /></Button>&nbsp;
                <Button onClick={() => this.onDeleteCategory(row)} type="danger" size="small"><Icon type="delete" /></Button>
              </span>
            )}
          />
        </Table>
        {visibleModalEdit && <ModalEditCategory visible={visibleModalEdit} categoryEdit={categoryInfo} onCloseDialog={this.onCloseDialog} />}
        {visibleModalCategory && <ModalDeleteCategory visible={visibleModalCategory} categoryDelete={categoryInfo} onCloseDialog={this.onCloseDialog} />}
      </>
    )
  }
}

const mapStateToProps = state => ({
  isLoaded: !state.categoryReducer.isUpdating,
  err: state.categoryReducer.err,
  message: state.categoryReducer.message,
});

const mapDispatchToProps = dispatch => ({
  changeSlideStatus: (slideId) => dispatch(actions.changeSlideStatus(slideId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CategoryTable));