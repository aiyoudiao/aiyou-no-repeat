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


const saveDir = '../3.split-advance-tool/save/'
const newSave = './new-save/'
const newFileName = '学习笔记-'+ Date.now() +'.zip'

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
  const buffers = []
  for (let file of files) {
    console.log(file.slice(0, 11))
    file = file.slice(11)
    file = Buffer.from(file, 'hex')
    buffers.push(file)
  }
  const chunk = Buffer.concat(buffers)
  fw.write(chunk, err => {
    console.log('err', err)
  })
})





