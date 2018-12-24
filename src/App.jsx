import React, { Component } from 'react';
import './assets/App.css';
import firestore from "./firestore";
import { Layout } from 'antd';
import NavMenu from './components/NavMenu';
import Gallery from './components/Gallery';
import Login from './components/Login'
import PluginGrid from './components/PluginGrid';
import PluginDetails from './components/PluginDetails';
import AccountManager from './components/AccountManager';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentPage: 'home',
        details: []
    }
  }

  render() {
    let pageContent;
    if (this.state.currentPage === 'home') {
      pageContent =(
        <Layout className="layoutContent">
          <Login/>
        </Layout>
      );
    } else if (this.state.currentPage === 'gallery') {
      pageContent =(
        <Layout className="dark-bg layoutContent">
          <Gallery 
            getFSdoc = {this.getFSdoc.bind(this)}
            goToPage = {this.goToPage.bind(this)}
            goToDetails = {this.goToDetails.bind(this)}
          />
        </Layout>
      );
    } else if (this.state.currentPage === 'plugins') {
      pageContent =(
        <Layout className="layoutContent"> 
              <PluginGrid 
                getPaginatedFSdoc = {this.getPaginatedFSdoc.bind(this)}
                goToDetails = {this.goToDetails.bind(this)}
              />
            </Layout>
      );
    } else if (this.state.currentPage === 'pedalboards') {
      pageContent =(
        <h1>Page in construction</h1>
      );
    } else if (this.state.currentPage === 'account') {
      pageContent =(
        <AccountManager 
          getFSdoc = {this.getFSdoc.bind(this)}
        />
      );
    } else if (this.state.currentPage === 'pluginDetails') {
      pageContent =(
        <Layout className="layoutContent">
              <PluginDetails 
                plugin = {this.state.details}
              />
        </Layout>
      );
    }

    return(
      <div className="App">
          <Layout>
            <NavMenu 
              currentPage = {this.state.currentPage}
              menuMode = "horizontal"
              handlePageChange = {this.handlePageChange.bind(this)}
            />
            {pageContent}
          </Layout>
      </div>
    )
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

  goToDetails(plugin) {
    this.setState({
      currentPage: "pluginDetails", details: plugin
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

  getPaginatedFSdoc(collection, filterColumn, filterValue, nbOfDocs, startAt, callback) {
    let pluginArr = [];
    var pluginRef = firestore.collection(collection);

    if (!startAt) {
      pluginRef.where(filterColumn, '==', filterValue).orderBy("Comment", "asc").limit(nbOfDocs).get().then(pluginsData => {
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
      pluginRef.where(filterColumn, '==', filterValue).orderBy("Comment", "asc").limit(nbOfDocs).startAt(startAt).get().then(pluginsData => {
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
  }
}

export default App;
