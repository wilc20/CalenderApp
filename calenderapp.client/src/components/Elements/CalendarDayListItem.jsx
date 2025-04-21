import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './CalendarDayListItem.module.css';


const CalendarDayListItem = ({ itemDetails }) => {

    //const [itemId, setItemId] = useState(mEntry.id); 
    let itemId = itemDetails.id;

    return (
        <li className={classes.listItem}>
            <Link to={`/edit/${itemId}`} state={{ title: itemDetails.title, description: itemDetails.description, eventDateTime: itemDetails.eventDateTime }}>
              <h1>{itemDetails.title}</h1>
              <p>{itemDetails.description}</p>
              <h5>{itemDetails.eventDateTime}</h5>
          </Link>
      </li>
  );
}

export default CalendarDayListItem;