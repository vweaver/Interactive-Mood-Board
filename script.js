document.addEventListener('DOMContentLoaded', function () {
    const colorInputs = [
        { color: document.getElementById('primary-color'), text: document.getElementById('primary-color-text'), sample: document.getElementById('primary-color-sample') },
        { color: document.getElementById('secondary-color'), text: document.getElementById('secondary-color-text'), sample: document.getElementById('secondary-color-sample') },
        { color: document.getElementById('background-color'), text: document.getElementById('background-color-text') },
        { color: document.getElementById('link-color'), text: document.getElementById('link-color-text') },
        { color: document.getElementById('text-color'), text: document.getElementById('text-color-text') }
    ];
    const fontFamilySelect = document.getElementById('font-family');
    const body = document.body;
    const sampleText = document.getElementById('sample-text');
    const sampleButton = document.getElementById('sample-button');
    const sampleLink = document.getElementById('sample-link');

    function updateStyles() {
        body.style.backgroundColor = colorInputs[2].color.value;
        body.style.color = colorInputs[4].color.value;
        body.style.fontFamily = fontFamilySelect.value;

        colorInputs[0].sample.style.backgroundColor = colorInputs[0].color.value;
        colorInputs[1].sample.style.backgroundColor = colorInputs[1].color.value;

        // Update button colors
        document.getElementById('primary-button').style.backgroundColor = colorInputs[0].color.value;
        document.getElementById('secondary-button').style.backgroundColor = colorInputs[1].color.value;
        document.getElementById('outline-button').style.borderColor = colorInputs[0].color.value;
        document.getElementById('outline-button').style.color = colorInputs[0].color.value;

        // Keep the sample button using primary color
        sampleButton.style.backgroundColor = colorInputs[0].color.value;
        sampleButton.style.color = colorInputs[4].color.value;

        sampleLink.style.color = colorInputs[3].color.value;
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
