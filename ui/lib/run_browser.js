var spawn = require('child_process').spawn;

module.exports = function (href, cb) {
    var ps = spawn('google-chrome', [ '--app=' + href ]);
    ps.on('error', function (err) {
        if (err.code === 'ENOENT') {
            cb(new Error(
                'Failed to launch the `google-chrome` command.\n'
                + 'Make sure you have `google-chrome` in your $PATH\n'
            ));
        }
    });
    ps.on('exit', function (code) { cb(null, code) });
    return ps;
};
