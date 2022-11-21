import React from 'react';
import { Button, Icon } from 'antd';
import styles from './UploadImage.module.css';

function UploadImage(props) {
  return (
    <div key={`${props.questionId}-${props.item.id}`} className={styles.groupBtnUploadImage}>
      <input
        id={`upload-image-${props.questionId}-${props.item.id}`}
        accept="image/*"
        onChange={(e) => props.changeImageFromClient(e, props.item.id)}
        className="input-file"
        type="file"
      />
      <Button type="primary">
        <label htmlFor={`upload-image-${props.questionId}-${props.item.id}`} className="lb-input-file">
          <Icon type="upload" /> {`Image ${props.item.id}`} 
        </label>
      </Button>
    </div>
  )
}

export default UploadImage;