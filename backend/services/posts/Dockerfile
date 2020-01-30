FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY index.js ./

RUN npm install

ADD wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh" , "--host=posts-db", "--port=5432", "--" , "node", "index.js"]