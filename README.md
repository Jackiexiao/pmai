# pmai

输入 idea， 为你生成商业画布，并且给出详细的分析和建议。 

商业画布同时会链接到详细的调研报告


## 技术栈

- Next.js (App Router)
- TailwindCSS
- Shadcn/UI


## 开发

```bash
bun install
bun dev
bun run build
```


bun install @prisma/client openai react-markdown
bun install -D prisma

## 数据库

```bash
bunx prisma generate
bunx prisma migrate dev
```

prisma 的使用说明

初始化数据库
```bash
bunx prisma migrate dev
```
它做了以下的事情
- 创建数据库
- 创建 schema.prisma 对应的表
- 创建 .env 文件，并填充数据库连接信息
- 创建 prisma 客户端
