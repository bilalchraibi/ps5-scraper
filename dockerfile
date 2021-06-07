# Followed instruction from here: https://playwright.dev/docs/docker
FROM mcr.microsoft.com/playwright:v1.10.0-focal
ENV NODE_ENV=production
WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY . /app
EXPOSE 8081
CMD ["npm", "start"]