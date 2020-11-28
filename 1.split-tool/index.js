/**
 * 需求：
 *      1. 将某个文本文件的内容，分成无数段，每一段都将作为一个文件名称，每个文件都会添加一个索引
 * 思路：
 *      1. 读取某个文本文件的内容，转成二进制流，将二进制流作为无数个文件的文件名
 * 注意事项：
 *      1. 文件前十位是序号噢。
 */

const fs = require('fs');
const readLine = require('readline');
const os = require('os');
const path = require('path');

const fileName = './dirtyData2.js'
const saveDir = './save/'
const saveFileName = saveDir + 'log.js'


if (!fs.existsSync(fileName)) {
  throw new Error('主文件不存在，请检查后重试');
}

if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir)
}

let fr = fs.createReadStream(fileName);
let fw = fs.createWriteStream(saveFileName);

const fileReadLine = readLine.createInterface({
  input: fr,
  output: fw
});

let index = 0;
fileReadLine.on('line', function (line) {

  const region = 255 - 10 /* 猜测它是255 */

  /* 字符串长度大于可取的文件名长度，那么就会进行多端分割，使用特殊符号进行标记 */
  if (line.length > region) {
    fw.write('发现内容超过文件名可取最大长度：' + os.EOL + line + os.EOL)
    for (let i = 0; i < line.length; i+= region) {
      const temp = line.slice(i, i + region)
      index++;
      const tempFilePrexfix = index.toString().padStart(10, 0)
      const newSplitFileName = Buffer.from(temp, "utf-8").toString("base64")
      fs.writeFile(saveDir + tempFilePrexfix + newSplitFileName, "", () => { })
      console.log('当前正在写入第' + index + '个文件')
    }
  } else {
    index++
    const filePrefix = index.toString().padStart(10, 0)
    const coolFileName = Buffer.from(line, 'utf-8').toString("base64")
    fs.writeFile(saveDir + filePrefix + coolFileName, "", () => { })
    console.log('当前正在写入第' + index + '个文件')
  }

})

fileReadLine.on('close', function () {
  fr.close()
  fw.close()
})
