module.exports = {
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
    }
};