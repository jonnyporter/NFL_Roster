var html = '' +
    '<div class="player-roster">' +
    '   <div class="col-sm-6 col-md-4" id="duplicater">' +
    '       <div class="thumbnail">' +
    '           <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" style="height: 200px; width: 200px;" class="player-card">' +
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
        player.fadeOut(function () {
            player.remove();
        });
    });
});


// matt's stuff vvv
var url = "http://bcw-getter.herokuapp.com/?url=";
var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
var apiUrl = url + encodeURIComponent(url2);

var players = [];
var positions = {};

$.getJSON(apiUrl, function (data) {
    var names = [];
    players = data.body.players;

    players.forEach(function (player) {
        names.push(player.fullname);
        positions[player.position] = player.position;
    });
        $('#name').autocomplete ({
        source: names
    });

    console.log(positions);
});

$('#or-button').on('click', function () {

    var playerName = $('#name').val().trim();

    players.forEach(function (player) {
        if (player.fullname.indexOf(playerName) !== -1) {
            var playerhtml = $(html)
                .appendTo($('.players'))
                .hide()
                .fadeIn();
            playerhtml.find('.name').text(player.fullname)
            playerhtml.find('.position').text(player.position)
            playerhtml.find('.num').text('#' + player.jersey)
            playerhtml.find('.player-card').attr('src', player.photo)
            $('#name').val('');
            $('#position').val('');
            $('#num').val('');

            console.log(player);
            playerhtml.find('.remover').on('click', function () {
                playerhtml.fadeOut(function () {
                    playerhtml.remove();
                });
                return;
            });

        }

    });

});
