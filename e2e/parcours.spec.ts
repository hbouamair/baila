import { expect, test } from '@playwright/test'

const locales = [
  { path: '/fr/pass', home: '/fr', notice: 'Vous serez redirigé vers notre plateforme de billetterie' },
  { path: '/en/passes', home: '/en', notice: 'You will be redirected to our ticketing platform' },
  { path: '/es/pases', home: '/es', notice: 'Serás redirigido a nuestra plataforma de entradas' },
]

for (const locale of locales) {
  test(`parcours ${locale.home} → pass → billetterie`, async ({ page }) => {
    await page.goto(locale.home)
    await page.getByTestId('discover-passes').first().click()
    await page.waitForURL(new RegExp(`${locale.path.replaceAll('/', '\\/')}$`))

    const cards = page.getByTestId('pass-card')
    await expect(cards.first()).toBeVisible()
    await expect(cards.first().getByTestId('pass-price')).toBeVisible()
    await expect(page.getByTestId('redirect-notice')).toContainText(locale.notice)

    const buy = page.getByTestId('buy-button').first()
    await expect(buy).toHaveAttribute('target', '_blank')
    await expect(buy).toHaveAttribute('rel', /noopener/)
    const href = await buy.getAttribute('href')
    expect(href).toBeTruthy()
    expect(href).toContain('example.com/godance')

    const eventRequest = page.waitForRequest(
      (request) =>
        request.url().includes('/api/event') && (request.postData() || '').includes('outbound_ticket_click'),
      { timeout: 10_000 },
    )
    const popup = page.waitForEvent('popup').catch(() => null)
    await buy.click()
    await eventRequest
    await popup

    const events = await page.evaluate(() => window.__analyticsEvents || [])
    expect(events.some((event) => event.name === 'outbound_ticket_click')).toBeTruthy()
  })
}
