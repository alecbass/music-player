# 
# WASM
# 
FROM rust:latest as builder

ADD ./music-player-wasm /app/music-player-wasm

RUN cargo install wasm-pack
WORKDIR /app/music-player-wasm
RUN ./build.sh web

# 
# Frontend
# 
FROM node:latest

# Copy compiled WASM from the Rust image
COPY --from=builder /app/music-player-wasm /app/music-player-wasm

ADD ./music-player-web /app/music-player-web

# Build frontend
WORKDIR /app/music-player-web

RUN yarn set version berry
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
