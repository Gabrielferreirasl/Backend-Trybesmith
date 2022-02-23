const formatMessage = (message: string) => {
  let newMsg = '';
  for (let index = 0; index < message.length; index += 1) {
    if (message[index] !== '"' && message[index] !== '\'') newMsg += message[index];
  }
  
  newMsg = newMsg.replace(newMsg[0], newMsg[0].toUpperCase());
    
  return newMsg;
};

export default formatMessage;