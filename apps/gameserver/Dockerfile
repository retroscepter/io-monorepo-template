
###########################################
# Setup stage                             #
###########################################

FROM node:16-bullseye-slim AS setup

# install prerequisites
RUN yarn global add turbo

WORKDIR /app
COPY . .

# strip unnecessary packages
RUN turbo prune --scope=gameserver --docker

###########################################
# Build stage                             #
###########################################

FROM node:16-bullseye-slim AS builder

WORKDIR /app

COPY .gitignore .gitignore

# install dependencies
COPY --from=setup /app/out/json/ .
COPY --from=setup /app/out/yarn.lock ./yarn.lock
RUN yarn install

# build the app
COPY --from=setup /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=gameserver...

###########################################
# Runner stage                            #
###########################################

FROM node:16-bullseye-slim AS runner

WORKDIR /app

COPY --from=builder /app .

WORKDIR /app/apps/gameserver

###########################################
# Local dev target                        #
###########################################

FROM runner as dev

# install watch-mode requirements
RUN rm -f /etc/apt/apt.conf.d/docker-clean
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get -y update && \
    apt-get -y install procps

CMD yarn dev

###########################################
# Production target                       #
###########################################

FROM runner as prod

# don't run product as root
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app
USER app

CMD node dist/main.js
