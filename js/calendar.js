// LIFE CALENDAR CALCULATIONS AND RENDERING
class LifeCalendar {
    constructor() {
        this.totalYears = 90;
        this.daysPerYear = 365;
        this.totalDays = this.totalYears * this.daysPerYear;
        this.weeksPerYear = 52;
        this.totalWeeks = this.totalYears * this.weeksPerYear;
        this.currentView = 'month'; // Default to month view
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
    }

    calculateDaysLived(birthDate) {
        const now = new Date();
        const birth = new Date(birthDate);
        const diffTime = now - birth;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    }

    calculateLifeStats(birthDate) {
        const daysLived = this.calculateDaysLived(birthDate);
        const daysRemaining = this.totalDays - daysLived;
        const percentageLived = (daysLived / this.totalDays) * 100;
        
        return {
            daysLived,
            daysRemaining,
            percentageLived: Math.round(percentageLived * 100) / 100
        };
    }

    generateGrid(birthDate, journalEntries = {}) {
        const grid = document.getElementById('lifeGrid');
        grid.innerHTML = '';
        
        if (this.currentView === 'year') {
            this.generateYearView(birthDate, journalEntries);
        } else {
            this.generateMonthView(birthDate, journalEntries);
        }
    }

    generateYearView(birthDate, journalEntries) {
        const stats = this.calculateLifeStats(birthDate);
        const grid = document.getElementById('lifeGrid');
        grid.className = 'life-grid';
        
        for (let day = 0; day < this.totalDays; day++) {
            const circle = document.createElement('div');
            circle.className = 'day-circle';
            circle.dataset.dayNumber = day;
            
            // Calculate the actual date for this day
            const birth = new Date(birthDate);
            const dayDate = new Date(birth.getTime() + (day * 24 * 60 * 60 * 1000));
            const dateString = dayDate.toISOString().split('T')[0];
            
            circle.dataset.date = dateString;
            
            // Mark as lived if day has passed
            if (day < stats.daysLived) {
                circle.classList.add('lived');
            }
            
            // Add journal indicator if entry exists
            if (journalEntries[dateString]) {
                circle.style.borderColor = '#fff';
                circle.style.borderWidth = '2px';
            }
            
            // Add click event for journaling
            circle.addEventListener('click', () => {
                this.handleDayClick(dayDate, journalEntries[dateString]);
            });
            
            grid.appendChild(circle);
        }
    }

    generateMonthView(birthDate, journalEntries) {
        const grid = document.getElementById('lifeGrid');
        grid.className = 'life-grid month-view';
        
        const birth = new Date(birthDate);
        const now = new Date();
        
        // Calculate total months for 100 years from birth
        const birthYear = birth.getFullYear();
        const birthMonth = birth.getMonth();
        
        const totalMonths = 100 * 12; // 100 years = 1200 months
        
        // Create 10 year groups (10 years each)
        for (let yearGroup = 0; yearGroup < 10; yearGroup++) {
            const yearGroupContainer = document.createElement('div');
            yearGroupContainer.className = 'year-group';
            
            // Add year group label
            const startYear = birthYear + (yearGroup * 10);
            const endYear = startYear + 9;
            const yearGroupLabel = document.createElement('div');
            yearGroupLabel.className = 'year-group-label';
            yearGroupLabel.textContent = `${startYear}-${endYear}`;
            yearGroupContainer.appendChild(yearGroupLabel);
            
            // Add months for this 10-year period
            for (let monthOffset = yearGroup * 120; monthOffset < (yearGroup + 1) * 120 && monthOffset < totalMonths; monthOffset++) {
                const monthDate = new Date(birthYear, birthMonth + monthOffset, 1);
                const year = monthDate.getFullYear();
                const month = monthDate.getMonth();
                
                // Get days in this specific month
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                
                // Create month container
                const monthContainer = document.createElement('div');
                monthContainer.className = 'month-row';
                monthContainer.style.gridTemplateColumns = `40px repeat(${daysInMonth}, 2px)`;
                
                // Add month label
                const monthLabel = document.createElement('div');
                monthLabel.className = 'month-label';
                monthLabel.textContent = `${year}-${String(month + 1).padStart(2, '0')}`;
                monthLabel.style.fontSize = '0.4rem';
                monthLabel.style.fontWeight = 'bold';
                monthLabel.style.textAlign = 'right';
                monthLabel.style.color = '#fff';
                monthLabel.style.paddingRight = '3px';
                monthContainer.appendChild(monthLabel);
                
                // Create days for this month
                for (let day = 1; day <= daysInMonth; day++) {
                    const circle = document.createElement('div');
                    circle.className = 'day-circle';
                    
                    // Create date for this day
                    const dayDate = new Date(year, month, day);
                    const dateString = dayDate.toISOString().split('T')[0];
                    
                    circle.dataset.date = dateString;
                    circle.dataset.dayNumber = day;
                    
                    // Check if this day has been lived
                    if (dayDate >= birth && dayDate <= now) {
                        circle.classList.add('lived');
                    }
                    
                    // Add journal indicator if entry exists
                    if (journalEntries[dateString]) {
                        circle.style.borderColor = '#fff';
                        circle.style.borderWidth = '2px';
                    }
                    
                    // Add click event for journaling
                    circle.addEventListener('click', () => {
                        this.handleDayClick(dayDate, journalEntries[dateString]);
                    });
                    
                    monthContainer.appendChild(circle);
                }
                
                yearGroupContainer.appendChild(monthContainer);
            }
            
            grid.appendChild(yearGroupContainer);
        }
    }

    toggleView() {
        this.currentView = this.currentView === 'year' ? 'month' : 'year';
        const button = document.getElementById('viewToggle');
        button.textContent = this.currentView === 'year' ? 'VIEW BY MONTH' : 'VIEW BY YEAR';
        
        // Regenerate grid with current view
        const profile = storageManager.getUserProfile();
        if (profile) {
            const journalEntries = storageManager.getAllJournalEntries();
            this.generateGrid(profile.birthDate, journalEntries);
        }
    }

    handleDayClick(date, existingEntry) {
        const dateString = date.toISOString().split('T')[0];
        
        // Show journal modal for this specific date
        journalManager.showJournalModal(dateString, existingEntry);
    }

    updateRealTime(birthDate) {
        // Update every minute to show real-time progress
        setInterval(() => {
            const stats = this.calculateLifeStats(birthDate);
            const lifeStatsElement = document.getElementById('lifeStats');
            if (lifeStatsElement) {
                lifeStatsElement.textContent = 
                    `DAYS LIVED: ${stats.daysLived} | REMAINING: ${stats.daysRemaining} | ${stats.percentageLived}% COMPLETE`;
            }
            
            // Update the grid to reflect new lived days
            const journalEntries = storageManager.getAllJournalEntries();
            this.generateGrid(birthDate, journalEntries);
        }, 60000); // Update every minute
    }
}
