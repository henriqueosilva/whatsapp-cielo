import { app } from './app';
import { CnpjFull, Root, RootFull } from './types';

app.listen('3000', () => {
  console.log(`Servidor rodando em: http://localhost:3000`);
});

const url = 'https://api.casadosdados.com.br/v2/public/cnpj/search';

const query = {
  query: {
    termo: [],
    atividade_principal: [],
    natureza_juridica: [],
    uf: ['DF', 'GO'],
    municipio: [],
    bairro: [],
    situacao_cadastral: 'ATIVA',
    cep: [],
    ddd: [],
  },
  range_query: { data_abertura: { lte: '2023-11-24', gte: '2023-11-24' }, capital_social: { lte: null, gte: '5000' } },
  extras: {
    somente_mei: false,
    excluir_mei: false,
    com_email: false,
    incluir_atividade_secundaria: false,
    com_contato_telefonico: true,
    somente_fixo: false,
    somente_celular: true,
    somente_matriz: false,
    somente_filial: false,
  },
  page: 1,
};
export async function getData() {
  const req = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res = (await req.json()) as Root;
  for (const empresa of res.data.cnpj) {
    const dataFull = await getNum(empresa.cnpj);
    console.log(dataFull);
    console.log('CNPJ: ', empresa.cnpj);
    console.log('Razão Social: ', empresa.razao_social);
    console.log('Telefone: ', dataFull.cnpj.telefones[0]);
  }
  return res;
}

async function getNum(cnpj: string) {
  const url = `https://api.casadosdados.com.br/v2/public/cnpj/${cnpj}`;
  const req = await fetch(url);
  const res = (await req.json()) as RootFull;
  return res;
}
