import type Categoria from './Categoria';

export interface Produto {
    id: number;
    nome: string;
    preco: number;
    foto: string;
    categoria?: Categoria | null;
}