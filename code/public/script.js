document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fitnessForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const age = document.getElementById('age').value;
        const weight = document.getElementById('weight').value;
        const height = document.getElementById('height').value;
        const goal = document.getElementById('goal').value;
        const diet = Array.from(document.getElementsByName('diet'))
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
        const exercise = Array.from(document.getElementsByName('exercise'))
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        const formData = {
            age: age,
            weight: weight,
            height: height,
            goal: goal,
            diet: diet,
            exercise: exercise
        };
        console.log(formData)
        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const result = await response.text();
            document.getElementById('fitnessPlan').innerHTML = `${result}`;
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    });
});
