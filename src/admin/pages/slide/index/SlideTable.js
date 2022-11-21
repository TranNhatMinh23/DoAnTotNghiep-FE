import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { Table, Tag, Button, Icon } from 'antd';
import Column from 'antd/lib/table/Column';
import styles from './ScreenSlide.module.css';
import { Link } from 'react-router-dom'; 
import * as defineConst from '../../../../constants/defineConst';
import defaultImage from '../../../assets/images/default.png';
import ModalDeleteSlide from '../detail/modal-delete/ModalDeleteSlide';
import { withTranslation } from 'react-i18next';

class SlideTable extends Component {
  state = {
    visible: false,
    slideDelete: null,
    sortedInfo: null,
    currentSelectedItem: null
  }

  onDeleteSlide = (slide) => {
    this.setState({
      visible: true,
      slideDelete: slide
    })
  }

  onCloseDialog = () => {
    this.setState({
      visible: false
    })
  }

  changeSlideStatus = (id) => {
    this.setState({
      currentSelectedItem: id
    }, () => {
      this.props.changeSlideStatus(id);
    });
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  }; 

  render() {
    const { listAllSlides, t, isLoading } = this.props;
    let { visible, slideDelete, sortedInfo, currentSelectedItem } = this.state;
    sortedInfo = sortedInfo || {};

    return (
      <>
        <Table 
          rowKey="id" 
          dataSource={listAllSlides} 
          onChange={this.handleChange} 
          pagination={{ 
            defaultPageSize: defineConst.INDEX_PAGE_SIZE_DEFAULT, 
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS, 
            showSizeChanger: true 
          }}
        >
          <Column title="#" key="#" render={(text, record, index) => index + 1} />
          <Column 
            title={t('preview')}
            dataIndex="url" 
            key="url" 
            width={220}
            render={ url => ( 
              <img className={styles.imagePreviewInTable} src={url ? process.env.REACT_APP_URL_API+url : defaultImage} alt='' />
            )}  
          />
          <Column title={t('description')} dataIndex="description" key="description" />
          <Column
            title={t('status')} dataIndex="status" key="status"
            sorter={(a, b) => a.status - b.status}
            sortOrder={sortedInfo.columnKey === 'status' && sortedInfo.order}
            render={(status, row) => (
              <span key={status}>
                <Tag onClick={() => this.changeSlideStatus(row.id)} className={styles.tagActiveUser} color={status === true ? "#87d068" : "#f50"} key={status}>
                {isLoading && currentSelectedItem === row.id && <Icon type="loading" spin />}&nbsp;{status === true ? t('_active') : t('_disabled')}
                </Tag>
              </span>
            )}
          />
          <Column
            title={t('action')} dataIndex="id" key="action"
            width={120}
            render={(slideId, row) => (
              <span>
                <Link to={`/slides/edit/${slideId}`}>
                  <Button type="primary" size="small"><Icon type="edit" /></Button>
                </Link>&nbsp;
                <Button onClick={() => this.onDeleteSlide(row)} type="danger" size="small"><Icon type="delete" /></Button>
              </span>
            )}
          />
        </Table>
        {visible && <ModalDeleteSlide visible={visible} slideDelete={slideDelete} onCloseDialog={this.onCloseDialog} />}
      </>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.slideReducer.isUpdatingStatus,
  err: state.slideReducer.err,
  message: state.slideReducer.message,
});

const mapDispatchToProps = dispatch => ({
  changeSlideStatus: (slideId) => dispatch(actions.changeSlideStatus(slideId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SlideTable));