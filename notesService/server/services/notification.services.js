const log = require('../logging');

const notifyUser = (notes) => {
    log.debug('notifying user for notes share. Data: ' + JSON.stringify(notes));
}

module.exports = {
    notifyUser
}