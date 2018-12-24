import React from 'react';
import { Menu, Icon } from 'antd';

export default class NavMenu extends React.Component {

  render() {

    return (
        <Menu
        onClick={this.props.handlePageChange}
        selectedKeys={[this.props.currentPage]}
        mode={this.props.menuMode}>
            <Menu.Item key="logo" disabled>
                <img src="/hypes-audio_logo.png" alt="logo" height="44px" width="125px" />
            </Menu.Item>
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
            <Menu.Item key="account">
                <Icon type="user" />Account
            </Menu.Item>
        </Menu>
    );
  }
}