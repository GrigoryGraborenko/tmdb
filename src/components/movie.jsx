////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const React = require('react');
const CreateComponent = require('boc/component')(React);

const moment = require('moment');

import Action from './action.jsx';

export default CreateComponent({ route: "route", movies: "movie_list", movie: "movie", pending: "_pending" }, {
    renderMovieDetails(movie) {

        var release_date = moment(movie.release_date, "YYYY-MM-DD");
        if(movie.runtime) {
            var hours = Math.floor(movie.runtime / 60);
            var minutes = movie.runtime % 60;
            var runtime = hours + "h";
            if(minutes) {
                runtime += " " + minutes + "m";
            }
        }

        return (
            <div className="movie-detail">
                <img src={ "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path } />
                <Action store={ this.props.store } name="home_page" className="back">
                    &#8592;
                </Action>
                <div className="header">
                    <img src={ "https://image.tmdb.org/t/p/w500/" + movie.poster_path } />
                    <h2>{ movie.title }</h2>
                    <div className="release-date">{ release_date.format("YYYY") } &#183; { Math.floor(movie.vote_average * 10 + 0.5) + "%" } user score</div>
                    <div className="runtime">{ runtime ? runtime : "Loading..." }</div>
                </div>
                <div className="overview">
                    <h3>Overview</h3>
                    <p>
                        { movie.overview }
                    </p>
                </div>
            </div>
        );
    }
    ,render() {

        /// show partial if the movie hasn't loaded or isn't already cached
        if(this.props.movies && ((!this.props.movie) || (this.props.pending.movie_view && (this.props.route.params.movie_id !== this.props.movie.id)))) {
            var found_movie = this.props.movies.find(function(movie) {
                return movie.id == this.props.route.params.movie_id;
            }, this);
        } else {
            var found_movie = this.props.movie;
        }
        if(found_movie) {
            var details = this.renderMovieDetails(found_movie);
        } else {
            var details = <h1 style={{ color: "white" }}>Loading...</h1>;
        }

        return (
            <div>
                { details }
            </div>
        );
    }
});
