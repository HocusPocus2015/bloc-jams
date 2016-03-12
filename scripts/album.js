var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/assets/images/album_covers/01.png',
  songs: [
    { name: 'Blue', length: '4:26' },
    { name: 'Green', length: '3:14' },
    { name: 'Red', length: '5:01' },
    { name: 'Pink', length: '3:21'},
    { name: 'Magenta', length: '2:15'}
  ]
};

var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [
    { name: 'Hello, Operator?', length: '1:01' },
    { name: 'Ring, ring, ring', length: '5:01' },
    { name: 'Fits in your pocket', length: '3:21'},
    { name: 'Can you hear me now?', length: '3:14' },
    { name: 'Wrong phone number', length: '2:15'}
  ]
 };

var createSongRow = function(songNumber, songName, songLength){
  var template =
    '<tr class="album-view-song-item">' +
    '  <td class="song-item-number" data-song-number="' +songNumber + '">' + songNumber + '</td>' +
    '  <td class="song-item-title">' + songName + '</td>' + 
    '  <td class="song-item-duration">' + songLength + '</td>' + 
    '</tr>'
  ;
  var $row = $(template);
  
  //used to curriculum to confirm, for pause selection
  var clickHandler = function() {
    var songNumber = $(this).attr('data-song-number');
    if (currentlyPlayingSong !== null) {
      var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
      currentlyPlayingCell.html(currentlyPlayingSong);
    }
    if (currentlyPlayingSong !== songNumber) {
      $(this).html(pauseButtonTemplate);
      currentlyPlayingSong = songNumber;
    }
    else if (currentlyPlayingSong === songNumber) {
      $(this).html(playButtonTemplate);
      currentlyPlayingSong = null;
    }
  };
  
  var onHover = function(event) {
    var songItem = $(this).find('.song-item-number');
    var songItemNumber = songItem.attr('data-song-number');
    if (songItemNumber !== currentlyPlayingSong) {
      songItem.html(playButtonTemplate);
    }
  };
    
  var offHover = function(event) {
    var songItem = $(this).find('.song-item-number');
    var songItemNumber = songItem.attr('data-song-number');
    if (songItemNumber !== currentlyPlayingSong) {
        songItem.html(songItemNumber);
    }
  };

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

function setCurrentAlbum (album) {
  var $albumTitle = $('.album-view-title'),
      $albumArtist = $('.album-view-artist'),
      $albumReleaseInfo = $('.album-view-release-info'),
      $albumImage = $('.album-cover-art'),
      $albumSongList = $('.album-view-song-list');
  $albumTitle.text(album.tite);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);
  $albumSongList.empty();
  
  for (var i=0; i< album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    $albumSongList.append($newRow);
  }
}

var currentlyPlayingSong = null;

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';


$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
});