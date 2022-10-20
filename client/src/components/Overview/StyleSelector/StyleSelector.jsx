import react from 'react';
import ThumbnailRow from './ThumbnailRow.jsx';

export default function StyleSelector({ styles, selectedStyleId, selectedStylePosition, clickStyle }) {
  let rowsOfThumbnails = Math.ceil(styles.length/4);
  let rows = [];
  for (let j = 0; j < rowsOfThumbnails; j++) {
    let stylesOfRow = styles.slice((j * 4), ((j + 1) * 4));
    rows.push(stylesOfRow);
  }
  return (
    <div className='styleSelectorRowsContainer'>
      <div className='style-name'> <b> Style > </b> {styles[selectedStyleId].name} </div>
      {rows.map((row, i) => {
        return (<ThumbnailRow key={i} rowKey={i} row={row} selectedStylePosition={selectedStylePosition} clickStyle={clickStyle}/>)
      })}
    </div>
  );
};