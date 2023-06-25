FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install cheerio

COPY tori.js torietuovi.js assunot.js etuovi.js habita.js huoneistokeskus.js kiinteistomaailma.js opkoti.js ./

RUN mkdir /usr/src/app/model
COPY model/* /usr/src/app/model/


CMD ["node","tori.js","torietuovi.js","assunot.js","etuovi.js","habita.js","huoneistokeskus.js","kiinteistomaailma.js","opkoti.js"]