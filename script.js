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
    const boardNameInput = document.getElementById('board-name');
    const boardDescriptionInput = document.getElementById('board-description');
    const boardNameDisplay = document.querySelector('.bg-white h2');
    const boardDescriptionDisplay = document.getElementById('sample-text');
    const topLeftBoardName = document.querySelector('.grid-cols-3 .bg-white h2');
    const topLeftBoardDescription = document.querySelector('.grid-cols-3 .bg-white p');

    function updateStyles() {
        body.style.backgroundColor = colorInputs[2].color.value;
        body.style.color = colorInputs[4].color.value;
        body.style.fontFamily = fontFamilySelect.value;

        colorInputs[0].sample.style.backgroundColor = colorInputs[0].color.value;
        colorInputs[1].sample.style.backgroundColor = colorInputs[1].color.value;

        // Update link color
        document.querySelectorAll('a').forEach(link => {
            link.style.color = colorInputs[3].color.value;
        });

        // Update color swatches
        document.getElementById('primary-swatch').style.backgroundColor = colorInputs[0].color.value;
        document.getElementById('secondary-swatch').style.backgroundColor = colorInputs[1].color.value;
        document.getElementById('light-bg-swatch').style.backgroundColor = colorInputs[2].color.value;
        document.getElementById('dark-bg-swatch').style.backgroundColor = colorInputs[4].color.value;

        // Update hex codes
        document.getElementById('primary-hex').textContent = colorInputs[0].color.value;
        document.getElementById('secondary-hex').textContent = colorInputs[1].color.value;
        document.getElementById('background-hex').textContent = colorInputs[2].color.value;
        document.getElementById('text-hex').textContent = colorInputs[4].color.value;

        // Update button colors and add hover effects
        const primaryButton = document.getElementById('primary-button');
        const secondaryButton = document.getElementById('secondary-button');
        const outlineButton = document.getElementById('outline-button');

        primaryButton.style.backgroundColor = colorInputs[0].color.value;
        secondaryButton.style.backgroundColor = colorInputs[1].color.value;
        outlineButton.style.borderColor = colorInputs[0].color.value;
        outlineButton.style.color = colorInputs[0].color.value;

        // Add hover effects
        [primaryButton, secondaryButton, outlineButton, sampleButton].forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (this === primaryButton || this === sampleButton) {
                    this.style.backgroundColor = colorInputs[1].color.value; // Use secondary color on hover
                } else if (this === secondaryButton) {
                    this.style.backgroundColor = colorInputs[0].color.value; // Use primary color on hover
                } else if (this === outlineButton) {
                    this.style.backgroundColor = colorInputs[0].color.value;
                    this.style.color = colorInputs[2].color.value; // Use background color for text
                }
            });

            button.addEventListener('mouseleave', function() {
                if (this === primaryButton || this === sampleButton) {
                    this.style.backgroundColor = colorInputs[0].color.value; // Revert to primary color
                } else if (this === secondaryButton) {
                    this.style.backgroundColor = colorInputs[1].color.value; // Revert to secondary color
                } else if (this === outlineButton) {
                    this.style.backgroundColor = 'transparent';
                    this.style.color = colorInputs[0].color.value; // Revert to primary color for text
                }
            });
        });

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
            updateBoardInfo();
        });
        input.text.addEventListener('input', () => {
            updateColorInput(input.color, input.text);
            updateBoardInfo();
        });
    });

    fontFamilySelect.addEventListener('change', () => {
        updateStyles();
        updateBoardInfo();
    });

    // Initial update
    updateStyles();
    updateBoardInfo();

    function updateBoardInfo() {
        const boardName = boardNameInput.value;
        const boardDescription = boardDescriptionInput.value;
        
        // Update all instances of board name
        document.querySelectorAll('.board-name').forEach(el => {
            el.textContent = boardName;
        });
        
        // Update all instances of board description
        document.querySelectorAll('.board-description').forEach(el => {
            el.textContent = boardDescription;
        });
    }

    boardNameInput.addEventListener('input', updateBoardInfo);
    boardDescriptionInput.addEventListener('input', updateBoardInfo);

    // Call updateBoardInfo when updating styles
    function updateAll() {
        updateStyles();
        updateBoardInfo();
    }

    // Replace updateStyles with updateAll in all event listeners
    colorInputs.forEach(input => {
        input.color.addEventListener('input', () => {
            updateTextInput(input.color, input.text);
            updateAll();
        });
        input.text.addEventListener('input', () => {
            updateColorInput(input.color, input.text);
            updateAll();
        });
    });

    fontFamilySelect.addEventListener('change', updateAll);

    // Initial update
    updateAll();
});
