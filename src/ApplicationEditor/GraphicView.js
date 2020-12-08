import React from 'react';
import { SelectOption } from '@patternfly/react-core';
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant,
  cancelCellEdits,
  validateCellEdits,
  applyCellEdits,
  EditableTextCell,
  EditableSelectInputCell
} from '@patternfly/react-table';

export default class EditableRowsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: ['Text input col 1', 'Disabled text input col 2', 'Text input col 3', 'Text input col 4'],
      actions: [
        {
          title: 'Some action',
          onClick: (event, rowId, rowData, extra) => console.log('clicked on Some action, on row: ', rowId)
        }
      ],
      rows: [
        {
          rowEditBtnAriaLabel: idx => `Edit row ${idx}`,
          rowSaveBtnAriaLabel: idx => `Save edits for row ${idx}`,
          rowCancelBtnAriaLabel: idx => `Cancel edits for row ${idx}`,
          rowEditValidationRules: [
            {
              name: 'required',
              validator: value => value.trim() !== '',
              errorText: 'This field is required'
            }
          ],
          cells: [
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  inputAriaLabel="Row 1 cell 1 content"
                />
              ),
              props: {
                value: 'Row 1 cell 1 content',
                name: 'uniqueIdRow1Cell1'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  isDisabled
                  inputAriaLabel="Row 1 cell 2 content"
                />
              ),
              props: {
                value: 'Row 1 cell 2, disabled content',
                name: 'uniqueIdRow1Cell2'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  inputAriaLabel="Row 1 cell 3 content"
                />
              ),
              props: {
                value: 'Row 1 cell 3 content',
                name: 'uniqueIdRow1Cell3'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableSelectInputCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  onSelect={this.onSelect}
                  isOpen={props.isSelectOpen}
                  options={props.options.map((option, index) => (
                    <SelectOption
                      key={index}
                      value={option.value}
                      id={'uniqueIdRow1Cell4Option' + index}
                      isPlaceholder={option.isPlaceholder}
                    />
                  ))}
                  onToggle={isOpen => {
                    this.onToggle(isOpen, rowIndex, cellIndex);
                  }}
                  selections={props.selected}
                />
              ),
              props: {
                value: ['Option 1'],
                name: 'uniqueIdRow1Cell4',
                isSelectOpen: props.isSelectOpen || false,
                selected: props.selected || ['Option 1'],
                options: [
                  { value: 'Placeholder...', isPlaceholder: true },
                  { value: 'Option 1' },
                  { value: 'Option 2' },
                  { value: 'Option 3' },
                  { value: 'Option 4' },
                  { value: 'Option 5' }
                ],
                editableSelectProps: {
                  variant: 'single',
                  'aria-label': 'Row 1 cell 4 content'
                }
              }
            }
          ]
        },
        {
          cells: [
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  inputAriaLabel="Row 2 cell 1 content"
                />
              ),
              props: {
                value: 'Row 2 cell 1 content',
                name: 'uniqueIdRow2Cell1'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  isDisabled
                  inputAriaLabel="Row 2 cell 2 content"
                />
              ),
              props: {
                value: 'Row 2 cell 2, disabled content',
                name: 'uniqueIdRow2Cell2'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  inputAriaLabel="Row 2 cell 3 content"
                />
              ),
              props: {
                value: 'Row 2 cell 3 content',
                name: 'uniqueIdRow2Cell3'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableSelectInputCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  onSelect={this.onSelect}
                  clearSelection={this.clearSelection}
                  isOpen={props.isSelectOpen}
                  options={props.options.map((option, index) => {
                    return (
                      <SelectOption
                        key={index}
                        value={option.value}
                        id={'uniqueIdRow2Cell4Option' + index}
                        isPlaceholder={option.isPlaceholder}
                      />
                    );
                  })}
                  onToggle={isOpen => {
                    this.onToggle(isOpen, rowIndex, cellIndex);
                  }}
                  selections={props.selected}
                />
              ),
              props: {
                value: ['Placeholder...'],
                name: 'uniqueIdRow2Cell4',
                isSelectOpen: props.isSelectOpen || false,
                selected: props.selected || [],
                options: [
                  { value: 'Placeholder...', isPlaceholder: true },
                  { value: 'Option 1' },
                  { value: 'Option 2' },
                  { value: 'Option 3' },
                  { value: 'Option 4' },
                  { value: 'Option 5' }
                ],
                editableSelectProps: {
                  variant: 'typeaheadmulti',
                  'aria-label': 'Row 2 cell 4 content',
                  toggleId: 'editable-toggle'
                }
              }
            }
          ]
        },
        {
          rowEditValidationRules: [
            {
              name: 'required',
              validator: value => value.trim() !== '',
              errorText: 'This field is required'
            },
            {
              name: 'notFoo',
              validator: value => value.trim().toLowerCase() !== 'foo',
              errorText: 'Value cannot be "foo"'
            },
            {
              name: 'minLength',
              validator: value => value.trim().length >= 7,
              errorText: 'Value must be at least 7 characters'
            },
            {
              name: 'notXyz',
              validator: value => value.trim().toLowerCase() !== 'xyz',
              errorText: 'Value cannot be xyz'
            }
          ],
          cells: [
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  inputAriaLabel="Row 3 cell 1 content"
                />
              ),
              props: {
                value: 'Row 3 cell 1 content',
                name: 'uniqueIdRow3Cell1'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  isDisabled
                  inputAriaLabel="Row 3 cell 2 content"
                />
              ),
              props: {
                value: 'Row 3 cell 2, disabled content',
                name: 'uniqueIdRow3Cell2'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  inputAriaLabel="Row 3 cell 3 content"
                />
              ),
              props: {
                value: 'Row 3 cell 3 content',
                name: 'uniqueIdRow3Cell3'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableSelectInputCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  onSelect={this.onSelect}
                  clearSelection={this.clearSelection}
                  isOpen={props.isSelectOpen}
                  options={props.options.map((option, index) => (
                    <SelectOption
                      key={index}
                      value={option.value}
                      id={'uniqueIdRow3Cell4Option' + index}
                      isPlaceholder={option.isPlaceholder}
                    />
                  ))}
                  onToggle={isOpen => {
                    this.onToggle(isOpen, rowIndex, cellIndex);
                  }}
                  selections={props.selected}
                />
              ),
              props: {
                value: ['Option 3'],
                name: 'uniqueIdRow3Cell4',
                isSelectOpen: props.isSelectOpen || false,
                selected: props.selected || ['Option 3'],
                options: [
                  { value: 'Placeholder...', isPlaceholder: true },
                  { value: 'Option 1' },
                  { value: 'Option 2' },
                  { value: 'Option 3' },
                  { value: 'Option 4' },
                  { value: 'Option 5' }
                ],
                editableSelectProps: {
                  variant: 'checkbox',
                  'aria-label': 'Row 3 cell 4 content'
                }
              }
            }
          ]
        }
      ]
    };

    this.updateEditableRows = (evt, type, isEditable, rowIndex, validationErrors) => {
      let newRows = Array.from(this.state.rows);

      if (validationErrors && Object.keys(validationErrors).length) {
        newRows[rowIndex] = validateCellEdits(newRows[rowIndex], type, validationErrors);
        this.setState({ rows: newRows });
        return;
      }

      if (type === 'cancel') {
        newRows[rowIndex] = cancelCellEdits(newRows[rowIndex]);
        this.setState({ rows: newRows });
        return;
      }

      newRows[rowIndex] = applyCellEdits(newRows[rowIndex], type);

      this.setState({ rows: newRows });
    };

    this.handleTextInputChange = (newValue, evt, rowIndex, cellIndex) => {
      let newRows = Array.from(this.state.rows);
      newRows[rowIndex].cells[cellIndex].props.editableValue = newValue;
      this.setState({
        rows: newRows
      });
    };

    this.onSelect = (newValue, evt, rowIndex, cellIndex, isPlaceholder) => {
      const newRows = Array.from(this.state.rows);
      const newCellProps = newRows[rowIndex].cells[cellIndex].props;

      if (isPlaceholder) {
        newCellProps.editableValue = [];
        newCellProps.selected = [];
      } else {
        if (newCellProps.editableValue === undefined) {
          newCellProps.editableValue = [];
        }

        let newSelected = Array.from(newCellProps.selected);

        switch (newCellProps.editableSelectProps.variant) {
          case 'typeaheadmulti':
          case 'checkbox': {
            if (!newSelected.includes(newValue)) {
              newSelected.push(newValue);
            } else {
              newSelected = newSelected.filter(el => el !== newValue);
            }
            break;
          }
          default: {
            newSelected = newValue;
          }
        }

        newCellProps.editableValue = newSelected;
        newCellProps.selected = newSelected;
      }

      this.setState({
        rows: newRows
      });
    };

    this.clearSelection = (rowIndex, cellIndex) => {
      const newRows = Array.from(this.state.rows);
      const newCellProps = newRows[rowIndex].cells[cellIndex].props;
      newCellProps.editableValue = [];
      newCellProps.selected = [];
      this.setState({
        rows: newRows
      });
    };

    this.onToggle = (isOpen, rowIndex, cellIndex) => {
      let newRows = Array.from(this.state.rows);
      newRows[rowIndex].cells[cellIndex].props.isSelectOpen = isOpen;
      this.setState({
        rows: newRows
      });
    };
  }

  render() {
    const { columns, rows, actions } = this.state;

    return (
      <Table
        actions={actions}
        onRowEdit={this.updateEditableRows}
        aria-label="Editable Rows Table"
        variant={TableVariant.compact}
        cells={columns}
        rows={rows}
      >
        <TableHeader />
        <TableBody />
      </Table>
    );
  }
}
