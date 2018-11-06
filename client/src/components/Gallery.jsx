import React from 'react';
import { Card, Icon, Button, Row, Col } from 'antd';
const { Meta } = Card;

export default class Gallery extends React.Component {

  render() {

    var nbOfPlugins = 0;
    
    return (
        <div className="gallery-container">
            <div className="section-head">
                <h1>Inspiration in all the classics</h1>
                <p>All the famous stompboxes, FX, synths, sequencers and amps that made history</p>
            </div>
            <Row>
                <Col className="gutter-row" span={2} />
                <Row type="flex" >
                    {this.props.plugins.map(plugin => 
                        <Col className="gutter-row" span={6} offset={1} key={plugin.Name}>
                            <Card className="pluginCard" hoverable
                                title={plugin.Name}
                                cover={<img src={plugin.ImageUrl} alt={plugin.Name}/>}
                                actions={[<Button className="pluginCard-btn" type="danger" ghost>DETAILS</Button>]}>
                                <Meta className="pluginMeta"
                                    description={plugin.Comment} />
                            </Card>
                        </Col>
                    )}
                </Row>
            </Row>
        </div>
    );
}
}