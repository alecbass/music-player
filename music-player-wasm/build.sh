#!/bin/bash

TARGET=$1

if [[ "$TARGET" == "" ]]; then
    TARGET="bundler"
fi

echo $TARGET

wasm-pack build --target bundler
