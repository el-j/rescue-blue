import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const localesDir = path.resolve(process.cwd(), 'src/i18n/locales')
const baseLocale = 'de.json'

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function findShapeMismatches(baseValue, candidateValue, currentPath, errors) {
  if (Array.isArray(baseValue)) {
    if (!Array.isArray(candidateValue)) {
      errors.push(`${currentPath}: expected array but found ${typeof candidateValue}`)
      return
    }

    if (baseValue.length !== candidateValue.length) {
      errors.push(`${currentPath}: expected array length ${baseValue.length} but found ${candidateValue.length}`)
    }

    const limit = Math.min(baseValue.length, candidateValue.length)
    for (let index = 0; index < limit; index += 1) {
      findShapeMismatches(baseValue[index], candidateValue[index], `${currentPath}[${index}]`, errors)
    }
    return
  }

  if (isPlainObject(baseValue)) {
    if (!isPlainObject(candidateValue)) {
      errors.push(`${currentPath}: expected object but found ${typeof candidateValue}`)
      return
    }

    const baseKeys = new Set(Object.keys(baseValue))
    const candidateKeys = new Set(Object.keys(candidateValue))

    for (const key of baseKeys) {
      if (!candidateKeys.has(key)) {
        errors.push(`${currentPath}.${key}: missing key`)
      }
    }

    for (const key of candidateKeys) {
      if (!baseKeys.has(key)) {
        errors.push(`${currentPath}.${key}: unexpected key`)
      }
    }

    for (const key of baseKeys) {
      if (candidateKeys.has(key)) {
        findShapeMismatches(baseValue[key], candidateValue[key], `${currentPath}.${key}`, errors)
      }
    }
    return
  }

  if (baseValue === null) {
    if (candidateValue !== null) {
      errors.push(`${currentPath}: expected null but found ${typeof candidateValue}`)
    }
    return
  }

  const baseType = typeof baseValue
  const candidateType = typeof candidateValue
  if (baseType !== candidateType) {
    errors.push(`${currentPath}: expected ${baseType} but found ${candidateType}`)
  }
}

async function run() {
  const localeFiles = (await readdir(localesDir)).filter((name) => name.endsWith('.json')).sort()

  if (!localeFiles.includes(baseLocale)) {
    console.error(`Base locale file ${baseLocale} not found in ${localesDir}`)
    process.exit(1)
  }

  const basePath = path.join(localesDir, baseLocale)
  const baseData = JSON.parse(await readFile(basePath, 'utf8'))

  const failures = []

  for (const localeFile of localeFiles) {
    if (localeFile === baseLocale) {
      continue
    }

    const filePath = path.join(localesDir, localeFile)
    const localeData = JSON.parse(await readFile(filePath, 'utf8'))
    const errors = []

    findShapeMismatches(baseData, localeData, '$', errors)

    if (errors.length > 0) {
      failures.push({ localeFile, errors })
    }
  }

  if (failures.length > 0) {
    console.error('Locale shape parity check failed. Fix mismatches before merging:\n')
    for (const failure of failures) {
      console.error(`- ${failure.localeFile}`)
      for (const error of failure.errors) {
        console.error(`  - ${error}`)
      }
    }
    process.exit(1)
  }

  console.log(`Locale parity check passed for ${localeFiles.length} locale files.`)
}

run().catch((error) => {
  console.error('Locale parity check failed with an unexpected error:')
  console.error(error)
  process.exit(1)
})
