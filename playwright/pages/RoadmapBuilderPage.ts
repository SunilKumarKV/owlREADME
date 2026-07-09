import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
import ROUTES from '../helpers/routes';

export class RoadmapBuilderPage extends BasePage {
  readonly heading: Locator;
  readonly templateSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h1', { hasText: 'Create Your Roadmap' });
    this.templateSelect = page.locator('#roadmap-template-select');
  }

  async navigate(): Promise<void> {
    await this.goto(ROUTES.ROADMAP_BUILDER);
  }

  async isLoaded(): Promise<void> {
    await this.waitForReady(this.heading);
  }

  async verifyPage(): Promise<void> {
    await this.isLoaded();
    await expect(this.templateSelect).toBeVisible();
  }

  async selectTemplate(templateName: string): Promise<void> {
    await this.templateSelect.selectOption(templateName);
  }
}

export default RoadmapBuilderPage;
