FROM node:10.13

WORKDIR /usr/src/app


COPY package*.json ./
COPY src ./

RUN npm install

ADD wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh" , "--host=posts-db", "--port=5432","--strict", "--timeout=100", "--" , "node", "index.js"]