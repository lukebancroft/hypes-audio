import React from 'react';
import { Input, Icon, Form, Upload, Select } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;

export default class EditCreatePluginFieldset extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.handleFormFilled(values);
        });
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
        <Form layout="vertical" onSubmit={this.handleSubmit} id="editCreateForm">
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
                <TextArea rows={4} placeholder='Enter plugin description' />
              )}
            </Form.Item>
            <Form.Item
                label="Select tags"
                >
                {getFieldDecorator('tags', {
                    rules: [{ required: true, message: 'Please select at least one tag!', type: 'array' }],
                    initialValue: this.props.currentPlugin.tags
                })(
                    <Select mode="multiple" placeholder="Select your tags">
                        <Option value="filter">Filter</Option>
                        <Option value="phaser">Phaser</Option>
                        <Option value="modulator">Modulator</Option>
                        <Option value="instrument">Instrument</Option>
                        <Option value="amplifier">Amplifier</Option>
                        <Option value="dynamics">Dynamics</Option>
                        <Option value="compressor">Compressor</Option>
                        <Option value="delay">Delay</Option>
                        <Option value="simulator">Simulator</Option>
                        <Option value="utility">Utility</Option>
                        <Option value="midi">MIDI</Option>
                        <Option value="spectral">Spectral</Option>
                        <Option value="pitch_shifter">Pitch Shifter</Option>
                        <Option value="reverb">Reverb</Option>
                    </Select>
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