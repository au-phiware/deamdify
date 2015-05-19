var deamdify = require('../')
  , fs = require('fs')
  , Stream = require('stream');


describe('deamdify\'ing an AMD module with a variable module', function() {

  var stream = deamdify('test/data/define-with-module-var.js');

  it('should return a stream', function() {
    expect(stream).to.be.an.instanceOf(Stream);
  });

  it('should transform module', function(done) {
    var output = '';
    stream.on('data', function(buf) {
      output += buf;
    });
    stream.on('end', function() {
      var expected = fs.readFileSync('test/data/define-with-module-var.expect.js', 'utf8');
      expect(output).to.be.equal(expected);
      done();
    });

    var file = fs.createReadStream('test/data/define-with-module-var.js');
    file.pipe(stream);
  });

});
