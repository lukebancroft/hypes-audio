import React from 'react';
import { Table, Tag, Button } from 'antd';

export default class ParametersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          plugins: [],
          data: []
        }
        
        this.makeRows = this.makeRows.bind(this);
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
      let iterator = 0;
      let dataContent = [];

      this.state.plugins.map( plugin => {
        dataContent.push(
          {
            'key': iterator,
            'name': plugin.Name,
            'comment': plugin.Comment,
            'url': plugin.url,
            'tags': plugin.Tags,
            'image': 'img',
            'actions': ['Edit', 'Delete']
          }
        );
        iterator++;
      })
      this.setState({ data: dataContent });
    }

  render() {
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
      render: actions => (
        <span>
          {actions.map(action => <Button icon={action.toLowerCase()}>{action}</Button>)}
        </span>
      )
    }];

    return (
        <Table columns={columns} dataSource={this.state.data} pagination={false} pagination={{pageSizeOptions: ['5', '10', '15'], showSizeChanger: true, defaultPageSize: 10}} scroll={{ x: 1900 }} title={() => 'Your plugins'} />
    );
  }
}