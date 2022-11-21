import React from 'react';
import { Spin } from 'antd';

function Loading(props) {
  return (
    <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin tip="Loading..." spinning={props.isLoading}></Spin>
  </div>
  )
}

export default Loading;