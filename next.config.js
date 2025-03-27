/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://submit-data.bodc.ac.uk/api/:path*' // Proxy to Backend
            }
        ]
    }
}

module.exports = nextConfig
