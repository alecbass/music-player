#!/bin/bash

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | bash -s -- --default-toolchain stable -y
export PATH=$HOME/.cargo/bin
source $HOME/.cargo/env
echo "source $HOME/.cargo/env" >> $HOME/.bashrc
