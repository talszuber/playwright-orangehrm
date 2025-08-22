import {Page,test, expect} from '@playwright/test';


export class PersonaIdentificationModule {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;

    }

    async goto() {

        if (await this.page.locator('.oxd-sidepanel .toggled').isVisible()) {
            await this.page.locator('.oxd-main-menu-search"').getByRole('button').click();
        } else {
            await this.page.locator('.oxd-main-menu-item', {hasText: 'PIM'}).click();
        } 
    }

    async addEmployee(firstname: string, secondname: string, lastname: string, username: string, password: string) {
        await this.page.getByRole('button', {name: 'Add'}).click();
        await  expect(this.page.getByRole('heading', {name: 'Add Employee'})).toBeVisible();
        await this.page.getByPlaceholder('First Name').fill(firstname);
        await this.page.getByPlaceholder('Last Name').fill(lastname);
        await this.page.locator('.oxd-switch-input').click();
        await this.page.locator('.oxd-input-group', {hasText: 'Username'}).getByRole('textbox').fill(username);
        await this.page.locator('.oxd-input-group', {hasText: 'Password'}).getByRole('textbox').first().fill(password);
        await this.page.locator('.oxd-input-group', {hasText: 'Confirm Password'}).getByRole('textbox').fill(password);
        await this.page.getByRole('button', {name: 'Save'}).click();
    }


}