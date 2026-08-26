import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Categoria from '../../../models/Categoria';
import { buscar, deletar } from '../../../services/Service';

function DeletarCategoria() {
    const navigate = useNavigate();
    
    const { id } = useParams<{ id: string }>();
    
    const { usuario, handleLogout } = useContext(AuthContext);
    
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (usuario.token === '') {
            alert('Você precisa estar logado!');
            navigate('/');
        }
    }, [usuario.token]);

    async function buscarCategoriaPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: {
                    Authorization: usuario.token
                }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente');
                handleLogout();
            } else {
                alert('Erro ao buscar a categoria');
            }
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarCategoriaPorId(id);
        }
    }, [id]);

    async function deletarCategoria() {
        setIsLoading(true);
        try {
            await deletar(`/categorias/${id}`, {
                headers: {
                    Authorization: usuario.token
                }
            });
            alert('Categoria apagada com sucesso!');
            retornar(); 
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente');
                handleLogout();
            } else {
                alert('Erro ao apagar a categoria');
            }
        }
        setIsLoading(false);
    }

    function retornar() {
        navigate('/categorias');
    }

    return (
        <div className='container w-full max-w-md px-4 pt-4 mx-auto md:pt-6'>
            <h1 className='py-4 text-3xl text-center md:text-4xl'>Deletar Categoria</h1>
            <p className='mb-4 text-base font-semibold text-center md:text-lg'>
                Você tem certeza de que deseja apagar a categoria a seguir?
            </p>
            
            <div className='flex flex-col justify-between overflow-hidden border rounded-2xl'>
                <header
                    className='px-4 py-2 text-lg font-bold text-white md:px-6 bg-slate-600 md:text-2xl'>
                    Categoria
                </header>
                
                <p className='h-full p-4 text-xl bg-white md:p-8 md:text-3xl'>{categoria.tipo}</p>
                
                <div className="flex flex-row">
                    <button
                        className='w-full py-2 text-base bg-red-400 text-slate-100 hover:bg-red-600 md:text-lg'
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        className='flex items-center justify-center w-full text-base bg-teal-600 text-slate-100 hover:bg-teal-700 md:text-lg'
                        onClick={deletarCategoria}
                        disabled={isLoading}
                    >
                        {isLoading ? <span>Apagando...</span> : <span>Sim</span>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletarCategoria;