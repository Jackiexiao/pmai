/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['api.01mvp.com'], // 添加允许的图片域名
    },
};

module.exports = nextConfig;
