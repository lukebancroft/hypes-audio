import React from 'react';
import { Input, Icon, Form, Upload } from 'antd';

export default class EditCreatePluginFieldset extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {
    const { getFieldDecorator } = this.props.form;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
        <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input a name for the plugin!' }],
                initialValue: this.props.currentPlugin.name
              })(
                <Input placeholder='Enter plugin name' />
              )}
            </Form.Item>
            <Form.Item label="Description">
            {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please input a description for the plugin!' }],
                initialValue: this.props.currentPlugin.comment
              })(
                <Input rows={4} placeholder='Enter plugin description' />
              )}
            </Form.Item>
            <Form.Item label="Url">
              {getFieldDecorator('url', {
                rules: [{ required: true, message: 'Please input a url for the plugin!' }],
                initialValue: this.props.currentPlugin.url
              })(
                <Input placeholder='Enter plugin url' />
              )}
            </Form.Item>
        </Form>
    );
  }

  /*

            <Form.Item label="Dragger">
              <div className="dropbox">
                {getFieldDecorator('dragger', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <div>
                    <Upload
                      action="//jsonplaceholder.typicode.com/posts/"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}>
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                )}
              </div>
            </Form.Item>
    */
}