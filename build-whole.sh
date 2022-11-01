#!/bin/bash

cargo install wasm-pack

cd music-player-wasm
./build.sh web

cd ../music-player-web
yarn set version berry
yarn install
yarn build
