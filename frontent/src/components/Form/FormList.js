import React from 'react';
import { Table } from 'react-bootstrap';
import FormLine from './FormLine'
import PropTypes from 'prop-types'

const FormList = ({ forms }) => (
  <div>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Pavadinimas</th>
          <th>Aprašymas</th>
        </tr>
      </thead>
      <tbody>
        {forms.map((form, index) => (
          <FormLine key={index} {...form} />
        ))}
      </tbody>
    </Table>
  </div>
)

FormList.propTypes = {
  forms: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
}

export default FormList;