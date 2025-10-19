const numbers = document.querySelectorAll('.digit'); 
const calc_screen = document.querySelector('#text');
const equalsBtn = document.querySelector('#equals-to'); 
const clearBtn = document.querySelector('#clear'); 
const powerBtn = document.querySelector('#power');
const sqrtBtn = document.querySelector('#square-root');

numbers.forEach((numberBtn) => {
  numberBtn.addEventListener('click', () => {
    const numValue = numberBtn.innerText;
    const currentText = calc_screen.innerText;

    if (currentText === "0") {
      if (["+", "-", "×", "÷", "xy", "C", "√x", "%"].includes(numValue)) return;
      if (numValue === ".") {
        calc_screen.innerText = "0.";
        return;
      }
      calc_screen.innerText = numValue;
      return;
    }

    if (numValue === ".") {
      const lastNumber = currentText.split(/[\+\-\×\÷]/).pop();
      if (lastNumber.includes(".")) return;
      calc_screen.innerText += ".";
      return;
    }

    calc_screen.innerText += numValue;
  });
});

clearBtn.addEventListener('click', () => {
  calc_screen.innerText = "0";
});

powerBtn.addEventListener('click', () => {
  const currentText = calc_screen.innerText;
  calc_screen.innerText = currentText + "^";
});

sqrtBtn.addEventListener('click', () => {
  let currentText = calc_screen.innerText;

  try {
    const value = eval(currentText.replace(/×/g, '*').replace(/÷/g, '/'));
    calc_screen.innerText = Math.sqrt(value);
  } catch {
    calc_screen.innerText = "Error";
  }
});

equalsBtn.addEventListener('click', () => {
  let expression = calc_screen.innerText;

  expression = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '**');

  expression = expression.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

  try {
    const result = eval(expression);
    calc_screen.innerText = result;
  } catch {
    calc_screen.innerText = "Error";
  }
});