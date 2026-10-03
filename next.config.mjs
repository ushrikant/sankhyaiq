import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      // Coastline story moved from World & India to Maps & Geography at launch.
      { source: "/world-and-india/india-coastline-true-length", destination: "/maps-and-geography/india-coastline-true-length", permanent: true },
      // Placeholder story withdrawn until verified budget data is in.
      { source: "/science-and-space/isro-vs-nasa-budget", destination: "/science-and-space", permanent: false },
    ];
  },
};

export default withMDX(nextConfig);
