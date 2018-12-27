import React from 'react';
import { Row, Col, Divider, Input } from 'antd';
import Masonry from 'react-mason';
import '../assets/App.css';

const Search = Input.Search;

export default class PluginGrid extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          plugins: [],
          loadedImages: 0,
          pluginsPerPage: 5,
          searchTag: '',
          searchName: ''
      }

      this.enableLoader = this.enableLoader.bind(this);
      this.disableLoader = this.disableLoader.bind(this);
      this.imageCount = this.imageCount.bind(this);
      this.loadMore = this.loadMore.bind(this);
      this.tryDisableLoadMore = this.tryDisableLoadMore.bind(this);
      this.searchFor = this.searchFor.bind(this);
      this.filterByTag = this.filterByTag.bind(this);
    }

    componentDidMount() {
        const self = this;
        this.enableLoader();
        if (this.state.searchName === '' || this.state.searchTag === '') {
            this.props.getPaginatedFSdoc("plugins", "Collection", "shop", this.state.pluginsPerPage, null, function(plugins) {
                self.setState({ plugins: plugins });
            })
        }
        else {
            this.props.getPaginatedFSdocByTagAndOrName("plugins", "Collection", "shop", this.state.searchTag, this.state.searchName, this.state.pluginsPerPage, null, function(plugins) {
                self.setState({ plugins: plugins });
            })
        }
    }

    loadMore() {
        const self = this;

        if (this.state.searchName === '' || this.state.searchTag === '') {
            this.props.getPaginatedFSdoc("plugins", "Collection", "shop", (this.state.pluginsPerPage + 1), this.state.plugins[this.state.plugins.length - 1].Comment, function(plugins) {
                let pluginsBeforeUpdate = self.state.plugins.length;
                plugins.shift();
                self.setState({ plugins: [...self.state.plugins, ...plugins] });
                self.tryDisableLoadMore(pluginsBeforeUpdate);
            })
        } else {
            this.props.getPaginatedFSdocByTagAndOrName("plugins", "Collection", "shop", this.state.searchTag, this.state.searchName, (this.state.pluginsPerPage + 1), this.state.plugins[this.state.plugins.length - 1].Comment, function(plugins) {
                let pluginsBeforeUpdate = self.state.plugins.length;
                plugins.shift();
                self.setState({ plugins: [...self.state.plugins, ...plugins] });
                self.tryDisableLoadMore(pluginsBeforeUpdate);
            })
        }
    }

    enableLoader() {
        document.getElementById("loader").style.display = "block";
        document.getElementById("stack").style.visibility = "hidden";
    }
    
    disableLoader() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("stack").style.visibility = "unset";
    }

    imageCount() {
        this.setState({ loadedImages: this.state.loadedImages + 1 }, () => {
            if (this.state.loadedImages === this.state.plugins.length) {
                this.disableLoader();
            }
        });
    }

    tryDisableLoadMore(nbOfPlugins) {
        if (this.state.plugins.length % this.state.pluginsPerPage !== 0 || this.state.plugins.length === nbOfPlugins) {
            document.getElementsByClassName("load-more-button")[0].style.display = "none";
        }
    }

    searchFor(searchTerm) {
        console.log(searchTerm);
        this.setState({ searchName: searchTerm });
    }

    filterByTag(tag) {
        console.log(tag);
        this.setState({ searchTag: tag });
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
                        onSearch={value => this.searchFor(value)}
                        className="pluginSearchBar"
                        enterButton
                    />
                </Col>
            </Row>
            <br/>

            <div id="loader"></div>

            <div id="stack">
                <Row>
                    <Col span={20} offset={2}>
                        <Masonry>
                            {this.state.plugins.map(plugin => 
                                <div  key={plugin.Name} className="stack-card">
                                    <a onClick={() => {this.props.goToDetails(plugin)}} href={"#" + plugin.id} >
                                        <img src={plugin.ImageUrl} alt={plugin.Name} onLoad={this.imageCount}></img>
                                    </a>
                                    <div className="tagContainer">
                                        {plugin.Tags.map(tag => 
                                            <a key={plugin.Name + "_" + tag} className="pluginTag" href={"#" + tag +"_tag"} value={tag} onClick={() => {this.filterByTag(tag)}}>{tag}</a>
                                        )}
                                    </div>
                                    <div className="pluginInfo">
                                        <Divider />
                                        <a onClick={() => {this.props.goToDetails(plugin)}} href={"#" + plugin.id} >{plugin.Name}</a>
                                        <a className="creator" onClick={() => {this.props.goToDetails(plugin)}} href={"#" + plugin.id} >{plugin.Creator}</a>
                                    </div>
                                </div>
                            )}
                        </Masonry>
                    </Col>
                </Row>
                <Row className="load-more-row">
                    <button className="load-more-button" onClick={() => {this.loadMore()}}>LOAD MORE</button>    
                </Row>        
            </div>
        </div>
    );
  }
}