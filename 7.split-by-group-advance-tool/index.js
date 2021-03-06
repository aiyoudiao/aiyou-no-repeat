﻿/**
 * 读取一个压缩包，将压缩包转换成二进制后，然后转成buffer，最后转成base64码，之后切割base64码，最终转成n个文件。
 * 2020-01-07 02:23 每2000个文件进行一次分组
 */

const fs = require('fs');

const fileName = './test.rar'
const saveDir = './save/'
const saveFileName = saveDir + 'log.txt'


if (!fs.existsSync(fileName.trim())) {
  console.log('fileName', fileName)
  throw new Error('主文件不存在，请检查后重试');
}

if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir)
}

let fr = fs.createReadStream(fileName);

let index = 0;
let buffers = []
let startNow = Date.now()
let endNow = null
let dirName = ''
fr.on('data', chunk => {
  const str = Buffer.concat([chunk]).toString("hex")
  dirName = everyWrite(dirName , str)
  console.log('已写入' + index + '个文件，当前分组为：' + dirName)
})

fr.on('end', () => {
  fr.close();
  endNow = Date.now()
  console.log('end, all count', index, '耗时：', (endNow - startNow) / 1000, '秒')
})

let i = 0;
function getGroupToDir () {
  i ++;
  const subDir = 'dir'+ i.toString().padStart(10, 0) + '-dir/'

  if (!fs.existsSync(saveDir + subDir)) {
    fs.mkdirSync(saveDir + subDir)
  }

  return subDir
}

function repeateWrite(pathName) {
  try {
    fs.writeFileSync(pathName, "")
  } catch (error) {
    console.log(error)
  }
}

function everyWrite (subDir, content ) {
  const region = 255 - 10 - 1 /* 猜测它是255 */
  for (let i = 0; i < content.length; i += region) {
    const temp = content.slice(i, i + region)
    index++;
    const tempFilePrexfix = index.toString().padStart(10, 0) + '-'
    const newSplitFileName = temp
    
    try {
      if (index % 2000 === 1) {
        subDir = getGroupToDir()
      }
      repeateWrite(saveDir + subDir + tempFilePrexfix + newSplitFileName)
    } catch (error) {
      console.error(error)
    }
  }
  return subDir 
}
