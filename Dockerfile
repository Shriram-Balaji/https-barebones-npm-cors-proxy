# latest LTS version of node, comes with node and npm pre-installed
FROM node:carbon

# Create directory that holds the application code inside the image
WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4231
CMD ["npm", "start"]
