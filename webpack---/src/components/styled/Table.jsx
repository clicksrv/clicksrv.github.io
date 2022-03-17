import styled from 'styled-components'

export default styled.table`
  color: #333;
  width: 100%;

  td,
  th {
    border-bottom: 1px solid #ccc;
    text-align: left;
    font-weight: 400;
    padding: 1em 0;
  }

  th {
    color: #999;
    border-bottom: 3px solid #ccc;
  }

  tr:last-child td {
    border-bottom: none;
  }
`
