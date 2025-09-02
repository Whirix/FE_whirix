import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*-stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-actions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') {
      if (config.build) {
        config.build.rollupOptions = {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('axe-core')) {
                  return 'axe-core'
                }
                if (id.includes('@floating-ui/react')) {
                  return 'floating-ui'
                }
                if (id.includes('react-dom')) {
                  return 'react-dom'
                }
                if (id.includes('react')) {
                  return 'react'
                }
                return 'vendor' // 나머지 node_modules
              }

              // 로컬 컴포넌트 청킹
              const componentMatch = id.match(/src\/(shared\/ui|feature)\/([^/]+)\/index\.ts/)
              if (componentMatch) {
                return `component-${componentMatch[2]}`
              }
            },
          },
        }
        config.build.chunkSizeWarningLimit = 600
      }
    }
    return config
  },
}
export default config
