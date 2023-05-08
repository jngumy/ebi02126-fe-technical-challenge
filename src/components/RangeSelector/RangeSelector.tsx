import { useState } from 'react';

// Components
import { Range, getTrackBackground } from 'react-range';

interface RangeSelectorProps {
  onFinalChange?: ((values: number[]) => void) | undefined;
}

const RangeSelector = ({ onFinalChange }: RangeSelectorProps) => {
  const [values, setValues] = useState<number[]>([0]);
  const STEP = 0.1;
  const MIN = 0;
  const MAX = 100;

  return (
    <div
      style={{
        display: 'flex',
        width: '80%',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onFinalChange={onFinalChange}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values: values,
                  colors: ['#00b0b0', '#ccc'],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '35px',
              width: '35px',
              borderRadius: '4px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA',
            }}
          >
            <div
              style={{
                height: '16px',
                width: '5px',
                backgroundColor: isDragged ? '#00b0b0' : '#CCC',
              }}
            />
          </div>
        )}
      />
      <output style={{ marginTop: '10px' }} id="output">
        <span>
          Filter to {Math.round(values[0])}% of the genes that have the highest
          phenotype count
        </span>
      </output>
    </div>
  );
};

export default RangeSelector;
