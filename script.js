document.addEventListener('DOMContentLoaded', function() {
    const primaryColorInput = document.getElementById('primary-color');
    const secondaryColorInput = document.getElementById('secondary-color');
    const fontFamilySelect = document.getElementById('font-family');

    function updateStyles() {
        document.documentElement.style.setProperty('--primary-color', primaryColorInput.value);
        document.documentElement.style.setProperty('--secondary-color', secondaryColorInput.value);
        document.documentElement.style.setProperty('--font-family', fontFamilySelect.value);
    }

    primaryColorInput.addEventListener('input', updateStyles);
    secondaryColorInput.addEventListener('input', updateStyles);
    fontFamilySelect.addEventListener('change', updateStyles);
});
