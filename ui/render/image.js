var humanize = require('human-format');

module.exports = function () {
    return function (row) {
        return {
            '.id': row.id.slice(0,6),
            '.parent': row.parentId.slice(0,6),
            '.tags': (row.repoTags || []).map(function (t) {
                return { '.tag': t };
            }),
            '.disk-size': humanize(row.size),
            '.virtual-size': humanize(row.virtualSize)
        };
    };
};
