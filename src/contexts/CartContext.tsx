import { createContext, type ReactNode, useState } from 'react';
import type { Produto } from '../models/Produto';

export interface Items {
    produto: Produto;
    quantidade: number;
}

interface CartContextType {
    items: Items[];
    quantidadeItems: number;
    valorTotal: number;
    adicionarProduto: (produto: Produto) => void;
    removerProduto: (id: number) => void;
    limparCarrinho: () => void;
}

interface CartProviderProps {
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: CartProviderProps) {
    const [items, setItems] = useState<Items[]>([]);

    const quantidadeItems = items.reduce((acc, item) => acc + item.quantidade, 0);

    const valorTotal = items.reduce(
        (acc, item) => acc + item.produto.preco * item.quantidade,
        0
    );

    function adicionarProduto(produto: Produto) {
        const itemIndex = items.findIndex((item) => item.produto.id === produto.id);

        if (itemIndex >= 0) {
            const novosItems = [...items];
            novosItems[itemIndex].quantidade += 1;
            setItems(novosItems);
        } else {
            setItems([...items, { produto, quantidade: 1 }]);
        }
        alert('Produto adicionado ao carrinho!');
    }

    function removerProduto(id: number) {
        const itemIndex = items.findIndex((item) => item.produto.id === id);

        if (itemIndex >= 0) {
            const novosItems = [...items];
            if (novosItems[itemIndex].quantidade > 1) {
                novosItems[itemIndex].quantidade -= 1;
                setItems(novosItems);
            } else {
                novosItems.splice(itemIndex, 1);
                setItems(novosItems);
            }
        }
    }

    function limparCarrinho() {
        setItems([]);
    }

    return (
        <CartContext.Provider
            value={{
                items,
                quantidadeItems,
                valorTotal,
                adicionarProduto,
                removerProduto,
                limparCarrinho,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}