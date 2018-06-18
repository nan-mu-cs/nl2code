#!/usr/bin/env bash

python lang/sql/sql_dataset.py \
 -train_data ./data/data/train.json \
 -train_data_ast ./data/data/train-ast.json \
 -dev_data ./data/data/dev.json \
 -dev_data_ast ./data/data/dev-ast.json \
 -test_data ./data/data/test.json \
 -test_data_ast ./data/data/test-ast.json \
 -train_data_size 7862 \
 -dev_data_size 1831 \
 -output_path ./data/dataset.bin
