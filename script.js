document.addEventListener('DOMContentLoaded', function() {
    const colorInputs = [
        { color: document.getElementById('primary-color'), text: document.getElementById('primary-color-text') },
        { color: document.getElementById('secondary-color'), text: document.getElementById('secondary-color-text') },
        { color: document.getElementById('background-color'), text: document.getElementById('background-color-text') },
        { color: document.getElementById('link-color'), text: document.getElementById('link-color-text') },
        { color: document.getElementById('text-color'), text: document.getElementById('text-color-text') }
    ];
    const fontFamilySelect = document.getElementById('font-family');

    function updateStyles() {
        document.documentElement.style.setProperty('--primary-color', colorInputs[0].color.value);
        document.documentElement.style.setProperty('--secondary-color', colorInputs[1].color.value);
        document.documentElement.style.setProperty('--background-color', colorInputs[2].color.value);
        document.documentElement.style.setProperty('--link-color', colorInputs[3].color.value);
        document.documentElement.style.setProperty('--text-color', colorInputs[4].color.value);
        document.documentElement.style.setProperty('--font-family', fontFamilySelect.value);
    }

    function updateColorInput(colorInput, textInput) {
        colorInput.value = textInput.value;
        updateStyles();
    }

    function updateTextInput(colorInput, textInput) {
        textInput.value = colorInput.value;
    }

    colorInputs.forEach(input => {
        input.color.addEventListener('input', () => {
            updateTextInput(input.color, input.text);
            updateStyles();
        });
        input.text.addEventListener('input', () => updateColorInput(input.color, input.text));
    });

    fontFamilySelect.addEventListener('change', updateStyles);

    // Initial update
    updateStyles();
});
