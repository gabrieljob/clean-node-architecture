import jestConfig from './jest.config'
import type { Config } from 'jest'

const config: Config = {
  ...jestConfig,
  testMatch: ['**/*.spec.ts'],
}

export default config
