export default interface Usuario {
  id: number;
  nome: string;
  usuario: string; // Este é o e-mail
  senha?: string;
  foto: string;
  dataNascimento: string; 
}