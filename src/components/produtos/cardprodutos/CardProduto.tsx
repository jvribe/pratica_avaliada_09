import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { CartContext } from '../../../contexts/CartContext'
import type { Produto } from '../../../models/Produto';

interface CardProdutoProps {
    produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
    const { adicionarProduto } = useContext(CartContext);

    return (
        <div className="flex flex-col justify-between overflow-hidden bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="flex items-end justify-end pt-2 pr-2">
                <Link to={`/editarproduto/${produto.id}`}>
                    <PencilIcon
                        size={24}
                        className="mr-1 hover:fill-teal-800"
                    />
                </Link>

                <Link to={`/deletarproduto/${produto.id}`}>
                    <TrashIcon
                        size={24}
                        className="mr-1 hover:fill-red-700"
                    />
                </Link>
            </div>

            <div className="py-4">
                <img
                    src={produto.foto || 'https://ik.imagekit.io/vzr6ryejm/games/produto.png'}
                    className="mx-auto mt-1 h-44 max-w-75 object-contain"
                    alt={produto.nome}
                />

                <div className="p-4">
                    <p className="text-sm text-center uppercase font-semibold">
                        {produto.nome}
                    </p>
                    <h3 className="text-xl font-bold text-center uppercase text-slate-800">
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(produto.preco)}
                    </h3>
                    <p className="text-sm italic text-center text-slate-600">
                        Categoria: {produto.categoria?.tipo || 'Geral'}
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap">
                <button
                    onClick={() => adicionarProduto(produto)}
                    className="flex items-center justify-center w-full py-2 text-white bg-teal-600 hover:bg-teal-900 transition-colors cursor-pointer"
                >
                    Comprar
                </button>
            </div>
        </div>
    );
}

export default CardProduto;