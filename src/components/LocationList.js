import React, {Component} from 'react';
import LocationItem from './LocationItem';

class LocationList extends Component {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            'locations': '',
            'query': '',
            'suggestions': true,
        };

        this.filterLocations = this.filterLocations.bind(this);
        this.toggleSuggestions = this.toggleSuggestions.bind(this);
    }

    /**
     * Filter locations by user query
     */
    filterLocations(event) {
        this.props.closeInfoWindow();
        const {value} = event.target;
        const locations = [];
        this.props.alllocations.forEach(function (location) {
            if (location.longname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                location.marker.setVisible(true);
                locations.push(location);
            } else {
                location.marker.setVisible(false);
            }
        });

        this.setState({
            'locations': locations,
            'query': value
        });
    }

    componentWillMount() {
        this.setState({
            'locations': this.props.alllocations
        });
    }

    /**
     * Show or hide suggestions
     */
    toggleSuggestions() {
        this.setState({
            'suggestions': !this.state.suggestions
        });
    }

    /**
     * Render function LocationList
     */
    render() {
        const locationlist = this.state.locations.map(function (listItem, index) {
            return (
                <LocationItem key={index} openInfoWindow={this.props.openInfoWindow.bind(this)} data={listItem}/>
            );
        }, this);

        return (
            <div className="search" id="search-field">
                <input role="search" aria-labelledby="search-field" id="search-field" className="search-field" type="text" placeholder="Filter"
                       value={this.state.query} onChange={this.filterLocations}/>
                <ul>
                    {this.state.suggestions && locationlist}
                </ul>
                <button className="button" onClick={this.toggleSuggestions}>Show\Hide list</button>
            </div>
        );
    }
}

export default LocationList;