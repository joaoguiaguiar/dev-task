import { todasTarefas, mostrarPagina } from './listaTarefas.js';

const btnCriar = document.querySelector('.btn.btn-primary');
const nomeTarefa = document.querySelector('#taskName');
const descricaoTarefa = document.querySelector('#taskDescription');
const radiosPrioridade = document.getElementsByName('drone');

function getPrioridadeSelecionada() {
  for (let radio of radiosPrioridade) {
    if (radio.checked) return radio.nextElementSibling.textContent;
  }
  return 'Não definida';
}

function cadastrarTarefa() {
  const nome = nomeTarefa.value.trim();
  const descricao = descricaoTarefa.value.trim();
  const prioridade = getPrioridadeSelecionada();

  if (nome === '') {
    alert('Preencha o nome da tarefa!');
    return;
  }

  const novaTarefa = {
    id: `nova-${Date.now()}`,
    tarefa: nome, 
    descricao,
    prioridade,
    concluida: false
  };

  todasTarefas.unshift(novaTarefa);
  mostrarPagina();

  nomeTarefa.value = '';
  descricaoTarefa.value = '';
  radiosPrioridade[0].checked = true;
}


btnCriar.addEventListener('click', cadastrarTarefa);
