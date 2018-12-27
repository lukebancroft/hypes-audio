import React from 'react';
import { Row, Col } from 'antd';
import PluginTable from './PluginTable';

export default class AccountManager extends React.Component {

  render() {
    
    return (
        <Row>
            <Col span={20} offset={2}>
                <h1>Here you can manage your plugins or upload a new one.</h1>
                <PluginTable 
                    getFSdoc = {this.props.getFSdoc.bind(this)}
                />
            </Col>
        </Row>
    );
}
}