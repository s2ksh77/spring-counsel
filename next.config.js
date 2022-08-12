/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`],
  },
};

module.exports = nextConfig;
