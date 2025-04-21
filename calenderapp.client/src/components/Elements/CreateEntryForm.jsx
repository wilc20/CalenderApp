import React, { useState, useContext } from 'react';
import { CalendarContext } from '../../context/CalendarProvider';
import classes from "../Pages/CalendarEntry.module.css";

const CreateEntryForm = ({ onSuccess, chosenDate }) => {

    const [values, setValues] = useState({
        title: '',
        description: '',
        eventDateTime: chosenDate
    });

    const [validation, setValidation] = useState({});

    const { createEntry } = useContext(CalendarContext);

    const isValid = () => {
        let validationErrors = {};

        if (values.title.length < 1) {
            validationErrors.title = "Title cannot be less than 1 character. ";
        }
        if (values.title.length > 50) {
            validationErrors.title = "Title cannot be more than 50 characters. ";
        }
        if (values.description.length > 300) {
            validationErrors.description = "Description cannot be more than 300 characters. ";
        }

        if (values.eventDateTime == null) {
            validationErrors.eventDateTime = "Pick a date & time to proceed.";
        }

        if (Object.keys(validationErrors).length) {
            setValidation({ ...validationErrors });
            return false;
        } else {
            setValidation({});
            return true;
        }
    }


    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const submitValues = async (event) => {
        event.preventDefault();
        if (isValid) {
            try {
                let success = await createEntry(values.title, values.description, values.eventDateTime);
                console.log(`success: ${success}`);
                if (success) onSuccess();
            } catch (err) {
                console.error(err);
            }
        }
    };

  return (
      <div >
          <h1>Create Event</h1>
          <form onSubmit={submitValues}>
              <div className={classes.formInputs}>
                  <div>
                      <label htmlFor="title">Title:</label>
                      <input type="text" id="title" name="title" onChange={handleInput} required />
                      {validation?.title && <p>{validation.title}</p>}
                  </div>
                  <div>
                      <label htmlFor="description">Description:</label>
                      <textarea maxLength="300" id="description" name="description" onChange={handleInput} required />
                      {validation?.description && <p>{validation.description}</p>}
                  </div>
                  <div>
                      <label htmlFor="eventDateTime">Date & time:</label>
                      <input type="datetime-local" id="eventDateTime" name="eventDateTime" onChange={handleInput} required defaultValue={chosenDate} />
                      {validation?.eventDateTime && <p>{validation.eventDateTime}</p>}
                  </div>
                  <button className={classes.updateButton} type="submit">Create Event</button>
              </div>
          </form>
      </div>
  );
}

export default CreateEntryForm;