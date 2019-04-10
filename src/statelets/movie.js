////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Delay } from '../utils';

module.exports = {
    dependencies: []
    ,process: async function(builder, db, route) {

        var movie_list = [{ id: 1 }, { id: 2 }, { id: 3 }];
        if(route.name === "movie_view") {
            await Delay(1000);
            let movie = movie_list[parseInt(route.params.movie_id) - 1];
            builder.output("movie", movie);
        }

        builder.output("movie_list", movie_list);
    }
};