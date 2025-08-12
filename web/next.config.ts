import withPWA from 'next-pwa';

const nextConfig = {
  experimental: {
    serverActions: {},
  },
  images: {
    domains: ['127.0.0.1', 'localhost'],
  },
};

export default withPWA({
  dest: 'public',
})(nextConfig);