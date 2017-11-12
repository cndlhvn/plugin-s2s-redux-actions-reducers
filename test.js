var fs = require('fs');
var babel = require('babel-core');

var fileName = process.argv[2];

fs.readFile(fileName, function(err, data) {
  if(err) throw err;
  var src = data.toString();
  var out = babel.transform(src, {
    plugins: ['babel-plugin-syntax-object-rest-spread','./lib/index.js']
  });
  console.log(out.code);
});
