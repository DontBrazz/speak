FROM node:20

# Instala festival e voz em inglês
RUN apt-get update && \
    apt-get install -y festival festvox-kallpc16k && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "index.js"]
