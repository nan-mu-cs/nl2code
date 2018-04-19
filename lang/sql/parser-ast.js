/**
 * Created by kai on 2018/4/18.
 */
var fs = require('fs');
var sqliteParser = require('sqlite-parser');
var parserTransform = sqliteParser.createParser();
var singleNodeTransform = sqliteParser.createStitcher();
var readStream = fs.createReadStream('../../data/data.sql');
var writeStream = fs.createWriteStream('../../data/ast.json');

readStream.pipe(parserTransform);
parserTransform.pipe(singleNodeTransform);
singleNodeTransform.pipe(writeStream);

parserTransform.on('error', function (err) {
  console.error(err);
  process.exit(1);
});

writeStream.on('finish', function () {
  process.exit(0);
});
