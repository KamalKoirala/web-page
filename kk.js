document.addEventListener("DOMContentLoaded", function () {
    // Automatically show university section on page load
    showSection('university');

    function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.education-block').forEach(section => {
            section.classList.remove('active');
        });

        // Show the selected section
        document.getElementById(sectionId).classList.add('active');

        // Remove active class from all buttons
        document.querySelectorAll('.button-container button').forEach(button => {
            button.classList.remove('active');
        });

        // Add active class to the clicked button
        document.querySelector(`button[data-section="${sectionId}"]`).classList.add('active');
    }

    // Add click event listeners to buttons
    document.querySelectorAll('.button-container button').forEach(button => {
        button.addEventListener('click', function () {
            showSection(this.getAttribute('data-section'));
        });
    });
});
