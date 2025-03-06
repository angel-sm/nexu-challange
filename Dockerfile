FROM node:20-alpine3.18 AS base

ENV DIR /
WORKDIR $DIR

FROM base AS build

COPY package*.json .

RUN npm ci && \
rm -f .npmrc

COPY tsconfig*.json .
COPY . .
COPY prisma prisma

RUN npm run build && \
    npm prune --production

RUN npx prisma generate

FROM base AS production

ENV NODE_ENV=production
ENV USER=node

COPY --from=build $DIR/package*.json .
COPY --from=build $DIR/node_modules node_modules
COPY --from=build $DIR/dist dist

USER $USER
EXPOSE $PORT
CMD ["node", "dist/src/app/main.js"]