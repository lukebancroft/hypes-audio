import React from 'react';
import StackGrid from "react-stack-grid";
import { Card, Button, Row, Col } from 'antd';
const { Meta } = Card;

export default class PluginGrid extends React.Component {

  render() {

    return (
        <StackGrid
        columnWidth={150}
        >
            {this.props.plugins.map(plugin => 
                        <Col key={plugin.Name}>
                            <Card className="pluginCard" hoverable
                                cover={<img src={plugin.ImageUrl} alt={plugin.Name}/>}>
                            </Card>
                        </Col>
                    )}
      </StackGrid>
    );
  }
}