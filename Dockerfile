FROM node:14-alpine
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --frozen-lockfile
EXPOSE 3333
CMD yarn start
