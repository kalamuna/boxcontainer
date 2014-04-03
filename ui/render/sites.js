module.exports = function () {
    return function (row) {
        return {
            '.repository': row.repository,
            '.id': row.id
        };
    };
};
