//Listen for submit

document.getElementById('loan-form').addEventListener('submit', function(e){

     // hide results
     document.getElementById('results').style.display = 'none';
    //show loader
    
       document.getElementById('loading').style.display = 'block';
       setTimeout(calculateResults, 2000);



     e.preventDefault();
});

//Calculate Resuslte
function calculateResults(e){
  console.log('calculating....');

  // UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const year = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calcuatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(year.value) * 12;


  //compute monthly payment
  const x = Math.pow(1 + calcuatedInterest, calculatedPayments);
  const monthly = (principal*x*calcuatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) -principal).toFixed(2);
     //show result
     document.getElementById('results').style.display = 'block';
     //hide the loader
      document.getElementById('loading').style.display = 'none';
  }else{
     
    showError('Plaese check your numbers');
  }


}

function showError(error) {

  // create a div
  const errorDiv = document.createElement('div');
  //get element

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading')
  //add a class
  errorDiv.className = 'alert alert-danger';
  //create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
 // Insert error obove heading
 card.insertBefore(errorDiv, heading);
  document.getElementById('loading').style.display = 'none';
 //clear error after 3 seconds
 setTimeout(clearError, 3000);  
  
}

//clear error

function clearError() {

  document.querySelector('.alert').remove();
  
}