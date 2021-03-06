import React from 'react'
import { Table } from 'react-bootstrap'
import EventLine from './EventLine'
import PropTypes from 'prop-types'

const EventList = ({ events }) => (
  <div>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Pavadinimas</th>
          <th>Data</th>
          <th>Vieta</th>
          <th>Aprašymas</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <EventLine key={index} {...event} />
        ))}
      </tbody>
    </Table>
  </div>
)

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      place: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
}

export default EventList