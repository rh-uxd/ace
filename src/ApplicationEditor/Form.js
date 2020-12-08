import React from 'react';
import { Form, FormGroup, TextInput } from '@patternfly/react-core';

export default () => {

  return (
    <React.Fragment>
      <h2>Usage</h2>
      <Form style={{ marginTop: '24px' }}>
        <FormGroup label="Number of users"> 
          <TextInput id="users" />
        </FormGroup>
      </Form>
    </React.Fragment>
  );
}
