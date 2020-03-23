'use strict'

const common = require('@electron/internal/common/api/exports/electron')
// since browser module list is also used in renderer, keep it separate.
const moduleList = require('@electron/internal/browser/api/module-list')

// Import common modules.
common.defineProperties(exports)

for (const module of moduleList) {
  Object.defineProperty(exports, module.name, {
    enumerable: !module.private,
    get: common.memoizedGetter(() => {
      const value = require(`@electron/internal/browser/api/${module.file}.js`)
      // Handle Typescript modules with an "export default X" statement
      if (value.__esModule) return value.default
      return value
    })
  })
}