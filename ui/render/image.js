var humanize = require('human-format');

module.exports = function () {
    return function (row) {
        var id = row.id.slice(0,6);
        var pid = row.parentId.slice(0,6);
        return {
            '.id': id,
            '.link': { href: '/images/' + row.id },
            '.id-color': { style: 'background-color: #' + id },
            '.parent': pid,
            '.parent-color': { style: 'background-color: #' + pid },
            '.fork': row.parentId ? {} : { style: 'display: none' },
            '.tag': row.repoTags || [],
            '.disk-size': humanize(row.size),
            '.virtual-size': humanize(row.virtualSize)
        };
    };
};
