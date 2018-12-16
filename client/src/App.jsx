import React, { Component } from 'react';
import NavMenu from './components/NavMenu';
import ParametersTable from './components/ParametersTable';
import Gallery from './components/Gallery';
import firestore from "./firestore";
import './assets/App.css';
import { Layout } from 'antd';
import Login from './components/Login'
import PluginGrid from './components/PluginGrid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentPage: 'home'
    }
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

            <Layout className="layoutContent">
              <Login/>
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

            <Layout className="dark-bg layoutContent">
              <Gallery 
                getFSdoc = {this.getFSdoc.bind(this)}
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
            <NavMenu 
              currentPage = {this.state.currentPage}
              menuMode = "horizontal"
              handlePageChange = {this.handlePageChange.bind(this)}
            />

            <Layout className="layoutContent"> 
              <PluginGrid 
                getFSdoc = {this.getFSdoc.bind(this)}
              />
            </Layout>
          </Layout>
        </div>
      )
    } else if (this.state.currentPage === 'pedalboards') {
      return(
        <div className="App">
          <Layout>
            <NavMenu 
              currentPage = {this.state.currentPage}
              menuMode = "horizontal"
              handlePageChange = {this.handlePageChange.bind(this)}
            />

            <Layout className="layoutContent">
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

  getFSdoc(collection, filterColumn, filterValue, callback) {
    let pluginArr = [];
    var pluginRef = firestore.collection(collection);

    if (filterColumn && filterValue) {
      pluginRef.where(filterColumn, '==', filterValue).get().then(pluginsData => {
        pluginsData.forEach(plugin => {
          if (plugin.exists) {
            pluginRef.doc(plugin.id).get().then(doc => {
              let data = doc.data();
              data.id = plugin.id;
              pluginArr.push(data);
              if (pluginArr.length === pluginsData.size) {
                callback(pluginArr);
              }
            });
          }
        });
      }).catch(function(error) {
          console.log("Error getting collection:", error);
      });
    }
    else {
        pluginRef.get().then(pluginsData => {
          pluginsData.forEach(plugin => {
            if (plugin.exists) {
              pluginRef.doc(plugin.id).get().then(doc => {
                let data = doc.data();
                data.id = plugin.id;
                pluginArr.push(data);
                if (pluginArr.length === pluginsData.size) {
                  callback(pluginArr);
                }
              })
            }
          })
      }).catch(function(error) {
          console.log("Error getting collection:", error);
      });
    }
  }
}

export default App;
