// Seleção dos elementos do DOM
const userForm = document.getElementById('userForm');
const userTableBody = document.getElementById('userTableBody');
const searchInput = document.getElementById('search');

// Função para carregar usuários do LocalStorage (ou iniciar vazio)
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// FUNÇÃO: Salvar ou Alterar Usuário
userForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede a página de recarregar

    const index = document.getElementById('editIndex').value;

    const novoUsuario = {
        cpf: document.getElementById('cpf').value,
        nome: document.getElementById('nome').value,
        dataNasc: document.getElementById('dataNasc').value,
        email: document.getElementById('email').value
    };

    if (index === "") {
        // Incluir novo
        usuarios.push(novoUsuario);
    } else {
        // Alterar existente
        usuarios[index] = novoUsuario;
        document.getElementById('editIndex').value = "";
        document.getElementById('btnSalvar').innerText = "Salvar Usuário";
    }

    salvarEAtualizar();
    userForm.reset();
});

// FUNÇÃO: Listar e Pesquisar Usuários
function listarUsuarios() {
    userTableBody.innerHTML = ''; // Limpa a tabela antes de renderizar
    const filtro = searchInput.value.toLowerCase();

    usuarios.forEach((user, index) => {
        // Lógica de pesquisa por nome
        if (user.nome.toLowerCase().includes(filtro)) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.cpf}</td>
                <td>${user.nome}</td>
                <td>${user.dataNasc}</td>
                <td>${user.email}</td>
                <td>
                    <div class="acoes-buttons">
                        <button class="btn-edit" onclick="prepararEdicao(${index})">Editar</button>
                        <button class="btn-delete" onclick="excluirUsuario(${index})">Excluir</button>
                    </div>
                </td>
            `;
            userTableBody.appendChild(tr);
        }
    });
}

// FUNÇÃO: Preparar os campos para edição
function prepararEdicao(index) {
    const user = usuarios[index];
    document.getElementById('cpf').value = user.cpf;
    document.getElementById('nome').value = user.nome;
    document.getElementById('dataNasc').value = user.dataNasc;
    document.getElementById('email').value = user.email;

    document.getElementById('editIndex').value = index;
    document.getElementById('btnSalvar').innerText = "Atualizar Dados";
}

// FUNÇÃO: Excluir Usuário
function excluirUsuario(index) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
        usuarios.splice(index, 1); // Remove 1 item na posição index
        salvarEAtualizar();
    }
}

// FUNÇÃO: Salvar no LocalStorage e renderizar a tela
function salvarEAtualizar() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    listarUsuarios();
}

// Inicia a lista ao carregar a página
listarUsuarios();

const toggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Verifica se o usuário já tinha uma preferência salva
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

//modo escuro

const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Função para atualizar o ícone do botão
function atualizarIcone(tema) {
    if (tema === 'dark') {
        // Se está escuro, botão oferece voltar para o Claro
        themeToggle.innerHTML = `<span>☀️</span><small>Modo Claro</small>`;
    } else {
        // Se está claro, botão oferece ir para o Escuro
        themeToggle.innerHTML = `<span>🌙</span><small>Modo Escuro</small>`;
    }
}

// Verifica preferência salva
const temaSalvo = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', temaSalvo);
atualizarIcone(temaSalvo);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    atualizarIcone(newTheme);
});