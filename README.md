# NL2code

A syntactic neural model for parsing natural language to executable code [paper](https://arxiv.org/abs/1704.01696). 

## Dependencies

* Theano
* vprof
* NLTK 3.2.1
* astor 0.6
* node.js
## Reference

```
@inproceedings{yin17acl,
    title = {A Syntactic Neural Model for General-Purpose Code Generation},
    author = {Pengcheng Yin and Graham Neubig},
    booktitle = {The 55th Annual Meeting of the Association for Computational Linguistics (ACL)},
    address = {Vancouver, Canada},
    month = {July},
    url = {https://arxiv.org/abs/1704.01696},
    year = {2017}
}
```

The location of the experiment git repo is currently

```
/home/lily/ky275/nl2code
```

## Folder structure (before we do anything)
In the root directory,
* data/ 
* lang/sql contains SQL specific code for the model.
  * ast_to_sql.js: convert model generated ast structure into sql statement.
  * grammar.py contains sql grammar related code.(type of terminal etc)
  * parse.py take ast structure and parse to structure can be used in model and take model generated structure and converted back to ast structure.
  * parser-ast.js generate ast structure from sql.
  * sql_dataset.py  contains data preprocessor related code. Take data and generated model input.
  * sqlgenerate.js sql generate library used by ast_to_sql.js. (Usually does not need to change this file.)
* nn/ neural network utilities used by the model

## 1. Preprocess
### 1.1 Generate SQL AST
* Step 1 First, install package need by generate sql library. In the root directory, run 
```bash
npm install
```

* Step 2 In Javascript file ./lang/sql/parser-ast.js, change input and output path by change the following two line:
```
var input_file_path = "./test.sql";
var output_file_path = "../../data/data/test-ast.json";
```
* Step 3 Everytime change file ./lang/sql/parser-ast.js. run the following command in root directory 
 ```bash
npm run sqlgenerate
```
* Step 4 After that, run the following to generate ast:
```bash
node ./lang/sql/sqlgenerate-babel.js
```
Warning: when run the above script, it may throw. This means the input sql file contains incorrect sql that could not be parsed. It has to be corrected according to the error message.

In input file one line is one sql statement ended with a semicolon. Output file is a json file contains ast structure for every input sql.

Repeat Step 2 to 4 to generate ast for train, dev and test data.

### 1.2 Generate Preprocessed data
Change the configuration in script preprocess.sh. After that run:
```bash
./preprocess.sh
```
After that, the preprocessed data file will generate at the output path specified in prerpocess.sh

## 2. Train the Model and Generate Test Ouput
### 2.1 Train The Model
Change the configuration in train_sql.sh file. On top of the script, "output" is the folder to store trained model. "dataset" is the path to preprocessor generated data file.

To train the model run:
```bash
./train_sql.sh
```
### 2.2 Generate Test Output
Change the configuration in test_sql.sh file. "model" is the stored model. Decoder program expected to use. "-ast_output_path" is the output path for generated ast json file.

To decode test data, run:
```bash
./test_sql.sh
```
### 2.3 Generate SQL From AST Structure
In Javascript file ./lang/sql/ast_to_sql.js, change the following to line:
```javascript
var input_path  = "./rand_1_result.json";
var output_path = "./rand1_result.txt";
```
input_path is the path of generated ast json file in 2.2. output_path is the path of output statement. Each line in output file is a SQL statement corresponding to test data.

Note: Everytime change the contains of file ./lang/sql/ast_to_sql.js, run the following in root directory:
 ```bash
npm run ast
```
After that, run the following to generate output file:
```bash
node ./lang/sql/ast_to_sql-babel.js
```
