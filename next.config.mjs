/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_SECRET_CLIENTE: process.env.GOOGLE_SECRET_CLIENTE,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        URL_APP_PROD: process.env.URL_APP_PROD,
        MONGODB_URI_LOCAL: process.env.MONGODB_URI_LOCAL,
    },

    images: {
        domains: ['tailwindui.com', 'images.unsplash.com'],
    },
};

export default nextConfig;
