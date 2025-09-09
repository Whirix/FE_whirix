// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      screens: {
        // 태블릿: 744px 이상 ~ 1024px 이하
        tab: { min: '744px', max: '1024px' },
      },
    },
  },
}

export default config
