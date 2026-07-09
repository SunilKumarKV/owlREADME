import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
import ROUTES from '../helpers/routes';

export class ExportPage extends BasePage {
  readonly heading: Locator;
  readonly backToWorkspaceLink: Locator;
  readonly downloadCombinedButton: Locator;
  readonly downloadBackupButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h1', { hasText: 'Export Studio' });
    this.backToWorkspaceLink = page.getByRole('link', { name: 'Back to Workspace' });
    this.downloadCombinedButton = page.getByRole('button', { name: 'ZIP Package' }).or(page.locator('button', { hasText: 'Download ZIP' }));
    this.downloadBackupButton = page.getByRole('button', { name: 'Backup' }).or(page.locator('button', { hasText: 'JSON Backup' }));
  }

  async navigate(): Promise<void> {
    await this.goto(ROUTES.EXPORT);
  }

  async isLoaded(): Promise<void> {
    await this.waitForReady(this.heading);
  }

  async verifyPage(): Promise<void> {
    await this.isLoaded();
    await expect(this.downloadCombinedButton).toBeVisible();
    await expect(this.downloadBackupButton).toBeVisible();
  }

  async clickDownloadZip(): Promise<void> {
    await this.downloadCombinedButton.click();
  }

  async clickDownloadBackup(): Promise<void> {
    await this.downloadBackupButton.click();
  }
}

export default ExportPage;
