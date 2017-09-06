var exec = require('sync-exec');
var config = require('./config');

const SERVER_ROOT = config.SERVER_ROOT;
const APP_ROOT = config.APP_ROOT;
const APP_SERVER = config.APP_SERVER;
const LOCATIONS = config.LOCATIONS;

LOCATIONS.map(function(item) {
    console.log( exec( downloadData(item, SERVER_ROOT)).stdout );
    console.log( exec( installPackage(item, APP_ROOT)).stdout );
});

function downloadData(item, SERVER_ROOT) {
    let p4item = SERVER_ROOT + item
    return 'p4 sync -f ' + p4item;
}

function installPackage(item, APP_ROOT) {
    let file = APP_ROOT + item;
    var fileName = item.split('/').pop().slice(0,-4);
    return 'curl -u admin:admin -F file=@"'+file+'" -F name="'+fileName+'" -F force=true -F install=true ' + APP_SERVER;
}


