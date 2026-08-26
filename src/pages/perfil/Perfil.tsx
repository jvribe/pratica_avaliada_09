import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from "@phosphor-icons/react";
import { AuthContext } from '../../contexts/AuthContext';

function Perfil() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === '') {
      alert('Você precisa estar logado');
      navigate('/login');
    }
  }, [usuario.token]);

  return (
    <div className='container mx-auto px-4 sm:px-6 max-w-7xl rounded-2xl overflow-hidden'>
      <img
        className='w-full mt-4 h-40 sm:h-56 md:h-72 object-cover border-b-8 border-white rounded-t-2xl'
        src="https://i.imgur.com/6C49BZQ.jpg"
        alt="Capa do Perfil"
      />

      <div className='rounded-full w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 mx-auto -mt-16 sm:-mt-24 md:-mt-32 border-8 border-white relative z-10 bg-slate-300 flex items-center justify-center overflow-hidden'>
        {usuario.foto ? (
          <img
            src={usuario.foto}
            alt={`Foto de ${usuario.nome}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <UserIcon size={64} weight="bold" className="text-slate-600" />
        )}
      </div>

      <div className="relative -mt-12 sm:-mt-16 md:-mt-20 mb-4 min-h-64 flex flex-col gap-1 bg-slate-600 text-white text-base sm:text-xl md:text-2xl items-center justify-center rounded-b-2xl px-4 py-6 text-center">
        <p className="font-bold wrap-break-word">{usuario.nome || 'Nome do Usuário'}</p>
        <p className="text-slate-200 wrap-break-word">{usuario.usuario || 'usuario@email.com'}</p>
        <p className="text-sm sm:text-base text-slate-300">
          Nascimento: {usuario.dataNascimento ? new Date(usuario.dataNascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '01/01/2000'}
        </p>
      </div>
    </div>
  );
}

export default Perfil;