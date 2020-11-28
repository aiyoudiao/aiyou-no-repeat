/* 读取一个压缩包，将压缩包转换成二进制后，然后转成buffer，最后转成base64码，之后切割base64码，最终转成n个文件。 */

const fs = require('fs');

const fileName = './学习笔记.zip'
const saveDir = './save/'
const saveFileName = saveDir + 'log.txt'


if (!fs.existsSync(fileName)) {
  throw new Error('主文件不存在，请检查后重试');
}

if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir)
}

let fr = fs.createReadStream(fileName);

let index = 0;
let buffers = []
fr.on('data', chunk => {

  buffers.push(chunk)

})

fr.on('end', () => {
  fr.close();

  buffers = Buffer.concat(buffers)
  const region = 255 - 10 - 1 /* 猜测它是255 */
  const str = buffers.toString("hex")

  for (let i = 0; i < str.length; i += region) {
    const temp = str.slice(i, i + region)
    index++;
    const tempFilePrexfix = index.toString().padStart(10, 0) + '-'
    const newSplitFileName = temp
    try {
      repeateWrite(saveDir + tempFilePrexfix + newSplitFileName)
    } catch (error) {
      console.error(error)
    }

    console.log('当前正在写入第' + index + '个文件')
  }
  console.log('end, all count', index)
})

function repeateWrite(pathName) {
  try {
    fs.writeFileSync(pathName, "")
  } catch (error) {
    console.log(error)
  }
}
