////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = async function(sequelize, db, logger, args, config) {

    var call = args[0];
    var params = args.slice(1);

    switch(call) {
        case "no-op":
            return "no-op";
        default:
            throw "Unknown command";
    }
};