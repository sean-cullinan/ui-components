import React, {useCallback, useState} from 'react'

import { Variables } from '../../../../common'
import {
  FontAwesomeIconButton,
  IFontAwesomeIconButtonProps
} from '../../../Buttons/FontAwesomeIconButton/FontAwesomeIconButton'
import { GridLayout } from '../../../Layouts/GridLayout'
import { Text } from '../../../Typographies'
import { LinkVariant } from '../../../Typographies/Text/subcomponents/Link'
import { TableRowVariant } from '../services/colors'
import {
  getSortButtonDirection,
  handleHeaderTitleClicked,
  handleSortButtonClicked
} from '../services/helper'
import {
  StyledHeaderCell,
  StyledHeaderCellWithHeaderSize,
  StyledHeaderLeftCell,
  StyledRow,
  StyledSortButton
} from '../services/style'
import {
  ColumnAlignment,
  ColumnSize,
  IColumnProps,
  IColumnSorts,
  getActionsIconButtonGroup
} from '../Table'
import { TableCheckboxInput, TableCheckboxInputValue } from './TableCheckboxInput'

interface ITableHeaderProps <T> {
  columns: Array<IColumnProps<T>>
  selectedAll: TableCheckboxInputValue
  setSelectedAll: (value: TableCheckboxInputValue) => void
  bulkActions?: IFontAwesomeIconButtonProps[]
  hasLeftAction: boolean
  hasBulkAction: boolean
  hasTableSwipeActions: boolean
  isEmpty: boolean
  sort?: IColumnSorts
  onSortChange?: (sort: IColumnSorts) => void
}

interface ITableHeaderCellContentProps <T> {
  column: IColumnProps<T>
  sort?: IColumnSorts
  onSortChange?: (sort: IColumnSorts) => void
}

const TableHeaderCellContent = <T extends {}>(props: ITableHeaderCellContentProps<T>) => {
  const { column, sort, onSortChange } =props
  const {
    name,
    title,
    alignment = ColumnAlignment.Left
  } = column

  const [hasHeaderHovered, setHasHeaderHovered] = useState<boolean>(false)

  const setHeaderHoveredTrue = useCallback(() => setHasHeaderHovered(true), [setHasHeaderHovered])
  const setHeaderHoveredFalse = useCallback(() => setHasHeaderHovered(false), [setHasHeaderHovered])

  const sortButton = (
    <StyledSortButton alignment={alignment} sort={sort && getSortButtonDirection(hasHeaderHovered, sort[name])} onClick={handleSortButtonClicked(name, sort, onSortChange)}>
      <FontAwesomeIconButton icon='arrow-down' type='solid' isHovered={hasHeaderHovered}/>
    </StyledSortButton>
  )

  if (title) {
    return (
      <>
        {alignment === ColumnAlignment.Right && sortButton}
        <span onMouseEnter={setHeaderHoveredTrue} onMouseLeave={setHeaderHoveredFalse}>
            <Text weight={Variables.FontWeight.fwSemiBold}>
              <Text.Link
                variant={LinkVariant.Unstyled}
                onClick={handleHeaderTitleClicked(name, setHasHeaderHovered, sort, onSortChange)}
              >
                {title}
              </Text.Link>
            </Text>
          </span>
        {alignment === ColumnAlignment.Left && sortButton}
      </>
    )
  }

  return null
}

const getHeaderCells = <T extends {}>(
  hasTableSwipeActions: boolean,
  columns: Array<IColumnProps<T>>,
  hasLeftAction: boolean,
  sort?: IColumnSorts,
  onSortChange?: (sort: IColumnSorts) => void,
  bulkActions?: IFontAwesomeIconButtonProps[]
) => {
  const hasHeaderSize = columns.some((column) => !!column.headerSize)

  if (hasHeaderSize) {
    return (
      <StyledHeaderCellWithHeaderSize colSpan={!hasLeftAction ? columns.length : columns.length + 1}>
        <GridLayout
          cells={
            columns.map((column, index) => {
              const size = column.headerSize || column.size

              return ({
                displayType: 'flex',
                flexHorizontalAlignment: (column.alignment && column.alignment === ColumnAlignment.Right) ? GridLayout.HorizontalAlignment.Right : GridLayout.HorizontalAlignment.Left,
                size: (size === ColumnSize.Shrink) ? 'shrink' : 'auto',
                content: <div><TableHeaderCellContent<T> column={column} sort={sort} onSortChange={onSortChange}/></div>
              })
            })
          }
        />
      </StyledHeaderCellWithHeaderSize>
    )
  }

  return (
    columns.map((column, index) => {
      const {
        name,
        size,
        alignment = ColumnAlignment.Left
      } =  column

      const isLastColumn = index === columns.length - 1
      const isFirstColumn = !hasLeftAction && index === 0

      if (bulkActions && hasLeftAction) {
        return (
          <StyledHeaderCell key={name} size={size} alignment={alignment}>
            {
              index === 0 && getActionsIconButtonGroup(bulkActions, 'bulk')
            }
          </StyledHeaderCell>
        )
      }

      return (
        <StyledHeaderCell key={name} colSpan={(isLastColumn && hasTableSwipeActions) ? 2 : undefined} size={size} alignment={alignment} isLastColumn={isLastColumn} isFirstColumn={isFirstColumn}>
          <TableHeaderCellContent<T> column={column} sort={sort} onSortChange={onSortChange}/>
        </StyledHeaderCell>
      )})
  )
}

const TableHeader = <T extends {}>(props: ITableHeaderProps<T>) => {
  const {
    hasLeftAction,
    columns,
    sort,
    onSortChange,
    hasTableSwipeActions,
    selectedAll,
    setSelectedAll,
    bulkActions,
    hasBulkAction,
    isEmpty
  } = props

  const setSelectedAllTableCheckboxInputValue = useCallback((value) => setSelectedAll(value), [setSelectedAll])

  return (
    <StyledRow variant={TableRowVariant.Neutral} isHeader isEmptyHeader={isEmpty} >
      {
        (!hasLeftAction || isEmpty) ? getHeaderCells(hasTableSwipeActions, columns, hasLeftAction, sort, onSortChange,hasBulkAction ? bulkActions : undefined ) : (
          <>
            <StyledHeaderLeftCell>
              <TableCheckboxInput
                name='selectAll'
                value={selectedAll}
                onChange={setSelectedAllTableCheckboxInputValue}
              />
            </StyledHeaderLeftCell>
            {
              getHeaderCells(hasTableSwipeActions, columns, hasLeftAction, sort, onSortChange,hasBulkAction ? bulkActions : undefined )
            }
          </>
        )
      }

    </StyledRow>
  )
}

export {
  TableHeader
}
