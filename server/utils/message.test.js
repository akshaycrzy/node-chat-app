var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from ,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    });
  });
});

// describe('generateLocationMessage', () => {
//   it('should generate current location object', () => {
//     var from = 'Deb';
//     var latitude = 15;
//     var longitude = 53;
//     var url = 'https://www.google.com/maps?q=15,53';
//     var message = generateLocationMessage(from, latitude, longitude);
//
//     expect(message.createdAt).toBeA('number');
//     expect(message).toInclude({
//       from,
//       url
//     });
//   });
// });
