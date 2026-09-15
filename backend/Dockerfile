FROM node:24.13.0

RUN npm install -g nodemon

WORKDIR /app 

COPY . .

RUN npm install 

EXPOSE 1234

CMD ["npm" ,"run","dev"]