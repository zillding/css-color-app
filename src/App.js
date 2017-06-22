/* eslint-disable react/jsx-no-target-blank */

import React, { Component } from 'react';
import { convert } from 'css-color-function';
import glamorous, { Div, H1, Span } from 'glamorous';

import rgbHex from './rgbToHex';
import ValueEditor from './ValueEditor';

const keys = ['lightness', 'blackness', 'saturation', 'alpha'];

function getModifier(key, value) {
  if (key === 'alpha') {
    return `alpha(${value}%)`;
  }

  const sign = value >= 0 ? '+' : '-';
  return `${key}(${sign}${Math.abs(value)}%)`;
}

const H2 = glamorous.h2({
  fontSize: '1em',
});

const Section = glamorous.div({
  marginBottom: 20,
  borderTop: '1px solid #ddd',
});

const Result = glamorous.div({
  marginBottom: 10,
});

class App extends Component {
  constructor(props) {
    super(props);

    const data = keys.reduce(
      (o, current) =>
        Object.assign({}, o, { [current]: { enabled: false, value: 0 } }),
      {}
    );

    this.state = Object.assign(
      {
        baseColor: '#30AABC',
      },
      data
    );

    this.onChangeBaseColor = this.onChangeBaseColor.bind(this);
  }

  getColorString() {
    const array = [this.state.baseColor];

    keys.forEach(key => {
      const data = this.state[key];

      if (data.enabled) {
        array.push(getModifier(key, data.value));
      }
    });

    return `color(${array.join(' ')})`;
  }

  getChangeHandler(key) {
    return data => {
      this.setState({ [key]: data });
    };
  }

  onChangeBaseColor(e) {
    this.setState({ baseColor: e.target.value });
  }

  render() {
    const { baseColor } = this.state;

    const colorString = this.getColorString();
    const resultColorRgb = convert(colorString);
    const resultColorHex = rgbHex(resultColorRgb);

    return (
      <Div padding="30px">
        <H1 marginTop="0">css color function tester app</H1>
        <p>
          This is a css color function test app based on{' '}
          <a
            href="https://www.npmjs.com/package/css-color-function"
            target="_blank"
          >
            css-color-function
          </a>{' '}
          which is also used in{' '}
          <a
            href="https://github.com/postcss/postcss-color-function"
            target="_blank"
          >
            postcss
          </a>,{' '}
          <a href="http://cssnext.io/features/#color-function" target="_blank">
            cssnext
          </a>.
        </p>
        <Section>
          <H2 marginRight="5px">Base color:</H2>
          <input
            type="color"
            value={baseColor}
            onChange={this.onChangeBaseColor}
          />{' '}
          <input
            type="text"
            value={baseColor}
            onChange={this.onChangeBaseColor}
          />
        </Section>

        <Section>
          <H2>Modifiers:</H2>
          <Div display="flex" marginBottom="20px">
            {keys.map((key, index) =>
              <ValueEditor
                key={key}
                name={key}
                data={this.state[key]}
                onChange={this.getChangeHandler(key)}
              />
            )}
          </Div>
          <Span backgroundColor="#ccc" padding="5px">
            <code>{colorString}</code>
          </Span>
        </Section>

        <Section>
          <H2>
            Result color:
            <Span
              display="inline-block"
              width="20px"
              height="20px"
              verticalAlign="bottom"
              marginLeft="10px"
              backgroundColor={resultColorRgb}
            />
          </H2>
          <Result>{resultColorRgb}</Result>
          <Result>#{resultColorHex}</Result>
        </Section>
      </Div>
    );
  }
}

export default App;
