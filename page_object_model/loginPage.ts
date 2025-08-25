import {Page} from '@playwright/test';


export class LoginPage {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;

    }

    async goto() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async login(username: string, password: string) {
        await this.page.getByRole('textbox', {name: 'username'}).fill(username);
        await this.page.getByRole('textbox', {name: 'password'}).fill(password);
        await this.page.getByRole('button').click();
    }
}