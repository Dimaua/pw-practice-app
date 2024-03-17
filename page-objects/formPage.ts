import { Page } from "@playwright/test";

export class FormPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   *
   * @param email - email to be entered
   * @param password - password to be entered
   * @param optionText - option to be selected
   */

async submitGridFormCredsOpt(email: string, password: string, optionText: string) {
  const usingGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' })
  await usingGridForm.getByRole('textbox', { name: 'Email' }).fill(email)
  await usingGridForm.getByRole('textbox', { name: 'Password' }).fill(password)

  await usingGridForm.getByRole('radio', { name: optionText }).check({ force: true })
  await usingGridForm.getByRole('button').click()

  }




}
