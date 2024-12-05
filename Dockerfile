FROM node:lts-alpine AS requirements-stage

WORKDIR /tmp

COPY \
      ./.eslintrc.cjs \
      ./index.html \
      ./package*.json \
      ./vite.config.js \
      /tmp
COPY ./public /tmp/public
COPY ./src /tmp/src

RUN npm install
RUN npm run build-docker


FROM nginx:mainline

# Allow React routing.
RUN sed -Ei \
      '/\s*location\s+\/\s+\{\s*$/a \        try_files $uri /index.html;' \
      /etc/nginx/conf.d/default.conf

COPY --from=requirements-stage /tmp/dist /usr/share/nginx/html
