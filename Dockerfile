FROM node:lts-alpine as requirements-stage

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
#RUN npm run lint
RUN npm run build-docker

FROM nginx:mainline

LABEL maintainer="Luchesar ILIEV <luchesar.iliev@gmail.com>" \
      org.opencontainers.image.created=$BUILD_DATE \
      org.opencontainers.image.description="Template Designer Service" \
      org.opencontainers.image.revision=$VCS_REF \
      org.opencontainers.image.schema-version="1.0" \
      org.opencontainers.image.source="https://github.com/ideaconsult/templateforge" \
      org.opencontainers.image.title="template-designer" \
      org.opencontainers.image.url="https://github.com/ideaconsult/templateforge/blob/main/README.md" \
      org.opencontainers.image.vendor="IDEAconsult" \
      org.opencontainers.image.version="latest"

COPY --from=requirements-stage /tmp/dist /usr/share/nginx/html
