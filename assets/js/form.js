document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#contact-form form');
  if (!form) return;
  const formStatus = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.classList.remove('hidden', 'bg-red-100', 'text-red-700');
        formStatus.classList.add('bg-green-100', 'text-green-700');
        formStatus.innerHTML = 'Message sent successfully! I\'ll get back to you soon.';
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      formStatus.classList.remove('hidden', 'bg-green-100', 'text-green-700');
      formStatus.classList.add('bg-red-100', 'text-red-700');
      formStatus.innerHTML = 'Oops! Something went wrong. Please try again later.';
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
});

