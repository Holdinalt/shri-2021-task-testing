import {Provider} from "react-redux";
import {Application} from "../../src/client/Application";
import {BrowserRouter} from "react-router-dom";
import {CartApi, ExampleApi} from "../../src/client/api";
import {initStore} from "../../src/client/store";
import {it, expect, describe, beforeEach} from "@jest/globals";
import {render} from "@testing-library/react";

describe('', () => {
    it('', () => {
    });
});

describe('Тестирование приложения', () => {

    let containerLocal;

    beforeEach(() => {
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);

        const {container} = render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        )

        containerLocal = container
    })

    // screen.logTestingPlaygroundURL()

    describe('Проверка навигации', () => {
        describe('Проверка перехода по навигации', () => {
            it('Проверка перехода на Catalog', () => {
                expect(4).toBe(4)
            });
        });
    });
})