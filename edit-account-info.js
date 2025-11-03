import { Selector } from 'testcafe';

fixture('Edit Account Information Test').page(
  'https://ecommerce-playground.lambdatest.io/index.php?route=account/login'
);

test('Update account information and verify changes', async (t) => {
  // Step 1: Navigate to Login Page and log in with a registered user account
  const emailInput = Selector('#input-email');
  const passwordInput = Selector('#input-password');
  const loginButton = Selector('input[value="Login"]');

  await t
    .typeText(emailInput, 'devkim@gmail.com')
    .typeText(passwordInput, '12341234')
    .click(loginButton);

  // Step 2: Click My Account to open the account dashboard
  const myAccountLink = Selector('a').withText('My Account');
  await t.click(myAccountLink);

  // Step 3: Click Edit your account information
  const editAccountLink = Selector('a').withText(
    'Edit your account information'
  );
  await t.click(editAccountLink);

  // Step 4: Update the First Name and Last Name fields with new valid inputs
  const firstNameInput = Selector('#input-firstname');
  const lastNameInput = Selector('#input-lastname');

  const newFirstName = 'Hyosika';
  const newLastName = 'Kima';
  await t
    .selectText(firstNameInput)
    .typeText(firstNameInput, newFirstName, { replace: true })
    .selectText(lastNameInput)
    .typeText(lastNameInput, newLastName, { replace: true });

  // Step 5: Change the Email field to a valid new email address
  const emailFieldInput = Selector('#input-email');
  const newEmail = `devtestkim@gmail.com`;
  await t
    .selectText(emailFieldInput)
    .typeText(emailFieldInput, newEmail, { replace: true });

  // Step 6: Modify the Telephone field to a valid number
  const telephoneInput = Selector('#input-telephone');
  const newTelephone = '0491234123';
  await t
    .selectText(telephoneInput)
    .typeText(telephoneInput, newTelephone, { replace: true });

  // Step 7: Click Continue to save the changes
  const continueButton = Selector('input[value="Continue"]');
  await t.click(continueButton);

  // Step 8: Green success message should appear
  const successMessage = Selector('.alert-success').withText(
    'Your account has been successfully updated.'
  );
  await t.expect(successMessage.exists).ok();

  // Step 9: Return to Edit Account page and confirm that the new details are retained
  await t.click(editAccountLink);

  await t
    .expect(firstNameInput.value)
    .eql(newFirstName)
    .expect(lastNameInput.value)
    .eql(newLastName)
    .expect(emailFieldInput.value)
    .eql(newEmail)
    .expect(telephoneInput.value)
    .eql(newTelephone);
});
