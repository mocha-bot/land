import { useMemo } from 'react';
import ReactSelect from 'react-select';
import type { StylesConfig } from 'react-select';

const colourStyles: StylesConfig = {
  singleValue: (styles) => ({ ...styles, color: 'white' }),
  indicatorSeparator: () => ({ display: 'none' }),
  control: (styles, state) => ({
    ...styles,
    backgroundColor: 'transparent',
    border: 0,
    boxShadow: 'none',
    borderBottom: state.selectProps.menuIsOpen
      ? '1px solid rgba(255, 255, 255, 0.5)'
      : '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: 0,
    ':active': {
      borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
    },
    ':hover': {
      borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
    },
  }),
  container: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    width: '100%',
    color: 'white',
  }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    paddingRight: 4,
    paddingLeft: 4,
    transition: 'transform 0.3s',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    color: 'white',
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
  }),
  input: (styles) => ({
    ...styles,
    color: 'white',
    fontSize: '14px',
  }),
  valueContainer: (styles) => ({
    ...styles,
    paddingLeft: 4,
    paddingRight: 4,
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(255, 255, 255, 0.4)',
    color: 'black',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  }),
};

type Props<TValue extends string = string> = {
  options: Option<TValue>[];
  defaultValue: TValue;
  value?: TValue;
  onChange?: (value: TValue) => void;
};

type Option<TValue = string> = {
  value: TValue;
  label: string;
};

export function Select(props: Props) {
  const value = useMemo(
    () => props.options.find((option) => option.value === props.value),
    [props.options, props.value],
  );
  const defaultValue = useMemo(
    () => props.options.find((option) => option.value === props.defaultValue),
    [props.defaultValue, props.options],
  );

  return (
    <ReactSelect
      defaultValue={defaultValue}
      options={props.options}
      onChange={(option) => props.onChange?.((option as Option)?.value)}
      value={value}
      styles={colourStyles}
    />
  );
}
