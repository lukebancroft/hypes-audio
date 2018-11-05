import React from 'react';
import { Menu, Icon } from 'antd';

export default class ParametersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'home'
        }
    }

    handleClick = (e) => {
        this.setState({
          current: e.key,
        });
      }

  render() {

    return (
        <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        >
        <Menu.Item key="home">
          <Icon type="global" />Home
        </Menu.Item>
        <Menu.Item key="gallery">
          <Icon type="appstore" />Plugin gallery
        </Menu.Item>
        <Menu.Item key="plugins">
          <Icon type="ant-design" />Plugins
        </Menu.Item>
        <Menu.Item key="pedalboards">
          <Icon type="api" />Pedalboards
        </Menu.Item>
      </Menu>
    );
  }
}