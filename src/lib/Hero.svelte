<script>
export let title = "Gareth Tacos Site.org";
export let sub = "Main site of all the nonsensical stuffs I has.";

import {base} from "$app/paths";
import { onMount } from 'svelte';
// Import the persistent state and function from your new store file
import { stfuState, stfuButtonSrc, toggleStfu } from "$lib/audioStore.js";


// No need for these local variables anymore:
// const stfustate = writable(1); 
// let stfuButton;
// let playedSongs = [];
// let currentSongIndex = -1;
// let jukebox = null;
// ... all music functions ...

// onMount now handles the initial image source based on the stored state
onMount(() => {
    // Check the persistent state and set the image path in the persistent store
    // This is run after the component mounts and ensures the image is correct.
    stfuState.subscribe(value => {
        const imagePath = value === 1 ? `${base}/images/yestfu.png` : `${base}/images/nostfu.png`;
        stfuButtonSrc.set(imagePath);
    })();
});

</script>

<div id="header" style="text-align: center;"width="100%">

    <br/>
    <h1 style="background-color: white; font-size: clamp(2rem, 6vw + 1rem, 5rem); opacity: .75;">{title}</h1>
    <h2 style="background-color: white; font-size: clamp(1.5rem, 4vw + 1rem, 3rem); opacity: .75;">{sub}</h2>
    </div>

<div id="stfu-button-cont">
    <img
        width="32px"
        height="32px"
        id="stfu-button"
        on:click={() => toggleStfu(base)}
        src="{$stfuButtonSrc}" 
        alt="Toggle site music"
    />
</div>
