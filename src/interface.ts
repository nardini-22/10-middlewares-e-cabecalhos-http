interface ICEP {
    code?: number | string;
    statusText?: string;
    message?: string;
    data?: ICEPdata[];
  }
  
  interface ICEPdata {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siaffi: string;
  }

export default ICEP;