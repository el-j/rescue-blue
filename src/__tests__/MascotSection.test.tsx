import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MascotSection } from '../components/MascotSection'
import { getTranslation } from '../i18n'

describe('MascotSection', () => {
  const t = getTranslation('de')

  it('renders the mascot section with download links and photo switcher', () => {
    render(<MascotSection lang="de" t={t} />)

    // Check title and mascot text
    expect(
      screen.getByText(/Echte Zivilgesellschaft\. Echte Sticker\. Echter Widerstand\./i),
    ).toBeInTheDocument()

    // Check download links for PDF and PNG
    const pdfDownload = screen.getByRole('link', { name: /Print-Vektor herunterladen \(PDF\)/i })
    expect(pdfDownload).toBeInTheDocument()
    expect(pdfDownload).toHaveAttribute('href', expect.stringContaining('antifa-peng.pdf'))
    expect(pdfDownload).toHaveAttribute('download', 'antifa-peng-vektor-vorlage.pdf')

    const pngDownload = screen.getByRole('link', { name: /Grafik herunterladen \(PNG\)/i })
    expect(pngDownload).toBeInTheDocument()
    expect(pngDownload).toHaveAttribute('href', expect.stringContaining('antifa-peng.png'))
    expect(pngDownload).toHaveAttribute('download', 'antifa-peng-badge.png')

    // Check photo switcher buttons
    const patchesBtn = screen.getByRole('button', { name: /Patches Detail/i })
    fireEvent.click(patchesBtn)

    const img = screen.getByRole('img', { name: /Echte gestickte Antifa Peng Patches/i })
    expect(img).toHaveAttribute('src', expect.stringContaining('antifa-peng-patches.jpg'))

    // Check patch email contact link
    const mailLink = screen.getByRole('link', { name: /bluearc\.in\.sky@gmail\.com/i })
    expect(mailLink).toBeInTheDocument()
    expect(mailLink).toHaveAttribute('href', expect.stringContaining('mailto:bluearc.in.sky@gmail.com'))
  })
})
