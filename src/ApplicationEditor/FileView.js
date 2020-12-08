import React from 'react';
import { TreeViewList, TreeViewListItem, Toolbar, ToolbarGroup, ToolbarItem, ToolbarContent, Button } from '@patternfly/react-core';
import FileIcon from '@patternfly/react-icons/dist/js/icons/file-icon';
import FolderIcon from '@patternfly/react-icons/dist/js/icons/folder-icon';
import UploadIcon from '@patternfly/react-icons/dist/js/icons/upload-icon';

export default () => {
  return (
    <React.Fragment>
      <Toolbar width="300px">
        <ToolbarContent>
          <ToolbarItem><b>Files</b></ToolbarItem>
          <ToolbarGroup variant="icon-button-group">
            <ToolbarItem>
              <Button variant="plain" aria-label="new file"><FileIcon /></Button>
            </ToolbarItem>
            <ToolbarItem>
              <Button variant="plain" aria-label="new folder"><FolderIcon /></Button>
            </ToolbarItem>
            <ToolbarItem>
              <Button variant="plain" aria-label="upload folder"><UploadIcon /></Button>
            </ToolbarItem>
          </ToolbarGroup>
        </ToolbarContent>
      </Toolbar>
      <TreeViewList isNested>
        <TreeViewListItem name="Folder">
          <TreeViewListItem name="app.yml" />
        </TreeViewListItem>
      </TreeViewList>
    </React.Fragment>
  );
}
