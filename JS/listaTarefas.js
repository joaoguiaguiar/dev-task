let paginaAtual = 0;
const tamanhoPagina = 4;
let todasTarefas = [];

async function carregarDados() {
  try {
    const conexao = await fetch('../backend/db.json');
    const dados = await conexao.json();
    todasTarefas = dados;
    mostrarPagina();
  } catch (erro) {
    console.error("Erro ao carregar JSON:", erro);
  }
}

function mostrarPagina() {
  const containerLista = document.querySelector('#lista__de__tarefas');
  containerLista.innerHTML = '';

  const inicio = paginaAtual * tamanhoPagina;
  const fim = inicio + tamanhoPagina;
  const pagina = todasTarefas.slice(inicio, fim);

  pagina.forEach(tarefa => {
    const li = document.createElement('li');
    li.classList.add('cardItem');

    const containerCheckbox = document.createElement('article');
    containerCheckbox.classList.add('container__grupChackbox');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = tarefa.id;
    checkbox.name = tarefa.id;
    checkbox.checked = tarefa.concluida;

    const label = document.createElement('label');
    label.htmlFor = tarefa.id;
    label.textContent = tarefa.tarefa;
    if (checkbox.checked) label.style.textDecoration = 'line-through';

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        label.style.textDecoration = 'line-through';
      } else {
        label.style.textDecoration = 'none';
      }
    });


    containerCheckbox.appendChild(checkbox);
    containerCheckbox.appendChild(label);

    const containerIcon = document.createElement('article');
    containerIcon.classList.add('d-flex', 'gap-2');

    const btnVerMais = document.createElement('button');
    btnVerMais.textContent = '🔎 Ver mais';
    btnVerMais.classList.add('btn', 'btn-sm', 'btn-secondary');
    btnVerMais.setAttribute('data-bs-toggle', 'modal');
    btnVerMais.setAttribute('data-bs-target', '#modalTarefa');
    btnVerMais.addEventListener('click', () => {
      document.querySelector('#modalTitulo').textContent = tarefa.tarefa;
      document.querySelector('#modalDescricao').textContent = tarefa.descricao || 'Sem descrição';
      document.querySelector('#modalPrioridade').textContent = tarefa.prioridade || 'Não definida';
    });

    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-x');
    icon.style.cursor = 'pointer';
    icon.addEventListener('click', () => li.remove());

    containerIcon.appendChild(btnVerMais);
    containerIcon.appendChild(icon);

    li.appendChild(containerCheckbox);
    li.appendChild(containerIcon);
    containerLista.appendChild(li);
  });

  const btnPrev = document.querySelector('#btnPrev');
  btnPrev.disabled = paginaAtual === 0;
}

document.querySelector('#btnNext').addEventListener('click', () => {
  const totalPaginas = Math.ceil(todasTarefas.length / tamanhoPagina);
  if (paginaAtual < totalPaginas - 1) {
    paginaAtual++;
    mostrarPagina();
  }
});

document.querySelector('#btnPrev').addEventListener('click', () => {
  if (paginaAtual > 0) {
    paginaAtual--;
    mostrarPagina();
  }
});

carregarDados();

export { todasTarefas, mostrarPagina };
