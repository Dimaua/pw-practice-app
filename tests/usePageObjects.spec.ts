import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'
import { NavigationPage } from '../page-objects/naviagtionPage'
import { FormPage } from '../page-objects/formPage'

test.beforeEach(async ({ page }) => {
  await page.goto('/')

})

test('navigate to form page', async ({ page }) => {
  const pm = new PageManager(page)

  await pm.navigateTo().formslayoutPage()
  await pm.navigateTo().datepickerPage()
  await pm.navigateTo().smartTablePage()
  await pm.navigateTo().toasterPage()
  await pm.navigateTo().tooltipPage()
})

test('paramerized methods', async ({ page }) => {
  const pm = new PageManager(page)

  const randomName = faker.person.fullName()
  const randomEmail = `${randomName.replace(' ','')}${faker.number.int(1000)}@test.com`

  await pm.navigateTo().formslayoutPage()
  await pm.onFormPage().submitGridFormCredsOpt(randomName,randomEmail,'Option 1')

  //await page.screenshot({ path: `screenshots/formsPage.png` })
  await pm.onFormPage().submitInlineFormCreds(randomName,randomEmail)
  await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: `screenshots/inlineForm.png` })
})
