import React from 'react';
import { Table } from 'antd';

export default class ParametersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: []
        }
    }

    componentDidMount() {
      let columnsContent = [];
      let dataContent = [];

      if (this.props.headers.length > 0 && this.props.data.length > 0) {
        for (let i = 0; i < this.props.headers.length; i++) {
          let header = this.props.headers[i].toString();
          columnsContent.push({
            title: header,
            dataIndex: header,
            key: header
          });
        }
  
        for (let j = 0; j < this.props.data[0].length; j++) {
          dataContent.push({'key': j});
          for (let k = 0; k < columnsContent.length; k++) {
            dataContent[j][columnsContent[k].title] = this.props.data[k][j]
          }
        }
  
        this.setState({
          columns: columnsContent, data: dataContent
        });
      }
    }

  render() {
    return (
        <Table columns={this.state.columns} dataSource={this.state.data} pagination={false} />
    );
  }
}