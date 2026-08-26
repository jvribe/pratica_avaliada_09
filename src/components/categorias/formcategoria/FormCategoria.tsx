import { type ChangeEvent, type FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Categoria from '../../../models/Categoria';
import { atualizar, buscar, cadastrar } from '../../../services/Service';

function FormCategoria() {
    const navigate = useNavigate();
    
    const { id } = useParams<{ id: string }>(); 
    
    const { usuario, handleLogout } = useContext(AuthContext);

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        tipo: ''
    });
    
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
                headers: { Authorization: usuario.token }
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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    }

    async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/categorias`, categoria, setCategoria, {
                    headers: { Authorization: usuario.token }
                });
                alert('Categoria atualizada com sucesso!');
                navigate('/categorias');
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    alert('O token expirou, favor logar novamente');
                    handleLogout();
                } else {
                    alert('Erro ao atualizar a categoria');
                }
            }
        } else {
            try {
                await cadastrar(`/categorias`, categoria, setCategoria, {
                    headers: { Authorization: usuario.token }
                });
                alert('Categoria cadastrada com sucesso!');
                navigate('/categorias');
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    alert('O token expirou, favor logar novamente');
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar a categoria');
                }
            }
        }
        setIsLoading(false);
    }

    return (
        <div className="container flex flex-col items-center justify-center px-2 pt-4 mx-auto">
            <h1 className="my-8 text-3xl text-center md:text-4xl">
                {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
            </h1>

            <form className="flex flex-col w-full max-w-md gap-4 px-2 md:max-w-1/2" onSubmit={gerarNovaCategoria}>
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="tipo">Categoria</label>
                    <input
                        type="text"
                        placeholder="Categoria"
                        id='tipo'
                        name='tipo'
                        className="p-2 text-base bg-white border-2 rounded border-slate-700 utral-800 md:text-lg"
                        required
                        value={categoria.tipo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="flex justify-center w-full py-2 mx-auto text-base rounded text-slate-100 bg-slate-400 hover:bg-slate-800 md:w-1/2 md:text-lg"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? <span>Carregando...</span> : <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>}
                </button>
            </form>
        </div>
    );
}

export default FormCategoria;