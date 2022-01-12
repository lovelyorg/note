const compressing = require('compressing');
const uuid = require('uuid/v4');
const fs = require('fs')
const fsp = fs.promises;
const path = require('path');
const os = require('os');


const tempDir = uuid().replace(/-/g, '')
const targetPath = 'target/' + tempDir + '/'
console.log('targetPath', targetPath)

test()
async function test() {
    try {
        await fsp.mkdir(targetPath, { recursive: true })
    } catch (e) {
        console.error(e)
    }
    await testCopy()
    await testZip()
}

async function testCopy() {
    // const tempDir = uuid().replace(/-/g, '')
    // console.log(tempDir)
    // console.log(os.tmpdir())
    // try {
    //     var tempFolder = await fsp.mkdtemp(path.join(os.tmpdir(), 'foooo-'))
    //     console.log(tempFolder)
    // } catch (e) {
    //     console.error(e)
    // }

    try {
        console.time('copy')
        await fsp.copyFile('test-files/test-copy.txt', targetPath + 'test-copy.copy.txt')
        await copyDir('test-files/test-copy', targetPath + 'test-copy')
        console.timeEnd('copy')
    } catch (e) {
        console.error(e)
        console.error('The file could not be copied')
    }
}

async function testZip() {
    try {
        console.time('zip')
        await compressing.zip.compressDir('test-files/test-zip.txt', targetPath + 'test-zip.txt.zip')
        await compressing.zip.compressDir('test-files/test-zip', targetPath + 'test-zip.zip')
        console.timeEnd('zip')
    } catch (e) {
        console.error(e)
        console.error('zip falure')
    }
}

async function copyDir(src, dest) {
    const entries = await fsp.readdir(src, { withFileTypes: true });
    await fsp.mkdir(dest);
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fsp.copyFile(srcPath, destPath);
        }
    }
}