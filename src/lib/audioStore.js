// experimental solution
// src/lib/audioStore.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
// Assuming Howl is globally available or imported in a way that works in SvelteKit
// If Howl is not imported here, you will need to ensure it's loaded before use.
// For this example, let's assume you've loaded Howler via a <script> tag in app.html
// OR you would use a dynamic import for Howler here: import('howler').then(...)

// --- PERSISTENT STATE ---
// 1 = OFF (STFU), 0 = ON (Play)
export const stfuState = writable(1);
export const stfuButtonSrc = writable(''); // Store the dynamic image source

// --- PERSISTENT MUSIC VARIABLES ---
export const playedSongs = [];
export let currentSongIndex = -1;
export let jukebox = null;

// The songs array is data, but it needs to be defined here to be globally accessible
export const songs = [
  // ... Paste your full songs array here ...
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
  { src: ['/indexsite-new/audio/sfx/Tom%20Screaming%20Sound%20Effect%20(From%20Tom%20and%20Jerry)%20(128%20kbps).mp3'] },
  { src: ['/indexsite-new/audio/music/Electro%20World.mp3'] }
];

// --- MUSIC FUNCTIONS (Moved here) ---
function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}
function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function playNextRandomSong() {
  if (!browser) return; // Only run on client

  let $stfuState;
  stfuState.subscribe(value => {console.log(value); $stfuState = value})(); // Get current state

  // redundant and causes problems if ($stfuState === 1) return;

  if (playedSongs.length === songs.length) {
    playedSongs = [];
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

  await sleep(randint(1, 30));
  
  // You MUST have Howl defined/imported here for this to work
  // If you can't import it, ensure it's globally available when this runs
  jukebox = new Howl({
    src: newSongSrc,
    autoplay: true,
    onend: playNextRandomSong, /*redundant:function() {
    if (value === 0) playNextRandomSong();
  },*/
  });

  jukebox.once('loaderror', (id, err) => {
    console.error("Load error:", err);
    stfuState.subscribe(value => {
        /* redundant if (value === 0)*/playNextRandomSong();
    })();
  });
}


export function toggleStfu(basePath){
    if (!browser) return;

    stfuState.update(state => {
        const newState = state === 0 ? 1 : 0; // Toggle 0 <-> 1

        if (newState === 1){ // Transitioning to OFF (STFU)
            stfuButtonSrc.set(`${basePath}/images/yestfu.png`);
            if (jukebox) {
                jukebox.stop();
                jukebox.unload();
                jukebox = null;
            }
        } else { // Transitioning to ON (Play)
            stfuButtonSrc.set(`${basePath}/images/nostfu.png`);
            playNextRandomSong();
        }
        return newState;
    });
}

// Initial image path setting (needs the base path to be set later)
// stfuState.subscribe(state => {
//     // This ensures the image source store reflects the state
//     // We can't use 'base' here, so we will handle the image path in onMount
// });
