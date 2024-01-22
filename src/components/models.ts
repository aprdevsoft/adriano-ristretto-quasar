export interface Empresa {
  id: string;
  nome: string;
  url: string;
  telefone: string;
}

export interface Funcionario {
  id: string;
  nome: string;
  dataNascimento: string;
}

export interface Contrato {
  id: string;
  cargo: string;
  acesso: Acesso;
  codigoEmpresa: string;
  codigoFuncionario: string;
}

export interface Acesso {
  login: string;
  senha: string;
  isAtivo: boolean;
}
