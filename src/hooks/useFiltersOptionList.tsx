import { Gene, Option } from '../types/types';
import { CSSObjectWithLabel } from 'react-select';
import { useState, useEffect, useCallback } from 'react';

const API_DROPDOWN_DATA_URL = 'api/dropdownData';

const useFiltersOptionList = (data: Gene[]) => {
  const [phenotypeTermOptionList, setPhenotypeTermOptionList] = useState<
    Option[]
  >([]);
  const [genesOptionList, setGenesOptionList] = useState<Option[]>([]);

  const fetchApi = useCallback(async () => {
    const response = await fetch(API_DROPDOWN_DATA_URL);
    const responseJson = await response.json();
    const { phenotypeTermOptionsList, genesOptionList } = responseJson;

    setPhenotypeTermOptionList(phenotypeTermOptionsList);
    setGenesOptionList(genesOptionList);
  }, []);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const selectStyles = {
    multiValue: (styles: CSSObjectWithLabel) => {
      return {
        ...styles,
        backgroundColor: '#00b0b0',
      };
    },
    multiValueLabel: (styles: CSSObjectWithLabel) => ({
      ...styles,
      color: '#ffffff',
    }),
    multiValueRemove: (styles: CSSObjectWithLabel) => ({
      ...styles,
      color: '#ffffff',
    }),
  };

  return {
    phenotypeTermOptionList,
    genesOptionList,
    selectStyles,
  };
};

export default useFiltersOptionList;
