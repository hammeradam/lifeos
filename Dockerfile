FROM node:23-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# RUN pnpm deploy --filter=api --prod /prod/api

FROM base AS api
COPY --from=build /usr/src/app /work
WORKDIR /work/apps/api
EXPOSE 3000
CMD [ "pnpm", "start" ]

FROM base AS api2
COPY --from=build /usr/src/app /work
WORKDIR /work/apps/api2
EXPOSE 3000
CMD [ "pnpm", "start" ]

FROM base AS build_web
COPY --from=build /usr/src/app /work
WORKDIR /work/apps/web
RUN pnpm run build

FROM nginx:stable-alpine AS web
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=build_web /work/apps/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# CMD ["nginx", "-g", "daemon off;error_log /dev/stdout debug;"]
