import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';

import './Datatable.less';

export function toRowCol(data) {
  if (Array.isArray(data) && data.length > 0) {
    let columns = Object.keys(data[0]);
    let rows = data.map(row=> columns.map(key=>row[key]));
    return { rows, columns };
  } else {
    return { rows: [], columns: [] };
  }
}

export const Datatable = React.createClass({
  render: function() {
    const props = this.props;
    const opts = this.props.tableOpts || {
      maxRows: 10
    }

    function truncateTable(rows, limit) {
      if (limit && limit < rows.size) {
        return {
          rows: rows.take(limit),
          hidden: rows.size-limit
        };
      } else {
        return {rows, hidden: 0};
      }
    }

    function renderTable(allRows, columns) {
      const { rows, hidden } = truncateTable(allRows, opts.maxRows);
      return <div>
        {Table(columns, rows, opts)}
        { hidden > 0 ?
          <span><i>{hidden} additional row{hidden > 1 ? 's' : null} hidden</i></span>
          : null }
      </div>;
    }

    const { rows, columns } = toRowCol(props.data);
    return renderTable(rows, columns);
  }
})


const Table = (columns = List(), rows = List()) => {
  if (rows.size === 0) {
    return <span><i>No data to show</i></span>;
  } else {
    let el = ReactFauxDOM.createElement('table');
    let table = d3.select(el);

    table.attr('class', 'table table-bordered table-hover table-condensed');

    table.append('thead').append("tr")
      .selectAll("td").data(columns)
      .enter().append('td').text(d=>d)

    table.append('tbody')
      .selectAll("tr").data(rows)
      .enter().append("tr")
      .selectAll("td").data(d=>d).enter().append("td").text(d=>d)

    return el.toReact();
  }
}
