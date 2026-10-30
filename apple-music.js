let appleMusic;

const APPLE_DEVELOPER_TOKEN = "PASTE_YOUR_DEVELOPER_TOKEN";

async function initializeAppleMusic() {
    try {
        await MusicKit.configure({
            developerToken: APPLE_DEVELOPER_TOKEN,
            app: {
                name: "MUSIC WITH JAMMY",
                build: "1.0.0"
            }
        });

        appleMusic = MusicKit.getInstance();

        console.log("Apple Music connected!");
    } catch (error) {
        console.error("MusicKit error:", error);
    }
}

async function connectAppleMusic() {
    try {
        if (!appleMusic) {
            alert("Music service is loading.");
            return;
        }

        await appleMusic.authorize();
        alert("Apple Music connected!");
    } catch (error) {
        alert("Apple Music login failed.");
    }
}

async function searchFullSongs(query) {
    try {
        const result = await appleMusic.api.search(
            query,
            { types: "songs", limit: 20 }
        );

        return result.songs.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function playFullSong(songId) {
    try {
        await appleMusic.setQueue({
            song: songId
        });

        await appleMusic.play();

    } catch (error) {
        console.error("Playback error:", error);
    }
}

function pauseMusic() {
    appleMusic.pause();
}

function resumeMusic() {
    appleMusic.play();
}

document.addEventListener("musickitloaded", initializeAppleMusic);
