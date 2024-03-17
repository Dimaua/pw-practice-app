import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { NavigationPage } from '../page-objects/naviagtionPage'
import { FormPage } from '../page-objects/formPage'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')

})

test('naviagt to form page', async ({ page }) => {
  const pm = new PageManager(page)

  await pm.navigateTo().formslayoutPage()
  await pm.navigateTo().datepickerPage()
  await pm.navigateTo().smartTablePage()
  await pm.navigateTo().toasterPage()
  await pm.navigateTo().tooltipPage()
})

test('paramerized methods', async ({ page }) => {
  const pm = new PageManager(page)

  await pm.navigateTo().formslayoutPage()
  await pm.onFormPage().submitGridFormCredsOpt('test@test.com','qwerty123','Option 1')
})
