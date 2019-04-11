webpackJsonp([0],{

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var actions = {
    load_movie: { server: true, entry: "boot" },

    movie_view: { url: "/movie/:movie_id", server: true, post: true },
    home_page: { url: "/" }
};

exports.default = actions;

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = __webpack_require__(49);

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var React = __webpack_require__(18);
var CreateComponent = __webpack_require__(24)(React);
exports.default = CreateComponent({ _pending: "_pending" }, {
    handleClick: function handleClick(action_name, evnt) {
        var exclude = ["key", "children", "store", "name", "className", "onSuccess", "onFail", "_pending"];
        var input = {};
        for (var key in this.props) {
            if (exclude.indexOf(key) !== -1) {
                continue;
            }
            input[key] = this.props[key];
        }
        var this_ref = this;
        this.props.store.action(action_name, input, function (success) {
            if (success && this_ref.props.onSuccess) {
                this_ref.props.onSuccess();
            } else if (!success && this_ref.props.onFail) {
                this_ref.props.onFail();
            }
        });
        evnt.preventDefault();
        evnt.stopPropagation();
        evnt.nativeEvent.preventDefault();
        evnt.nativeEvent.stopPropagation();
    },
    render: function render() {

        if (this.props.store === undefined) {
            return null;
        }

        var action = _actions2.default[this.props.name];
        if (action === undefined) {
            console.log("Error - invalid action: " + this.props.name);
            return null;
        }
        var class_name = this.props.className ? this.props.className : "";
        if (action.url !== undefined) {
            var url = this.props.store.generateURL(action, this.props);
            if (url !== null) {
                return React.createElement(
                    'a',
                    { href: url, className: class_name, onClick: this.handleClick.bind(this, this.props.name) },
                    this.props.children
                );
            } else {
                return React.createElement(
                    'a',
                    { className: class_name },
                    this.props.children
                );
            }
        }
        return React.createElement(
            'span',
            { className: class_name, onClick: this.handleClick.bind(this, this.props.name) },
            this.props.children
        );
    }
});

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _listing = __webpack_require__(87);

var _listing2 = _interopRequireDefault(_listing);

var _Movie = __webpack_require__(86);

var _Movie2 = _interopRequireDefault(_Movie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var React = __webpack_require__(18);
var CreateComponent = __webpack_require__(24)(React);

exports.default = CreateComponent({ route: "route" }, {
    render: function render() {

        if (this.props.route.name === "movie_view") {
            var page = React.createElement(_Movie2.default, { store: this.props.store });
        } else {
            var page = React.createElement(_listing2.default, { store: this.props.store });
        }

        return React.createElement(
            'div',
            { id: 'app-container' },
            page
        );
    }
});

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var decorators = [];

exports.default = decorators;

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(81);

var _app2 = _interopRequireDefault(_app);

var _actions = __webpack_require__(49);

var _actions2 = _interopRequireDefault(_actions);

var _decorators = __webpack_require__(82);

var _decorators2 = _interopRequireDefault(_decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientInit = __webpack_require__(83);
var React = __webpack_require__(18);
var ReactDOM = __webpack_require__(84);

window.onload = function () {
    ClientInit(React, ReactDOM, _app2.default, 'container', _actions2.default, _decorators2.default);
};

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _action = __webpack_require__(50);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var React = __webpack_require__(18);
var CreateComponent = __webpack_require__(24)(React);

var moment = __webpack_require__(54);

exports.default = CreateComponent({ route: "route", movies: "movie_list", movie: "movie", pending: "_pending" }, {
    renderMovieDetails: function renderMovieDetails(movie) {

        var release_date = moment(movie.release_date, "YYYY-MM-DD");
        if (movie.runtime) {
            var hours = Math.floor(movie.runtime / 60);
            var minutes = movie.runtime % 60;
            var runtime = hours + "h";
            if (minutes) {
                runtime += " " + minutes + "m";
            }
        }

        return React.createElement(
            'div',
            { className: 'movie-detail' },
            React.createElement('img', { src: "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path }),
            React.createElement(
                _action2.default,
                { store: this.props.store, name: 'home_page', className: 'back' },
                '\u2190'
            ),
            React.createElement(
                'div',
                { className: 'header' },
                React.createElement('img', { src: "https://image.tmdb.org/t/p/w500/" + movie.poster_path }),
                React.createElement(
                    'h2',
                    null,
                    movie.title
                ),
                React.createElement(
                    'div',
                    { className: 'release-date' },
                    release_date.format("YYYY"),
                    ' \xB7 ',
                    Math.floor(movie.vote_average * 10 + 0.5) + "%",
                    ' user score'
                ),
                React.createElement(
                    'div',
                    { className: 'runtime' },
                    runtime ? runtime : "Loading..."
                )
            ),
            React.createElement(
                'div',
                { className: 'overview' },
                React.createElement(
                    'h3',
                    null,
                    'Overview'
                ),
                React.createElement(
                    'p',
                    null,
                    movie.overview
                )
            )
        );
    },
    render: function render() {

        /// show partial if the movie hasn't loaded or isn't already cached
        if (this.props.movies && (!this.props.movie || this.props.pending.movie_view && this.props.route.params.movie_id !== this.props.movie.id)) {
            var found_movie = this.props.movies.find(function (movie) {
                return movie.id == this.props.route.params.movie_id;
            }, this);
        } else {
            var found_movie = this.props.movie;
        }
        if (found_movie) {
            var details = this.renderMovieDetails(found_movie);
        } else {
            var details = React.createElement(
                'h1',
                { style: { color: "white" } },
                'Loading...'
            );
        }

        return React.createElement(
            'div',
            null,
            details
        );
    }
});

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _action = __webpack_require__(50);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var React = __webpack_require__(18);
var CreateComponent = __webpack_require__(24)(React);

var moment = __webpack_require__(54);

exports.default = CreateComponent({ movies: "movie_list" }, {
    getInitialState: function getInitialState() {
        return { search: "" };
    },
    handleSearchChange: function handleSearchChange(evnt) {
        this.setState({ search: evnt.target.value });
    }
    /// alternative way to navigate
    // ,handleMovieNavigate(movie) {
    //     this.action("movie_view", { movie_id: movie.id });
    // }
    ,
    renderMoviePreview: function renderMoviePreview(movie) {

        var release_date = moment(movie.release_date, "YYYY-MM-DD");

        var score_class = "score ";
        if (movie.vote_average >= 7.5) {
            score_class += "good-bg";
        } else if (movie.vote_average >= 5.0) {
            score_class += "mediocre-bg";
        } else if (movie.vote_count > 0) {
            score_class += "bad-bg";
        } else {
            score_class += "hide";
        }

        return React.createElement(
            _action2.default,
            { store: this.props.store, key: movie.id, name: 'movie_view', movie_id: movie.id },
            React.createElement('img', { src: "https://image.tmdb.org/t/p/w500/" + movie.poster_path }),
            React.createElement(
                'div',
                { className: score_class },
                Math.floor(movie.vote_average * 10 + 0.5) + "%"
            ),
            React.createElement(
                'div',
                { className: 'title' },
                movie.title
            ),
            React.createElement(
                'div',
                { className: 'release-date' },
                release_date.format("MMMM YYYY")
            )
        );
    },
    render: function render() {

        /// doing search client-side, because this is more of a front-end challenge
        /// if you wanted to do proper search, just use this in back-end statelet:
        ///     TMDBCall('search/movie', { api_key: movie_api.api_key, language: "en-US", query: <input search param> })
        if (this.props.movies) {
            if (this.state.search.length > 0) {
                var term = this.state.search.toLowerCase();
                var movie_list = this.props.movies.filter(function (movie) {
                    return movie.title.toLowerCase().indexOf(term) !== -1;
                });
            } else {
                var movie_list = this.props.movies;
            }
            var movies = movie_list.map(this.renderMoviePreview);
        }

        return React.createElement(
            'div',
            { className: 'front-page' },
            React.createElement('img', { src: 'https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg' }),
            React.createElement('input', { value: this.state.search, onChange: this.handleSearchChange, placeholder: 'Search' }),
            React.createElement(
                'h3',
                null,
                'Popular Movies'
            ),
            React.createElement(
                'div',
                { className: 'movie-listing' },
                movies
            )
        );
    }
});

/***/ })

},[85]);