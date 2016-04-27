var akonectSocket = io('http://api.akonect.com:3010');

akonectSocket.emit('join_uid', {
  uid : 'uid_response_from_login',
  token : 'token_from_login',
  device : 'web'
});


// akonectSocket.emit('send_msg', {
//   msg_type : 'CHAT',
//   txt : 'sample text',
//   to_uid : 'aktprototype'
// });

akonectSocket.on('rcv_doc', addNewMsg(data));
