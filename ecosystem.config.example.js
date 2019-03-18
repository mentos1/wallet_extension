module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // First application
        {
            name: 'wallet_extension',
            script: 'bin/www.js',
            cwd: '/{{pathToProject}}/ico-monitoring',
            env: {
                NODE_ENV: 'production',
                PORT    : '443',

                API_URL: 'https://mainnet.infura.io/{{API_KEY}}',
                //API_URL   : 'https://rinkeby.infura.io/{{API_KEY}}',

                HOST      : 'localhost',
                USER      : 'root',
                PASSWORD  : 'root',
                DATABASE  : 'db',

                //SSL
                KEY  : '/path/to/key.pem',
                CERT  : '/path/to/cert.pem',

                TWITTER_KEY  : '',
                TWITTER_SECRET  : '',

                API_KEY_SPARKPOST   : '8cf4811bac642...'
            },
            exec_mode: "cluster",
            instances: 1,
            log_date_format: "YYYY-MM-DD HH:mm:ss",
            min_uptime: "15s",
            max_restarts: 100,
            max_memory_restart: "400M",
            cron_restart: "0 1 * * *",
        }
    ]
};
