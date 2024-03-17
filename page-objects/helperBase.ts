import { Page } from "@playwright/test";

export class HelperBase {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForNumbersSec(sec: number) {
    await this.page.waitForTimeout(sec * 1000);
  }
}
