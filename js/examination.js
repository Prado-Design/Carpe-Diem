class ExaminationController {
    constructor() {
        console.log('ExaminationController: Initializing...');
        this.modal = document.getElementById('examinationModal');
        this.quoteText = document.getElementById('quoteText');
        this.closeBtn = document.getElementById('examinationClose');
        
        console.log('Modal element:', this.modal);
        console.log('Quote text element:', this.quoteText);
        console.log('Close button element:', this.closeBtn);
        
        this.init();
    }
    
    init() {
        console.log('ExaminationController: Setting up event listeners...');
        
        // Add click event to quote text
        if (this.quoteText) {
            this.quoteText.addEventListener('click', () => {
                console.log('Quote clicked!');
                this.showModal();
            });
        } else {
            console.error('Quote text element not found!');
        }
        
        // Add click event to close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                console.log('Close button clicked!');
                this.hideModal();
            });
        } else {
            console.error('Close button element not found!');
        }
        
        // Close modal when clicking outside
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    console.log('Modal background clicked!');
                    this.hideModal();
                }
            });
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.style.display === 'block') {
                console.log('Escape key pressed!');
                this.hideModal();
            }
        });
    }
    
    showModal() {
        console.log('Showing modal...');
        if (this.modal) {
            this.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            console.error('Modal element not found!');
        }
    }
    
    hideModal() {
        console.log('Hiding modal...');
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing ExaminationController...');
    new ExaminationController();
});