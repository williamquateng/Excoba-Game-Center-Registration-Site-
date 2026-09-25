const form = document.getElementById('registrationForm');
const membershipSelect = document.getElementById('membership');
const totalPriceDisplay = document.getElementById('totalPrice');
const summaryText = document.getElementById('summaryText');
const formMessage = document.getElementById('formMessage');

function updateSummary() {
  const membershipValue = Number(membershipSelect.value || 0);
  const baseLabel = membershipSelect.options[membershipSelect.selectedIndex]?.text || 'Guest';

  totalPriceDisplay.textContent = `$${membershipValue}`;
  summaryText.textContent = `${baseLabel} membership selected — registration is free`;
}

membershipSelect.addEventListener('change', updateSummary);
updateSummary();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const fullName = (formData.get('fullName') || '').toString().trim();
  const email = (formData.get('email') || '').toString().trim();
  const day = (formData.get('day') || '').toString().trim();

  if (!fullName || !email || !day) {
    formMessage.textContent = 'Please complete the required fields before submitting.';
    formMessage.style.color = '#ffb648';
    return;
  }

  const perks = formData.getAll('perks');
  const selectedPlan = membershipSelect.options[membershipSelect.selectedIndex]?.text || 'Guest';

  formMessage.style.color = '#2ce4c3';
  formMessage.textContent = `Thanks, ${fullName}! Your ${selectedPlan} registration has been received free of charge. We’ll send your confirmation to ${email}.`;

  if (perks.length) {
    formMessage.textContent += ` Selected perks: ${perks.join(', ')}.`;
  }

  form.reset();
  membershipSelect.value = '19';
  updateSummary();
});
