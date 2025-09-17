// DIETER RAMS BRUTALIST MEDIA PLAYER WITH PLAYLIST
class AudioController {
    constructor() {
        this.audio = document.getElementById('backgroundMusic');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.muteBtn = document.getElementById('muteBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.playIcon = document.getElementById('playIcon');
        this.muteIcon = document.getElementById('muteIcon');
        this.record = document.getElementById('record');
        this.trackArtist = document.getElementById('trackArtist');
        this.trackTitle = document.getElementById('trackTitle');
        this.trackNumber = document.getElementById('trackNumber');
        this.currentTimeEl = document.getElementById('currentTime');
        this.totalTimeEl = document.getElementById('totalTime');
        this.progressFill = document.getElementById('progressFill');
        this.progressHandle = document.getElementById('progressHandle');
        this.progressBar = document.querySelector('.progress-bar');
        this.isPlaying = false;
        this.isMuted = false;
        this.currentTrack = 0;
        
        // PLAYLIST - Add your songs here
        this.playlist = [
            {
                src: 'music.mp3',
                title: 'DIES IRAE',
                artist: 'GREGORIAN CHANT',
                number: '01'
            },
            {
                src: 'music2.mp3', // Add your second song file
                title: 'Media Vita in Morte Sumus',
                artist: 'GREGORIAN CHANT',
                number: '02'
            }
            // Add more songs as needed
        ];
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.muteBtn.addEventListener('click', () => this.toggleMute());
        this.prevBtn.addEventListener('click', () => this.previousTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        this.progressBar.addEventListener('click', (e) => this.seekTo(e));
        
        // Audio event listeners
        this.audio.addEventListener('play', () => this.updatePlayButton());
        this.audio.addEventListener('pause', () => this.updatePlayButton());
        this.audio.addEventListener('volumechange', () => this.updateMuteButton());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateTotalTime());
        this.audio.addEventListener('ended', () => this.nextTrack());
        
        // Set initial volume (low for background music)
        this.audio.volume = 0.3;
        
        // Load first track
        this.loadTrack(this.currentTrack);
        
        // Update button states
        this.updatePlayButton();
        this.updateMuteButton();
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(error => {
                console.log('Autoplay prevented:', error);
            });
        }
    }
    
    toggleMute() {
        if (this.isMuted) {
            this.audio.volume = 0.3;
            this.isMuted = false;
        } else {
            this.audio.volume = 0;
            this.isMuted = true;
        }
        this.updateMuteButton();
    }
    
    updatePlayButton() {
        this.isPlaying = !this.audio.paused;
        
        if (this.isPlaying) {
            this.playIcon.src = 'assets/pause.svg';
            this.playIcon.alt = 'Pause';
            this.record.classList.add('spinning');
            this.trackArtist.classList.add('scrolling');
        } else {
            this.playIcon.src = 'assets/play.svg';
            this.playIcon.alt = 'Play';
            this.record.classList.remove('spinning');
            this.trackArtist.classList.remove('scrolling');
        }
    }
    
    updateMuteButton() {
        if (this.isMuted) {
            this.muteIcon.src = 'assets/mute.svg';
            this.muteIcon.alt = 'Muted';
        } else {
            this.muteIcon.src = 'assets/sound.svg';
            this.muteIcon.alt = 'Sound';
        }
    }
    
    updateProgress() {
        if (this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressFill.style.width = `${progress}%`;
            this.progressHandle.style.left = `${progress}%`;
            this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        }
    }
    
    updateTotalTime() {
        if (this.audio.duration) {
            this.totalTimeEl.textContent = this.formatTime(this.audio.duration);
        }
    }
    
    seekTo(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const newTime = percentage * this.audio.duration;
        this.audio.currentTime = newTime;
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    loadTrack(trackIndex) {
        const track = this.playlist[trackIndex];
        this.audio.src = track.src;
        this.trackTitle.textContent = track.title;
        this.trackArtist.textContent = track.artist;
        this.trackNumber.textContent = track.number;
        
        // Reset progress
        this.progressFill.style.width = '0%';
        this.progressHandle.style.left = '0%';
        this.currentTimeEl.textContent = '0:00';
        this.totalTimeEl.textContent = '0:00';
    }
    
    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) {
            this.audio.play();
        }
    }
    
    previousTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) {
            this.audio.play();
        }
    }
}

// Initialize audio controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AudioController();
});
