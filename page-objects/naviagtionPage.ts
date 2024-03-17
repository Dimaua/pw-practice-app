import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{

  constructor(page: Page) {
    super(page)

  }

  async formslayoutPage() {
    await this.page.getByText('Forms').click()
    await this.page.getByText('Form Layouts').click()
    //await this.page.waitForNumbersSec(2)
  }

  async datepickerPage() {
    await this.selectMenu('Forms')
    await this.page.getByText('Datepicker').click()
  }

  async smartTablePage() {
    await this.selectMenu('Tables & Data')
    await this.page.getByText('Smart Table').click()

  }

  async toasterPage() {
    await this.selectMenu('Modal & Overlays')
    await this.page.getByText('Toastr').click()
  }

  async tooltipPage() {
    await this.selectMenu('Modal & Overlays')
    await this.page.getByText('Tooltip').click()
  }
  private async selectMenu(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle)
    const expandButton = await groupMenuItem.getAttribute('aria-expanded')
    if (expandButton === 'false') {
      await groupMenuItem.click()
    }
  }

}
