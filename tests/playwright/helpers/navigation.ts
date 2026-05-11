import { expect, Locator, type Page } from '@playwright/test';

const NavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Classes', href: '/classes' },
    { name: 'About Us', href: '/about' },
    { name: 'Sign In', href: '/sign-in' }
];

export async function expectMainNavLinks(page: Page) {
    if (!isMobileViewport(page)) {
        await expectMainNavLinksDesktop(page);
    } else {
        await expectMainNavLinksMobile(page);
    }
}

async function expectMainNavLinksMobile(page: Page) {
    await openMobileNavDrawer(page);
    const mobileNavDialog = page.getByRole('dialog');
    await expectMainLinksCommon(mobileNavDialog);
    await closeMobileNavDrawer(page, mobileNavDialog);
}

async function expectMainNavLinksDesktop(page: Page) {   
    const nav = page.getByRole('navigation');
    await expectMainLinksCommon(nav);
}

async function expectMainLinksCommon(nav: Locator) {
    for (const link of NavLinks) {
        const linkElement = nav.getByRole('link', { name: link.name });
        await expect(linkElement).toBeVisible();
        await expect(linkElement).toHaveAttribute('href', link.href);
    }
}

async function openMobileNavDrawer(page: Page) {
    if (!isMobileViewport(page))
        return;
    const drawerButton =page.getByRole('navigation').getByRole('button');
    await drawerButton.click();
};

async function closeMobileNavDrawer(page: Page, drawerDialog: Locator) {
    if (!isMobileViewport(page))
        return;
    const drawerButton = drawerDialog.getByRole('button');
    await drawerButton.click();
};

const MOBILE_NAV_BREAKPOINT = 768;
function isMobileViewport(page: Page) {
    const w = page.viewportSize()?.width;
    return w !== undefined && w < MOBILE_NAV_BREAKPOINT;
}
