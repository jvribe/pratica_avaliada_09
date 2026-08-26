import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Categoria from '../../../models/Categoria';
import { buscar } from '../../../services/Service';
import CardCategorias from '../cardcategorias/CardCategorias';

function ListarCategorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    
    const { usuario, handleLogout } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token === '') {
            alert('Você precisa estar logado!');
            navigate('/');
        }
    }, [usuario.token]);

    async function buscarCategorias() {
        setIsLoading(true);
        try {
            await buscar('/categorias', setCategorias, {
                headers: {
                    Authorization: usuario.token,
                },
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente');
                handleLogout();
            } else {
                alert('Erro ao buscar as categorias');
            }
        }
        setIsLoading(false);
    }

    useEffect(() => {
        buscarCategorias();
    }, [categorias.length]);

    return (
        <>
            {isLoading && (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <span className="text-3xl text-slate-800 font-bold">Carregando...</span>
                </div>
            )}

            <div className="flex justify-center w-full overflow-x-hidden">
                <div className="box-border w-full px-4 py-4 mt-8 mb-4 max-w-8xl sm:px-6 md:px-8 lg:px-12 md:py-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 mb-4 md:mb-0">
                        
                        {categorias.map((categoria) => (
                            <CardCategorias key={categoria.id} categoria={categoria} />
                        ))}
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListarCategorias;