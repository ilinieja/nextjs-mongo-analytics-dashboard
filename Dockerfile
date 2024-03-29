FROM node:18-alpine

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

CMD [ "npm", "run", "start:prod" ]
