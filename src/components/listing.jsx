////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const React = require('react');
const CreateComponent = require('boc/component')(React);

export default CreateComponent({ movies: "movie_list" }, {
    handleMovieNavigate(movie) {
        this.action("movie_view", { movie_id: movie.id });
    }
    ,renderMoviePreview(movie) {
        return (
            <div onClick={ this.handleMovieNavigate.bind(this, movie) } key={ movie.id }>{ movie.id }</div>
        );
    }
    ,render() {

        if(this.props.movies) {
            var movies = this.props.movies.map(this.renderMoviePreview);
        }

        return (
            <div>
                <h1>Movie listing</h1>
                { movies }
            </div>
        );
    }
});
