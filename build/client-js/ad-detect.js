function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const songs = [
  { src: ['/indexsite-new/audio/music/Wii%20Shop%20Bossa%20Nova%20Cover%20(128%20kbps).mp3'] },
  { src: ['/indexsite-new/audio/music/Roblox%203008%20OST%20-%20Friday%20Theme%20(128%20kbps).mp3'] },
  { src: ['/indexsite-new/audio/music/DSi%20Shop%20Cover%20(128%20kbps).mp3'] },
  { src: ['/indexsite-new/audio/music/ROBLOX%20Music%20-%20Horror%20(128%20kbps).mp3'] },
  { src: ['/indexsite-new/audio/music/(Free)%20Horror%20Ambiance%20-%20Ominous%20Background%20Music%20(128%20kbps).mp3'] },
  { src: ['/indexsite-new/audio/music/Smash%20Mouth%20-%20All%20Star%20(Audio)%20%5BSWFA0d2vIUk%5D.mp3'] },
  { src: ['/indexsite-new/audio/music/Minecraft%20-%20Tracks%2011%20and%2013...%20TOGETHER%20(128%20kbps).mp3'] },
  { src: ['/indexsite-new/audio/music/NSMBU%20Overworld%20Bossa%20Nova%20Style%20(128%20kbps).mp3'] },
  { src: ['/indexsite-new/audio/music/%E3%80%90%E5%88%9D%E9%9F%B3%E3%83%9F%E3%82%AF%E3%80%91%E4%BA%8C%E6%AC%A1%E5%85%83%E3%83%89%E3%83%AA%E3%83%BC%E3%83%A0%E3%83%95%E3%82%A3%E3%83%BC%E3%83%90%E3%83%BC%E3%80%90%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%8A%E3%83%AB%E3%80%91.mp3'] },
  { src: ['/indexsite-new/audio/sfx/Electricity%20spark%20sound%20effects%20HQ%20(128%20kbps).mp3'] },
  { src: ['/indexsite-new/audio/sfx/Hard%20Drive%20Sound%20Effect%20(128%20kbps).mp3'] },
  { src: ['/indexsite-new/audio/sfx/Metal%20pipe%20falling%20sound%20effect%20but%20it%E2%80%99s%20more%20violent%20(128%20kbps).mp3'] },
  { src: ['/indexsite-new/audio/sfx/Tom%20Screaming%20Sound%20Effect%20(From%20Tom%20and%20Jerry)%20(128%20kbps).mp3'],
    src: ['/indexsite-new/audio/music/Electro%20World.mp3']}
];

let playedSongs = [];
let currentSongIndex = -1;
let jukebox = null;

async function playNextRandomSong() {
  if (playedSongs.length === songs.length) {
    playedSongs = [];
    //console.log("All songs played. Resetting playlist.");
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * songs.length);
  } while (playedSongs.includes(randomIndex));

  playedSongs.push(randomIndex);
  currentSongIndex = randomIndex;

  const newSongSrc = songs[currentSongIndex].src;

  if (jukebox) {
    jukebox.stop();
    jukebox.unload();
    jukebox = null;
  }

  // Optional pause before switching songs to avoid weirdness
  await sleep(randint(1, 30));

  // Create a brand new Howl instance for the new song
  jukebox = new Howl({
    src: newSongSrc,
    autoplay: true,
    onend: playNextRandomSong,
    // html5: true, // Optional: Enable if needed for longer files or mobile support
  });

  jukebox.once('load', () => {
    //console.log("Now playing:", decodeURIComponent(newSongSrc[0]));
    //console.log("Duration:", jukebox.duration(), "seconds");
  });

  jukebox.once('loaderror', (id, err) => {
    console.error("Load error:", err);
    playNextRandomSong(); // skip to next
  });
}

// Start the first song
playNextRandomSong();

