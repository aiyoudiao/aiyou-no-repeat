/**
 * 需求：
 * 1. 将多个文件的名称写入到一个文件中
 * 思路：
 * 2. 读取指定文件夹下所有文件，将文件名全部作为内容写入到指定文件中
 * 注意事项：
 * 3. 文件名前十位是序号，记得分割一下
 */

const fs = require('fs')
const path = require('path')
const os = require('os')


const saveDir = './save2/'
const newSave = './new-save/'
const newFileName = 'graph-'+ Date.now() +'.json'

if (!fs.existsSync(saveDir)) {
  throw new Error('该目录不存在，请检查后重试');
}

if (!fs.existsSync(newSave)) {
  fs.mkdirSync(newSave)
}

let fw = fs.createWriteStream(newSave + newFileName);

fs.readdir(saveDir, (err, files) => {
  if (err) {
    return
  }

  for (let file of files) {
    console.log(file)
    file = file.slice(10)
    file = Buffer.from(file, 'base64').toString("utf-8")
    fw.write(file + os.EOL)
  }
})





