import React from 'react';
import { Button } from '@patternfly/react-core';

export default ({ onViewEstimate }) => {
  const costs = [
    ['Cluster', '$10,000'],
    ['Data storage', '$10,000'],
    ['Outgress', '$10,000'],
    ['Total', '$30,000']
  ];
  return (
    <div style={{ display: 'flex', marginTop: 'auto' }}>
    {/*<h2>
        Quick Estimate
      </h2>
      <table>
        <tbody>
          {costs.map(([name, amount]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{amount}</td>
            </tr>
          ))}
        </tbody>
      </table>*/}
      <Button style={{ width: '100%', height: '100px' }} onClick={onViewEstimate}>
        View estimate
      </Button>
    </div>
  );
}
