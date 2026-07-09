import { test } from '@playwright/test';
import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';
import ReadmeBuilderPage from '../pages/ReadmeBuilderPage';
import PreviewPage from '../pages/PreviewPage';
import ExportPage from '../pages/ExportPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import GalleryPage from '../pages/GalleryPage';
import ThemePage from '../pages/ThemePage';
import RoadmapBuilderPage from '../pages/RoadmapBuilderPage';
import ShareReadmePage from '../pages/ShareReadmePage';
import ShareRoadmapPage from '../pages/ShareRoadmapPage';
import { listenForConsoleErrors, expectNoErrors } from '../helpers/utils';
import { MOCK_SHARE_PAYLOADS } from '../helpers/testData';

test.describe('OwlReadme Core Route Smoke Tests — POM Architecture', () => {
  let consoleErrors: string[];

  test.beforeEach(async ({ page }) => {
    // Intercept logs and exceptions
    consoleErrors = listenForConsoleErrors(page);
  });

  test.afterEach(async () => {
    // Ensure no uncaught exceptions or error events were emitted
    expectNoErrors(consoleErrors);
  });

  test('1. Landing Page (/) Loads Successfully', async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.navigate();
    await landingPage.verifyPage();
  });

  test('2. Developer Workspace (/dashboard) Loads Successfully', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigate();
    await dashboardPage.verifyPage();
  });

  test('3. Profile README Builder (/readme-builder) is Usable', async ({ page }) => {
    const builderPage = new ReadmeBuilderPage(page);
    await builderPage.navigate();
    await builderPage.verifyPage();

    // Verify inputs and selection state triggers do not cause crashes
    await builderPage.selectTemplate('professional');
    await builderPage.selectTheme('dark');
  });

  test('4. Live Preview (/preview) Renders Successfully', async ({ page }) => {
    const previewPage = new PreviewPage(page);
    await previewPage.navigate();
    await previewPage.verifyPage();
  });

  test('5. Export Studio (/export) is Active', async ({ page }) => {
    const exportPage = new ExportPage(page);
    await exportPage.navigate();
    await exportPage.verifyPage();
  });

  test('6. Developer Analytics (/analytics) Metrics Render', async ({ page }) => {
    const analyticsPage = new AnalyticsPage(page);
    await analyticsPage.navigate();
    await analyticsPage.verifyPage();
  });

  test('7. Template Gallery (/gallery) Loads Curtated COMMUNITY Banner', async ({ page }) => {
    const galleryPage = new GalleryPage(page);
    await galleryPage.navigate();
    await galleryPage.verifyPage();
  });

  test('8. Theme Selection (/theme) Preferences Persistence', async ({ page }) => {
    const themePage = new ThemePage(page);
    await themePage.navigate();
    await themePage.verifyPage();

    // Trigger state change
    await themePage.selectThemeRadio('terminal');

    // Reload page to assert preference persistence via localStorage
    await page.reload();
    await themePage.verifyPage();
  });

  test('9. Roadmap Builder (/roadmap-builder) Layout loads', async ({ page }) => {
    const roadmapBuilderPage = new RoadmapBuilderPage(page);
    await roadmapBuilderPage.navigate();
    await roadmapBuilderPage.verifyPage();
  });

  test('10. Share README Page (/share/readme) handles payloads', async ({ page }) => {
    const shareReadmePage = new ShareReadmePage(page);
    
    // Scenario A: empty parameters -> displays error message
    await shareReadmePage.navigate();
    await shareReadmePage.verifyError();

    // Scenario B: valid data payload -> displays content
    await shareReadmePage.navigate(`data=${MOCK_SHARE_PAYLOADS.README_DATA}`);
    await shareReadmePage.verifyPage();
  });

  test('11. Share Roadmap Page (/share/roadmap) handles payloads', async ({ page }) => {
    const shareRoadmapPage = new ShareRoadmapPage(page);
    
    // Scenario A: empty parameters -> displays error message
    await shareRoadmapPage.navigate();
    await shareRoadmapPage.verifyError();

    // Scenario B: valid data payload -> displays content
    await shareRoadmapPage.navigate(`data=${MOCK_SHARE_PAYLOADS.ROADMAP_DATA}`);
    await shareRoadmapPage.verifyPage();
  });
});
