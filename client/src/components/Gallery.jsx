import React from 'react';
import { Card, Button, Row, Col } from 'antd';
const { Meta } = Card;

export default class Gallery extends React.Component {

    makeGalleryRows() {
        let gallery = [];
        let i, chunk = 3;

        for (i=0; i < this.props.plugins.length; i += chunk) {
            let galleryItems = this.props.plugins.slice(i, i + chunk);
            gallery.push(
                <Row type="flex" key={"plugin_row_" + i}>
                    <Col span={1}></Col>
                        {galleryItems.map(plugin => 
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
            )
        }
        return gallery;
    }

  render() {
    
    return (
        <div className="gallery-container">
            <div className="section-header">
                <h1>Inspiration in all the classics</h1>
                <p>All the famous stompboxes, FX, synths, sequencers and amps that made history</p>
            </div>

            <div className="gallery-container">
                {this.makeGalleryRows()}
            </div>

            <div className="section-footer">
                <h2>Explore hundreds more on our Plugin page</h2>
                <Button className="footerBtn" type="danger" ghost onClick={() => {this.props.goToPage("plugins")}}>GO TO PLUGIN SHOP</Button>
            </div>
        </div>
    );
}
}