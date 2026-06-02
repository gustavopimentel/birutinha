/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // O projeto nunca usou ESLint como gate de build (o Vite não lintava no build).
  // Mantemos o lint disponível via `npm run lint`, sem bloquear build/deploy.
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
