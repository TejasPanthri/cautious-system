document.addEventListener('DOMContentLoaded', function() {
    let i1, i2, i3, i4;
    let basicdeductions, medicalinsurance, homeloan, educationloaninterest, savingsbankinterest, NPS, charity;
    let grossincome, exempt, oldtaxableamm, newtaxableamm, deductions, tax;

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
    
    console.log('Taxable Income:', oldtaxableamm); 

    // Adding menu code:
    var menu = document.querySelector('#menu');

    menu.addEventListener('click', function() {
        var navigation = document.querySelector('.navigation');
        var displayStyle = window.getComputedStyle(navigation).display;
        var overlay = document.querySelector('.overlay');
        var twobuttons = document.querySelectorAll('.btn');
    
        if (displayStyle === "none") {
            navigation.style.display = "flex";
            overlay.style.backgroundColor = "#00000036";
            
            twobuttons.forEach(function(button) {  // Iterate over each button
                button.style.backgroundColor = "#C3C4C5";
            });
        } else if (displayStyle === "flex") {
            navigation.style.display = "none";
            overlay.style.removeProperty('background-color');
            
            twobuttons.forEach(function(button) {  // Iterate over each button
                button.style.backgroundColor = "#F7F8FA";
            });
        }
        console.log("menu button pressed");
    });
    
    // #adding calculate button code
    var calcbtn = document.querySelector('#calcbtn');
    calcbtn.addEventListener('click', function() {
        if (document.querySelector('#salary')) {
            var salary = parseFloat(document.querySelector('#salary').value) || 0;
            var rentalinocme = parseFloat(document.querySelector('#rental-inocme').value) || 0;
            var interestinocme = parseFloat(document.querySelector('#interest-inocme').value) || 0;
            var otherinocme = parseFloat(document.querySelector('#other-inocme').value) || 0;
            exempt = parseFloat(document.querySelector('#exempt-allowances').value) || 0;
            
            // Income
            i1 = salary;
            i2 = rentalinocme;
            i3 = interestinocme;
            i4 = otherinocme;

            // Deductions
            basicdeductions = parseFloat(document.querySelector('#basicdeductions').value) || 0;
            medicalinsurance = parseFloat(document.querySelector('#medicalinsurance').value) || 0;
            homeloan = parseFloat(document.querySelector('#homeloan').value) || 0;
            educationloaninterest = parseFloat(document.querySelector('#educationloan').value) || 0;
            savingsbankinterest = parseFloat(document.querySelector('#savingsbankinterest').value) || 0;
            NPS = parseFloat(document.querySelector('#NPS').value) || 0;
            charity = parseFloat(document.querySelector('#charity').value) || 0;            
            
            // Adding Limits
            basicdeductions = Math.min(basicdeductions, 150000);
            NPS = Math.min(NPS, 50000);
            savingsbankinterest = Math.min(savingsbankinterest, 10000);
            homeloan = Math.min(homeloan, 150000);

            // Formulae
            var fiftyk = 50000;
            var seventyfivek = 75000;
            deductions = (exempt + basicdeductions + homeloan + educationloaninterest + savingsbankinterest + NPS + charity);
            grossincome = (i1 + i2 + i3 + i4);
            oldtaxableamm = grossincome - (deductions+fiftyk);
            newtaxableamm = grossincome - (deductions+seventyfivek);

            // Display Results
            var TGI = document.querySelector('#bm1');
            var TGIper = document.querySelector('#cm1');
            var TD = document.querySelector('#bm2');
            var TDper = document.querySelector('#cm2');
            var NTAI = document.querySelector('#bm3'); // Changed to a different ID
            var NTAper = document.querySelector('#cm3'); // Changed to a different ID

            TGI.textContent = formatNumberToIndianCurrency(grossincome);
            TGIper.textContent = '100%';
            TD.textContent = formatNumberToIndianCurrency(deductions);
            TDper.textContent = `${((deductions / grossincome) * 100).toFixed(2)}%`;
            NTAI.textContent = formatNumberToIndianCurrency(oldtaxableamm);
            NTAper.textContent = `${((oldtaxableamm / grossincome) * 100).toFixed(2)}%`;

            // INDIAN CURRENCY CONVERTER:
            function formatNumberToIndianCurrency(number) {
                return number.toLocaleString('en-IN');
            }
            
            var newtax
            // Adding tax slabs logic:
            var finalresult = document.querySelector('#tax-to-pay');
            if (oldtaxableamm <= 250000) {
                if (tax <= 0){
                    tax = "NO TAX!"
                }
                finalresult.textContent = 'NO TAX!';
            } else if (oldtaxableamm <= 500000) {
                oldtax = (oldtaxableamm - 250000) * 0.05;
                oldtax = oldtax-12500
                if (oldtax <= 0){
                    oldtax = "NO TAX!"
                }
                finalresult.textContent = `₹${formatNumberToIndianCurrency(oldtax)}`;
            } else if (oldtaxableamm <= 750000) {
                oldtax = (250000 * 0.05) + (oldtaxableamm - 500000) * 0.20;
                newtax = (250000 * 0.05) + (newtaxableamm - 500000) * 0.10;
                if (oldtax <= 0){
                    oldtax = "NO TAX!"
                }
                finalresult.textContent = `₹${formatNumberToIndianCurrency(oldtax)}`;
            } else if (oldtaxableamm <= 1000000) {
                oldtax = (250000 * 0.05) + (250000 * 0.10) + (oldtaxableamm - 750000) * 0.20;
                newtax = (250000 * 0.05) + (250000 * 0.10) + (newtaxableamm - 750000) * 0.15;
                finalresult.textContent = `₹${formatNumberToIndianCurrency(oldtax)}`;
            } else if (oldtaxableamm <= 1250000) {
                oldtax = (250000 * 0.05) + (250000 * 0.10) + (250000 * 0.15) + (oldtaxableamm - 1000000) * 0.20;
                newtax = (250000 * 0.05) + (250000 * 0.10) + (250000 * 0.15) + (newtaxableamm - 1000000) * 0.30;
                finalresult.textContent = `₹${formatNumberToIndianCurrency(oldtax)}`;
            } else if (oldtaxableamm <= 1500000) {
                oldtax = (250000 * 0.05) + (250000 * 0.10) + (250000 * 0.15) + (250000 * 0.20) + (oldtaxableamm - 1250000) * 0.25;
                newtax = (250000 * 0.05) + (250000 * 0.10) + (250000 * 0.15) + (250000 * 0.20) + (newtaxableamm - 1250000) * 0.30;
                finalresult.textContent = `₹${formatNumberToIndianCurrency(oldtax)}`;
            } else {
                oldtax = (250000 * 0.05) + (250000 * 0.10) + (250000 * 0.15) + (250000 * 0.20) + (250000 * 0.25) + (oldtaxableamm - 1500000) * 0.30;
                newtax = (250000 * 0.05) + (250000 * 0.10) + (250000 * 0.15) + (250000 * 0.20) + (250000 * 0.25) + (newtaxableamm - 1500000) * 0.30;
                finalresult.textContent = `₹${formatNumberToIndianCurrency(oldtax)}`;
            }

            console.log('deductions:', deductions);
            console.log('Old Taxable Income:', oldtaxableamm);

            //Adding summary logic:
            var summary = document.querySelector('.summary');
            if (tax === "NO TAX!" || tax <= 0) {
                summary.textContent = 'No need to pay taxes, you are exempt!';
            } else if (oldtax > newtax) {
                summary.textContent = `Tax to pay in the new tax regime: ₹${formatNumberToIndianCurrency(newtax)}. Tax to pay in the old tax regime: ₹${formatNumberToIndianCurrency(oldtax)}. You can save ₹${formatNumberToIndianCurrency(oldtax - newtax)} by opting for the new tax regime this year.`;
            } else if (oldtax < newtax) {
                summary.textContent = `Tax to pay in the old tax regime: ₹${formatNumberToIndianCurrency(oldtax)}. Tax to pay in the new tax regime: ₹${formatNumberToIndianCurrency(newtax)}. You can save ₹${formatNumberToIndianCurrency(newtax - oldtax)} by opting for the old tax regime this year.`;
            }
        } else {
            console.log("NO CONTENT FOUND");
        }        
    });
});
         
