FROM node:10.13

WORKDIR /usr/src/app

COPY package*.json ./
COPY index.js ./

USER root

RUN npm install

ADD wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh" , "--host=users-db", "--port=5432", "--" , "node", "index.js"]