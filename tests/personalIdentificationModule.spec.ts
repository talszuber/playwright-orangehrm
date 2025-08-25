import {expect, test, request}  from '@playwright/test';
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
    const pim = new PersonaIdentificationModule(page);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.username({firstName, lastName});
    const password = faker.internet.password({length: 10});


    await pim.goto();
    await pim.addEmployee(firstName, '', lastName, username, password);
    const responseAddEmployee = await page.waitForResponse('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees');
    const responseToJson = await responseAddEmployee.json();
    const employeeId = responseToJson.data.employeeId;
    await expect(page.getByRole('heading', {name: `${firstName} ${lastName}`})).toBeVisible();

    await pim.goto();
    await pim.findEmployee(employeeId);
});

test('terminate first employee', async ({page}) => 
{   

   const pim = new PersonaIdentificationModule(page);
    await pim.goto();
    const employeeId = await pim.grabFirstEmployeeId();
    await pim.terminateEmployee(employeeId);

}
)
