import React from 'react';
import { Input, Icon, Form, Upload, Select, Button } from 'antd';
const { TextArea } = Input;
const InputGroup = Input.Group;
const Option = Select.Option;

let paramId = 0;

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

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
          return;
        }
    
        // can use data-binding to set
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
      }
    
      add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++paramId);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          keys: nextKeys,
        });
      }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    getFieldDecorator('keys', { initialValue: (this.props.currentPlugin.Control ? this.props.currentPlugin.Control : 0) });
    const keys = getFieldValue('keys');
    const parameterItems = this.props.currentPlugin.Control ? (keys.map((k, index) => (
        <div key={k}>
            <Form.Item
                label={index === 0 ? 'Parameters' : ''}
                required={true}
            >
                {getFieldDecorator(`parameters[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                    required: true,
                    whitespace: true,
                    message: "Please input the parameter name or delete this field.",
                }],
                initialValue: (this.props.currentPlugin.Control && this.props.currentPlugin.Control[index]) ? this.props.currentPlugin.Control[index] : null
                })(
                <Input placeholder={"Parameter " + (index+1)} style={{ width: '60%', marginRight: 8 }} />
                )}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
            <Form.Item >

                <InputGroup compact>
                {getFieldDecorator(`parameterMinValues[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                    required: true,
                    whitespace: true,
                    message: "Please input the parameter values or delete this field.",
                }],
                initialValue: (this.props.currentPlugin.Min && this.props.currentPlugin.Min[index]) ? this.props.currentPlugin.Min[index] : null
                })(
                    <Input style={{ width: '25%' }} placeholder="Min" />
                )}
                {getFieldDecorator(`parameterDefaultValues[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                    required: true,
                    whitespace: true,
                    message: "Please input the parameter values or delete this field.",
                }],
                initialValue: (this.props.currentPlugin.Default && this.props.currentPlugin.Default[index]) ? this.props.currentPlugin.Default[index] : null
                })(
                    <Input style={{ width: '25%' }} placeholder="Default" />
                )}
                {getFieldDecorator(`parameterMaxValues[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                    required: true,
                    whitespace: true,
                    message: "Please input the parameter values or delete this field.",
                }],
                initialValue: (this.props.currentPlugin.Max && this.props.currentPlugin.Max[index]) ? this.props.currentPlugin.Max[index] : null
                })(
                    <Input style={{ width: '25%' }} placeholder="Max" />
                )}
            </InputGroup>
            </Form.Item>
        </div>
    ))) : null;

    return (
        <Form layout="vertical" onSubmit={this.handleSubmit} id="editCreateForm">
            <Form.Item label="Name" >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input a name for the plugin!' }],
                initialValue: this.props.currentPlugin.Name
              })(
                <Input placeholder='Enter plugin name' />
              )}
            </Form.Item>
            <Form.Item label="Description">
            {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please input a description for the plugin!' }],
                initialValue: this.props.currentPlugin.Comment
              })(
                <TextArea rows={4} placeholder='Enter plugin description' />
              )}
            </Form.Item>
            <Form.Item
                label="Select tags"
                >
                {getFieldDecorator('tags', {
                    rules: [{ required: true, message: 'Please select at least one tag!', type: 'array' }],
                    initialValue: this.props.currentPlugin.Tags
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
            {parameterItems}
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                <Icon type="plus" /> Add parameter
            </Button>
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