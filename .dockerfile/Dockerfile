FROM node:12

WORKDIR /home/node/

COPY production/index.js .

COPY production/package.json .

COPY dist /home/node/

RUN ls /home/node

RUN ls /home/node

RUN npm install

EXPOSE 7000

CMD ["node", "index.js"]