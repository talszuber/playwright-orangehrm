import {test, expect} from '@playwright/test';
import {LoginPage} from '../page_object_model/loginPage';

test.describe('Login Tests', () => {

    

    test.beforeEach( async ({page}) =>
    {   
        const loginp = new LoginPage(page);
        await loginp.goto();
    
    });

    test('Positive Login test', async ({page}) =>
    {   
        const loginp = new LoginPage(page);
        await loginp.login('Admin', 'admin123');
        await expect(page.getByRole('heading', {name: 'Dashboard'})).toBeVisible();
    });
    
    test('Negative Login test', async ({page})=>
    {
        const loginp = new LoginPage(page);
        await loginp.login('Nimda', 'nimda123');
        await expect(page.getByText('Invalid Credentials')).toBeVisible({timeout: 5000});

    })




});