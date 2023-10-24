import { lerLocalStorage, catalogo, salvarLocalStorage } from './utilidades';

const carrinho = document.getElementById('carrinho');
const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

function abrirCarrinho() {
  carrinho.classList.remove('right-[-360px]');
  carrinho.classList.add('right-0');
}

function fecharCarrinho() {
  carrinho.classList.remove('right-0');
  carrinho.classList.add('right-[-360px]');
}

function irParaCheckOut() {
  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    return;
  }
  window.location.href = './checkout.html';
}

export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById('fechar-carrinho');
  const botaoAbrirCarrinho = document.getElementById('abrir-carrinho');
  const botaoIrParaCheckout = document.getElementById('finalizar-compra');

  botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
  botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
  botaoIrParaCheckout.addEventListener('click', irParaCheckOut);
}
function removerProdutoCarrinho(idProduto) {
  delete idsProdutoCarrinhoComQuantidade[idProduto];
  renderizarProdutosCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutoCarrinhoComQuantidade[idProduto]++;
  atualizarInformacaoQuantidade(idProduto);
}
function decrementarQuantidadeProduto(idProduto) {
  if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
    removerProdutoCarrinho(idProduto);
  } else {
    idsProdutoCarrinhoComQuantidade[idProduto]--;
  }
  atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) {
  if (document.getElementById(`quantidade-${idProduto}`)) {
    document.getElementById(`quantidade-${idProduto}`).innerText =
      idsProdutoCarrinhoComQuantidade[idProduto];
  }
  salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
}

function desenharProdutoNoCarrinho(idProduto) {
  const produto = catalogo.find(p => p.id === idProduto);
  const containerProdutosCarrinho =
    document.getElementById('produtos-carrinho');
  const cartaoProdutoCarrinho = document.createElement('article');
  cartaoProdutoCarrinho.id = `cartaoProdutoCarrinho-${produto.id}`;
  cartaoProdutoCarrinho.classList.add(
    'flex',
    'bg-slate-100',
    'rounded-lg',
    'p-1',
    'relative'
  );
  cartaoProdutoCarrinho.innerHTML = `<button
    class="text-slate-400 hover:text-slate-700 absolute top-1 right-2"
    >
    <i id = 'removerItemCarrinho${
      produto.id
    }' class="fa-solid fa-circle-xmark"></i>
    </button>
    <img
    src="./assets/img/product-${produto.id}.jpg"
    alt="${produto.nome}"
    class="h-24 rounded-lg"
    />
    <div class="px-2 flex flex-col justify-between">
    <p class="text-slate-900 text-sm">${produto.nome}</p>
    <p class="text-slate-400 text-xs">Tamanho: M</p>
    <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
    <div class='flex text-slate-950 items-end absolute bottom-1 right-2 text-lg'>
    <button id='decrementar-produto-${produto.id}' class=''>-</button>
    <p id='quantidade-${produto.id}' class='ml-2'>${
    idsProdutoCarrinhoComQuantidade[produto.id]
  }</p>
    <button id='incrementar-produto-${produto.id}' class='ml-2'>+</button>
    </div>`;

  containerProdutosCarrinho.appendChild(cartaoProdutoCarrinho);

  document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener('click', e => decrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener('click', () => incrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`removerItemCarrinho${produto.id}`)
    .addEventListener('click', e => removerProdutoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho() {
  const containerProdutosCarrinho =
    document.getElementById('produtos-carrinho');
  containerProdutosCarrinho.innerHTML = '';
  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }
  // idsProdutoCarrinhoComQuantidade;
}
export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutoCarrinhoComQuantidade) {
    incrementarQuantidadeProduto(idProduto);
  } else {
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    desenharProdutoNoCarrinho(idProduto);
    atualizarInformacaoQuantidade(idProduto);
  }
}

export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById('preco-total');
  let precoTotalCarrinho = 0;
  if (idsProdutoCarrinhoComQuantidade.length === 0) {
    precoTotalCarrinho = 0;
  } else {
    for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
      precoTotalCarrinho +=
        catalogo.find(p => p.id === idProdutoNoCarrinho).preco *
        idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
    }
  }
  precoCarrinho.innerHTML = `R$ ${precoTotalCarrinho},00`;
}
