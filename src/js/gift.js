import { data } from '../assets/data/data.js';

export function gift() {
    const giftButton = document.querySelector('.gift-button');
    const giftModal = document.getElementById('giftModal');
    const giftModalClose = document.getElementById('giftModalClose');
    const groomBankInfo = document.getElementById('groomBankInfo');
    const brideBankInfo = document.getElementById('brideBankInfo');

    // Populate bank information from data
    function populateBankInfo() {
        if (data.bank && data.bank.length >= 2) {
            const groomBank = data.bank[0]; // First bank account (groom)
            const brideBank = data.bank[1]; // Second bank account (bride)

            // Update groom bank info
            if (groomBankInfo) {
                const groomBankName = groomBankInfo.querySelector('.bank-name');
                const groomBankAccount = groomBankInfo.querySelector('.bank-account');
                const groomBankIcon = groomBankInfo.querySelector('.bank-icon');
                const groomQrImage = groomBankInfo.querySelector('.qr-image');
                
                if (groomBankName) groomBankName.textContent = groomBank.name;
                if (groomBankAccount) groomBankAccount.textContent = groomBank.rekening;
                if (groomBankIcon) groomBankIcon.src = groomBank.icon;
                if (groomQrImage && groomBank.qrCode) groomQrImage.src = groomBank.qrCode;
            }

            // Update bride bank info
            if (brideBankInfo) {
                const brideBankName = brideBankInfo.querySelector('.bank-name');
                const brideBankAccount = brideBankInfo.querySelector('.bank-account');
                const brideBankIcon = brideBankInfo.querySelector('.bank-icon');
                const brideQrImage = brideBankInfo.querySelector('.qr-image');
                
                if (brideBankName) brideBankName.textContent = brideBank.name;
                if (brideBankAccount) brideBankAccount.textContent = brideBank.rekening;
                if (brideBankIcon) brideBankIcon.src = brideBank.icon;
                if (brideQrImage && brideBank.qrCode) brideQrImage.src = brideBank.qrCode;
            }
        }
    }

    // Show modal
    function showModal() {
        if (giftModal) {
            giftModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    // Hide modal
    function hideModal() {
        if (giftModal) {
            giftModal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }

    // Event listeners
    if (giftButton) {
        giftButton.addEventListener('click', (e) => {
            e.preventDefault();
            showModal();
        });
    }

    if (giftModalClose) {
        giftModalClose.addEventListener('click', hideModal);
    }

    // Close modal when clicking outside
    if (giftModal) {
        giftModal.addEventListener('click', (e) => {
            if (e.target === giftModal) {
                hideModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && giftModal && giftModal.classList.contains('show')) {
            hideModal();
        }
    });

    // Add copy to clipboard functionality
    function addCopyFunctionality() {
        const bankAccounts = document.querySelectorAll('.bank-account');
        
        bankAccounts.forEach(account => {
            account.style.cursor = 'pointer';
            account.title = 'Click để copy số tài khoản';
            
            account.addEventListener('click', () => {
                const accountNumber = account.textContent;
                
                // Copy to clipboard
                navigator.clipboard.writeText(accountNumber).then(() => {
                    // Show temporary feedback
                    const originalText = account.textContent;
                    account.textContent = 'Đã copy!';
                    account.style.color = '#ff6b6b';
                    
                    setTimeout(() => {
                        account.textContent = originalText;
                        account.style.color = '#666';
                    }, 1500);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = accountNumber;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    // Show feedback
                    const originalText = account.textContent;
                    account.textContent = 'Đã copy!';
                    account.style.color = '#ff6b6b';
                    
                    setTimeout(() => {
                        account.textContent = originalText;
                        account.style.color = '#666';
                    }, 1500);
                });
            });
        });
    }

    // Initialize
    populateBankInfo();
    addCopyFunctionality();
}
