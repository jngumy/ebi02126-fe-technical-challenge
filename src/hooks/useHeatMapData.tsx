import { useState, useEffect, useCallback } from 'react';

// Types
import { Gene } from '../types/types';
import { HeatMapSerie, HeatMapDatum } from '@nivo/heatmap';
import { Option } from '../pages/api/dropdownData';
import { MultiValue } from 'react-select';

const useHeatMapData = (
  initialData: Gene[],
  data: Gene[],
  phenotypeTermsOptions: Option[],
) => {
  const [allData, setAllData] = useState<
    HeatMapSerie<HeatMapDatum, { totalPhenotypeCount: number }>[]
  >([]);
  const [convertedData, setConvertedData] = useState<
    HeatMapSerie<HeatMapDatum, { totalPhenotypeCount: number }>[]
  >([]);

  const getPhenotypeTermNames = useCallback(
    (phenotypeTermsOptions: Option[]): Record<string, HeatMapDatum> => {
      return phenotypeTermsOptions.reduce((acc, item) => {
        const phenotypeTerm = item.label;

        return { ...acc, [phenotypeTerm]: { x: phenotypeTerm, y: null } };
      }, {});
    },
    [],
  );

  const convertAndGroupData = useCallback(
    (arr: Gene[], phenotypeTerms: HeatMapDatum[]) => {
      return arr.reduce<
        Record<
          string,
          {
            id: string;
            totalPhenotypeCount: number;
            data: { x: string; y: number | null }[];
          }
        >
      >((prev, curr) => {
        const groupKey = curr.marker_symbol;
        const group = prev[groupKey] || {
          id: groupKey,
          data: [...phenotypeTerms],
          totalPhenotypeCount: 0,
        };
        const phenotypeTermName =
          curr?.top_level_phenotype_term.top_level_mp_term_name;
        const phenotypeTerm = group.data.find(
          ({ x }) => x === phenotypeTermName,
        );

        if (phenotypeTerm) {
          group.data[group.data.indexOf(phenotypeTerm)] = {
            x: phenotypeTermName,
            y: curr.phenotype_count,
          };
        }

        return { ...prev, [groupKey]: group };
      }, {});
    },
    [],
  );
  const convertDataToHeapMapFormat = useCallback(
    (data: Gene[]) => {
      const phenotypeTermsMap = getPhenotypeTermNames(phenotypeTermsOptions);
      const phenotypeTerms = Object.values(phenotypeTermsMap).sort((a, b) =>
        a.x > b.x ? 1 : b.x > a.x ? -1 : 0,
      );
      const convertedData = convertAndGroupData(data, phenotypeTerms);

      Object.values(convertedData).forEach((item) => {
        item.totalPhenotypeCount = item.data.reduce((acc, dataItem) => {
          const dataItemValue = dataItem.y ?? 0;
          return acc + dataItemValue;
        }, 0);
      });

      return Object.values(convertedData).sort((a, b) =>
        a.id.localeCompare(b.id),
      );
    },
    [phenotypeTermsOptions, getPhenotypeTermNames, convertAndGroupData],
  );

  const filterByPhenotypeCountTotalRange = useCallback(
    (value: number) => {
      const rangeFilteredData = [...allData].sort((a, b) => {
        return b.totalPhenotypeCount - a.totalPhenotypeCount;
      });

      setConvertedData(
        rangeFilteredData.slice(
          0,
          (rangeFilteredData.length * Math.round(value)) / 100,
        ),
      );
    },
    [allData],
  );

  const filterByGene = useCallback(
    (selectedOptions: MultiValue<Option>) => {
      const selectedGenes = selectedOptions.map((option) => option.label);
      const filteredDataByGenes = allData.filter((item) =>
        selectedGenes.includes(item.id),
      );

      if (selectedGenes.length === 0) {
        setConvertedData(allData);
      } else {
        setConvertedData(filteredDataByGenes);
      }
    },
    [allData],
  );

  const filterByPhenotype = useCallback(
    (selectedOptions: MultiValue<Option>) => {
      const selectedPhenotypes = selectedOptions.map((option) => option.label);
      const filteredDataByPhenotypes = allData.map(
        ({ id, data, totalPhenotypeCount }) => {
          return {
            id,
            totalPhenotypeCount,
            data: data.filter((dataItem) =>
              selectedPhenotypes.includes(dataItem.x.toString()),
            ),
          };
        },
      );
      if (selectedPhenotypes.length === 0) {
        setConvertedData(allData);
      } else {
        setConvertedData(filteredDataByPhenotypes);
      }
    },
    [allData],
  );

  useEffect(() => {
    const allDataConverted = convertDataToHeapMapFormat(initialData);
    setAllData(allDataConverted);
  }, [initialData, convertDataToHeapMapFormat]);

  useEffect(() => {
    const convertedData = convertDataToHeapMapFormat(data);
    setConvertedData(convertedData);
  }, [data, convertDataToHeapMapFormat]);

  return {
    convertedData,
    filterByPhenotypeCountTotalRange,
    filterByGene,
    filterByPhenotype,
  };
};

export default useHeatMapData;
