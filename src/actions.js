////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var actions = {
    load_movie: { server: true, entry: "boot" }

    ,movie_view: { url: "/movie/:movie_id", server: true, post: true }
    ,home_page: { url: "/" }
};

export default actions;