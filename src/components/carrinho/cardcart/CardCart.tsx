import { useContext } from 'react';
import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { CartContext, type Items } from '../../../contexts/CartContext';

interface CardCartProps {
    item: Items;
}

function CardCart({ item }: CardCartProps) {
    const { adicionarProduto, removerProduto } = useContext(CartContext);

    const subtotal = item.produto.preco * item.quantidade;

    return (
        <div className='flex gap-4 bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
            {/* Imagem do Produto */}
            <div className='w-32 h-32 shrink-0 bg-gray-50 rounded-lg p-2 flex items-center justify-center'>
                <img 
                    src={item.produto.foto || "https://ik.imagekit.io/vzr6ryejm/games/produto.png"} 
                    className='max-h-full max-w-full object-contain' 
                    alt={item.produto.nome} 
                />
            </div>

            {/* Informações do Produto */}
            <div className='grow flex flex-col justify-between'>
                <div>
                    <h3 className='font-semibold text-gray-800 mb-1'>
                        {item.produto.nome}
                    </h3>
                    <p className='text-sm text-gray-500 mb-2'>
                        Categoria: {item.produto.categoria?.tipo || 'Geral'}
                    </p>
                    <p className='text-xl font-bold text-blue-600'>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.produto.preco)}
                    </p>
                </div>

                {/* Controles de Quantidade */}
                <div className='flex items-center gap-4 mt-3'>
                    <div className='flex items-center gap-2 border border-gray-300 rounded-lg'>
                        <button 
                            onClick={() => removerProduto(item.produto.id)}
                            className='p-2 hover:bg-gray-100 rounded-l-lg transition-colors cursor-pointer'
                        >
                            <MinusIcon size={20} className="text-gray-600" />
                        </button>
                        
                        <span className='px-4 font-semibold text-gray-800 min-w-10 text-center'>
                            {item.quantidade}
                        </span>
                        
                        <button 
                            onClick={() => adicionarProduto(item.produto)}
                            className='p-2 hover:bg-gray-100 rounded-r-lg transition-colors cursor-pointer'
                        >
                            <PlusIcon size={20} className="text-gray-600" />
                        </button>
                    </div>

                    <button 
                        onClick={() => {
                            // Subtrai sucessivamente até zerar
                            for (let i = 0; i < item.quantidade; i++) {
                                removerProduto(item.produto.id);
                            }
                        }}
                        className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer'
                        title="Remover produto"
                    >
                        <TrashIcon size={20} />
                    </button>
                </div>
            </div>

            {/* Subtotal */}
            <div className='flex flex-col items-end justify-between'>
                <p className='text-lg font-bold text-gray-800'>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}
                </p>
            </div>
        </div>
    );
}

export default CardCart;