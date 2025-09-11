const barraDePesquisa = document.querySelector('#exampleDataList');
const areaResultados = document.querySelector('.results__pesquisa');

barraDePesquisa.addEventListener('input', buscarTarefas);

function buscarTarefas() {
  const valor = barraDePesquisa.value.toLowerCase();
  const tarefas = document.querySelectorAll('.cardItem');
  let encontrou = false;

  tarefas.forEach(tarefa => {
    const label = tarefa.querySelector('label');
    if (!label) return;

    const texto = label.textContent.toLowerCase();
    if (texto.includes(valor)) {
      tarefa.style.display = 'flex';
      encontrou = true;
    } else {
      tarefa.style.display = 'none';
    }
  });

  areaResultados.textContent = valor !== ''
    ? (encontrou ? `"${valor}" encontrado(s).` : `Nenhuma tarefa encontrada para: "${valor}".`)
    : '';
}