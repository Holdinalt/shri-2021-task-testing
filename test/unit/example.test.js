import {Provider} from "react-redux";
import {Application} from "../../src/client/Application";
import {BrowserRouter} from "react-router-dom";
import {CartApi, ExampleApi} from "../../src/client/api";
import {checkout, initStore} from "../../src/client/store";
import {it, expect, describe, beforeEach} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import axios from "axios";
import {CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo} from "../../src/common/types";
import {commerce} from "faker";

class MockExampleApi extends ExampleApi{

    products = []
    checkoutVar = 0;

    constructor() {
        super('/');
        this.addProduct('car')
    }

    addProduct(name){
        this.products.push({
            id: this.products.length,
            name: name,
            description: commerce.productDescription(),
            price: Number(commerce.price()),
            color: commerce.color(),
            material: commerce.productMaterial(),
        });

    }

    // function getShortInfo({ id, name, price }: Product): ProductShortInfo {
    //     return { id, name, price };
    // }

    getProducts() {
        let out = []

        for (let product of this.products){
            out.push({id: product.id, name: product.name, price: product.price})
        }
        // return {data: out}
        return new Promise((resolve) => resolve({data: out}))
        // return await axios.get<ProductShortInfo[]>(`${this.basename}/api/products`);
    }

    getProductById(id) {
        return this.products[id]
        // return new Promise((resolve) => resolve(this.products[id]))
        // return await axios.get<Product>(`${this.basename}/api/products/${id}`);
    }

    checkout(form, cart) {
        this.checkoutVar++
        return this.checkoutVar
        // return new Promise((resolve) => resolve({id: this.checkoutVar}))
        // return await axios.post<CheckoutResponse>(`${this.basename}/api/checkout`, { form, cart });
    }

}

describe('', () => {
    it('', () => {
    });
});

describe('Тестирование приложения', () => {

    describe('Проверка навигации', () => {


        beforeEach(() => {
            // const api = new ExampleApi('/');
            const api = new MockExampleApi()
            const cart = new CartApi();
            const store = initStore(api, cart);

            render(
                <BrowserRouter basename={'/'}>
                    <Provider store={store}>
                        <Application />
                    </Provider>
                </BrowserRouter>
            )
        })

        describe('Проверка перехода по навигационной панели', () => {

            it('Проверка перехода по Лого', () => {
                const navButton = screen.getByRole('link', {
                    name: /example store/i
                })

                navButton.click()

                const mainTittle = screen.getByText(/welcome to example store!/i)

                expect(mainTittle.innerHTML).toEqual('Welcome to Example store!')
            });

            it('Проверка перехода на Catalog', () => {
                const navButton = screen.getByRole('link', {
                    name: /catalog/i
                })

                navButton.click()

                const catalogTittle = screen.getByRole('heading', {
                    name: /catalog/i
                })

                expect(catalogTittle.innerHTML).toEqual('Catalog')
            });

            it('Проверка перехода на Delivery', () => {
                const navButton = screen.getByRole('link', {
                    name: /delivery/i
                })

                navButton.click()

                const deliveryTittle = screen.getByRole('heading', {
                    name: /delivery/i
                })

                expect(deliveryTittle.innerHTML).toEqual('Delivery')
            });

            it('Проверка перехода на Contacts', () => {
                const navButton = screen.getByRole('link', {
                    name: /contacts/i
                })

                navButton.click()

                const contactsTittle = screen.getByRole('heading', {
                    name: /contacts/i
                })

                expect(contactsTittle.innerHTML).toEqual('Contacts')
            });

            it('Проверка перехода на Cart', () => {
                const navButton = screen.getByRole('link', {
                    name: /cart/i
                })

                navButton.click()

                // screen.logTestingPlaygroundURL()

                const cartTittle = screen.getByRole('heading', {
                    name: /shopping cart/i
                })

                console.log(cartTittle.innerHTML)

                expect(cartTittle.innerHTML).toEqual('Shopping cart')
            });
        });
    });

    describe('Проверка Каталога', () => {

        beforeEach(() => {
            // const api = new ExampleApi('/');
            const api = new MockExampleApi()
            const cart = new CartApi();
            const store = initStore(api, cart);

            render(
                <BrowserRouter basename={'/'}>
                    <Provider store={store}>
                        <Application />
                    </Provider>
                </BrowserRouter>
            )
        })

        describe('Проверка карточек', () => {

            beforeEach(() => {
                const navButton = screen.getByRole('link', {
                    name: /catalog/i
                })

                navButton.click()
            })

            it('Карточки отображаются', () => {
                // jest.useFakeTimers();
                // setTimeout(() => {
                //     screen.logTestingPlaygroundURL()
                // }, 3000);
                // jest.runAllTimers();
                //
                // setTimeout(() => {
                //     screen.logTestingPlaygroundURL()
                // }, 3000);
                // jest.runAllTimers();
            });

        });
    });

})