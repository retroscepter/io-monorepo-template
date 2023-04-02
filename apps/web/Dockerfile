
###########################################
# Setup stage                             #
###########################################

FROM node:16-bullseye-slim AS setup

# install prerequisites
RUN yarn global add turbo

WORKDIR /app
COPY . .

# strip unnecessary packages
RUN turbo prune --scope=web --docker

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
RUN yarn turbo run build --filter=web...

###########################################
# Runner stage                            #
###########################################

FROM node:16-bullseye-slim AS runner

WORKDIR /app

COPY --from=builder /app .

WORKDIR /app/apps/web

###########################################
# Local dev target                        #
###########################################

FROM runner as dev

CMD yarn dev --port=80 --host=0.0.0.0

###########################################
# Production target                       #
###########################################

FROM runner as prod

CMD yarn preview --port=80 --host=0.0.0.0
