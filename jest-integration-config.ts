import jestConfig from './jest.config'
import type { Config } from 'jest'

const config: Config = {
  ...jestConfig,
  testMatch: ['**/*.test.ts'],
}

export default config
