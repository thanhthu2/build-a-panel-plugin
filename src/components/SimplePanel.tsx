import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { css, cx } from '@emotion/css';
import { PanelProps } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';
import { Card, Col, Radio, RadioChangeEvent, Row, Statistic } from 'antd';
import React, { useState } from 'react';
import { SimpleOptions } from 'types';

interface Props extends PanelProps<SimpleOptions> { }

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `
  };
};

const plainOptions = [
  { value: 'lg', label: 'Large' },
  { value: 'md', label: 'Middle' },
  { value: 'sm', label: 'Small' }
];

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  console.log({ data })
  const styles = useStyles2(getStyles);
  const [value1, setValue1] = useState(options.seriesCountSize);

  const max = data.series[0]?.fields[0].state?.range?.max
  const min = data.series[0]?.fields[0].state?.range?.min


  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio1 checked', value);
    setValue1(value);
  };
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Max"
                value={max || 0}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Min"
                value={min || 0}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <br />
        <Radio.Group onChange={onChange1} value={value1} optionType="button">
          {
            plainOptions.map((option) =>
              <Radio.Button key={option.value} value={option.value}>
                {option.label}
              </Radio.Button>)
          }
        </Radio.Group>

        <h2>{value1}</h2>
        <br />
        {options.showSeriesCount && <div>Number of series: {data.series.length}</div>}
        <div>Text option value: {options.text}</div>
        <div style={{ backgroundColor: options.nameColorPicker }}> testtt</div>
      </div>
    </div>
  );
};
