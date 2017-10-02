var socket = io();

function scrollToBottom () {
   var messages = jQuery('#messages');
   var newMessage = messages.children('li:last-child');

   var clientHeight = messages.prop('clientHeight');
   var scrollTop = messages.prop('scrollTop');
   var scrollHeight = messages.prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();
   var lastMessageHeight = newMessage.prev().innerHeight();

   if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
     messages.scrollTop(scrollHeight);
   }
}

socket.on('connect', function() {
  console.log('Connected to the server');
});

socket.on('disconnect', function() {
  console.log('Disconnect from the server');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

  // console.log('New Message', message);
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_black">My Current Location</a>');

  li.text(`${message.from}`);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#message').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    alert("Your browser doesn't supported geolocation");
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, function() {
      alert('Unable to fetch your location');
    });
  });
});
