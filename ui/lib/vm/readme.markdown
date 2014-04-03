# lib/vm.js

The vm module abstracts provisioning on top of docker.

This way other virtualization schemes can be supported with much more additional
work.

# example

``` js
var vm = require('./vm.js')();
vm.list().on('data', console.log)
```

output:

```
{ repository: 'shykes/nodejs',
  tag: '0.8.23',
  id: '6592508b0790d77cc19dc29d6288ef4b4d1bd493d971ff24ac4576e4892a6f63',
  created: 1366510963,
  size: 15790131,
  virtualSize: 318189750 }
{ repository: 'shykes/nodejs',
  tag: 'latest',
  id: '6592508b0790d77cc19dc29d6288ef4b4d1bd493d971ff24ac4576e4892a6f63',
  created: 1366510963,
  size: 15790131,
  virtualSize: 318189750 }
{ repository: 'substack/nodejs',
  tag: '0.10.13',
  id: '8618b627dc6ec50a55e29635f82c767f2045d1a7b59279a338d91c573e02cf52',
  created: 1373458741,
  size: 62828646,
  virtualSize: 381018396 }
{ repository: 'ubuntu',
  tag: '12.04',
  id: '8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c',
  created: 1365714795,
  size: 131506275,
  virtualSize: 131506275 }
{ repository: 'ubuntu',
  tag: '12.10',
  id: 'b750fe79269d2ec9a3c593ef05b4332b1d1a02a62b4accb2c21d589ff2f5f2dc',
  created: 1364102658,
  size: 24653,
  virtualSize: 180116135 }
{ repository: 'ubuntu',
  tag: 'latest',
  id: '8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c',
  created: 1365714795,
  size: 131506275,
  virtualSize: 131506275 }
{ repository: 'ubuntu',
  tag: 'precise',
  id: '8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c',
  created: 1365714795,
  size: 131506275,
  virtualSize: 131506275 }
{ repository: 'ubuntu',
  tag: 'quantal',
  id: 'b750fe79269d2ec9a3c593ef05b4332b1d1a02a62b4accb2c21d589ff2f5f2dc',
  created: 1364102658,
  size: 24653,
  virtualSize: 180116135 }
```

# methods

``` js
var VM = require('./vm.js')();
```

## var vm = VM(baseURI)

Create a new `vm` handle given a `baseURI`. The default `baseURI` is
`'http://localhost:4243'`, which is the host/port that docker listens on by
default.

## vm.list()

Return an objectMode readable stream of the available VMs.
