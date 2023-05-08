export enum FilterType {
  Genes,
  Phenotype,
}

export interface PhenotypeTerm {
  mp_term_id: string;
  mp_term_name: string;
}

export interface Gene {
  marker_accession_id: string;
  marker_symbol: string;
  top_level_phenotype_term: {
    top_level_mp_term_id: string;
    top_level_mp_term_name: string;
  };
  procedures: string[];
  phenotype_terms: PhenotypeTerm[];
  phenotype_count: number;
}

export interface Option {
  value: string;
  label: string;
}
