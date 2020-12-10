import React from 'react';
import {
  Button,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  ToolbarGroup,
  Title,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  Pagination
} from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/js/icons/search-icon';
import { TableComposable, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';


export default ({
  apps,
  onRowEdit
}) => {
  const columns = ['App', 'Pods', 'CPU', 'RAM', 'Storage', 'Egress'];
  const [rows, setRows] = React.useState(apps);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(5);
  const [displayedRows, setDisplayedRows] = React.useState(rows);
  React.useEffect(() => {
    const start = (page - 1) * perPage;
    const newDisplayedRows = rows.slice(start, start + perPage);
    newDisplayedRows.push({
      app: 'Total',
      type: '',
      pods: rows.reduce((acc, { pods }) => acc + parseInt(pods), 0),
      cpu: rows.reduce((acc, { cpu }) => acc + parseInt(cpu), 0),
      ram: rows.reduce((acc, { ram }) => acc + parseInt(ram), 0) + 'GB',
      storage: rows.reduce((acc, { storage }) => acc + parseInt(storage), 0) + 'GB',
      egress: rows.reduce((acc, { egress }) => acc + parseInt(egress), 0) + 'TB',
    });
    setDisplayedRows(newDisplayedRows);
  }, [page, perPage, rows]);

  const onSelect = (_ev, isSelected, rowId) => {
    rowId += (page - 1) * perPage;
    rows[rowId].isSelected = isSelected;
    setRows(Array.from(rows));
  };

  const selected = rows.filter(row => row.selected);

  return (
    <div style={{ width: '800px' }}>
      <Toolbar collapseListedFiltersBreakpoint="xl">
        <ToolbarContent>
          <ToolbarGroup>
            <ToolbarItem>
              <Button variant="primary">
                Add app
              </Button>
            </ToolbarItem>
            <ToolbarItem>
              <Button variant="link">
                {selected.length > 0
                  ? `Delete ${selected.length} app${selected.length > 1 ? 's' : ''}`
                  : 'Delete'
                }
              </Button>
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarItem variant="pagination" align={{ default: 'alignRight' }}>
            <Pagination
              isCompact
              itemCount={rows.length}
              perPageOptions={[5, 10, 20, 50, 100].map(i => ({ title: i, value: i }))}
              perPage={perPage}
              page={page}
              onSetPage={(_evt, newPage) => setPage(newPage)}
              onPerPageSelect={(_evt, newPerPage) => setPerPage(newPerPage)}
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <TableComposable aria-label="Apps table">
        <Thead noWrap>
          <Tr>
            <Th
              select={{
                onSelect: (_evt, isSelected) => {
                  rows.forEach(row => row.isSelected = isSelected);
                  setRows(Array.from(rows));
                },
                isSelected: rows.every(row => row.isSelected)
              }}
            />
            <Th>{columns[0]}</Th>
            <Th
              info={{
                tooltip: 'How many instances of your app must be run',
                tooltipProps: {
                  isContentLeftAligned: true
                }
              }}
            >
              {columns[1]}
            </Th>
            <Th>{columns[2]}</Th>
            <Th>{columns[3]}</Th>
            <Th>{columns[4]}</Th>
            <Th>{columns[5]}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {displayedRows.map(({
            app,
            type,
            pods,
            cpu,
            ram,
            storage,
            egress,
            isSelected
          }, rowIndex) => (
            <Tr key={rowIndex} onClick={() => onRowEdit(rowIndex + (page - 1) * perPage)}>
              <Td
                {...(rowIndex === displayedRows.length - 1
                  ? {}
                  : {
                    select:{
                      rowIndex,
                      onSelect,
                      isSelected,
                    }
                  }
                )}
              />
              <Td dataLabel={columns[0]}>
                {app}{type ? ` / ${type}` : ''}
              </Td>
              <Td dataLabel={columns[1]}>{pods}</Td>
              <Td dataLabel={columns[2]}>{cpu}</Td>
              <Td dataLabel={columns[3]}>{ram}</Td>
              <Td dataLabel={columns[4]}>{storage}</Td>
              <Td dataLabel={columns[5]}>{egress}</Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
      {displayedRows.length === 0 && (
        <EmptyState>
          <EmptyStateIcon icon={SearchIcon} />
          <Title headingLevel="h5" size="lg">
            No apps
          </Title>
          <EmptyStateBody>
            Add apps to begin cost estimate
          </EmptyStateBody>
          <EmptyStateSecondaryActions>
            <Button variant="link">
              Add app
            </Button>
          </EmptyStateSecondaryActions>
        </EmptyState>
      )}
    </div>
  );
}
