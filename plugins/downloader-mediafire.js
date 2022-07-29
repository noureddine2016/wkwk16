const { mediafireDl } = require('../lib/mediafire.js')
let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
if (!text) return m.reply(`Kirim perintah ${usedPrefix + command} *link mediafire*`)
if (!args[0].includes('mediafire.com')) return m.reply(error.linkmf)
let mdjon = args.join(' ')
res = await mediafireDl(mdjon)
result = `「 *MEDIAFIRE DOWNLOAD* 」
*Data Berhasil Didapatkan!*
🆔 اسم الملف : ${res[0].nama}
📊 حجمه : ${res[0].size}
💬 رابطه : ${res[0].link}
_المرجو الانتظار قليلا تأكذ ان الملف الذي طلبته لا يتجاوز 100 mb  لان البوت غير قادر على تحميله ملف كبير اي استفسار راسل صاحب البوت_`
m.reply(result)
//await sleep(100)
conn.sendFile(m.chat, res[0].link, res[0].nama, null, m, false, {asDocument:true, mimetype:res[0].mime})
}
handler.command = ['mediafire']

module.exports = handler
