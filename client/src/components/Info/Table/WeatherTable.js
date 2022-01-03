import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { COLUMNS } from './Columns'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

export const WeatherTable = (props) => {
    const columns = useMemo( () => COLUMNS, [] )
    const data = useMemo( () => props.data, [props.data] )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    }, useSortBy)
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map( headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} >
                        {headerGroup.headers.map( column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                { column.render("Header") }
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/> ) : ""}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map( cell => {
                                return <td className="tableCell" {...cell.getCellProps()}> {cell.render("Cell")}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
          
        </table>
    )
}