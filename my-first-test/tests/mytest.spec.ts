import { test, expect } from '@playwright/test';

test('амжилттай нэвтрэх', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    // Login
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Нүүр хуудас дээр очсон, текст нь харагдаж байгаа эсэхийг шалгах
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Logout
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('амжилтгүй нэвтрэх', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    // Login
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_pass');
    await page.getByRole('button', { name: 'Login' }).click();

    // Нүүр хуудас дээр очоогүй байгаа эсэхийг шалгах
    await expect(page.getByText('Products')).not.toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Алдааны мессеж шалгах
    await expect(page.getByTestId('error')).toContainText(
        'Username and password do not match',
    );
});

test('бараа сагслах', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    // Login
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Нүүр хуудас дээр очсон, текст нь харагдаж байгаа эсэхийг шалгах
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Эхний бүтээгдэхүүний "Add to cart" товчийг дарах
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    // "Remove" товч харагдаж байгаа эсэхийг шалгах
    await expect(page.getByRole('button', { name: 'Remove' }).first()).toBeVisible();
    // Сагсны тоо зөв эсэх
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    // Сагс руу орж шалгах
    await page.getByTestId('shopping-cart-link').click();
    // Эхний бүтээгдэхүүний нэр харагдаж байгаа эсэхийг шалгах
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // Logout
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});
