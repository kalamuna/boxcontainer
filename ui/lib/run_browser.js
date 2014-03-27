var spawn = require('child_process').spawn;
var path = require('path');
var tmp = require('os').tmpdir();
var userdir = path.join(tmp, 'chrome-profile-' + Math.random());

var commands = [
    'google-chrome',
    'chrome',
    'chromium-browser',
    'chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/opt/homebrew-cask/Caskroom/google-chrome'
];

module.exports = function (href, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts; opts = {};
    }
    if (!opts) opts = {};
    if (!cb) cb = function () {};
    
    var extra = [];
    if (opts.size) extra.push('--window-size=' + opts.size);
    if (opts.position) extra.push('--window-position=' + opts.position);
    
    var stack = commands.slice();
    run();
    
    function run () {
        if (stack.length === 0) {
            return cb(new Error(
                'Failed to launch the `google-chrome` command.\n'
                + 'Make sure you have `google-chrome` in your $PATH\n'
            ));
        }
        
        var cmd = stack.shift();
        var args = [
            '--app=' + href,
            '--user-data-dir=' + userdir,
            '--no-first-run'
        ].concat(extra);
        var ps = spawn(cmd, args);
        
        var failed = false;
        ps.on('error', function (err) {
            if (err.code === 'ENOENT') {
                failed = true;
                run();
            }
        });
        ps.on('exit', function (code) {
            if (!failed) cb(null, code);
        });
    }
};
