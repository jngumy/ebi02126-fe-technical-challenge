import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import { Gene } from '../../types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Gene[]>,
) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'src/dataset');

  //Read the json data file gene_phenotypes.json
  const fileDataset = await fs.readFile(
    jsonDirectory + '/gene_phenotypes.json',
    'utf8',
  );

  res.status(200).json(JSON.parse(fileDataset));
}
