import { adicionarAoCarrinho } from './menuCarrinho';

export function renderizarCatalogo(catalogo) {
  for (const produtoCatalogo of catalogo) {
    const cartaoProduto = `<div class='flex flex-col hover:scale-105 duration-300 justify-between  w-48 shadow-lg rounded-lg shadow-slate-400 ${
      produtoCatalogo.feminino ? 'feminino' : 'masculino'
    }' id="card-produto-${produtoCatalogo.id}">
    <img
    class='rounded-t-lg'
  src="./assets/img/${produtoCatalogo.imagem}"
  alt="Produto 1 do Magazine Hashtag"
  style="height: 300px"
/>
<div class='p-1 flex flex-1 flex-col justify-between'>
<div class='flex flex-1 flex-col justify-between'>
<div>
<p class='text-slate-500 text-[13px]'>${produtoCatalogo.marca}</p>
<p class='text-[15px]'>${produtoCatalogo.nome}</p>
</div>
<p class='py-2 text-green-700 font-bold'>$${produtoCatalogo.preco}</p>
</div>
<button id='adicionar-${
      produtoCatalogo.id
    }' class='bg-indigo-950 rounded-md text-white font-bold hover:bg-slate-400 hover:text-indigo-950'>Adicionar<i class="fa-solid fa-cart-plus text-[14px] ml-2"></i></button>

</div>
</div>`;

    document.getElementById('container-produto').innerHTML += cartaoProduto;
  }
  for (const produtoCatalogo of catalogo) {
    document
      .getElementById(`adicionar-${produtoCatalogo.id}`)
      .addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id));
  }
}
