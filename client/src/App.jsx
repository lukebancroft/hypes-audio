import React, { Component } from 'react';
import NavMenu from './components/NavMenu';
import ParametersTable from './components/ParametersTable';
import Gallery from './components/Gallery';
import firestore from "./firestore";
import './assets/App.css';
import { Layout } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import PluginGrid from './components/PluginGrid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentPage: 'home',
        plugins: []
    }
  }

  componentDidMount() {
    this.getFSdoc();
  }

  render() {
    if (this.state.currentPage === 'home') {
      return (
        <div className="App">
          <Layout>
            <NavMenu 
              currentPage = {this.state.currentPage}
              menuMode = "horizontal"
              handlePageChange = {this.handlePageChange.bind(this)}
            />

            <Layout>

            </Layout>
          </Layout>
        </div>
      );
    } else if (this.state.currentPage === 'gallery') {
      return(
        <div className="App">
          <Layout>
            <NavMenu 
              currentPage = {this.state.currentPage}
              menuMode = "horizontal"
              handlePageChange = {this.handlePageChange.bind(this)}
            />

            <Layout className="dark-bg" >
              <Gallery 
                plugins = {this.state.plugins}
                goToPage = {this.goToPage.bind(this)}
              />
            </Layout>
          </Layout>
        </div>
      )
    } else if (this.state.currentPage === 'plugins') {
      return(
        <div className="App">
          <Layout>
            <Sider >
              <NavMenu 
                currentPage = {this.state.currentPage}
                menuMode = "vertical"
                handlePageChange = {this.handlePageChange.bind(this)}
              />
            </Sider>

            <Layout> 
              <PluginGrid 
                plugins = {this.state.plugins}
              />
            </Layout>
          </Layout>
        </div>
      )
    } else if (this.state.currentPage === 'pedalboards') {
      return(
        <div className="App">
          <Layout>
            <Sider >
              <NavMenu 
                currentPage = {this.state.currentPage}
                menuMode = "vertical"
                handlePageChange = {this.handlePageChange.bind(this)}
              />
            </Sider>

            <Layout>
              <ParametersTable />
            </Layout>
          </Layout>
        </div>
      )
    }
  }

  handlePageChange = (e) => {
    this.setState({
      currentPage: e.key
    });
  }

  goToPage(page) {
    this.setState({
      currentPage: page
    });
  }

  getFSdoc() {
    let pluginArr = [];
    var pluginRef = firestore.collection("plugins");
      pluginRef.get().then(pluginsData => {
        pluginsData.forEach(plugin => {
          if (plugin.exists) {
            pluginRef.doc(plugin.id).get().then(doc => {
              let data = doc.data();
              data.id = plugin.id;
              console.log(doc.data())
              pluginArr.push(doc.data());
            })
          }
        })
     }).catch(function(error) {
        console.log("Error getting collection:", error);
     });

     this.setState({
       plugins: pluginArr
     });
  }

}

export default App;
