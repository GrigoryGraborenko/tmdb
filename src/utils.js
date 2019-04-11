////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fs = require("fs");
import https from "https"

import moment from "moment"

////////////////////////////////////////////////////////////////////////////////
export function GetTime() { var t = process.hrtime(); return t[0] + t[1] * 0.000000001; }
const g_ServerStartTimestamp = moment().unix();
const g_ServerStartHiResTime = GetTime();
export function GetUnixTime() { return (g_ServerStartTimestamp + (GetTime() - g_ServerStartHiResTime)); }

////////////////////////////////////////////////////////////////////////////////
export function Delay(delay) { return new Promise(function(fulfill, reject) { setTimeout(function() { fulfill(); }, delay); }); }

////////////////////////////////////////////////////////////////////////////////
export async function InitFixtures(file_name) {

    if(!file_name) {
        file_name = "./src/test_fixtures.json";
    }

    var fixtures_data = fs.readFileSync(file_name);
    var fixtures = JSON.parse(fixtures_data + "");

    /// TODO: reset query needs to hit all tables due to testing creating other items
    var delete_tables = fixtures.fixtures.reduce(function(accum, fixture) {
        var result = accum.slice(0);
        var name = fixture.table_name ? fixture.table_name : fixture.table;
        if(accum.indexOf(name) === -1) {
            result.unshift(name);
        }
        return result;
    }, []);
    var reset_query = delete_tables.map(function(table) {
        return `DELETE FROM ${table};`;
    }).join("");

    return { fixtures: fixtures, reset_query: reset_query };
}

////////////////////////////////////////////////////////////////////////////////
export async function LoadFixtures(db, fixtures, fixture_seed) {

    // password is 'password'
    var cache = Object.assign({
    }, fixture_seed);
    for(let f = 0; f < fixtures.fixtures.length; f++) {

        let fixture = fixtures.fixtures[f];

        if(Array.isArray(fixture.objects)) {
            for(let i = 0; i < fixture.objects.length; i++) {
                let obj_spec = fixture.objects[i];
                let obj = Object.assign({}, obj_spec);
                for(let key in obj_spec) {
                    if(cache[obj_spec[key]] !== undefined) {
                        obj[key] = cache[obj_spec[key]];
                    }
                }
                await db[fixture.table].create(obj);
            }
            continue;
        }
        for(let id in fixture.objects) {
            let obj_spec = fixture.objects[id];
            let obj = Object.assign({}, obj_spec);
            for(let key in obj_spec) {
                if(cache[obj_spec[key]] !== undefined) {
                    obj[key] = cache[obj_spec[key]];
                }
            }
            cache[id] = (await db[fixture.table].create(obj)).id;
        }
    }
    return cache;
}

////////////////////////////////////////////////////////////////////////////////
export function MakeHTTPSRequest(options, body) {

    return new Promise(function(fulfill, reject) {
        var req = https.request(options, function(res) {
            var chucks = [];
            res.on('data', function(chunk) {
                chucks.push(chunk);
            });
            res.on('end', function() {
                fulfill(Buffer.concat(chucks));
            });
        });
        req.on('error', function(err) {
            reject(err);
        });
        if(body !== undefined) {
            req.write(body);
        }
        req.end();
    });
}