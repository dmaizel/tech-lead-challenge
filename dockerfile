FROM node:22-alpine as builder
ENV NODE_ENV build
USER node
WORKDIR /home/node
ARG NPM_TOKEN
COPY package*.json .npmrc ./
RUN npm ci
RUN rm -f .npmrc
COPY --chown=node:node . .
RUN npm run build \
    && npm prune --production
    
FROM node:16-alpine
ENV NODE_ENV production
USER node
WORKDIR /home/node
COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/
CMD ["node", "dist/main.js"]