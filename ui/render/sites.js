module.exports = function () {
    return function (row) {
        return {
            '.id': row.Id
        };
    };
};
