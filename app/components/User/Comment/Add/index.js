import React from 'react';
import {List, TextareaItem, ImagePicker} from 'antd-mobile';
import Header from 'components/Header';
import Rate from 'components/Rate';

export default ({comment, onSubmit, onCommentChange, onAddImage, onChangeImage}) => <div>
  <Header title="评价" right={<div className="size32" onClick={onSubmit}>保存</div>}/>
  <List>
    <List.Item
      extra={<div className="flex-wrp flex-bottom">
        <Rate num={comment.score} size={48} onChange={value => onCommentChange(value, 'score')}/>
      </div>}
    >
      整体评价
    </List.Item>
    <List.Item
      extra={<div className="flex-wrp flex-bottom">
        <Rate num={comment.score_service} size={48} onChange={value => onCommentChange(value, 'score_service')}/>
      </div>}
    >
      服务评价
    </List.Item>
    <List.Item
      extra={<div className="flex-wrp flex-bottom">
        <Rate num={comment.score_environment} size={48}
              onChange={value => onCommentChange(value, 'score_environment')}/>
      </div>}
    >
      环境评价
    </List.Item>
    <TextareaItem
      title="评价内容"
      rows={3}
      count={100}
      value={comment.content}
      onChange={value => onCommentChange(value, 'content')}
      placeholder="评价内容（选填）"
    />
  </List>
  <ImagePicker
    files={comment.photos}
    onAddImageClick={e => onAddImage(e)}
    onChange={onChangeImage}
  />
</div>