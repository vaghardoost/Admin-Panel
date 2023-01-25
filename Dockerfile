FROM node:16
WORKDIR /usr/app
COPY . .
ADD node_modules.tar node_modules
EXPOSE 3000
CMD ["npm","start"]
