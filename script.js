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

    openFlyoutBtn.addEventListener('click', () => {
        if (controlsFlyout.classList.contains('-translate-x-full')) {
            controlsFlyout.classList.remove('-translate-x-full');
        } else {
            controlsFlyout.classList.add('-translate-x-full');
        }
    });

    closeFlyoutBtn.addEventListener('click', () => {
        controlsFlyout.classList.add('-translate-x-full');
    });

    // Close flyout when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!controlsFlyout.contains(event.target) && !openFlyoutBtn.contains(event.target) && window.innerWidth < 1100) {
            controlsFlyout.classList.add('-translate-x-full');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1100) {
            controlsFlyout.classList.remove('-translate-x-full');
        } else {
            controlsFlyout.classList.add('-translate-x-full');
        }
    });
    const colorInputs = [
        { swatch: document.getElementById('primary-color-swatch'), text: document.getElementById('primary-color-text'), tailwind: document.getElementById('primary-color-tailwind'), sample: document.getElementById('primary-color-sample') },
        { swatch: document.getElementById('secondary-color-swatch'), text: document.getElementById('secondary-color-text'), tailwind: document.getElementById('secondary-color-tailwind'), sample: document.getElementById('secondary-color-sample') },
        { swatch: document.getElementById('background-color-swatch'), text: document.getElementById('background-color-text'), tailwind: document.getElementById('background-color-tailwind') },
        { swatch: document.getElementById('link-color-swatch'), text: document.getElementById('link-color-text'), tailwind: document.getElementById('link-color-tailwind') },
        { swatch: document.getElementById('text-color-swatch'), text: document.getElementById('text-color-text'), tailwind: document.getElementById('text-color-tailwind') },
        { swatch: document.getElementById('dark-background-color-swatch'), text: document.getElementById('dark-background-color-text'), tailwind: document.getElementById('dark-background-color-tailwind') }
    ];
    const fontFamilySelect = document.getElementById('font-family');
    const body = document.body;
    const boardNameInput = document.getElementById('board-name-control');
    const boardDescriptionInput = document.getElementById('board-description-control');
    const exportButton = document.getElementById('export-settings');
    const importButton = document.getElementById('import-settings-btn');
    const importInput = document.getElementById('import-settings');

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

    exportButton.addEventListener('click', exportSettings);

    function importSettings(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const settings = JSON.parse(e.target.result);
                    applyImportedSettings(settings);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    alert('Error importing settings. Please make sure the file is a valid JSON.');
                }
            };
            reader.readAsText(file);
        }
    }

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

    importButton.addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', importSettings);

    function updateStyles() {
        body.style.backgroundColor = colorInputs[2].text.value;
        body.style.color = colorInputs[4].text.value;
        body.style.fontFamily = fontFamilySelect.value;

        colorInputs[0].sample.style.backgroundColor = colorInputs[0].text.value;
        colorInputs[1].sample.style.backgroundColor = colorInputs[1].text.value;
        colorInputs[1].sample.style.color = colorInputs[4].text.value;

        const darkBgSection = document.getElementById('dark-bg-section');
        if (darkBgSection) {
            darkBgSection.style.backgroundColor = colorInputs[5].text.value;
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
            const id = ['primary', 'secondary', 'light-bg', 'text', 'link', 'dark-bg'][index];
            const swatch = document.getElementById(`${id}-swatch`);
            const hex = document.getElementById(`${id === 'light-bg' ? 'background' : id}-hex`);
            if (swatch && hex) {
                swatch.style.backgroundColor = input.text.value;
                hex.textContent = input.text.value;
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

    // Initial update
    updateAll();
});
