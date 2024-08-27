document.addEventListener('DOMContentLoaded', function() {
    let i1;
    let i2
    let i3
    let i4
    let exempt
    let taxableamm
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
    
    console.log('Taxable Income:', taxableamm); 

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
    var calcbtn = document.querySelector('#calcbtn')
    calcbtn.addEventListener('click', function() {
        if (document.querySelector('#gross-inocme')) {
            var grossinocme = parseFloat(document.querySelector('#gross-inocme').value);
            var rentalinocme = parseFloat(document.querySelector('#rental-inocme').value);
            var interestinocme = parseFloat(document.querySelector('#interest-inocme').value);
            var otherinocme = parseFloat(document.querySelector('#other-inocme').value);
            var exemptions = parseFloat(document.querySelector('#exempt-allowances').value);
            i1 = grossinocme;
            i2 = rentalinocme;
            i3 = interestinocme;
            i4 = otherinocme;
            exempt = exemptions
            taxableamm = (i1+i2+i3+i4)-exempt
            console.log('Taxable Income:', taxableamm);
            var result = document.querySelector('#tax-to-pay')
            result.textContent = (taxableamm)
        }
        else {
            console.log("NO CONTENT FOUND")
        }        
    })


});
