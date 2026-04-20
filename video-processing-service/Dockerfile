FROM node:18

WORKDIR /app

COPY package*.json /

RUN apt-get update -o Acquire::Retries=3 -o Acquire::ForceIPv4=true && \
    apt-get install -y --no-install-recommends ffmpeg && \
    rm -rf /var/lib/apt/lists/*

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]