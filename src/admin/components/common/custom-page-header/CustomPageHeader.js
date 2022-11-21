import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CustomPageHeader.module.css';
import { PageHeader, Icon } from 'antd';

function CustomPageHeader(props){ 
    return (
      <div className={styles.pageHeader}>
        <Link className={styles.backIcon} to={props.to}><Icon type="arrow-left" /></Link>
        <PageHeader className={styles.header} title={`${props.title} ${props.subTitle ? `:` : ''} `} subTitle={props.subTitle} />
      </div>
    ); 
}

export default CustomPageHeader;