import { test, expect, request } from '@playwright/test'
import tags from '../test-data/tags.json'

test.beforeEach(async ({ page }) => {
  await page.route('https://api.realworld.io/api/tags', async route => {

    await route.fulfill({
      body: JSON.stringify(tags),
    })
  })
  await page.goto('http://angular.realworld.how/')

})

test('has title', async ({ page }) => {
  await page.route('https://api.realworld.io/api/articles?limit=10&offset=0', async route => {
    const res = await route.fetch()
    const resBody = await res.json()
    resBody.articles[0].title = "New MOCK title";
    resBody.articles[0].description = "New MOCK description";
    console.log(resBody.articles[0].title);

    await route.fulfill({
      body: JSON.stringify(resBody),
    })
  })
  await page.getByText('Global Feed').click()

  await expect(page.locator('.navbar-brand')).toHaveText('conduit')
  await expect(page.locator('.article-preview h1').first()).toContainText('New MOCK title')

})

test('del article', async ({ page, request }) => {
 /*  const res = await request.post('https://api.realworld.io/api/users/login', {
    data: {
      user:
        { email: "pwtest@test.com", password: "Welcome1" }
    }
  })

  const resBody = await res.json()
  const token = resBody.user.token; */

  const articleRes = await request.post('https://api.realworld.io/api/articles/', {
    data: { "article": { "title": "auto article 1", "description": "automation 1", "body": "auto body", "tagList": [] } },
   /*  headers: {
      Authorization: `Token ${token}`
    } */
  })

  expect(articleRes.status()).toEqual(201)

  await page.getByText('Global Feed').click()
  await page.getByText('auto article 1').click()
  await page.getByRole('button', { name: 'Delete Article' }).first().click()
  await page.getByText('Global Feed').click()

  await expect(page.locator('.article-preview h1').first()).not.toContainText('auto article 1')
})

test('add article', async ({ page, request }) => {
  await page.getByText('New Article').click()
  await page.getByRole('textbox', { name: 'Article Title' }).fill('Auto article')
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill('Auto description')
  await page.getByRole('textbox', { name: 'Write your article (in markdown)' }).fill('Auto body')
  await page.getByRole('button', { name: 'Publish Article' }).click()

  const artRes = await page.waitForResponse('https://api.realworld.io/api/articles/')
  const artResBody = await artRes.json()
  const slug = artResBody.article.slug;


  await expect(page.locator('.article-page h1')).toContainText('Auto article')

  await page.getByText('Home').click()
  await page.getByText('Global Feed').click()
  await expect(page.locator('app-article-list h1').first()).toContainText('Auto article')

  /* const res = await request.post('https://api.realworld.io/api/users/login', {
    data: {
      user:
        { email: "pwtest@test.com", password: "Welcome1" }
    }
  })

  const resBody = await res.json()
  const token = resBody.user.token; */

  const resDel = await request.delete(`https://api.realworld.io/api/articles/${slug}`, {
    /* headers: {
      Authorization: `Token ${token}`
    } */
  })

  expect(resDel.status()).toEqual(204)
})
