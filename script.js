document.addEventListener('DOMContentLoaded', function() {
    const primaryColorInput = document.getElementById('primary-color');
    const secondaryColorInput = document.getElementById('secondary-color');
    const fontFamilySelect = document.getElementById('font-family');
    const backgroundColorInput = document.getElementById('background-color');
    const linkColorInput = document.getElementById('link-color');

    function updateStyles() {
        document.documentElement.style.setProperty('--primary-color', primaryColorInput.value);
        document.documentElement.style.setProperty('--secondary-color', secondaryColorInput.value);
        document.documentElement.style.setProperty('--font-family', fontFamilySelect.value);
        document.documentElement.style.setProperty('--background-color', backgroundColorInput.value);
        document.documentElement.style.setProperty('--link-color', linkColorInput.value);
    }

    primaryColorInput.addEventListener('input', updateStyles);
    secondaryColorInput.addEventListener('input', updateStyles);
    fontFamilySelect.addEventListener('change', updateStyles);
    backgroundColorInput.addEventListener('input', updateStyles);
    linkColorInput.addEventListener('input', updateStyles);

    // Initial update
    updateStyles();
});
