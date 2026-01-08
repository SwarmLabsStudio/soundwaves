// ===========================
// AUDIO CONTEXT & 40Hz GENERATION
// ===========================
class GammaAudioEngine {
    constructor() {
        this.audioContext = null;
        this.oscillator = null;
        this.gainNode = null;
        this.isPlaying = false;
        this.frequency = 40; // 40Hz gamma frequency
    }

    initialize() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.gainNode = this.audioContext.createGain();
            this.gainNode.connect(this.audioContext.destination);
            this.gainNode.gain.value = 0.7; // Default volume
        }
    }

    start() {
        this.initialize();

        if (!this.oscillator) {
            // Create oscillator for 40Hz tone
            this.oscillator = this.audioContext.createOscillator();
            this.oscillator.type = 'sine'; // Smooth sine wave
            this.oscillator.frequency.setValueAtTime(this.frequency, this.audioContext.currentTime);

            // Connect to gain node
            this.oscillator.connect(this.gainNode);

            // Start the oscillator
            this.oscillator.start();
            this.isPlaying = true;
        }
    }

    stop() {
        if (this.oscillator) {
            this.oscillator.stop();
            this.oscillator.disconnect();
            this.oscillator = null;
            this.isPlaying = false;
        }
    }

    setVolume(value) {
        if (this.gainNode) {
            // Smooth volume transition
            this.gainNode.gain.setValueAtTime(value, this.audioContext.currentTime);
        }
    }

    pause() {
        if (this.audioContext && this.isPlaying) {
            this.audioContext.suspend();
        }
    }

    resume() {
        if (this.audioContext && !this.isPlaying) {
            this.audioContext.resume();
        }
    }
}

// ===========================
// VISUAL CANVAS ANIMATION
// ===========================
class VisualEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.waves = [];
        this.animationId = null;
        this.isAnimating = false;

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.initParticles();
        this.initWaves();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
        this.particles = [];

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    initWaves() {
        this.waves = [
            { amplitude: 30, frequency: 0.01, speed: 0.01, offset: 0, color: 'rgba(102, 126, 234, 0.3)' },
            { amplitude: 40, frequency: 0.015, speed: 0.0075, offset: 100, color: 'rgba(240, 147, 251, 0.2)' },
            { amplitude: 25, frequency: 0.02, speed: 0.0125, offset: 200, color: 'rgba(79, 172, 254, 0.25)' }
        ];
    }

    drawParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(168, 237, 234, ${particle.opacity})`;
            this.ctx.fill();

            // Add glow effect
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 3
            );
            gradient.addColorStop(0, `rgba(168, 237, 234, ${particle.opacity * 0.5})`);
            gradient.addColorStop(1, 'rgba(168, 237, 234, 0)');
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });
    }

    drawWaves(time) {
        const centerY = this.canvas.height / 2;

        this.waves.forEach(wave => {
            this.ctx.beginPath();
            this.ctx.moveTo(0, centerY);

            for (let x = 0; x < this.canvas.width; x++) {
                const y = centerY +
                    Math.sin((x * wave.frequency) + (time * wave.speed) + wave.offset) * wave.amplitude;
                this.ctx.lineTo(x, y);
            }

            this.ctx.strokeStyle = wave.color;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
    }

    drawGradientOrbs(time) {
        const orbs = [
            { x: 0.2, y: 0.3, size: 300, color1: 'rgba(102, 126, 234, 0.15)', color2: 'rgba(102, 126, 234, 0)' },
            { x: 0.8, y: 0.7, size: 400, color1: 'rgba(240, 147, 251, 0.12)', color2: 'rgba(240, 147, 251, 0)' },
            { x: 0.5, y: 0.5, size: 350, color1: 'rgba(79, 172, 254, 0.1)', color2: 'rgba(79, 172, 254, 0)' }
        ];

        orbs.forEach((orb, index) => {
            const offsetX = Math.sin(time * 0.001 + index) * 50;
            const offsetY = Math.cos(time * 0.001 + index) * 50;
            const x = this.canvas.width * orb.x + offsetX;
            const y = this.canvas.height * orb.y + offsetY;

            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, orb.size);
            gradient.addColorStop(0, orb.color1);
            gradient.addColorStop(1, orb.color2);

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        });
    }

    animate(time = 0) {
        if (!this.isAnimating) return;

        // Clear canvas with slight trail effect
        this.ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw visual elements
        this.drawGradientOrbs(time);
        this.drawWaves(time);
        this.drawParticles();

        this.animationId = requestAnimationFrame((t) => this.animate(t));
    }

    start() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }

    stop() {
        this.isAnimating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        // Clear canvas
        this.ctx.fillStyle = 'rgba(10, 14, 39, 1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// ===========================
// TIMER CONTROLLER
// ===========================
class TimerController {
    constructor() {
        this.totalSeconds = 0;
        this.remainingSeconds = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.intervalId = null;
        this.onTick = null;
        this.onComplete = null;
    }

    start(minutes) {
        this.totalSeconds = minutes * 60;
        this.remainingSeconds = this.totalSeconds;
        this.isRunning = true;
        this.isPaused = false;

        this.intervalId = setInterval(() => {
            if (!this.isPaused && this.remainingSeconds > 0) {
                this.remainingSeconds--;

                if (this.onTick) {
                    this.onTick(this.remainingSeconds);
                }

                if (this.remainingSeconds === 0) {
                    this.complete();
                }
            }
        }, 1000);
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    stop() {
        this.isRunning = false;
        this.isPaused = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.remainingSeconds = 0;
    }

    complete() {
        this.stop();
        if (this.onComplete) {
            this.onComplete();
        }
    }

    getFormattedTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

// ===========================
// APPLICATION CONTROLLER
// ===========================
class GammaTherapyApp {
    constructor() {
        // Initialize engines
        this.audioEngine = new GammaAudioEngine();
        this.visualEngine = new VisualEngine(document.getElementById('visualCanvas'));
        this.timer = new TimerController();

        // DOM elements
        this.elements = {
            timeDisplay: document.getElementById('timeDisplay'),
            sessionInfo: document.getElementById('sessionInfo'),
            durationSelector: document.getElementById('durationSelector'),
            controls: document.getElementById('controls'),
            playPauseBtn: document.getElementById('playPauseBtn'),
            stopBtn: document.getElementById('stopBtn'),
            volumeSlider: document.getElementById('volumeSlider'),
            volumeValue: document.getElementById('volumeValue'),
            customBtn: document.getElementById('customBtn'),
            customInputContainer: document.getElementById('customInputContainer'),
            customMinutes: document.getElementById('customMinutes'),
            startCustomBtn: document.getElementById('startCustomBtn'),
            infoToggle: document.getElementById('infoToggle'),
            infoContent: document.getElementById('infoContent'),
            playIcon: document.querySelector('.play-icon'),
            pauseIcon: document.querySelector('.pause-icon')
        };

        this.isPlaying = false;
        this.selectedDuration = 0;

        this.initEventListeners();
        this.setupTimer();

        // Start ambient visuals immediately
        this.visualEngine.start();
    }

    initEventListeners() {
        // Duration buttons
        document.querySelectorAll('.duration-btn:not(.custom-btn)').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const minutes = parseInt(e.target.dataset.minutes);
                this.startSession(minutes);
            });
        });

        // Custom duration
        this.elements.customBtn.addEventListener('click', () => {
            this.elements.customInputContainer.classList.toggle('active');
        });

        this.elements.startCustomBtn.addEventListener('click', () => {
            const minutes = parseInt(this.elements.customMinutes.value);
            if (minutes >= 1 && minutes <= 60) {
                this.startSession(minutes);
                this.elements.customInputContainer.classList.remove('active');
                this.elements.customMinutes.value = '';
            } else {
                alert('Please enter a duration between 1 and 60 minutes.');
            }
        });

        // Play/Pause button
        this.elements.playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });

        // Stop button
        this.elements.stopBtn.addEventListener('click', () => {
            this.stopSession();
        });

        // Volume control
        this.elements.volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            this.audioEngine.setVolume(volume);
            this.elements.volumeValue.textContent = `${e.target.value}%`;
        });

        // Info toggle
        this.elements.infoToggle.addEventListener('click', () => {
            this.elements.infoContent.classList.toggle('hidden');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.timer.isRunning) {
                e.preventDefault();
                this.togglePlayPause();
            } else if (e.code === 'Escape' && this.timer.isRunning) {
                this.stopSession();
            }
        });
    }

    setupTimer() {
        this.timer.onTick = (remainingSeconds) => {
            this.elements.timeDisplay.textContent = this.timer.getFormattedTime();
        };

        this.timer.onComplete = () => {
            this.sessionComplete();
        };
    }

    startSession(minutes) {
        this.selectedDuration = minutes;

        // Hide duration selector, show controls
        this.elements.durationSelector.style.display = 'none';
        this.elements.controls.style.display = 'flex';

        // Update session info
        this.elements.sessionInfo.textContent = `${minutes} minute session`;

        // Start timer
        this.timer.start(minutes);

        // Start audio and visuals
        this.audioEngine.start();
        this.isPlaying = true;
        this.updatePlayPauseButton();
    }

    togglePlayPause() {
        if (this.isPlaying) {
            // Pause
            this.timer.pause();
            this.audioEngine.pause();
            this.isPlaying = false;
            this.elements.sessionInfo.textContent = 'Paused';
        } else {
            // Resume
            this.timer.resume();
            this.audioEngine.resume();
            this.isPlaying = true;
            this.elements.sessionInfo.textContent = `${this.selectedDuration} minute session`;
        }
        this.updatePlayPauseButton();
    }

    stopSession() {
        // Stop everything
        this.timer.stop();
        this.audioEngine.stop();
        this.isPlaying = false;

        // Reset UI
        this.elements.timeDisplay.textContent = '00:00';
        this.elements.sessionInfo.textContent = 'Select duration to begin';
        this.elements.durationSelector.style.display = 'block';
        this.elements.controls.style.display = 'none';
        this.updatePlayPauseButton();
    }

    sessionComplete() {
        this.audioEngine.stop();
        this.isPlaying = false;

        // Show completion message
        this.elements.sessionInfo.textContent = 'Session complete! 🎉';
        this.elements.timeDisplay.textContent = '00:00';

        // Reset after a delay
        setTimeout(() => {
            this.stopSession();
        }, 3000);
    }

    updatePlayPauseButton() {
        if (this.isPlaying) {
            this.elements.playIcon.classList.add('hidden');
            this.elements.pauseIcon.classList.remove('hidden');
        } else {
            this.elements.playIcon.classList.remove('hidden');
            this.elements.pauseIcon.classList.add('hidden');
        }
    }
}

// ===========================
// INITIALIZE APP
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const app = new GammaTherapyApp();

    // Prevent accidental page closure during session
    window.addEventListener('beforeunload', (e) => {
        if (app.timer.isRunning) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
});
