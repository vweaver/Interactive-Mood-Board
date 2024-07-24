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
    const sampleButton = document.getElementById('sample-button');
    const sampleLink = document.getElementById('sample-link');
    const boardNameInput = document.getElementById('board-name-control');
    const boardDescriptionInput = document.getElementById('board-description-control');


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
        [primaryButton, secondaryButton, outlineButton].forEach(button => {
            if (button) {
                button.addEventListener('mouseenter', function () {
                    if (this === primaryButton) {
                        this.style.backgroundColor = colorInputs[1].color.value; // Use secondary color on hover
                    } else if (this === secondaryButton) {
                        this.style.backgroundColor = colorInputs[0].color.value; // Use primary color on hover
                    } else if (this === outlineButton) {
                        this.style.backgroundColor = colorInputs[0].color.value;
                        this.style.color = colorInputs[2].color.value; // Use background color for text
                    }
                });

                button.addEventListener('mouseleave', function () {
                    if (this === primaryButton) {
                        this.style.backgroundColor = colorInputs[0].color.value; // Revert to primary color
                    } else if (this === secondaryButton) {
                        this.style.backgroundColor = colorInputs[1].color.value; // Revert to secondary color
                    } else if (this === outlineButton) {
                        this.style.backgroundColor = 'transparent';
                        this.style.color = colorInputs[0].color.value; // Revert to primary color for text
                    }
                });
            }
        });

        // Update sample button if it exists
        if (sampleButton) {
            sampleButton.style.backgroundColor = colorInputs[0].color.value;
            sampleButton.style.color = colorInputs[4].color.value;
        }

        // Update sample link if it exists
        if (sampleLink) {
            sampleLink.style.color = colorInputs[3].color.value;
        }
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

        console.log('Updating board info:');
        console.log('Board Name:', boardName);
        console.log('Board Description:', boardDescription);

        // Update board title
        const boardTitle = document.getElementById('board-title');
        if (boardTitle) {
            boardTitle.textContent = boardName;
            console.log('Updated board title');
        } else {
            console.error('Board title element not found');
        }

        // Update board description
        const boardDesc = document.getElementById('board-description');
        if (boardDesc) {
            boardDesc.textContent = boardDescription;
            console.log('Updated board description');
        } else {
            console.error('Board description element not found');
        }
    }

    function updateBoardDetails() {
        const boardTitle = document.getElementById('board-title');
        const boardDescription = document.getElementById('board-description');

        boardTitle.textContent = boardNameInput.value;
        boardDescription.textContent = boardDescriptionInput.value;
    }

    boardNameInput.addEventListener('input', function () {
        console.log('Board name input event triggered');
        updateAll();
    });
    boardDescriptionInput.addEventListener('input', function () {
        console.log('Board description input event triggered');
        updateAll();
    });

    // Call updateBoardInfo when updating styles
    function updateAll() {
        console.log('updateAll function called');
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
