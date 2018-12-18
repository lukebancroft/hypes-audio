import React from 'react';
import ParametersTable from './ParametersTable';

export default class PluginDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parameters: [],
            data: []
        }
    }

    componentWillMount() {
        let dataContent = [];
        let currentParam = '';
        if (this.props.plugin.Parameters) {
            for(let i = 0; i < this.props.plugin.Parameters.length; i++) {
                currentParam = this.props.plugin.Parameters[i].toString();
                dataContent.push(this.props.plugin[currentParam]);
            }
            this.setState({
                parameters: this.props.plugin.Parameters, data: dataContent
            });
        }
    }

  render() {
    return (
        <div className="pluginDetails">
            <div className="headerDetails">
                <p>{this.props.plugin.Creator}</p>
                <a href={this.props.plugin.url}>{this.props.plugin.url}</a>
                <h2>{this.props.plugin.Name}</h2>
            </div>    

            <div className="pedalboard-count-container">
                <a className="pedalboard-count" href="#">
                    <span>39</span>
                </a>
                <span className="pedalboard-count-text">Pedalboards using it</span>
            </div>

            <img className="pluginImg" src={this.props.plugin.ImageUrl} alt={this.props.plugin.Name}></img>
            
            <div className="tagContainer">
                {this.props.plugin.Tags.map(tag => 
                    <a key={this.props.plugin.Name + "_" + tag} className="pluginTag">{tag}</a>
                )}
            </div>
            <p className="description">{this.props.plugin.Comment}</p>
            <ParametersTable 
                headers={this.state.parameters}
                data={this.state.data}
            />
            <img className="logo" src="/hypes-audio_logo.png" alt="logo" height="44px" width="125px" />
        </div>
    );
  }
}