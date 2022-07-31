let fetch = require('node-fetch')
let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn }) => {
  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.profilePictureUrl(who, 'image')
  } catch (e) {

  } finally {
    let { name, premium, level, limit, exp, lastclaim, registered, regTime, age } = global.DATABASE.data.users[m.sender]
    let username = conn.getName(who)
    let str = `

✧── *حسابك الشخصي* ──✧
📇 • *اسمك :* ${username} ${registered ? '(' + name + ') ': ''}
📧 • *طاغ  :* @${who.replace(/@.+/, '')}
📞 • *رفمك  :* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
💻 • *رابطك :* https://wa.me/${who.split`@`[0]}
${registered ? '🎨 • *Age:* ' + age : ''}

`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, await(await require('node-fetch')(pp)).buffer(), pp.jpg, str, m, false, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['profile  معلومات عنك']
handler.tags = ['tools']
handler.command = /^profile|pp$/i
module.exports = handler
