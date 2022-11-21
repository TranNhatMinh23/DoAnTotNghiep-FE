import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { Table, Tag, Button, Icon } from 'antd';
import Column from 'antd/lib/table/Column';
import styles from './ScreenArticles.module.css';
import { Link } from 'react-router-dom'; 
import * as defineConst from '../../../../constants/defineConst';
import defaultImage from '../../../assets/images/default.png'; 
import ModalDeleteArticle from '../detail/modal-delete/ModalDeleteArticle';
import { limitText } from '../../../../shared/function';
import { withTranslation } from 'react-i18next';

class ArticlesTable extends Component {
  state = {
    visible: false,
    articleDelete: null,
    sortedInfo: null,
    currentSelectedItem: null
  }

  onDeleteArticle = (slide) => {
    this.setState({
      visible: true,
      articleDelete: slide
    })
  }

  onCloseDialog = () => {
    this.setState({
      visible: false
    })
  }

  changeArticleStatus = (id) => {
    this.setState({
      currentSelectedItem: id
    }, () => {
      this.props.changeArticleStatus(id);
    });
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  }; 

  render() {
    const { listAllArticles, t, isLoading } = this.props;
    let { visible,  articleDelete, sortedInfo, currentSelectedItem } = this.state;
    sortedInfo = sortedInfo || {}; 

    return (
      <>
        <Table 
          rowKey="id" 
          dataSource={listAllArticles} 
          onChange={this.handleChange} 
          pagination={{ 
            defaultPageSize: defineConst.INDEX_PAGE_SIZE_DEFAULT, 
            pageSizeOptions: defineConst.INDEX_PAGE_SIZE_OPTIONS, 
            showSizeChanger: true 
          }}
        >
          <Column title="#" key="#" render={(text, record, index) => index + 1} />
          <Column 
            title={t('imageThumb')} 
            dataIndex="image_url" 
            key="image_url" 
            width={100}
            render={ image_url => ( 
              <img className={styles.imagePreviewInTable} src={image_url ? process.env.REACT_APP_URL_API+image_url : defaultImage} alt='' />
            )}  
          />
           <Column 
            width={200}
            title={t('title')} 
            dataIndex="title" 
            key="title"
            render={(title) => (limitText(title, 20))}
          />
          <Column 
            title={t('description')}
            dataIndex="description" 
            key="description"
            render={(description) => (limitText(description, 40))}
          />
          <Column 
            title={t('category')}
            dataIndex="category.name" 
            key="category"
            render={(name) => (<Tag>{name}</Tag>)}
          />
          <Column
            width={130}
            title={t('status')} dataIndex="status" key="status"
            sorter={(a, b) => a.status - b.status}
            sortOrder={sortedInfo.columnKey === 'status' && sortedInfo.order}
            render={(status, row) => (
              <span key={status}>
                <Tag onClick={() => this.changeArticleStatus(row.id)} className={styles.tagActiveUser} color={status === true ? "#87d068" : "#f50"} key={status}>
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
                <Link to={`/articles/edit/${slideId}`}>
                  <Button type="primary" size="small"><Icon type="edit" /></Button>
                </Link>&nbsp;
                <Button onClick={() => this.onDeleteArticle(row)} type="danger" size="small"><Icon type="delete" /></Button>
              </span>
            )}
          />
        </Table>
        {visible && <ModalDeleteArticle visible={visible} articleDelete={articleDelete} onCloseDialog={this.onCloseDialog} />}
      </>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.articlesReducer.isUpdatingStatus,
  err: state.articlesReducer.err,
  message: state.articlesReducer.message,
});

const mapDispatchToProps = dispatch => ({
  changeArticleStatus: (articleId) => dispatch(actions.changeArticleStatus(articleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ArticlesTable));