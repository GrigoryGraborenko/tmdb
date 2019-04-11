////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const React = require('react');
const CreateComponent = require('boc/component')(React);

export default CreateComponent({ route: "route", movie: "movie", pending: "_pending" }, {
    renderMovieDetails(movie) {

        // console.log(movie);

        return (
            <div>{ movie.title }</div>
        );
    }
    ,render() {

        /// show loading if the movie hasn't loaded or isn't already cached
        if((!this.props.movie) || (this.props.pending.movie_view && (this.props.route.params.movie_id !== this.props.movie.id))) {
            var details = <div>Loading...</div>;
        } else {
            var details = this.renderMovieDetails(this.props.movie);
        }

        return (
            <div>
                <h1>Specific movie</h1>
                { details }
            </div>
        );
    }
});
