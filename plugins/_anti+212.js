let handler = m => m

handler.before = async function (m) {
   if (m.sender.startsWith('62' || '62')) {
   	global.db.data.users[m.sender].banned = true
   }
   
   if (m.sender.startsWith('265' || '265')) {
   	global.db.data.users[m.sender].banned = true
   } 
    }

module.exports = handler
