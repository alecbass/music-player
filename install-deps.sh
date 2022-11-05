#!/bin/bash

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | bash -s -- --default-toolchain stable -y
export PATH=$HOME/.cargo/bin
source $HOME/.cargo/env
echo "source $HOME/.cargo/env" >> $HOME/.bashrc

# NOTE: These are required when installing locally so that `cargo check` can run (wasm-bindgen dependency issues)
# sudo apt install libasound2-dev libudev-dev
