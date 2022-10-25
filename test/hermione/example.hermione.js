const { assert } = require('chai');


describe('', async function() {
    it('', async function() {

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

describe('Проверка приложения', async function() {

    describe('Проверка навигации', async function() {

        beforeEach(async function(){
            await this.browser.setWindowSize(420, 900);
            await this.browser.url('http://localhost:3000/hw/store/');
        })

        it('Проверка существования "Бургера"', async function()  {
            await this.browser.assertView('plain', '.navbar', {
                compositeImage: true,
                allowViewportOverflow: true,
            });
        })

        it('Проверка открытия "Бургера"', async function()  {

            const button = await this.browser.$('.navbar-toggler')
            await button.click()

            await this.browser.assertView('plain', '.navbar', {
                compositeImage: true,
                allowViewportOverflow: true,
            });
        })

        it('Проверка закрытия бургера "Бургера" при выборе', async function()  {

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

    describe('Проверка корзины', function() {

        let productName;

        beforeEach(async function(){
            await this.browser.setWindowSize(700, 700);
            await this.browser.url('http://localhost:3000/hw/store/catalog/0');

            productName = await this.browser.$('.ProductDetails-Name').getText();

            const buttonAddToCart = await this.browser.$('.ProductDetails-AddToCart');
            await buttonAddToCart.click()
        })

        it('Проверка добавления в корзину', async function() {
            await this.browser.url('http://localhost:3000/hw/store/cart');

            const title = await this.browser.$('.Cart-Name').getText();
            assert.equal(title, productName);


            // await this.browser.assertView('plain', '.Cart', {
            //     captureElementFromTop: false,
            //     screenshotDelay: 1000,
            //     allowViewportOverflow: true,
            //     tolerance: 5,
            //     compositeImage: true,
            //     ignoreElements: [
            //         '.Cart-Table'
            //     ]
            // });
        })

        it('Проверка очистки корзины', async function() {
            await this.browser.url('http://localhost:3000/hw/store/cart');

            const cartClear = await this.browser.$('.Cart-Clear');
            cartClear.click()

            const title = await this.browser.$('.col').getText();
            assert.equal(title, 'Shopping cart\nCart is empty. Please select products in the catalog.');
        })

        it('Проверка повторного добавления', async function() {
            await this.browser.setWindowSize(700, 700);
            await this.browser.url('http://localhost:3000/hw/store/catalog/0');

            productName = await this.browser.$('.ProductDetails-Name').getText();

            const buttonAddToCart = await this.browser.$('.ProductDetails-AddToCart');
            await buttonAddToCart.click()

            await this.browser.url('http://localhost:3000/hw/store/cart');

            const title = await this.browser.$('.Cart-Count').getText();
            assert.equal(title, '2');

        })
    })
})