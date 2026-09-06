import { test, expect } from '@playwright/test';

test('амжилттай нэвтрэх', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('амжилтгүй нэвтрэх', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_pass');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Products')).not.toBeVisible();
    await expect(page).not.toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('бараа сагслах', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Products')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeDefined();
});
