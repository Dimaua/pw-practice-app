import { test as setup } from '@playwright/test'
import user from '../.auth/user.json'
import fs from 'fs'

const authFile = '.auth/user.json'

setup('auth', async ({ page,request}) => {
  /* await page.goto('http://angular.realworld.how/')
  await page.getByText('Sign in').click()
  await page.getByRole('textbox', { name: 'Email' }).fill('pwtest@test.com')
  await page.getByRole('textbox', { name: 'Password' }).fill('Welcome1')
  await page.getByRole('button').click()
  await page.waitForResponse('https://api.realworld.io/api/tags')

  await page.context().storageState({ path: authFile }) */

  const res = await request.post('https://api.realworld.io/api/users/login', {
    data: {
      user:
        { email: "pwtest@test.com", password: "Welcome1" }
    }
  })

  const resBody = await res.json()
  const token = resBody.user.token;

  user.origins[0].localStorage[0].value = token
  fs.writeFileSync(authFile, JSON.stringify(user))

  process.env['ACCESS_TOKEN'] = token;

})
