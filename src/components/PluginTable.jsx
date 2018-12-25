import React from 'react';
import { Table, Tag, Button, Modal } from 'antd';

export default class ParametersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          plugins: [],
          data: [],
          editModalVisible: false,
          deleteModalVisible: false,
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
            'image': 'img',
            'actions': ['Edit', 'Delete']
          }
        );
      })
      this.setState({ data: dataContent });
    }

    editPlugin(plugin) {
      console.log(plugin);
      this.setState({
        currentPlugin: plugin, editModalVisible: true
      });
    }

    deletePlugin(plugin) {
      console.log(plugin);
      const self = this;
      Modal.confirm({
        title: 'Supprimer le plugin',
        content: 'Êtes-vous sûr de vouloir supprimer ' + plugin.name + ' ?',
        okText: 'Oui',
        okType: 'danger',
        cancelText: 'Non',
        confirmLoading: self.state.confirmLoading,
        onOk() {self.handleDelete();},
        onCancel() {self.handleCancel();}
      });
    }

    handleEdit = () => {
      this.setState({
        confirmLoading: true,
      });
      setTimeout(() => {
        this.setState({
          editModalVisible: false,
          confirmLoading: false,
        });
      }, 2000);
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
        deleteModalVisible: false, editModalVisible: false
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
      width: 1000
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
      width: 300
    }, {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (actions, record) => (
        <span>
          {actions.map((action) => <Button icon={action.toLowerCase()} onClick={() => {this[action.toLowerCase() + pluginLabel](record)}}>{action}</Button>)}
        </span>
      )
    }];

    return (
      <div>
        <Table columns={columns} dataSource={this.state.data} pagination={false} pagination={{pageSizeOptions: ['5', '10', '15'], showSizeChanger: true, defaultPageSize: 10}} scroll={{ x: 1900 }} title={() => 'Your plugins'} />
        
        <Modal
          title="Editer le plugin"
          visible={this.state.editModalVisible}
          onOk={this.handleEdit}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{this.state.currentPlugin.name}</p>
        </Modal>

      </div>
    );
  }
}