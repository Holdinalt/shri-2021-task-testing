import {Provider} from "react-redux";
import {Application} from "../../src/client/Application";
import {BrowserRouter} from "react-router-dom";
import {CartApi, ExampleApi} from "../../src/client/api";
import {checkout, initStore} from "../../src/client/store";
import {it, expect, describe, beforeEach} from "@jest/globals";
import {render, screen, within} from "@testing-library/react";
import axios from "axios";
import {CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo} from "../../src/common/types";
import {commerce} from "faker";
import configureStore from 'redux-mock-store' //CommonJS

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


const middlewares = []
const mockStore = configureStore(middlewares)

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

        let localContainer;

        beforeEach(() => {
            // const api = new ExampleApi('/');
            // const api = new MockExampleApi()
            // const cart = new CartApi();
            // const store = initStore(api, cart);
            const store = mockStore(
                {
                    products: [ { id: 0, name: 'car', price: 771 } ],
                    details: {
                      0: {
                          id: 0, name: 'car', price: 771,
                          description: 'all in',
                          color: 'red',
                          material: 'metal',
                      }
                    },
                    cart: {
                    },
                    latestOrderId: 0
                }
            )

            const {container} = render(
                <BrowserRouter basename={'/'}>
                    <Provider store={store}>
                        <Application />
                    </Provider>
                </BrowserRouter>
            )

            localContainer = container
        })

        describe('Проверка карточек', () => {

            beforeEach(() => {

                const navButton = screen.getAllByRole('link', {
                    name: /catalog/i
                })[0]

                navButton.click()
            })

            it('Карточки отображаются', () => {

                const card = screen.getAllByTestId('0')

                expect(card).toBeTruthy()
            });

            it('Название карточки корректное', () => {

                const cardName = screen.getByRole('heading', { name: /car/i })

                expect(cardName.innerHTML).toEqual('car')
            });

            it('Цена корректная', () => {

                const cardName = screen.getByText(/\$771/i)

                expect(cardName.innerHTML).toEqual('$771')
            });

            describe('Проверка внутренностей карточек', () => {
                beforeEach(() => {
                    const link = screen.getByRole('link', { name: /details/i })
                    link.click()
                })

                it('Название корректное', () => {
                    const name = screen.getByRole('heading', { name: /car/i })

                    expect(name.innerHTML).toEqual('car')
                });

                it('Описание корректное', () => {
                    const node = screen.getByText(/all in/i)

                    expect(node.innerHTML).toEqual('all in')
                });

                it('Цвет корректный', () => {
                    const node = screen.getByText(/red/i)

                    expect(node.innerHTML).toEqual('red')
                });

                it('Материал корректный', () => {
                    const node = screen.getByText(/metal/i)

                    expect(node.innerHTML).toEqual('metal')
                });

                // it('Проверка на добавление в корзину', () => {
                //     const addToCartButton = screen.getByRole('button', {
                //         name: /add to cart/i
                //     })
                //
                //     addToCartButton.click()
                //     console.log(addToCartButton.innerHTML)
                //
                //     const cart = screen.getByRole('link', {
                //         name: /cart/i
                //     })
                //
                //     cart.click()
                //
                //     screen.logTestingPlaygroundURL()
                //
                // });
            });
        });

    });

    describe('Проверка корзины', () => {

        describe('Проверка c одним айтемом в корзине', () => {

            beforeEach(() => {
                // const api = new ExampleApi('/');
                // const api = new MockExampleApi()
                // const cart = new CartApi();
                // const store = initStore(api, cart);
                const store = mockStore(
                    {
                        products: [ { id: 0, name: 'car', price: 771 } ],
                        details: {
                            0: {
                                id: 0, name: 'car', price: 771,
                                description: 'all in',
                                color: 'red',
                                material: 'metal',
                            }
                        },
                        cart: {
                            0: { id: 0, name: 'car', price: 771, count: 1 }
                        },
                        latestOrderId: 0
                    }
                )

                render(
                    <BrowserRouter basename={'/'}>
                        <Provider store={store}>
                            <Application />
                        </Provider>
                    </BrowserRouter>
                )

            })

            it('Проверка навигации', () => {

                const navButton = screen.getByRole('link', {
                    name: /cart/i
                })

                expect(navButton.innerHTML).toEqual('Cart (1)')

            });

            describe('Проверка данных', () => {

                beforeEach(() => {
                    const navButton = screen.getByRole('link', {
                        name: /cart/i
                    })

                    navButton.click()
                })

                it('Проверка названия продукта', () => {
                    const row = screen.getAllByTestId('0')
                    expect(row[0].children[1].innerHTML).toEqual('car')
                });

                it('Проверка цены продукта', () => {
                    const row = screen.getAllByTestId('0')
                    expect(row[0].children[2].innerHTML).toEqual('$771')
                });

                it('Проверка количества продукта', () => {
                    const row = screen.getAllByTestId('0')
                    expect(row[0].children[3].innerHTML).toEqual('1')
                });

                it('Проверка Total продукта', () => {
                    const row = screen.getAllByTestId('0')
                    expect(row[0].children[4].innerHTML).toEqual('$771')
                });

                it('Проверка Order Price', () => {
                    const row = screen.getByRole('row', {
                        name: /order price: \$771/i
                    });

                    const price = within(row).getByRole('cell', {
                        name: /\$771/i
                    });

                    expect(price.innerHTML).toEqual('$771')
                });
            });
        });

        describe('Проверка c двумя разными айтемами в корзине', () => {

            beforeEach(() => {
                // const api = new ExampleApi('/');
                // const api = new MockExampleApi()
                // const cart = new CartApi();
                // const store = initStore(api, cart);
                const store = mockStore(
                    {
                        products: [ { id: 0, name: 'car', price: 771 } ],
                        details: {
                            0: {
                                id: 0, name: 'car', price: 771,
                                description: 'all in',
                                color: 'red',
                                material: 'metal',
                            }
                        },
                        cart: {
                            0: { id: 0, name: 'car', price: 771, count: 1 },
                            1: { id: 0, name: 'car', price: 771, count: 1 }
                        },
                        latestOrderId: 0
                    }
                )

                render(
                    <BrowserRouter basename={'/'}>
                        <Provider store={store}>
                            <Application />
                        </Provider>
                    </BrowserRouter>
                )

            })

            it('Проверка навигации', () => {

                const navButton = screen.getByRole('link', {
                    name: /cart/i
                })

                expect(navButton.innerHTML).toEqual('Cart (2)')

            });

            describe('Проверка данных', () => {

                beforeEach(() => {
                    const navButton = screen.getByRole('link', {
                        name: /cart/i
                    })

                    navButton.click()
                })


                it('Проверка Order Price', () => {
                    const row = screen.getByRole('row', {
                        name: /order price: \$1542/i
                    });

                    const price = within(row).getByRole('cell', {
                        name: /\$1542/i
                    });

                    expect(price.innerHTML).toEqual('$1542')
                });
            });
        });

        describe('Проверка c двумя одинаковыми айтемами в корзине', () => {

            beforeEach(() => {
                // const api = new ExampleApi('/');
                // const api = new MockExampleApi()
                // const cart = new CartApi();
                // const store = initStore(api, cart);
                const store = mockStore(
                    {
                        products: [ { id: 0, name: 'car', price: 771 } ],
                        details: {
                            0: {
                                id: 0, name: 'car', price: 771,
                                description: 'all in',
                                color: 'red',
                                material: 'metal',
                            }
                        },
                        cart: {
                            0: { id: 0, name: 'car', price: 771, count: 2 }
                        },
                        latestOrderId: 0
                    }
                )

                render(
                    <BrowserRouter basename={'/'}>
                        <Provider store={store}>
                            <Application />
                        </Provider>
                    </BrowserRouter>
                )

            })

            it('Проверка навигации', () => {

                const navButton = screen.getByRole('link', {
                    name: /cart/i
                })

                expect(navButton.innerHTML).toEqual('Cart (1)')

            });

            describe('Проверка данных', () => {

                beforeEach(() => {
                    const navButton = screen.getByRole('link', {
                        name: /cart/i
                    })

                    navButton.click()
                })


                it('Проверка количества продукта', () => {
                    const row = screen.getAllByTestId('0')
                    expect(row[0].children[3].innerHTML).toEqual('2')
                });

                it('Проверка Total продукта', () => {
                    const row = screen.getAllByTestId('0')
                    expect(row[0].children[4].innerHTML).toEqual('$1542')
                });

                it('Проверка Order Price', () => {
                    const row = screen.getByRole('row', {
                        name: /order price: \$1542/i
                    });

                    const price = within(row).getByRole('cell', {
                        name: /\$1542/i
                    });

                    expect(price.innerHTML).toEqual('$1542')
                });
            });
        });
    });

})