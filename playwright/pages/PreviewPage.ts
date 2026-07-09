import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
import ROUTES from '../helpers/routes';

export class PreviewPage extends BasePage {
  readonly heading: Locator;
  readonly previewTabButton: Locator;
  readonly markdownTabButton: Locator;
  readonly splitTabButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h1', { hasText: 'Live Preview' });
    this.previewTabButton = page.getByRole('button', { name: 'Preview' });
    this.markdownTabButton = page.getByRole('button', { name: 'Markdown' });
    this.splitTabButton = page.getByRole('button', { name: 'Split View' });
  }

  async navigate(): Promise<void> {
    await this.goto(ROUTES.PREVIEW);
  }

  async isLoaded(): Promise<void> {
    await this.waitForReady(this.heading);
  }

  async verifyPage(): Promise<void> {
    await this.isLoaded();
    await expect(this.heading).toBeVisible();
  }

  async selectViewMode(mode: 'preview' | 'markdown' | 'split'): Promise<void> {
    if (mode === 'preview') {
      await this.previewTabButton.click();
    } else if (mode === 'markdown') {
      await this.markdownTabButton.click();
    } else if (mode === 'split') {
      await this.splitTabButton.click();
    }
  }
}

export default PreviewPage;
