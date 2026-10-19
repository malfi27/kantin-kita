// Seluruh halaman diekspor sebagai file statis karena project ini frontend only.
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
