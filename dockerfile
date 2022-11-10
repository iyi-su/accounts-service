FROM node:18-alpine AS build
WORKDIR /usr/src/app
ENV NODE_ENV=production
ADD . .
CMD ["yarn", "start"]