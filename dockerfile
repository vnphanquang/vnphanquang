### ====================
### Stage 1: Base Image
###	====================
FROM node:24.16.0-alpine AS base
ARG PORT=3000
ENV PORT=${PORT}
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

### ==========================================
### Stage 2: Build
### ==========================================
FROM base AS build
RUN apk --no-cache add git
COPY . /project
WORKDIR /project
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --no-runtime
RUN pnpm --filter=vnphanquang.com build
RUN pnpm deploy --filter=vnphanquang.com --prod /prod

### ===============================================
### Stage 3: Final image for site: vnphanquang.com
### ===============================================
FROM base AS vnphanquang.com
COPY --from=build /prod /app
WORKDIR /app
EXPOSE ${PORT}
CMD ["node", "build/index.js"]
HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=30s --start-interval=5s CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:${PORT}/api/version || exit 1

