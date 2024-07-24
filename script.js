function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const arrow = section.previousElementSibling.querySelector('svg');
    section.classList.toggle('hidden');
    arrow.classList.toggle('rotate-180');
}

document.addEventListener('DOMContentLoaded', function () {
    const controlsFlyout = document.getElementById('controls-flyout');
    const openFlyoutBtn = document.getElementById('open-flyout');
    const closeFlyoutBtn = document.getElementById('close-flyout');

    function toggleFlyout() {
        controlsFlyout.classList.toggle('-translate-x-full');
    }

    function closeFlyout() {
        controlsFlyout.classList.add('-translate-x-full');
    }

    openFlyoutBtn.addEventListener('click', toggleFlyout);
    closeFlyoutBtn.addEventListener('click', closeFlyout);

    // Close flyout when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!controlsFlyout.contains(event.target) && !openFlyoutBtn.contains(event.target) && window.innerWidth < 1100) {
            closeFlyout();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1100) {
            controlsFlyout.classList.remove('-translate-x-full');
        } else {
            closeFlyout();
        }
    });
    const colorInputs = [
        { swatch: document.getElementById('primary-color-swatch'), text: document.getElementById('primary-color-text'), tailwind: document.getElementById('primary-color-tailwind'), sample: document.getElementById('primary-color-sample') },
        { swatch: document.getElementById('secondary-color-swatch'), text: document.getElementById('secondary-color-text'), tailwind: document.getElementById('secondary-color-tailwind'), sample: document.getElementById('secondary-color-sample') },
        { swatch: document.getElementById('background-color-swatch'), text: document.getElementById('background-color-text'), tailwind: document.getElementById('background-color-tailwind') },
        { swatch: document.getElementById('link-color-swatch'), text: document.getElementById('link-color-text'), tailwind: document.getElementById('link-color-tailwind') },
        { swatch: document.getElementById('text-color-swatch'), text: document.getElementById('text-color-text'), tailwind: document.getElementById('text-color-tailwind') },
        { swatch: document.getElementById('dark-bg-color-swatch'), text: document.getElementById('dark-bg-color-text'), tailwind: document.getElementById('dark-bg-color-tailwind') }
    ];
    const fontFamilySelect = document.getElementById('font-family');
    const body = document.body;
    const boardNameInput = document.getElementById('board-name-control');
    const boardDescriptionInput = document.getElementById('board-description-control');
    const exportButton = document.getElementById('export-settings');
    const importButton = document.getElementById('import-settings-btn');
    const importInput = document.getElementById('import-settings');

    // Event listeners for flyout are now handled at the top of the script

    colorInputs.forEach(input => {
        input.swatch.addEventListener('click', () => {
            input.text.parentElement.classList.toggle('hidden');
        });
        input.text.addEventListener('input', updateAll);
        if (input.tailwind) {
            input.tailwind.addEventListener('change', (e) => {
                if (e.target.value) {
                    input.text.value = e.target.value;
                    updateAll();
                }
            });
        }
    });

    fontFamilySelect.addEventListener('change', updateAll);
    boardNameInput.addEventListener('input', updateAll);
    boardDescriptionInput.addEventListener('input', updateAll);
    exportButton.addEventListener('click', exportSettings);
    importButton.addEventListener('click', debounce(() => {
        importClickCount++;
        console.log(`Import button clicked (count: ${importClickCount})`);
        importInput.click();
    }, 300));
    importInput.addEventListener('change', (event) => {
        console.log('File input change event triggered');
        importSettings(event);
        // Reset the file input value to allow selecting the same file again
        event.target.value = '';
    });

    function exportSettings() {
        const settings = {
            colors: {
                primary: colorInputs[0].text.value,
                secondary: colorInputs[1].text.value,
                background: colorInputs[2].text.value,
                link: colorInputs[3].text.value,
                text: colorInputs[4].text.value,
                darkBackground: colorInputs[5].text.value
            },
            fontFamily: fontFamilySelect.value,
            boardName: boardNameInput.value,
            boardDescription: boardDescriptionInput.value
        };

        const jsonString = JSON.stringify(settings, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        const fileName = `${boardNameInput.value.replace(/\s+/g, '_').toLowerCase()}_mood_board.json`;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    let isImporting = false;
    let importClickCount = 0;

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function importSettings(event) {
        console.log('importSettings function called', event);
        if (isImporting) {
            console.log('Import already in progress, skipping');
            return;
        }
        isImporting = true;
        const file = event.target.files[0];
        if (file) {
            console.log(`File selected: ${file.name}`);
            const reader = new FileReader();
            reader.onload = function (e) {
                console.log('FileReader onload event triggered', e);
                try {
                    const settings = JSON.parse(e.target.result);
                    console.log('Parsed settings:', settings);
                    applyImportedSettings(settings);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    alert('Error importing settings. Please make sure the file is a valid JSON.');
                } finally {
                    isImporting = false;
                }
            };
            reader.onerror = function(e) {
                console.error('Error reading file:', e);
                alert('Error reading the file. Please try again.');
                isImporting = false;
            };
            reader.readAsText(file);
        } else {
            console.error('No file selected');
            isImporting = false;
        }
    }

    // Log when the import button is clicked
    importButton.addEventListener('click', () => {
        console.log('Import button clicked');
    });

    // Log when the file input change event is triggered
    importInput.addEventListener('change', (event) => {
        console.log('File input change event triggered', event);
    });

    exportButton.addEventListener('click', exportSettings);
    importButton.addEventListener('click', debounce(() => {
        importClickCount++;
        console.log(`Import button clicked (count: ${importClickCount})`);
        importInput.click();
    }, 300));
    importInput.addEventListener('change', (event) => {
        console.log('File input change event triggered');
        importSettings(event);
        // Reset the file input value to allow selecting the same file again
        event.target.value = '';
    });

    function applyImportedSettings(settings) {
        // Apply color settings
        colorInputs[0].text.value = settings.colors.primary;
        colorInputs[1].text.value = settings.colors.secondary;
        colorInputs[2].text.value = settings.colors.background;
        colorInputs[3].text.value = settings.colors.link;
        colorInputs[4].text.value = settings.colors.text;
        colorInputs[5].text.value = settings.colors.darkBackground;

        // Apply font family
        fontFamilySelect.value = settings.fontFamily;

        // Apply board info
        boardNameInput.value = settings.boardName;
        boardDescriptionInput.value = settings.boardDescription;

        // Update all styles and info
        updateAll();
    }

    function updateStyles() {
        body.style.backgroundColor = colorInputs[2].text.value;
        body.style.color = colorInputs[4].text.value;
        body.style.fontFamily = fontFamilySelect.value;

        if (colorInputs[0].sample) {
            colorInputs[0].sample.style.backgroundColor = colorInputs[0].text.value;
        }
        if (colorInputs[1].sample) {
            colorInputs[1].sample.style.backgroundColor = colorInputs[1].text.value;
            colorInputs[1].sample.style.color = colorInputs[4].text.value;
        }

        const darkBgSection = document.getElementById('dark-bg-section');
        const primaryOnDarkSample = document.getElementById('primary-on-dark-sample');
        if (darkBgSection) {
            darkBgSection.style.backgroundColor = colorInputs[5].text.value;
        }
        if (primaryOnDarkSample) {
            primaryOnDarkSample.style.backgroundColor = colorInputs[0].text.value;
        }

        // Apply dark background color to navbar and footer
        const navbar = document.querySelector('nav');
        const footer = document.querySelector('footer');
        if (navbar) navbar.style.backgroundColor = colorInputs[5].text.value;
        if (footer) footer.style.backgroundColor = colorInputs[5].text.value;

        document.querySelectorAll('a').forEach(link => {
            link.style.color = colorInputs[3].text.value;
        });

        updateColorSwatches();
        updateButtons();
    }

    function updateColorSwatches() {
        colorInputs.forEach((input, index) => {
            input.swatch.style.backgroundColor = input.text.value;

            // Update mood board swatches
            const id = ['primary', 'secondary', 'light-bg', 'text', 'text', 'dark-bg'][index];
            const swatch = document.getElementById(`${id}-swatch`);
            const hex = document.getElementById(`${id === 'light-bg' ? 'background' : id}-hex`);
            if (swatch && hex) {
                swatch.style.backgroundColor = input.text.value;
                const selectedOption = input.tailwind ? input.tailwind.options[input.tailwind.selectedIndex] : null;
                if (selectedOption && selectedOption.value !== "") {
                    hex.textContent = selectedOption.text;
                } else {
                    hex.textContent = input.text.value;
                }
            }
        });
    }

    function updateButtons() {
        ['primary', 'secondary', 'outline'].forEach(id => {
            const button = document.getElementById(`${id}-button`);
            if (button) {
                if (id === 'outline') {
                    button.style.borderColor = colorInputs[0].text.value;
                    button.style.color = colorInputs[0].text.value;
                } else {
                    button.style.backgroundColor = colorInputs[id === 'primary' ? 0 : 1].text.value;
                }
                updateButtonHoverEffects(button, id);
            }
        });
    }

    function updateButtonHoverEffects(button, id) {
        button.addEventListener('mouseenter', () => {
            if (id === 'primary') {
                button.style.backgroundColor = colorInputs[1].text.value;
            } else if (id === 'secondary') {
                button.style.backgroundColor = colorInputs[0].text.value;
            } else if (id === 'outline') {
                button.style.backgroundColor = colorInputs[0].text.value;
                button.style.color = colorInputs[2].text.value;
            }
        });

        button.addEventListener('mouseleave', () => {
            if (id === 'primary') {
                button.style.backgroundColor = colorInputs[0].text.value;
            } else if (id === 'secondary') {
                button.style.backgroundColor = colorInputs[1].text.value;
            } else if (id === 'outline') {
                button.style.backgroundColor = 'transparent';
                button.style.color = colorInputs[0].text.value;
            }
        });
    }

    function updateBoardInfo() {
        const boardTitle = document.getElementById('board-title');
        const boardDesc = document.getElementById('board-description');
        const boardNameElements = document.querySelectorAll('.board-name');
        const boardDescElements = document.querySelectorAll('.board-description');

        if (boardTitle) boardTitle.textContent = boardNameInput.value;
        if (boardDesc) boardDesc.textContent = boardDescriptionInput.value;

        boardNameElements.forEach(el => el.textContent = boardNameInput.value);
        boardDescElements.forEach(el => el.textContent = boardDescriptionInput.value);
    }

    function updateAll() {
        updateStyles();
        updateBoardInfo();
    }

    // Initial update
    updateAll();
});
