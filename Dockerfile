FROM node:23-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

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