class BreathingController {
    constructor() {
        this.modal = document.getElementById('breathingModal');
        this.closeBtn = document.getElementById('breathingClose');
        this.ritualBtn = document.getElementById('ritualBtn');
        this.instructions = document.getElementById('breathingInstructions');
        this.exercise = document.getElementById('breathingExercise');
        this.circle = document.getElementById('breathingCircle');
        this.instruction = document.getElementById('breathingInstruction');
        this.counter = document.getElementById('breathingCounter');
        this.modalTitle = document.getElementById('breathingModalTitle');
        this.progressFill = document.getElementById('ritualProgressFill');
        
        // Prayer elements
        this.prayerSection = document.getElementById('prayerSection');
        this.prayerTitle = document.getElementById('prayerTitle');
        this.prayerContent = document.getElementById('prayerContent');
        this.prayerCounter = document.getElementById('prayerCounter');
        this.prevPrayerBtn = document.getElementById('prevPrayerBtn');
        this.nextPrayerBtn = document.getElementById('nextPrayerBtn');
        
        this.isActive = false;
        this.currentRound = 1;
        this.totalRounds = 1;
        this.breathsPerRound = 10;
        this.currentBreath = 0;
        
        // Progress tracking
        this.totalRitualTime = 12000; // 10s preparation + ~2s breathing start
        this.breathingTime = 100000; // ~100s for 10 breaths (10s each)
        this.totalTime = this.totalRitualTime + this.breathingTime;
        this.progressInterval = null;
        
        // Prayer data
        this.prayers = [
            {
                title: "Prayer of St. Francis",
                content: `Lord, make me an instrument of your peace.
Where there is hatred, let me sow love;
Where there is injury, pardon;
Where there is doubt, faith;
Where there is despair, hope;
Where there is darkness, light;
Where there is sadness, joy.

O Divine Master, grant that I may not so much seek
To be consoled as to console,
To be understood as to understand,
To be loved as to love.

For it is in giving that we receive;
It is in pardoning that we are pardoned;
And it is in dying that we are born to eternal life.`
            },
            {
                title: "Prayer for Humility (St. Augustine)",
                content: `O Lord, let me know myself, let me know Thee.
Desire nothing but Thee.
Seek nothing but Thee.
Let me die to myself that I may live in Thee.
Let me forget myself that I may find Thee.`
            },
            {
                title: "Prayer for the Beatitudes",
                content: `Lord Jesus, teach me to be poor in spirit,
That I may inherit Your kingdom.
Help me to mourn with those who mourn,
And to be meek before Your will.
Give me hunger for righteousness,
And mercy for all who suffer.
Make my heart pure, O Lord,
That I may see You in all things.
Grant me peacemaking spirit,
And courage to face persecution for Your sake.
Amen.`
            },
            {
                title: "Prayer for Death to Self (Modern)",
                content: `Lord, help me die to my selfish desires,
My pride, my anger, my envy.
Kill in me all that separates me from You.
Give me instead:
The humility of the publican,
The love of Mary Magdalene,
The courage of Peter,
The wisdom of Paul,
The patience of Job,
The faith of Abraham.
Let me die to myself each day,
That I may rise with You to new life.
Amen.`
            },
            {
                title: "Prayer for Daily Mortality Awareness",
                content: `Lord, as I see another day pass from my life,
Help me remember that my time here is limited.
Let me not waste precious moments on vanity,
But use each day to grow closer to You.
Teach me to number my days,
That I may gain a heart of wisdom.
Help me die to my selfishness daily,
That I may live more fully for others.
Amen.`
            },
            {
                title: "Prayer for Virtue in the Face of Death",
                content: `Heavenly Father, as I contemplate my mortality,
Strengthen me to live virtuously.
When I am tempted to pride, give me humility.
When I am tempted to anger, give me patience.
When I am tempted to greed, give me generosity.
When I am tempted to despair, give me hope.
Let my awareness of death inspire me to love more deeply,
To serve more faithfully, and to grow in holiness.
Amen.`
            }
        ];
        this.currentPrayerIndex = 0;
        
        this.init();
    }
    
    init() {
        this.ritualBtn.addEventListener('click', () => this.showModal());
        this.closeBtn.addEventListener('click', () => this.hideModal());
        
        // Prayer navigation
        this.prevPrayerBtn.addEventListener('click', () => this.previousPrayer());
        this.nextPrayerBtn.addEventListener('click', () => this.nextPrayer());
        
        // Touch/swipe support for mobile
        this.prayerSection.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.prayerSection.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.hideModal();
            }
        });
    }
    
    showModal() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        this.resetExercise();
        this.startProgressBar();
        // Show instructions for 10 seconds before starting breathing
        setTimeout(() => {
            this.startBreathing();
        }, 10000);
    }
    
    hideModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.stopBreathing();
    }
    
    resetExercise() {
        this.isActive = false;
        this.currentRound = 1;
        this.currentBreath = 0;
        this.currentPrayerIndex = 0;
        this.instructions.style.display = 'block';
        this.exercise.style.display = 'none';
        this.prayerSection.style.display = 'none';
        this.circle.className = 'breathing-circle';
        this.modalTitle.textContent = 'PREPARE FOR SILENCE';
        this.progressFill.style.width = '0%';
        this.counter.style.display = 'block';
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
    
    startBreathing() {
        this.instructions.style.display = 'none';
        this.exercise.style.display = 'flex';
        this.isActive = true;
        this.currentRound = 1;
        this.currentBreath = 0;
        this.counter.style.display = 'none';
        
        // Start with circle in contracted state so first breath expands it
        this.circle.className = 'breathing-circle contract';
        this.modalTitle.textContent = 'BREATHE IN AND OUT IN HARMONY WITH THE VISUAL AID';
        
        // Start breathing cycle immediately since we already had 10s introduction
        setTimeout(() => {
            this.performBreathingCycle();
        }, 2000);
    }
    
    stopBreathing() {
        this.isActive = false;
        this.circle.className = 'breathing-circle';
        this.instruction.textContent = 'Ritual Complete';
        setTimeout(() => {
            this.resetExercise();
        }, 2000);
    }
    
    performBreathingCycle() {
        if (!this.isActive) return;
        
        if (this.currentBreath < this.breathsPerRound) {
            this.performBreath();
        } else {
            this.performRetention();
        }
    }
    
    performBreath() {
        this.currentBreath++;
        
        // Inhale (4 seconds) - Deep, powerful, filling belly, chest, then head
        this.circle.className = 'breathing-circle expand';
        
        setTimeout(() => {
            if (!this.isActive) return;
            
            // Exhale (6 seconds) - Relaxed, unforced release
            this.circle.className = 'breathing-circle contract';
            
            setTimeout(() => {
                if (!this.isActive) return;
                this.performBreathingCycle();
            }, 6000); // 6 seconds for exhale
        }, 4000); // 4 seconds for inhale
    }
    
    performRetention() {
        this.modalTitle.textContent = 'CONTEMPLATE ON EACH SENTENCE AND HOW IT RELATES TO YOUR OWN LIFE';
        this.circle.className = 'breathing-circle';
        
        setTimeout(() => {
            if (!this.isActive) return;
            
            // Show prayers after breathing exercise
            this.exercise.style.display = 'none';
            this.prayerSection.style.display = 'flex';
            this.displayCurrentPrayer();
        }, 3000);
    }
    
    updateCounter() {
        this.counter.textContent = `Round ${this.currentRound} of ${this.totalRounds}`;
    }
    
    // Prayer methods
    displayCurrentPrayer() {
        const prayer = this.prayers[this.currentPrayerIndex];
        this.prayerTitle.textContent = prayer.title;
        this.prayerContent.textContent = prayer.content;
        this.prayerCounter.textContent = `Prayer ${this.currentPrayerIndex + 1} of ${this.prayers.length}`;
    }
    
    nextPrayer() {
        this.currentPrayerIndex = (this.currentPrayerIndex + 1) % this.prayers.length;
        this.displayCurrentPrayer();
    }
    
    previousPrayer() {
        this.currentPrayerIndex = this.currentPrayerIndex === 0 ? this.prayers.length - 1 : this.currentPrayerIndex - 1;
        this.displayCurrentPrayer();
    }
    
    // Touch/swipe handling for mobile
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }
    
    handleTouchEnd(e) {
        if (!this.touchStartX) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = this.touchStartX - touchEndX;
        
        // Minimum swipe distance
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next prayer
                this.nextPrayer();
            } else {
                // Swipe right - previous prayer
                this.previousPrayer();
            }
        }
        
        this.touchStartX = null;
    }
    
    // Progress bar methods
    startProgressBar() {
        let startTime = Date.now();
        this.progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / this.totalTime) * 100, 100);
            this.progressFill.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(this.progressInterval);
                this.progressInterval = null;
            }
        }, 100);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BreathingController();
});
