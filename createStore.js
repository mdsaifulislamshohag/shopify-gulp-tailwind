const { spawn, execSync } = require('child_process');
require("dotenv").config()
const password = process.env.PASSWORD;
const storeUrl = process.env.STORE_URL;

const exec = commands => {
    execSync(commands, { stdio: 'inherit', shell: true });
};
const spawnProcess = commands => {
    spawn(commands, { stdio: 'inherit', shell: true });
};
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter store name: ', name => {
    console.log(`Creating brand new store: ${name}`);
    exec(`theme new --password=${password} --store=${storeUrl} --name=${name}`);
    rl.close();
});
