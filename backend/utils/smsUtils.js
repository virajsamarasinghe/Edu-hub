const twilio = require('twilio');
const twilioClient = twilio('AC5297706d46c2e5c8954a19199e839d3d', '22bcb7f64e17ba86534049b38335b93f');

const sendSmsReceipt = (phone, message) => {
    twilioClient.messages
        .create({
            body: message,
            from: '+94703906478', 
            to: phone
        })
        .then(message => console.log('SMS sent:', message.sid))
        .catch(error => console.error('Error sending SMS:', error));
};

module.exports = {
    sendSmsReceipt,
  };