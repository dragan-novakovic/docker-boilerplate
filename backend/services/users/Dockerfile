FROM node:latest

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src

# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /usr/src/package.json
RUN npm install

ADD wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh" , "--host=users-db", "--port=5432", "--" , "node", "index.js"]