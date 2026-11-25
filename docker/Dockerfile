# Constrói o site a partir de uma branch do GitHub e serve-o com nginx.
# A branch é escolhida com o build arg BRANCH (ver docker-compose.yml).
# O código vem sempre do GitHub, não da pasta local: para testar alterações
# locais usa `npm run dev`.

FROM node:22-alpine AS build
ARG REPO=https://github.com/josepedropina1803/restaurante_website.git
ARG BRANCH=develop
WORKDIR /app
# O BuildKit resolve a branch para o commit mais recente em cada build,
# por isso `docker compose build` apanha sempre o estado atual no GitHub.
ADD ${REPO}#${BRANCH} .
RUN npm ci && npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
