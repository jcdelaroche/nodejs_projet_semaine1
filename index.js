#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs');

const argv = yargs
    .command('$0 [path]', 'List files in directory', (yargs) => {
        yargs.positional('path', {
            describe: 'Path to directory',
            default: process.cwd(),
        });
    })
    .help()
    .argv;

const listDirectory = async (path = process.cwd()) => {
    try{
        const list = fs.readdirSync(path);
        list.forEach((file) => {
            const stat = fs.statSync(`${path}/${file}`);
            if (stat.isDirectory()) {
                console.log(`${file}/`);
            } else {
                console.log(file);
            }
        });
    } catch (err) {
        console.error(err);
    }
}

listDirectory(argv.path);