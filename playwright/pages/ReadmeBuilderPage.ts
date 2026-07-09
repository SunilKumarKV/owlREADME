import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
import ROUTES from '../helpers/routes';

export class ReadmeBuilderPage extends BasePage {
  readonly logoText: Locator;
  readonly templateSelect: Locator;
  readonly themeSelect: Locator;
  readonly dashboardButton: Locator;
  readonly importReadmeButton: Locator;
  readonly resetViewButton: Locator;

  constructor(page: Page) {
    super(page);
    this.logoText = page.locator('span', { hasText: 'OwlREADME' }).first();
    this.templateSelect = page.locator('#builder-template-select');
    this.themeSelect = page.locator('#builder-theme-select');
    this.dashboardButton = page.getByRole('link', { name: 'Dashboard' });
    this.importReadmeButton = page.getByRole('button', { name: 'Import README' });
    this.resetViewButton = page.getByRole('button', { name: 'Reset View' });
  }

  async navigate(): Promise<void> {
    await this.goto(ROUTES.README_BUILDER);
  }

  async isLoaded(): Promise<void> {
    await this.waitForReady(this.logoText);
  }

  async verifyPage(): Promise<void> {
    await this.isLoaded();
    await expect(this.templateSelect).toBeVisible();
    await expect(this.themeSelect).toBeVisible();
  }

  async selectTemplate(value: string): Promise<void> {
    await this.templateSelect.selectOption(value);
  }

  async selectTheme(value: string): Promise<void> {
    await this.themeSelect.selectOption(value);
  }

  async clickResetView(): Promise<void> {
    await this.resetViewButton.click();
  }

  async clickImportReadme(): Promise<void> {
    await this.importReadmeButton.click();
  }

  async clickDashboard(): Promise<void> {
    await this.dashboardButton.click();
  }
}

export default ReadmeBuilderPage;
