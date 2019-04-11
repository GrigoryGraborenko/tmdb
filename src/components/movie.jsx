////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const React = require('react');
const CreateComponent = require('boc/component')(React);

const moment = require('moment');

import Action from './action.jsx';

export default CreateComponent({ route: "route", movie: "movie", pending: "_pending" }, {
    renderMovieDetails(movie) {

        // console.log(movie);
        var release_date = moment(movie.release_date, "YYYY-MM-DD");
        var hours = Math.floor(movie.runtime / 60);
        var minutes = movie.runtime % 60;
        var runtime = hours + "h";
        if(minutes) {
            runtime += " " + minutes + "m";
        }

        return (
            <div className="movie-detail">
                <img src={ "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path } />
                <Action store={ this.props.store } name="home_page" className="back">
                    &#8592;
                </Action>
                <div className="header">
                    <img src={ "https://image.tmdb.org/t/p/w500/" + movie.poster_path } />
                    <h1>{ movie.title }</h1>
                    <div className="release-date">{ release_date.format("YYYY") } &#183; { Math.floor(movie.vote_average * 10 + 0.5) + "%" } user score</div>
                    <div className="runtime">{ runtime }</div>
                </div>
                <div className="overview">
                    <h2>Overview</h2>
                    { movie.overview }
                </div>
            </div>
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
                { details }
            </div>
        );
    }
});
