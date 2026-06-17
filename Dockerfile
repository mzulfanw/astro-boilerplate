FROM node:24-alpine AS builder
ARG PUBLIC_SITE
ARG API_URL
ENV PUBLIC_SITE=$PUBLIC_SITE
ENV API_URL=$API_URL

RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:24-alpine AS runner
RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist

EXPOSE 4321

ENV HOST=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro
RUN chown -R astro:nodejs /app
USER astro

CMD ["node", "dist/server/entry.mjs"]
