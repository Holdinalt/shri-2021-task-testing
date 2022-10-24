const { assert } = require('chai');

describe('', () => {
    it('', () => {

    })
})

// describe('github', async function() {
//     it('Тест, который пройдет', async function() {
//         await this.browser.setWindowSize(1920, 1080);
//         await this.browser.url('https://github.com/gemini-testing/hermione');
//         await this.browser.assertView('plain', '#readme', {
//             compositeImage: true,
//         });
//
//         const title = await this.browser.$('#readme h1').getText();
//         assert.equal(title, 'Hermione');
//     });
// });

describe('Проверка навигации', async function() {
    it('Проверка существования "Бургера"', async function()  {
        await this.browser.setWindowSize(420, 900);
        await this.browser.url('http://localhost:3000/hw/store/');

        await this.browser.assertView('plain', '.navbar', {
            compositeImage: true,
            allowViewportOverflow: true,
        });
    })

    it('Проверка открытия "Бургера"', async function()  {
        await this.browser.setWindowSize(420, 900);
        await this.browser.url('http://localhost:3000/hw/store/');

        const button = await this.browser.$('.navbar-toggler')
        await button.click()

        await this.browser.assertView('plain', '.navbar', {
            compositeImage: true,
            allowViewportOverflow: true,
        });
    })

    it('Проверка закрытия бургера "Бургера" при выборе', async function()  {
        await this.browser.setWindowSize(420, 900);
        await this.browser.url('http://localhost:3000/hw/store/');

        const button = await this.browser.$('.navbar-toggler')
        await button.click()

        const buttonCatalog = await this.browser.$('.nav-link')
        await buttonCatalog.click()

        await this.browser.assertView('plain', '.navbar', {
            compositeImage: true,
            allowViewportOverflow: true,
        });
    })
})