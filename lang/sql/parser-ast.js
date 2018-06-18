/**
 * Created by kai on 2018/4/18.
 */
var fs = require('fs');
var sqliteParser = require('sqlite-parser');


// change this
var input_file_path = "./test.sql";
var output_file_path = "../../data/data/test-ast.json";

var query = fs.readFileSync(input_file_path, 'utf8');
sqliteParser(query, function (err, ast) {
      if (err) {
        var location = err.location != null ? "[" + err.location.start.line +
        ", " + err.location.start.column + "] " : "";
        console.log(location + err.message);
        return;
      }
      ast = JSON.stringify(ast);
      fs.writeFile(output_file_path, ast, 'utf8',function () {
          console.log("successful write to file");
      });
      // console.log(ast);
      // writer(ast);
    });