////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { MakeHTTPSRequest } from '../utils';

///////////////////////////////////////
async function TMDBCall(service, params) {

    var combined = Object.assign({}, params, { language: "en-US", include_adult: false, include_video: false, page: 1 });

    var url_params = Object.entries(combined).map(function(param) {
        return param.join("=");
    }).join("&");

    var options = {
        hostname: 'api.themoviedb.org',
        path: `/3/${service}?${url_params}`,
        method: 'GET'
    };

    var result_buffer = await MakeHTTPSRequest(options);
    return JSON.parse(result_buffer + "");
}

///////////////////////////////////////
module.exports = {
    dependencies: []
    ,process: async function(builder, db, route) {

        var movie_api = builder.getParam("movie_database");

        if(route.name === "movie_view") {
            var movie_result = await TMDBCall(`movie/${route.params.movie_id}`, { api_key: movie_api.api_key, language: "en-US" });
            builder.output("movie", movie_result);
        }

        var discover_result = await TMDBCall("discover/movie", { api_key: movie_api.api_key, sort_by: "popularity.desc", language: "en-US", include_adult: false, include_video: false, page: 1 });
        var movie_list = discover_result.results;

        builder.output("movie_list", movie_list);
    }
};