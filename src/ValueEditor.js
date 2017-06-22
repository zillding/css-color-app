import React from 'react';
import PropTypes from 'prop-types';
import { Div, Span } from 'glamorous';

function ValueEditor({ name, data, onChange }) {
  function onCheckboxChange(e) {
    onChange(Object.assign({}, data, { enabled: e.target.checked }));
  }

  function onValueChange(e) {
    const value = parseInt(e.target.value, 10);
    onChange(Object.assign({}, data, { value }));
  }

  const { enabled, value } = data;

  return (
    <Div marginRight="10px">
      <Div marginBottom="10px">
        <label htmlFor={name}>
          <input
            id={name}
            type="checkbox"
            checked={enabled}
            onChange={onCheckboxChange}
          />
          <Span marginLeft="5px">{name}</Span>
        </label>
      </Div>
      <input
        type="range"
        min="-100"
        max="100"
        step="1"
        value={value}
        onChange={onValueChange}
      />
      <input type="number" value={value} onChange={onValueChange} />
    </Div>
  );
}

ValueEditor.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ValueEditor;
