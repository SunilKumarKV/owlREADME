import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
import ROUTES from '../helpers/routes';

export class AnalyticsPage extends BasePage {
  readonly heading: Locator;
  readonly syncWarningCard: Locator;
  readonly statsCards: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h1', { hasText: 'Developer Analytics' });
    this.syncWarningCard = page.locator('h3', { hasText: 'GitHub Profile Sync Required' });
    this.statsCards = page.locator('.grid >> div >> h3');
  }

  async navigate(): Promise<void> {
    await this.goto(ROUTES.ANALYTICS);
  }

  async isLoaded(): Promise<void> {
    await this.waitForReady(this.heading);
  }

  async verifyPage(): Promise<void> {
    await this.isLoaded();
    await expect(this.syncWarningCard).toBeVisible();
  }
}

export default AnalyticsPage;
