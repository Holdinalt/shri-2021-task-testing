module.exports = {
    gridUrl: 'http://127.0.0.1:4444/wd/hub',

    sets: {
        desktop: {
            files: './test/hermione/example.hermione.js'
        }
    },

    browsers: {
        chrome: {

            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
    plugins: {
        'html-reporter/hermione': {
            path: 'hermione-html-report'
        }
    }
};