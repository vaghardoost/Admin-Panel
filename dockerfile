FROM node:latest
WORKDIR /usr/app
COPY . .
ADD node_modules.tar node_modules
CMD ["npx","serve","-s","build"]
# www.jit.codes