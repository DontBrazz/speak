FROM node:20

# Instala festival e text2wave
RUN apt-get update && \
    apt-get install -y festival festival-english && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "index.js"]
