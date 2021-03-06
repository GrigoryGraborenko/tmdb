////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const React = require('react');
const CreateComponent = require('boc/component')(React);

const moment = require('moment');

import Action from './action.jsx';

export default CreateComponent({ movies: "movie_list" }, {
    getInitialState() {
        return { search: "" }
    }
    ,handleSearchChange(evnt) {
        this.setState({ search: evnt.target.value });
    }
    /// alternative way to navigate
    // ,handleMovieNavigate(movie) {
    //     this.action("movie_view", { movie_id: movie.id });
    // }
    ,renderMoviePreview(movie) {

        var release_date = moment(movie.release_date, "YYYY-MM-DD");

        var score_class = "score ";
        if(movie.vote_average >= 7.5) {
            score_class += "good-bg";
        } else if(movie.vote_average >= 5.0) {
            score_class += "mediocre-bg";
        } else if(movie.vote_count > 0) {
            score_class += "bad-bg";
        } else {
            score_class += "hide";
        }

        return (
            <Action store={ this.props.store } key={ movie.id } name="movie_view" movie_id={ movie.id } >
                <img src={ "https://image.tmdb.org/t/p/w500/" + movie.poster_path } />
                <div className={ score_class }>{ Math.floor(movie.vote_average * 10 + 0.5) + "%" }</div>
                <div className="title">{ movie.title }</div>
                <div className="release-date">{ release_date.format("MMMM YYYY") }</div>
            </Action>
        );
    }
    ,render() {

        /// doing search client-side, because this is more of a front-end challenge
        /// if you wanted to do proper search, just use this in back-end statelet:
        ///     TMDBCall('search/movie', { api_key: movie_api.api_key, language: "en-US", query: <input search param> })
        if(this.props.movies) {
            if(this.state.search.length > 0) {
                var term = this.state.search.toLowerCase();
                var movie_list = this.props.movies.filter(function(movie) {
                    return movie.title.toLowerCase().indexOf(term) !== -1;
                });
            } else {
                var movie_list = this.props.movies;
            }
            var movies = movie_list.map(this.renderMoviePreview);
        }

        return (
            <div className="front-page">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg" />
                <input value={ this.state.search } onChange={ this.handleSearchChange } placeholder="Search" />
                <h3>Popular Movies</h3>
                <div className="movie-listing">
                    { movies }
                </div>
            </div>
        );
    }
});
