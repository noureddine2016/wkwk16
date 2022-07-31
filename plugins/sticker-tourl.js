const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'هذا الامر خاص لرفع صورة او فيديو لموقع *telegra.ph*'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  m.reply(`${link}
${media.length} Byte(s)
${isTele ? '(تم رفع الملف بنجاج وهذا رابطه ♥ )' : '(Tidak diketahui)'}`)
}
handler.help = ['tourl  Telegra ph Upload']
handler.tags = ['tools']
handler.command = /^(upload|tourl)$/i

module.exports = handler
