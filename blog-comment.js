import { Selector } from 'testcafe';

fixture('Blog Comment Test')
  .page(
    'https://ecommerce-playground.lambdatest.io/index.php?route=account/login'
  )
  .skipJsErrors(); // ignore external script errors

test('Post a comment on blog article and verify it appears', async (t) => {
  // Step 1: Navigate to Login Page and log in with a registered user account
  const emailInput = Selector('#input-email');
  const passwordInput = Selector('#input-password');
  const loginButton = Selector('input[value="Login"]');

  await t
    .typeText(emailInput, 'testkim@gmail.com')
    .typeText(passwordInput, '123456')
    .click(loginButton);

  // Step 2: Navigate to Blog Home page
  await t.navigateTo(
    'https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home'
  );

  // Step 3: Click on any blog post
  await t.wait(2000);

  const blogSlide = Selector('.swiper-slide').nth(1);
  await t.expect(blogSlide.exists).ok({ timeout: 5000 });

  const blogPostLink = blogSlide.find('.article-thumb a').nth(0);

  await t
    .expect(blogPostLink.exists)
    .ok({ timeout: 5000 })
    .expect(blogPostLink.visible)
    .ok({ timeout: 5000 });

  await t.click(blogPostLink);

  const blogArticlePage = Selector(
    '#form-comment, .entry-section, h1, .blog-article'
  );
  await t.expect(blogArticlePage.exists).ok({ timeout: 5000 });

  // Step 4: Scroll down to the Write a comment section
  const commentSection = Selector('#form-comment');
  await t
    .expect(commentSection.exists)
    .ok({ timeout: 5000 })
    .scroll(commentSection, 'bottom');

  // Step 5: Write a comment in the form
  const commentTextarea = Selector('#input-comment');
  await t.expect(commentTextarea.exists).ok({ timeout: 5000 });

  const commentText = `Test comment from Hyosik Kim`;
  await t.typeText(commentTextarea, commentText);

  // Step 6: Click the Post Comment button
  const postCommentButton = Selector('button').withText('Post comment');
  await t
    .expect(postCommentButton.exists)
    .ok({ timeout: 5000 })
    .click(postCommentButton);

  // Step 7: The confirmation message appears above the form
  const confirmationMessage = Selector(
    '.alert-success, .text-success, .success'
  ).withText(/success|thank|comment/i);
  await t
    .expect(confirmationMessage.exists)
    .ok('Confirmation message should appear');

  // Step 8: The comment is displayed below on the comments list
  // the comments list is structured inside #comment with ul.list-unstyled
  // each comment is a li.media.comment element
  const commentsList = Selector('#comment ul.list-unstyled');
  const postedComment = commentsList
    .find('li.media.comment')
    .withText(commentText);
  await t
    .expect(postedComment.exists)
    .ok('Comment should be displayed in comments list');
});
