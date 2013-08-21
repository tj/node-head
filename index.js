
/**
 * Module dependencies.
 */

var fs = require('fs');

/**
 * Head `len` of file `path` with optional callback for async support.
 *
 * @param {String} path
 * @param {Number} len
 * @param {Function} [fn]
 * @api public
 */

module.exports = function(path, len, fn){
  if (fn) return async(path, len, fn);
  return sync(path, len);
};

/**
 * Head `len` of file `path`,
 * defaulting to 250 bytes.
 *
 * @param {String} path
 * @param {Number} len
 * @return {Buffer}
 * @api private
 */

function sync(path, len){
  len = len || 250;
  var s = fs.statSync(path);
  var fd = fs.openSync(path, 'r');
  len = Math.min(s.size, len);
  var buf = new Buffer(len);
  var n = fs.readSync(fd, buf, 0, len, 0);
  fs.closeSync(fd);
  return buf;
}

/**
 * Head `len` of file `path`,
 * defaulting to 250 bytes.
 *
 * @param {String} path
 * @param {Number} len
 * @param {Function} fn
 * @return {Buffer}
 * @api private
 */

function async(path, len, fn){
  len = len || 250;
  
  fs.stat(path, function(err, stat){
    if (err) return fn(err);
    len = Math.min(stat.size, len);

    fs.open(path, 'r', function(err, fd){
      if (err) return fn(err);
      
      var buf = new Buffer(len);
      fs.read(fd, buf, 0, len, 0, function(err, read){
        fs.close(fd);
        fn(err, buf, read);
      });
    });
  });
}