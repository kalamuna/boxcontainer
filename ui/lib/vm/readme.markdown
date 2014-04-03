# lib/vm.js

The vm module abstracts provisioning on top of docker.

This way other virtualization schemes can be supported with much more additional
work.

# example

``` js
var vm = require('./vm.js')();
vm.listImages().on('data', console.log)
```

output:

```
{ created: 1373458741,
  id: '8618b627dc6ec50a55e29635f82c767f2045d1a7b59279a338d91c573e02cf52',
  parentId: '6592508b0790d77cc19dc29d6288ef4b4d1bd493d971ff24ac4576e4892a6f63',
  repoTags: [ 'substack/nodejs:0.10.13' ],
  size: 61257003,
  virtualSize: 373409179 }
{ created: 1366510963,
  id: '6592508b0790d77cc19dc29d6288ef4b4d1bd493d971ff24ac4576e4892a6f63',
  parentId: '0a2ff988ae2020c3c1b7645eb3ea1f336035b27f5e562c024c07069f96d4cd0a',
  repoTags: [ 'shykes/nodejs:0.8.23', 'shykes/nodejs:latest' ],
  size: 15073331,
  virtualSize: 312152176 }
{ created: 1365714795,
  id: '8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c',
  parentId: '',
  repoTags: [ 'ubuntu:12.04', 'ubuntu:latest', 'ubuntu:precise' ],
  size: 128029199,
  virtualSize: 128029199 }
{ created: 1364102658,
  id: 'b750fe79269d2ec9a3c593ef05b4332b1d1a02a62b4accb2c21d589ff2f5f2dc',
  parentId: '27cf784147099545',
  repoTags: [ 'ubuntu:12.10', 'ubuntu:quantal' ],
  size: 77,
  virtualSize: 175307035 }
```

# methods

``` js
var VM = require('./vm.js')();
```

## var vm = VM(baseURI)

Create a new `vm` handle given a `baseURI`. The default `baseURI` is
`'http://localhost:4243'`, which is the host/port that docker listens on by
default.

## vm.listImages()

Return an objectMode readable stream of the available vm images.

## vm.listContainers()

Return an objectMode readable stream of the available vm containers.
Containers are provisioned virtual systems with virtual hardware.
