/**
 * 需求：
 * 1. 将多个文件的名称写入到一个文件中
 * 思路：
 * 2. 读取指定文件夹下所有文件，将文件名全部作为内容写入到指定文件中
 * 注意事项：
 * 3. 文件名前十位是序号，记得分割一下
 * 4. 对分组的文件进行重组
 */

const fs = require('fs')
const path = require('path')
const os = require('os')


const saveDir = '../5.split-by-group-tool/save/'
const newSave = './new-save/'
const newFileName = 'test.rar'

if (!fs.existsSync(saveDir)) {
  throw new Error('该目录不存在，请检查后重试');
}

if (!fs.existsSync(newSave)) {
  fs.mkdirSync(newSave)
}

let fw = fs.createWriteStream(newSave + newFileName);

fs.readdir(saveDir, (err, dirs) => {
  if (err) {
    return
  }
  const buffers = []
  for (let dir of dirs) {
    readFileByGroup(dir, buffers)
  }
  const chunk = Buffer.concat(buffers)
  fw.write(chunk, err => {
    console.log('err', err)
  })
})

function readFileByGroup (dir, buffers) {
  let files = fs.readdirSync(saveDir + dir)
  for (let file of files) {
    console.log(file.slice(0, 11))
    file = file.slice(11)
    file = Buffer.from(file, 'hex')
    buffers.push(file)
  }
}




