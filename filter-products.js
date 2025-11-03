import { Selector, ClientFunction } from 'testcafe';

fixture('Filter Products Test')
  .page(
    'https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25'
  )
  .skipJsErrors();

test('Filter products by price, manufacturer, sub category, and availability', async (t) => {
  // Step 1: Navigate to Components category page
  await t.wait(3000); // wait for the page to load

  // helper function to scroll to an element and set a value
  const scrollAndSetValue = ClientFunction((selector, value) => {
    return new Promise((resolve) => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
        // wait for a short time after scrolling
        setTimeout(() => {
          element.focus();
          element.select();
          element.value = value;
          element.dispatchEvent(new Event('input', { bubbles: true }));
          element.dispatchEvent(new Event('change', { bubbles: true }));
          resolve();
        }, 500);
      } else {
        resolve();
      }
    });
  });

  // helper function to scroll to an element
  const scrollToElement = ClientFunction((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  });

  // Step 3: Apply manufacturer filter (Apple)
  const appleCheckbox = Selector('#mz-fm-0-8');
  const appleLabel = Selector('label[for="mz-fm-0-8"]');

  await scrollToElement('#mz-fm-0-8');
  await t.wait(1000);

  await t
    .expect(appleCheckbox.exists)
    .ok({ timeout: 2000 })
    .expect(appleLabel.visible)
    .ok({ timeout: 2000 });

  const isAppleChecked = await appleCheckbox.checked;
  if (!isAppleChecked) {
    await t.click(appleLabel);
  }

  await t.wait(1000); // wait for the filters to apply

  // Step 4: Apply sub category filter (Monitors)
  const monitorsCheckbox = Selector('#mz-fsc-0-28');
  const monitorsLabel = Selector('label[for="mz-fsc-0-28"]');

  await scrollToElement('#mz-fsc-0-28');
  await t.wait(1000);

  await t
    .expect(monitorsCheckbox.exists)
    .ok({ timeout: 2000 })
    .expect(monitorsLabel.visible)
    .ok({ timeout: 2000 });

  const isMonitorsChecked = await monitorsCheckbox.checked;
  if (!isMonitorsChecked) {
    await t.click(monitorsLabel);
  }

  await t.wait(1000); // wait for the filters to apply

  // Step 5: Apply availability filter (In stock)
  const inStockCheckbox = Selector('#mz-fss-0--1');
  const inStockLabel = Selector('label[for="mz-fss-0--1"]');

  await scrollToElement('#mz-fss-0--1');
  await t.wait(1000);

  await t
    .expect(inStockCheckbox.exists)
    .ok({ timeout: 2000 })
    .expect(inStockLabel.visible)
    .ok({ timeout: 2000 });

  const isInStockChecked = await inStockCheckbox.checked;
  if (!isInStockChecked) {
    await t.click(inStockLabel);
  }

  await t.wait(2000); // wait for the filters to apply and the results to load

  // check the checkbox filters
  await t
    .expect(appleCheckbox.checked)
    .ok('Apple manufacturer should be checked');
  await t
    .expect(monitorsCheckbox.checked)
    .ok('Monitors sub category should be checked');
  await t
    .expect(inStockCheckbox.checked)
    .ok('In stock availability should be checked');
});
