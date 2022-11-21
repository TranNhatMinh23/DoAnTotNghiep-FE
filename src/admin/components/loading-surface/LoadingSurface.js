import React from 'react';
import { Spin } from 'antd';

function LoadingSurface(props) {
  return (
    <div style={{ paddingTop: 100, textAlign: 'center' }}>
      <Spin tip="Loading..." spinning={props.isLoading}>
        {props.children}
      </Spin>
    </div>
  )
}

export default LoadingSurface;