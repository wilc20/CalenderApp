import React, { useState, useContext } from 'react';
import {  useLocation, useParams, useNavigate } from 'react-router-dom';
import Modal from '../Elements/Modal';
import { CalendarContext } from '../../context/CalendarProvider';
import classes from "./CalendarEntry.module.css";

const CalendarEntry = () => {

    const [isEditView, setIsEditView] = useState(false);


    const location = useLocation();
    const navigate = useNavigate();
    const { title, description, eventDateTime } = location.state || {};

    const [values, setValues] = useState({
        title: title,
        description: description,
        eventDateTime: eventDateTime
    });

    const { id } = useParams();
    const { updateEntry, deleteEntry, retrieveCalendarEntries } = useContext(CalendarContext);

    const convertedDate = new Date(eventDateTime).toISOString().slice(0, 16);


    const handleDeletion = async () => {
        try {
            let success = await deleteEntry(id);
            if (success) {
                await retrieveCalendarEntries();
                navigate('/');
            }
        } catch (err) {
            console.error(err);
        }

    };

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const submitValues = async (event) => {
        event.preventDefault();
        try {
            let success = await updateEntry(id, values.title, values.description, values.eventDateTime);
            console.log(`success: ${success}`);
            if (success) {
                await retrieveCalendarEntries();
                navigate('/')
            };
        } catch (err) {
            console.error(err);
        }
    };

    const displayView = <div>
        <h1>Item details</h1>
        <h3>{title}</h3>
        <p>{description}</p>
        <h5>{eventDateTime}</h5>
        <div className={classes.entryButtons}>
            <button onClick={() => setIsEditView(true)}>Edit</button>
            <button onClick={() => handleDeletion()}>Delete</button>
        </div>

    </div>

    const editView = <div >
        <h1>Update Item</h1>
        <form onSubmit={submitValues}>
            <div className={classes.formInputs}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" onChange={handleInput} defaultValue={title} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea maxLength="300" id="description" name="description" onChange={handleInput}  defaultValue={description} />
                </div>
                <div>
                    <label htmlFor="eventDateTime">Date & time:</label>
                    <input type="datetime-local" id="eventDateTime" name="eventDateTime" onChange={handleInput} defaultValue={convertedDate} />
                </div>
                <button className={classes.updateButton} type="submit">Update Event</button>
            </div>
        </form>
        <div className={classes.entryButtons}>
            <button onClick={() => setIsEditView(false)}>Cancel</button>
        </div>
    </div>

  return (
      <div className={classes.entryBase}>
          {isEditView ? editView : displayView }
      </div>
  );
}

export default CalendarEntry;