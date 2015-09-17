var html = '' +
    '<div class="player-roster">' +
    '   <div class="col-sm-6 col-md-4" id="duplicater">' +
    '       <div class="thumbnail">' +
    '           <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" class="player-card">' +
    '               <div class="caption">' +
    '               <h3 class="name"></h3>' +
    '               <p class="position"></p>' +
    '               <p class="num"></p>' +
    '               <p><a class="btn btn-danger remover" role="button">Remove</a></p>' +
    '           </div>' +
    '       </div>' +
    '   </div>' +
    '</div>';

$('#add-button').on('click', function () {
  var name = $('#name').val().trim();
  var position = $('#position').val().trim();
  var num = $('#num').val().trim();
    if (name === '' || position === '' || num === '') return;
    
    var player = $(html)
        .appendTo($('.players'))
        .hide()
        .fadeIn();
    
    player.find('.name').text(name)
    player.find('.position').text(position)
    player.find('.num').text(num)
    
    $('#name').val('');
    $('#position').val('');
    $('#num').val('');
    
    player.find('.remover').on('click', function () {
        player.fadeOut( function () {
            player.remove();
        });
    });
});