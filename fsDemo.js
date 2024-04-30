import fs from 'fs/promises';

const readFile = async () => {
    try {
        const data = await fs.readFile('./file.txt', 'utf8');
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

const writeFile = async () => {
    try {
        await fs.writeFile('./file.txt', 'This is written sample text.');
        console.log('writing done.');
    } catch (error) {
        console.error(error);
    }
}
const appendFile = async () => {
    try {
        await fs.appendFile('./file.txt', '\nMore sample text here.');
        console.log('append file done.');
    } catch (error) {
        console.error(error);
    }
}

writeFile();
appendFile();
readFile();