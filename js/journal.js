// JOURNAL FUNCTIONALITY
class JournalManager {
    constructor() {
        this.currentEntry = null;
    }

    init() {
        const addBtn = document.getElementById('addJournalBtn');
        
        addBtn.addEventListener('click', () => {
            const date = document.getElementById('journalDate').value;
            if (!date) {
                alert('PLEASE SELECT A DATE');
                return;
            }
            
            // Check if there's an existing entry for this date
            const existingEntry = storageManager.getJournalEntry(date);
            this.showJournalModal(date, existingEntry);
        });
    }

    showJournalModal(date, existingEntry = null) {
        const content = existingEntry || '';
        
        const modal = document.createElement('div');
        modal.className = 'journal-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>JOURNAL ENTRY - ${date}</h3>
                <textarea id="journalText" placeholder="ENTER YOUR THOUGHTS...">${content}</textarea>
                <div class="modal-buttons">
                    <button id="saveJournal" class="journal-btn">SAVE</button>
                    <button id="cancelJournal" class="journal-btn">CANCEL</button>
                    ${existingEntry ? '<button id="deleteJournal" class="journal-btn delete-btn">DELETE</button>' : ''}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .journal-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .modal-content {
                background-color: #000;
                border: 2px solid #fff;
                padding: 30px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            .modal-content h3 {
                margin-bottom: 20px;
                text-transform: uppercase;
                letter-spacing: 0.1em;
            }
            #journalText {
                width: 100%;
                height: 200px;
                background-color: #000;
                color: #fff;
                border: 2px solid #fff;
                padding: 15px;
                font-family: 'Courier New', monospace;
                font-size: 1rem;
                resize: vertical;
                margin-bottom: 20px;
            }
            .modal-buttons {
                display: flex;
                gap: 15px;
                justify-content: flex-end;
            }
            .delete-btn {
                background-color: #000;
                color: #fff;
                border-color: #fff;
            }
            .delete-btn:hover {
                background-color: #fff;
                color: #000;
            }
        `;
        document.head.appendChild(style);
        
        // Event listeners
        document.getElementById('saveJournal').addEventListener('click', () => {
            this.saveJournalEntry(date);
            this.closeModal(modal);
        });
        
        document.getElementById('cancelJournal').addEventListener('click', () => {
            this.closeModal(modal);
        });
        
        if (existingEntry) {
            document.getElementById('deleteJournal').addEventListener('click', () => {
                this.deleteJournalEntry(date);
                this.closeModal(modal);
            });
        }
        
        // Focus on textarea
        document.getElementById('journalText').focus();
    }

    saveJournalEntry(date) {
        const content = document.getElementById('journalText').value.trim();
        if (content) {
            storageManager.saveJournalEntry(date, content);
            this.updateCalendarGrid();
        }
    }

    deleteJournalEntry(date) {
        const data = storageManager.getData();
        if (data.journal && data.journal[date]) {
            delete data.journal[date];
            localStorage.setItem(storageManager.storageKey, JSON.stringify(data));
            this.updateCalendarGrid();
        }
    }

    closeModal(modal) {
        document.body.removeChild(modal);
        // Remove the added styles
        const addedStyle = document.head.querySelector('style:last-of-type');
        if (addedStyle) {
            document.head.removeChild(addedStyle);
        }
    }

    updateCalendarGrid() {
        // Trigger calendar grid update to show journal indicators
        const profile = storageManager.getUserProfile();
        if (profile) {
            const journalEntries = storageManager.getAllJournalEntries();
            lifeCalendar.generateGrid(profile.birthDate, journalEntries);
        }
    }
}
