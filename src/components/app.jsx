////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const React = require('react');
const CreateComponent = require('boc/component')(React);

import Listing from './listing.jsx';
import Movie from './Movie.jsx';

export default CreateComponent({ route: "route" }, {
    render() {

    	if(this.props.route.name === "movie_view") {
            var page = <Movie store={ this.props.store }/>;
    	} else {
	    	var page = <Listing store={ this.props.store }/>;
    	}

        return (
            <div id="app-container">
            	{ page }
            </div>
        );
    }
});
