import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type { Produto } from '../../../models/Produto';
import { buscar, deletar } from '../../../services/Service';

function DeletarProduto() {
    const [produto, setProduto] = useState<Produto>({} as Produto);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
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
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    function retornar() {
        navigate('/produtos');
    }

    async function deletarProduto() {
        try {
            await deletar(`/produtos/${id}`, {
                headers: { Authorization: token },
            });
            alert('Produto apagado com sucesso');
            retornar();
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente.');
                handleLogout();
            } else {
                alert('Erro ao apagar o Produto');
            }
        }
    }

    return (
        <div className='container w-full max-w-md mx-auto px-4 pt-20 md:pt-6'>
            <h1 className='text-3xl md:text-4xl text-center py-4'>Deletar Produto</h1>
            <p className='text-center font-semibold mb-4 text-base md:text-lg'>
                Você tem certeza de que deseja apagar o produto a seguir?
            </p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between border-slate-700'>
                <header
                    className='py-2 px-4 md:px-6 bg-slate-800 text-white font-bold text-lg md:text-2xl'>
                    {produto.nome || 'Carregando...'}
                </header>
                <div className='p-4 md:p-8 bg-white h-full flex flex-col items-center gap-2'>
                    {produto.foto && (
                        <img 
                            src={produto.foto} 
                            alt={produto.nome} 
                            className="h-32 object-contain mb-2" 
                        />
                    )}
                    <p className='text-xl md:text-2xl text-slate-800 font-bold'>
                        {produto.preco ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco) : ''}
                    </p>
                </div>
                <div className="flex flex-row">
                    <button
                        onClick={retornar}
                        className='text-slate-100 bg-red-500 hover:bg-red-700 w-full py-2 text-base md:text-lg cursor-pointer'
                    >
                        Não
                    </button>
                    <button
                        onClick={deletarProduto}
                        className='w-full text-slate-100 bg-teal-600 hover:bg-teal-800 flex items-center justify-center text-base md:text-lg cursor-pointer'
                    >
                        <span>Sim</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletarProduto;