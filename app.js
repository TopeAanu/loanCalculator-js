// Listen for submit
document.getElementById('form').addEventListener('submit', function(e){

  // Hide results
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loader').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();

});

// Calculate results (submit_btn)
function calculateResults(){

  // Define Variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // Define principal, compute interest & years
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';

    // // Hide loader
    document.getElementById('loader').style.display = 'none';

  } else {
    showError('Error! Check your numbers.'); 
  }

}

// Create error message
function showError(error){

  // // Hide results
  document.getElementById('results').style.display = 'none';

  // // Hide loader
  document.getElementById('loader').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const container = document.querySelector('.container');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert-error';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  container.insertBefore(errorDiv, heading);

  // Clear error after 2 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
  document.querySelector('.alert-error').remove();
}