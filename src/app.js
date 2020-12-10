import React from 'react';
import { Button, Page, PageHeader, Split, SplitItem, Drawer, DrawerContent, DrawerContentBody, DrawerPanelContent, DrawerHead, DrawerActions, DrawerCloseButton, DrawerPanelBody, Title } from '@patternfly/react-core';
import FileView from './ApplicationEditor/FileView';
import Editor from './ApplicationEditor/Editor';
import AppForm from './ApplicationEditor/AppForm';
import AppsView from './ApplicationEditor/AppsView';
import QuickEstimate from './Estimate/QuickEstimate';
import './app.css';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

export default () => {
  const [apps, setApps] = React.useState(Array.from(Array(10).keys()).map(i => ({
    app: 'App ' + i,
    type: 'NodeJS',
    pods: getRandomInt(20),
    cpu: getRandomInt(5),
    ram: getRandomInt(32),
    storage: getRandomInt(10),
    egress: getRandomInt(5)
  })));
  const [view, setView] = React.useState('editor');
  const [rowEditIndex, setRowEditIndex] = React.useState(null);
  const header = (
    <PageHeader
      logo="ACE"
      logoProps={{ href: '/' }}
    />
  );
  const appEditing = apps[rowEditIndex];
  const panelContent = appEditing ? (
    <DrawerPanelContent>
      <DrawerHead>
        <Title headingLevel="h2" size="xl">
          Edit {appEditing.app}
        </Title>
        <DrawerActions>
          <DrawerCloseButton onClick={() => setRowEditIndex(null)} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        <AppForm app={appEditing} />
      </DrawerPanelBody>
    </DrawerPanelContent>
  ) : null;

  return (
    <Page header={header}>
      {view === 'editor' && (
        <section style={{ flexGrow: 1 }}>
          <Drawer position="left" isExpanded={appEditing}>
            <DrawerContent panelContent={panelContent}>
              <DrawerContentBody>
                <Split style={{ height: '100%' }}>
                  <SplitItem>
                    <FileView />
                  </SplitItem>
                  <SplitItem isFilled>
                    <Editor />
                  </SplitItem>
                  <SplitItem style={{ display: 'flex', flexDirection: 'column' }}>
                    <AppsView apps={apps} onRowEdit={setRowEditIndex} />
                    <QuickEstimate onViewEstimate={() => setView('estimate')} />
                  </SplitItem>
                </Split>
              </DrawerContentBody>
            </DrawerContent>
          </Drawer>
       </section>
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
