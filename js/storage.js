// STORAGE MANAGEMENT
class StorageManager {
    constructor() {
        this.storageKey = 'lifeCalendarData';
    }

    saveUserProfile(profile) {
        const data = this.getData();
        data.profile = profile;
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    getUserProfile() {
        const data = this.getData();
        return data.profile || null;
    }

    saveJournalEntry(date, entry) {
        const data = this.getData();
        if (!data.journal) {
            data.journal = {};
        }
        data.journal[date] = entry;
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    getJournalEntry(date) {
        const data = this.getData();
        return data.journal && data.journal[date] ? data.journal[date] : null;
    }

    getAllJournalEntries() {
        const data = this.getData();
        return data.journal || {};
    }

    getData() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : {};
    }

    clearData() {
        localStorage.removeItem(this.storageKey);
    }
}
