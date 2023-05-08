import type { NextApiRequest, NextApiResponse } from 'next';
import { Gene } from '../../types/types';

import path from 'path';
import { promises as fs } from 'fs';

export interface Option {
  value: string;
  label: string;
}

const getPhenotypeTermNames = (
  data: Gene[],
): Record<string, { name: string; id: string }> => {
  return data.reduce((acc, item) => {
    const phenotypeTerm = item?.top_level_phenotype_term.top_level_mp_term_name;
    const phenotypeId = item?.top_level_phenotype_term.top_level_mp_term_id;

    return {
      ...acc,
      [phenotypeTerm]: { name: phenotypeTerm, id: phenotypeId },
    };
  }, {});
};

const generatePhenotypeTermOptionsList = (
  phenotypeTermNames: Record<string, { name: string; id: string }>,
): Option[] => {
  const phenotypeTermsArr = Object.keys(phenotypeTermNames);

  return phenotypeTermsArr.map((phenotypeTermName) => {
    return {
      value: phenotypeTermNames[phenotypeTermName].id,
      label: phenotypeTermNames[phenotypeTermName].name,
    };
  });
};

const generateGenesOptionList = (data: Gene[]): Option[] => {
  return Object.values(
    data.reduce((acc, curr) => {
      const geneKey = curr.marker_symbol;
      const geneId = curr.marker_accession_id;

      return { ...acc, [geneKey]: { value: geneId, label: geneKey } };
    }, {}),
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>,
) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'src/dataset');

  //Read the json data file gene_phenotypes.json
  const fileDataset = await fs.readFile(
    jsonDirectory + '/gene_phenotypes.json',
    'utf8',
  );

  const data = JSON.parse(fileDataset);

  const phenotypeTermOptionsList = generatePhenotypeTermOptionsList(
    getPhenotypeTermNames(data),
  );
  const genesOptionList = generateGenesOptionList(data).sort((a, b) =>
    a.label > b.label ? 1 : b.label > a.label ? -1 : 0,
  );

  res.status(200).json({ phenotypeTermOptionsList, genesOptionList });
}
