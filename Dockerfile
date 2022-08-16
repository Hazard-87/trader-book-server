FROM node:16.16.0-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install -g yarn
RUN yarn install
ADD . .
RUN yarn build
RUN yarn prune --production
CMD ["node", "./dist/main.js"]
