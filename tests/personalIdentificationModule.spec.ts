import {expect, test} from '@playwright/test';
import {LoginPage} from '../page_object_model/loginPage';
import {PersonaIdentificationModule} from '../page_object_model/pim';
import { faker, ne } from '@faker-js/faker';


test.beforeEach( async ({page}) => {
    const loginp = new LoginPage(page);
    await loginp.goto();
    await loginp.login('Admin', 'admin123');
    await  expect(page.getByRole('heading', {name: 'Dashboard'})).toBeVisible();

});

test('add employee', async ({page}) => { 

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.username({firstName, lastName});
    const password = faker.internet.password({length: 10});
    const pim = new PersonaIdentificationModule(page);
    await pim.goto();
    await pim.addEmployee(firstName, '', lastName, username, password);
    await expect(page.getByRole('heading', {name: `${firstName} ${lastName}`})).toBeVisible();
});
