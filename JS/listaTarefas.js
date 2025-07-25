async function carregarDados() {
  try {
    const conexao = await fetch('../backend/db.json');
    const dados = await conexao.json();
    console.table(dados);
    return dados;
  } catch (erro) {
    console.error("Erro ao carregar JSON:", erro);
    throw erro;
  }
}

async function exibirTarefas() {
  const tarefas = await carregarDados();
  const containerLista = document.querySelector('#lista__de__tarefas');

  tarefas.forEach(tarefa => {
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

    if (checkbox.checked) {
      label.style.textDecoration = 'line-through';
    }

    checkbox.addEventListener('change', () => {
      if (!checkbox.checked) {
        li.remove(); 
      } else {
        label.style.textDecoration = 'line-through';
      }
    });

    containerCheckbox.appendChild(checkbox);
    containerCheckbox.appendChild(label);

    const containerIcon = document.createElement('article');
    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-x');
    icon.style.cursor = 'pointer';

    icon.addEventListener('click', () => {
      li.remove();
    });

    containerIcon.appendChild(icon);

    li.appendChild(containerCheckbox);
    li.appendChild(containerIcon);
    containerLista.appendChild(li);
  });
}

exibirTarefas();
