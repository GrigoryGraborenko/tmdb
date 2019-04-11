////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const React = require('react');
const CreateComponent = require('boc/component')(React);

const moment = require('moment');

export default CreateComponent({ movies: "movie_list" }, {
    handleMovieNavigate(movie) {
        this.action("movie_view", { movie_id: movie.id });
    }
    ,renderMoviePreview(movie) {

        var release_date = moment(movie.release_date, "YYYY-MM-DD");

        // console.log(movie);
        return (
            <div onClick={ this.handleMovieNavigate.bind(this, movie) } key={ movie.id }>
                <img src={ "https://image.tmdb.org/t/p/w500/" + movie.poster_path } />
                <div className="score">{ Math.floor(movie.vote_average * 10 + 0.5) + "%" }</div>
                <div className="title">{ movie.title }</div>
                <div className="release-date">{ release_date.format("MMMM YYYY") }</div>
            </div>
        );
    }
    ,render() {

        if(this.props.movies) {
            var movies = this.props.movies.map(this.renderMoviePreview);
        }

        return (
            <div>
                <h1>Movie listing</h1>
                <div className="movie-listing">
                    { movies }
                </div>
            </div>
        );
    }
});
