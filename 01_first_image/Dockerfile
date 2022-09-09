# we take a base image
FROM node

# enviroment variables
ENV PORT=4000

# WORKDIR -> directory in container work
# WORKDIR C:/project/backend/app
WORKDIR /project/backend/app

# . -> directorio de trabajo actual 
COPY package*.json . 

#RUN -> execute comand (one only use, init and end process)
RUN npm install

# COPY source_mypc dest_container
COPY ./src ./src

EXPOSE ${PORT}

# CMD -> Execute comand (one only use, init container)
CMD [ "node", "./src/index.js" ]