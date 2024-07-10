
function debugOut (...args) {
    console.log.apply(this, [getDateByOffset(9).toISOString(), ' | '].concat(args));
}

function getDateByOffset (h) {
    return new Date(new Date().getTime() + (h * 60 * 60 * 1000));
}

module.exports = {
    debugOut,
    getDateByOffset
};
