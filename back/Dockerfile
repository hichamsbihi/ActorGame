FROM node:20.5.0-alpine3.17 as builder

RUN mkdir /game-app

WORKDIR /game-app

COPY ./back/package*.json ./
RUN npm install --production

# Copy source code
COPY ./back .

# Expose the port your app runs on
EXPOSE 3100

# Run the app
ENTRYPOINT ["node", "app.js"]