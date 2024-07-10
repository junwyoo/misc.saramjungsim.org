
function debugOut (...args) {
    console.log.apply(this, [getDateByOffset(9).toISOString(), ' | '].concat(args));
}

module.exports = {
    debugOut
};
