import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type { Produto } from '../../../models/Produto';
import { buscar } from '../../../services/Service';
import CardProduto from '../cardprodutos/CardProduto';

function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarProdutos() {
        try {
            await buscar('/produtos', setProdutos, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente.');
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        if (token !== '') {
            buscarProdutos();
        }
    }, [token]);

    return (
        <div className="flex justify-center mt-6 md:mt-8">
            <div className="container flex flex-col m-2 md:my-0">
                {produtos.length === 0 && (
                    <span className="text-center text-2xl font-bold my-8 text-slate-800">
                        Carregando produtos...
                    </span>
                )}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 mb-4 md:mb-0 p-2 md:p-4">
                    {produtos.map((produto) => (
                        <CardProduto key={produto.id} produto={produto} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListaProdutos;