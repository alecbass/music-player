# 
# Frontend
# 
FROM node:latest

# Build WASM
ADD ./install-deps.sh ./install-deps.sh
RUN ./install-deps.sh

ENV PATH /root/.cargo/bin:$PATH
RUN /bin/bash -c 'source $HOME/.bashrc'

RUN cargo install wasm-pack

ADD ./music-player-wasm /app/music-player-wasm
WORKDIR /app/music-player-wasm
RUN ./build.sh web

# Build frontend
ADD ./music-player-web /app/music-player-web
WORKDIR /app/music-player-web

RUN yarn set version berry
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
