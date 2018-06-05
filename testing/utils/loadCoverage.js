const http = require('http');

module.exports = async function loadCoverage(browser, host = 'localhost', port = 8081) {
    try {
        const coverageObject = await browser.execute(() => window.__coverage__);
        const coverage = JSON.stringify(coverageObject);
        console.log(`\nLogging coverage of length ${coverage.length}.`);

        const options = {
            port,
            host,
            path: '/coverage/client',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const request = http.request(options, response => {
            let data = '';
            response.on('data', d => {
                data += d;
            });

            response.once('end', () => {
                console.log('Done sending coverage.\n');
            });
        });

        request.write(coverage);
        request.end();
    } catch (err) {
        console.error(err);
    }
};
