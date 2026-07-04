import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App'

import type { Locale } from './i18n'

export function render(lang?: Locale) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <App initialLang={lang} />
    </React.StrictMode>
  )
}
