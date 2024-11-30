// TypeScript declaration file for next-pwa module. Provides type definitions
// for Progressive Web App configuration in Next.js. This enables TypeScript
// support and autocompletion when configuring PWA features.
declare module 'next-pwa' {
    import { NextConfig } from 'next'
    
    // Configuration options for PWA features
    interface PWAConfig {
      dest?: string           // Output directory for PWA files
      disable?: boolean       // Toggle PWA features
      register?: boolean      // Auto-register service worker
      scope?: string         // PWA scope
      sw?: string           // Service worker path
      skipWaiting?: boolean  // Update service worker immediately
      runtimeCaching?: any[] // Cache strategies
    }
  
    // PWA wrapper function type
    function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig
    
    export default withPWA
  }