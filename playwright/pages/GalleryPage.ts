import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export class GalleryPage extends BasePage {
  readonly heading: Locator;
  readonly searchInput: Locator;
  readonly importShowcaseTrigger: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h2', { hasText: 'Discover Beautiful Profile READMEs' });
    this.searchInput = page.locator('input[placeholder*="Search by name"]');
    this.importShowcaseTrigger = page.locator('label', { hasText: 'Import Showcase JSON' });
  }

  async navigate(): Promise<void> {
    await this.goto('/gallery');
  }

  async isLoaded(): Promise<void> {
    await this.waitForReady(this.heading);
  }

  async verifyPage(): Promise<void> {
    await this.isLoaded();
    await expect(this.heading).toBeVisible();
  }

  async fillSearch(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }
}

export default GalleryPage;
