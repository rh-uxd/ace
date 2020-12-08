import React from 'react';
import { Button, Page, PageHeader, Split, SplitItem } from '@patternfly/react-core';
import FileView from './ApplicationEditor/FileView';
import Editor from './ApplicationEditor/Editor';
import Form from './ApplicationEditor/Form';
import GraphicView from './ApplicationEditor/GraphicView';
import EstimatePreview from './Estimate/Preview';
import './app.css';

export default () => {
  const [view, setView] = React.useState('editor');
  const Header = (
    <PageHeader
      logo="ACE"
      logoProps={{ href: '/' }}
    />
  );

  return (
    <Page header={Header}>
      {view === 'editor' && (
        <React.Fragment>
          <section style={{ flexGrow: 1 }}>
            <Split style={{ height: '100%' }}>
              <SplitItem>
                <FileView />
              </SplitItem>
              <SplitItem isFilled>
                <Editor />
              </SplitItem>
              <SplitItem>
                <GraphicView />
                <Form />
              </SplitItem>
            </Split>
          </section>
          <section>
            <EstimatePreview onViewEstimate={() => setView('estimate')} />
          </section>
        </React.Fragment>
      )}
      {view === 'estimate' && (
        <React.Fragment>
          <div>Based on needing 10 vCPUs and 100GB of RAM, we recommend a medium cluster</div>
          <div>TODO: data model and pretty table</div>
          <Button onClick={() => setView('editor')}>Back to editor</Button>
        </React.Fragment>
      )}
    </Page>
  );
}
