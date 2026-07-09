import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
import ROUTES from '../helpers/routes';

export class DashboardPage extends BasePage {
  readonly heading: Locator;
  readonly createProjectButton: Locator;
  readonly githubProfileImportTrigger: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h1', { hasText: 'Developer Workspace' });
    this.createProjectButton = page.getByRole('button', { name: 'Create your first project' }).or(page.getByRole('button', { name: 'Create New Project' }));
    this.githubProfileImportTrigger = page.getByRole('link', { name: 'Import from GitHub' });
  }

  async navigate(): Promise<void> {
    await this.goto(ROUTES.DASHBOARD);
  }

  async isLoaded(): Promise<void> {
    await this.waitForReady(this.heading);
  }

  async verifyPage(): Promise<void> {
    await this.isLoaded();
    await expect(this.heading).toBeVisible();
  }

  async clickCreateProject(): Promise<void> {
    await this.createProjectButton.click();
  }

  async clickImportFromGithub(): Promise<void> {
    await this.githubProfileImportTrigger.click();
  }
}

export default DashboardPage;
