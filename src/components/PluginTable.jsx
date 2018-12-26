import React from 'react';
import { Table, Tag, Button, Modal, Input, Icon, Form, Upload } from 'antd';
import firestore from "../firestore";
import EditCreatePluginFieldset from './EditCreatePluginFieldset';

export default class ParametersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          plugins: [],
          data: [],
          editCreateModalVisible: false,
          deleteModalVisible: false,
          modalType: '',
          confirmLoading: false,
          currentPlugin: []
        }

        this.makeRows = this.makeRows.bind(this);
        this.editPlugin = this.editPlugin.bind(this);
        this.deletePlugin = this.deletePlugin.bind(this);
    }

    componentDidMount() {
      const self = this;
        this.props.getFSdoc("plugins", null, null, function(plugins) {
            self.setState({ plugins: plugins }, () => {
              self.makeRows();
            });
        })
    }

    makeRows() {
      let dataContent = [];

      this.state.plugins.map( plugin => {
        dataContent.push(
          {
            'key': plugin.id,
            'name': plugin.Name,
            'comment': plugin.Comment,
            'url': plugin.url,
            'tags': plugin.Tags,
            'image': plugin.ImageUrl,
            'actions': ['Edit', 'Delete']
          }
        );
      })
      this.setState({ data: dataContent });
    }

    editPlugin(plugin) {
      console.log(plugin);
      this.setState({
        currentPlugin: plugin, editCreateModalVisible: true, modalType: 'Edit'
      });
    }

    createPlugin() {
      this.setState({
        currentPlugin: [], editCreateModalVisible: true, modalType: 'Create'
      });
    }

    deletePlugin(plugin) {
      console.log(plugin);
      const self = this;

      this.setState({
        currentPlugin: plugin
      }, () => {
        Modal.confirm({
          title: 'Delete plugin',
          content: 'Are you sure you want to delete ' + this.state.currentPlugin.name + ' ?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          confirmLoading: self.state.confirmLoading,
          onOk() {self.handleDelete();},
          onCancel() {self.handleCancel();}
        });
      });
      
    }

    handleEdit = () => {
      this.setState({
        confirmLoading: true,
      });
      setTimeout(() => {
        this.setState({
          editCreateModalVisible: false,
          confirmLoading: false,
        });
      }, 2000);
    }

    handleCreate = () => {
      this.setState({
        confirmLoading: true,
      }, () => {
        firestore.collection('plugins').add({
          Name: 'New',
          Comment: 'This is a new plugin',
          Tags: ['Filter', 'Instrument'],
          ImageUrl: 'https://firebasestorage.googleapis.com/v0/b/hypes-audio.appspot.com/o/plugin_images%2FGxDuck_Delay.png?alt=media&token=d34dbe3a-0148-4518-84b0-4b409935754d',
          url: 'www.hypesaudio.com',
          Creator: 'Luke Bancroft-Richardson',
          collection: 'shop'
        }).then(ref => {
          console.log('Added plugin with ID: ', ref.id);
          this.setState({
            editCreateModalVisible: false,
            confirmLoading: false,
          });
        });
      });
    }

    handleDelete = () => {
      this.setState({
        confirmLoading: true,
      });
      setTimeout(() => {
        this.setState({
          deleteModalVisible: false,
          confirmLoading: false,
        });
      }, 2000);
    }
  
    handleCancel = () => {
      this.setState({
        deleteModalVisible: false, editCreateModalVisible: false
      });
    }

  render() {
    const pluginLabel = 'Plugin';

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 100
    }, {
      title: 'Comment (Scroll right for more)',
      dataIndex: 'comment',
      key: 'comment',
      width: 900
    }, {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      width: 300
    }, {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 300,
      render: tags => (
        <span>
          {tags.map(tag => <Tag color="purple" key={tag + Math.random()}>{tag}</Tag>)}
        </span>
      )
    }, {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 300,
      render: (image, record) => (
        <img src={image} alt={record.name} className="tableImage" ></img>
      )
    }, {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (actions, record) => (
        <span>
          {actions.map((action) => <Button icon={action.toLowerCase()} key={record.id + "_" + action + "_button"} className="actionButton" onClick={() => {this[action.toLowerCase() + pluginLabel](record)}} >{action}</Button>)}
        </span>
      )
    }];

    const EditCreateForm = Form.create()(EditCreatePluginFieldset);

    return (
      <div>
        <Button icon='cloud-upload' className='uploadButton' onClick={() => {this.createPlugin()}} >Upload a new plugin</Button>

        <Table columns={columns} dataSource={this.state.data} pagination={false} pagination={{pageSizeOptions: ['5', '10', '15'], showSizeChanger: true, defaultPageSize: 10}} scroll={{ x: 1800 }} title={() => 'Your plugins'} />
        
        <Modal
          title="Edit plugin"
          visible={this.state.editCreateModalVisible}
          onOk={this.handleEdit}
          okText={this.state.modalType}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          >

          <EditCreateForm 
            currentPlugin={this.state.currentPlugin}
          />

        </Modal>

      </div>
    );
  }
}