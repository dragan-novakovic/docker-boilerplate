FROM node:10.13

WORKDIR /usr/src/app


COPY package*.json ./
COPY src ./


RUN npm install

# Add wait-for-it
COPY wait-for-it.sh wait-for-it.sh 
RUN chmod +x wait-for-it.sh
CMD ["./wait-for-it.sh" , "--host=postgres", "--port=5432", "--" , "node", "index.js"]