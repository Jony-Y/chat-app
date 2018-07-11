var request = require('request')
  , semver = require('semver')
  , tar = require('tar')
  , zlib = require('zlib')
  , fs = require('fs')
  , path = require('path')
  , child_process = require('child_process')
  , cwd = process.cwd()
  ;

function get (version, cb) {
  if (!semver.valid(version)) throw new Error(version+' is not a valid semver version.')
  if (semver.satisfies(version, '>0.999.0')) {
    var url = 'https://iojs.org/dist/v'+version+'/iojs-v'+version+'.tar.gz'
      , name = 'iojs-v'+version
      ;
  } else {
    var url = 'http://nodejs.org/dist/v'+version+'/node-v'+version+'.tar.gz'
      , name = 'node-v'+version
      ;
  }
  var _path = path.join(cwd, 'node-v'+version)
    , _get = request(url)
    , _unzip = zlib.createGunzip()
    , _untar = tar.Extract({path:cwd})
    ;
  _get.pipe(_unzip).pipe(_untar)
  _untar.on('end', function () {
    install(path.join(cwd, name))
    cb(null)
  })
}

function install (dir) {
  child_process.execSync('cd '+dir+' && ./configure && make')
  fs.symlinkSync(path.join(dir, 'node'), path.join(cwd, 'node'))
}

module.exports = function (version) {
  get(version, function (e, dir) {
    console.log('done')
  })
}
