// MAIN APPLICATION LOGIC
class LifeCalendarApp {
    constructor() {
        this.storageManager = new StorageManager();
        this.lifeCalendar = new LifeCalendar();
        this.journalManager = new JournalManager();
    }

    init() {
        this.setupEventListeners();
        this.checkForExistingProfile();
        this.journalManager.init();
    }

    setupEventListeners() {
        const profileForm = document.getElementById('profileForm');
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleProfileSubmit();
        });
    }

    handleProfileSubmit() {
        const formData = new FormData(document.getElementById('profileForm'));
        const profile = {
            name: formData.get('name').toUpperCase(),
            birthDate: formData.get('birthDate'),
            location: formData.get('location').toUpperCase()
        };

        // Validate birth date
        const birthDate = new Date(profile.birthDate);
        const now = new Date();
        if (birthDate > now) {
            alert('BIRTH DATE CANNOT BE IN THE FUTURE');
            return;
        }

        // Save profile and show calendar
        this.storageManager.saveUserProfile(profile);
        this.showCalendar(profile);
    }

    showCalendar(profile) {
        // Hide profile section, show calendar section
        document.getElementById('profileSection').style.display = 'none';
        document.getElementById('calendarSection').style.display = 'block';

        // Update user info display
        document.getElementById('userName').textContent = profile.name;
        document.getElementById('userDetails').textContent = 
            `BORN: ${profile.birthDate} | LOCATION: ${profile.location}`;

        // Calculate and display life stats
        const stats = this.lifeCalendar.calculateLifeStats(profile.birthDate);
        document.getElementById('lifeStats').textContent = 
            `DAYS LIVED: ${stats.daysLived} | REMAINING: ${stats.daysRemaining} | ${stats.percentageLived}% COMPLETE`;

        // Generate the life grid
        const journalEntries = this.storageManager.getAllJournalEntries();
        this.lifeCalendar.generateGrid(profile.birthDate, journalEntries);

        // Start real-time updates
        this.lifeCalendar.updateRealTime(profile.birthDate);

        // Set default journal date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('journalDate').value = today;
    }

    checkForExistingProfile() {
        const existingProfile = this.storageManager.getUserProfile();
        if (existingProfile) {
            this.showCalendar(existingProfile);
        }
    }
}

// Initialize the application
const storageManager = new StorageManager();
const lifeCalendar = new LifeCalendar();
const journalManager = new JournalManager();
const app = new LifeCalendarApp();

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
