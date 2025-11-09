# ======================
# STAGE 1 — BUILD
# ======================
FROM node:18-alpine AS builder

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy file cấu hình trước để cache dependencies
COPY package*.json ./
# Nếu dùng pnpm hoặc yarn, đổi lệnh tương ứng
RUN npm ci

# Copy toàn bộ source code
COPY . .

# Build Next.js (tạo .next/standalone)
RUN npm run build


# ======================
# STAGE 2 — RUN
# ======================
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy kết quả build từ stage 1
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Mở port 3000
EXPOSE 3000

# Lệnh khởi chạy server Next.js
CMD ["node", "server.js"]
