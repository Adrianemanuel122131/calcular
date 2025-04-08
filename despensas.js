let contagemDespesas = 0;
let chart = null;

function adicionarDespesa() {
  contagemDespesas++;
  const container = document.getElementById('despesas-container');

  const div = document.createElement('div');
  div.className = 'campo';

  const label = document.createElement('label');
  label.textContent = `Despesa ${contagemDespesas}:`;

  const input = document.createElement('input');
  input.type = 'number';
  input.className = 'despesa';
  input.placeholder = 'Digite o valor';
  input.min = '0';

  const btnRemover = document.createElement('button');
  btnRemover.textContent = 'Remover';
  btnRemover.className = 'remover';
  btnRemover.onclick = () => {
    container.removeChild(div);
    atualizarNumeracao();
  };

  div.appendChild(label);
  div.appendChild(input);
  div.appendChild(btnRemover);
  container.appendChild(div);
}

function atualizarNumeracao() {
  const labels = document.querySelectorAll('#despesas-container label');
  labels.forEach((label, index) => {
    label.textContent = `Despesa ${index + 1}:`;
  });
  contagemDespesas = labels.length;
}

function calcular() {
  const salario = parseFloat(document.getElementById('salario').value) || 0;
  const despesas = document.querySelectorAll('.despesa');
  let totalDespesas = 0;

  despesas.forEach(input => {
    totalDespesas += parseFloat(input.value) || 0;
  });

  const saldo = salario - totalDespesas;

  document.getElementById('resultado').innerText = `Saldo final: R$ ${saldo.toFixed(2)}`;
  gerarGrafico(salario, totalDespesas, saldo);
}

function gerarGrafico(salario, despesas, saldo) {
  const ctx = document.getElementById('grafico').getContext('2d');

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Salário', 'Despesas', 'Saldo'],
      datasets: [{
        label: 'R$',
        data: [salario, despesas, saldo],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
