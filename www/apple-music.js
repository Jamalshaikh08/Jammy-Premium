
const JAMENDO_CLIENT_ID = "0ca64b30";

async function searchFullSongs(query) {
    try {
        const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=20&search=${encodeURIComponent(query)}&audioformat=mp32`;

        const response = await fetch(url);
        const data = await response.json();

        return data.results || [];
    } catch (error) {
        console.error("Search error:", error);
        return [];
    }
}

async function playFullSong(audioUrl) {
    const player = document.getElementById("audioPlayer");
    player.src = audioUrl;
    await player.play();
}

function pauseMusic() {
    document.getElementById("audioPlayer").pause();
}
