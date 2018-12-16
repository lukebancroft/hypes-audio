import React from 'react';
import { Card, Row, Col, Divider, Input } from 'antd';
import Masonry from 'react-mason';
import '../assets/App.css';
const { Meta } = Card;

const Search = Input.Search;

export default class PluginGrid extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          plugins: [],
          loadedImages: 0
      }

      this.enableLoader = this.enableLoader.bind(this);
      this.disableLoader = this.disableLoader.bind(this);
      this.imageCount = this.imageCount.bind(this);
    }

    componentDidMount() {
        const self = this;
        this.enableLoader();
        this.props.getFSdoc("plugins", "Collection", "shop", function(plugins) {
            self.setState({ plugins: plugins });
            console.log(self.state.plugins[1].Tags);
            console.log(self.state.plugins[1].Tags[0]);
        })
    }


    enableLoader() {
        document.getElementById("loader").style.display = "block";
        document.getElementById("stack").style.visibility = "hidden";
        //document.getElementById("menu-content").style.pointerEvents = "none";
        //document.getElementById("filter-group").style.pointerEvents = "none";
    }
    
    disableLoader() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("stack").style.visibility = "unset";
        //document.getElementById("menu-content").style.pointerEvents = "all";
        //document.getElementById("filter-group").style.pointerEvents = "all";
    }

    imageCount() {
        console.log("loaded");
        this.setState({ loadedImages: this.state.loadedImages + 1 }, () => {
            console.log("images :" + this.state.loadedImages);
            console.log("plugins :" + this.state.plugins.length);
            if (this.state.loadedImages === this.state.plugins.length) {
                this.disableLoader();
            }
        });
    }

  render() {
    
    return (
        <div>
            <Row className="gridHeader">
                <strong><h1>PLUGINS</h1></strong>
                <p>Here be plugins</p>
                <Divider />
                <Col span={12} offset={6}>
                    <Search
                        placeholder="Search plugins"
                        onSearch={value => console.log(value)}
                        enterButton
                    />
                </Col>
            </Row>
            <br/>

            <div id="loader"></div>

            <div id="stack">
                <Masonry>
                    {this.state.plugins.map(plugin => 
                        <div  key={plugin.Name} className="stack-card">
                            <a>
                                <img src={plugin.ImageUrl} alt={plugin.Name} onLoad={this.imageCount}></img>
                            </a>
                            <div className="tagContainer">
                                {Array.from(plugin.Tags).map(tag => 
                                    <a key={plugin.Name + "_" + tag} className="pluginTag">{tag}</a>
                                )}
                            </div>
                            <div className="pluginInfo">
                                <Divider />
                                <a>{plugin.Name}</a>
                                <a className="creator">{plugin.Creator}</a>
                            </div>
                        </div>
                    )}
                </Masonry>
            </div>
        </div>
    );
  }
}