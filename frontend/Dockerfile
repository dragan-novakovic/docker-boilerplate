FROM node:10.13-alpine as dev
WORKDIR /root/
CMD echo "getting latest npm modules" \
    && npm install \
    && echo "installation complete, starting" \
    && npm start


FROM node:10.13-alpine as prod

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app/client

# Installing dependencies
COPY package*.json ./
RUN npm install

COPY . .
CMD [ "npm", "run", "deploy" ]