document.addEventListener('DOMContentLoaded', function () {
    const colorInputs = [
        { color: document.getElementById('primary-color'), text: document.getElementById('primary-color-text'), sample: document.getElementById('primary-color-sample') },
        { color: document.getElementById('secondary-color'), text: document.getElementById('secondary-color-text'), sample: document.getElementById('secondary-color-sample') },
        { color: document.getElementById('background-color'), text: document.getElementById('background-color-text') },
        { color: document.getElementById('link-color'), text: document.getElementById('link-color-text') },
        { color: document.getElementById('text-color'), text: document.getElementById('text-color-text') },
        { color: document.getElementById('dark-background-color'), text: document.getElementById('dark-background-color-text') }
    ];
    const fontFamilySelect = document.getElementById('font-family');
    const body = document.body;
    const boardNameInput = document.getElementById('board-name-control');
    const boardDescriptionInput = document.getElementById('board-description-control');

    function updateStyles() {
        body.style.backgroundColor = colorInputs[2].color.value;
        body.style.color = colorInputs[4].color.value;
        body.style.fontFamily = fontFamilySelect.value;

        colorInputs[0].sample.style.backgroundColor = colorInputs[0].color.value;
        colorInputs[1].sample.style.backgroundColor = colorInputs[1].color.value;

        document.querySelectorAll('a').forEach(link => {
            link.style.color = colorInputs[3].color.value;
        });

        updateColorSwatches();
        updateButtons();
    }

    function updateColorSwatches() {
        ['primary', 'secondary', 'light-bg', 'text', 'dark-bg'].forEach((id, index) => {
            const swatch = document.getElementById(`${id}-swatch`);
            const hex = document.getElementById(`${id === 'light-bg' ? 'background' : id}-hex`);
            if (swatch && hex) {
                const colorValue = colorInputs[index === 3 ? 4 : (index === 4 ? 5 : index)].color.value;
                swatch.style.backgroundColor = colorValue;
                hex.textContent = colorValue;
            }
        });
    }

    function updateButtons() {
        ['primary', 'secondary', 'outline'].forEach(id => {
            const button = document.getElementById(`${id}-button`);
            if (button) {
                if (id === 'outline') {
                    button.style.borderColor = colorInputs[0].color.value;
                    button.style.color = colorInputs[0].color.value;
                } else {
                    button.style.backgroundColor = colorInputs[id === 'primary' ? 0 : 1].color.value;
                }
                updateButtonHoverEffects(button, id);
            }
        });
    }

    function updateButtonHoverEffects(button, id) {
        button.addEventListener('mouseenter', () => {
            if (id === 'primary') {
                button.style.backgroundColor = colorInputs[1].color.value;
            } else if (id === 'secondary') {
                button.style.backgroundColor = colorInputs[0].color.value;
            } else if (id === 'outline') {
                button.style.backgroundColor = colorInputs[0].color.value;
                button.style.color = colorInputs[2].color.value;
            }
        });

        button.addEventListener('mouseleave', () => {
            if (id === 'primary') {
                button.style.backgroundColor = colorInputs[0].color.value;
            } else if (id === 'secondary') {
                button.style.backgroundColor = colorInputs[1].color.value;
            } else if (id === 'outline') {
                button.style.backgroundColor = 'transparent';
                button.style.color = colorInputs[0].color.value;
            }
        });
    }

    function updateColorInput(colorInput, textInput) {
        colorInput.value = textInput.value;
        updateAll();
    }

    function updateTextInput(colorInput, textInput) {
        textInput.value = colorInput.value;
    }

    function updateBoardInfo() {
        const boardTitle = document.getElementById('board-title');
        const boardDesc = document.getElementById('board-description');

        if (boardTitle) boardTitle.textContent = boardNameInput.value;
        if (boardDesc) boardDesc.textContent = boardDescriptionInput.value;
    }

    function updateAll() {
        updateStyles();
        updateBoardInfo();
    }

    colorInputs.forEach(input => {
        input.color.addEventListener('input', () => {
            updateTextInput(input.color, input.text);
            updateAll();
        });
        input.text.addEventListener('input', () => {
            updateColorInput(input.color, input.text);
        });
    });

    fontFamilySelect.addEventListener('change', updateAll);
    boardNameInput.addEventListener('input', updateAll);
    boardDescriptionInput.addEventListener('input', updateAll);

    // Initial update
    updateAll();
});
