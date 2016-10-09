import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';

import Row from '../Row';
import * as ItemTypes from '../types';

import './styles/index.css';

function getStyles({ currentOffset }) {
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform: transform,
  };
}

class KanbanDragLayer extends Component {
  renderRow(type, item) {
    switch (type) {
    case ItemTypes.ROW_TYPE:
      return (
        // TODO: Move me toa RowPreview component
        <div style={{width: 160, backgroundColor: 'green', transform: 'rotate(-7deg)'}}>
          <Row row={item.row} />
        </div>
      );
    default:
      return null;
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div className='DragLayer'>
        <div style={getStyles(this.props)}>
          {this.renderRow(itemType, item)}
        </div>
      </div>
    );
  }
}

KanbanDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired
};

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(KanbanDragLayer);