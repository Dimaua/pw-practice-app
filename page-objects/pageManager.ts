import { Page } from "@playwright/test";
import { NavigationPage } from '../page-objects/naviagtionPage'
import { FormPage } from '../page-objects/formPage'


export class PageManager {

  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formPage: FormPage;

  constructor(page: Page) {

    this.page = page;
    this.navigationPage = new NavigationPage(this.page)
    this.formPage = new FormPage(this.page)
  }

  navigateTo() {
    return this.navigationPage
  }

  onFormPage() {
    return this.formPage
  }
}
