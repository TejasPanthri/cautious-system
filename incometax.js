document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling; // Selects the next sibling of the button

            if (content && content.classList.contains('content')) {
                content.classList.toggle('content-clicked');
                console.log('Button clicked, content toggled.');
            } else {
                console.log('No content found to toggle.');
            }
        });
    });
});
