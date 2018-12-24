import React from 'react';
import PluginTable from './PluginTable';

export default class AccountManager extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          classics: []
      }
    }

    componentDidMount() {
        
    }

  render() {
    
    return (
        <PluginTable 
            getFSdoc = {this.props.getFSdoc.bind(this)}
        />
    );
}
}