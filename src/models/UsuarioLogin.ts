export default interface UsuarioLogin {
  dataNascimento: any;
  id: number;
  nome: string;
  usuario: string;
  senha?: string;
  foto: string;
  token: string;
}