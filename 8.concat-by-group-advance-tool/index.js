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


const saveDir = '../7.split-by-group-advance-tool/save/'
const newSave = './new-save/'
const newFileName = 'Photoshop_CC_20.0.0_CHS_201810_X64.exe'

if (!fs.existsSync(saveDir)) {
  throw new Error('该目录不存在，请检查后重试');
}

if (!fs.existsSync(newSave)) {
  fs.mkdirSync(newSave)
}

let startNow = Date.now()
let endNow = null

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

  console.log('耗时：', (endNow - startNow) / 1000, '秒')
})

function readFileByGroup (dir, buffers) {
  let files = fs.readdirSync(saveDir + dir)
  for (let file of files) {
    console.log(file.slice(0, 11))
    file = file.slice(11)
    file = Buffer.from(file, 'hex')
    buffers.push(file)
  }
  endNow = Date.now()
}




