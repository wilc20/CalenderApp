import React, { useContext } from 'react'
import { useEffect, useState, useRef } from 'react';
import Modal from '../Elements/Modal';
import CalendarDayListItem from '../Elements/CalendarDayListItem';
import { CalendarContext } from '../../context/CalendarProvider';
import classes from "./Calendar.module.css";

const Calender = () => {

    const [userDateTime, setUserDateTime] = useState();
    const [currentCalendar, setCurrentCalendar] = useState();
    const [content, setContent] = useState();
    const [modalEntries, setModalEntires] = useState();

    const { createEntry, retrieveCalendarEntries, entries, loading } = useContext(CalendarContext);
    

    const createEntryDialog = useRef();
    const viewEntriesDialog = useRef();

    useEffect(() => {
        const currentDate = new Date();
        let dateTime = {
            day: currentDate.getDate(),
            month: (currentDate.getMonth() + 1),
            year: currentDate.getFullYear(),
            hour: currentDate.getHours(),
            minutes: currentDate.getMinutes(),
        };
        setUserDateTime({ ...dateTime });
        //let daysInMonth = new Date(dateTime.year, dateTime.month, 0).getDate();
        setCurrentCalendar({ month: dateTime.month, year: dateTime.year });
        let exampleContent = [
            {
                day:    28,
                month:  4,
                year: 2025,
                message: 'Dentists appointment at 3pm'
            },
            {
                day: 28,
                month: 4,
                year: 2025,
                message: 'Meal at 5pm'
            },
            {
                day: 28,
                month: 4,
                year: 2025,
                message: 'MOT test payment to be made.'
            },
            {
                day: 28,
                month: 4,
                year: 2025,
                message: 'Leg amputation at the medical hospital emergency center.'
            },
        ];
        setContent([...exampleContent]);
        /*const loadCalendar = async () => {
            const calendarEntries = retrieveCalendarEntries();
        }*/
        
    }, []);

    const changeCalendar = (amount) => {
        let newAmount = { ...currentCalendar };
        if ((currentCalendar.month + amount) > 12) {
            newAmount.month = 1;
            newAmount.year++;
        } else if ((currentCalendar.month + amount) < 1) {
            newAmount.month = 12;
            newAmount.year--;
        } else {
            newAmount.month += amount;
        }
        setCurrentCalendar(newAmount);
    };

    
    const currentCalendarDays = () => {
        let daysInMonth = new Date(currentCalendar.year, currentCalendar.month, 0).getDate();
        let display = [];
        for (let i = 1; i <= daysInMonth; i++) {
            let calDayContent = content.filter(cont => cont.day == i && cont.month == currentCalendar.month && cont.year == currentCalendar.year);
            if (calDayContent) console.log(calDayContent);
            display.push(<button className={classes.calendar__box} onClick={() => console.log(`Day:${i}`)}>
                <div className={classes.calendar__box_container}>
                    <p className={classes.calendar__box_date}>{i}</p>
                    <ul className={classes.calendar__box_eventlist}>
                        {calDayContent.map(dayCont => <li className={classes.calendar__box_event}>{dayCont.message}</li>)}
                    </ul>
                </div>
            </button>);
        }
        return display;
    };

    const currentCalendarDays2 = () => {
        let daysInMonth = new Date(currentCalendar.year, currentCalendar.month, 0).getDate();
        let display = [];
        for (let i = 1; i <= daysInMonth; i++) {
            let calDayContent = entries.filter(entry => entry.day == i && entry.month == currentCalendar.month && entry.year == currentCalendar.year);
            if (calDayContent) console.log(calDayContent);
            display.push(<button className={classes.calendar__box} onClick={() => calendarDayHandler(calDayContent)}>
                <div className={classes.calendar__box_container}>
                    <p className={classes.calendar__box_date}>{i}</p>
                    <ul className={classes.calendar__box_eventlist}>
                        {calDayContent.map(dayCont => <li className={classes.calendar__box_event}>{dayCont.title}</li>)}
                    </ul>
                </div>
            </button>);
        }
        return display;
    };

    const calendarDayHandler = (todaysEntries) => {
        console.log(todaysEntries);
        setModalEntires(todaysEntries);
        viewEntriesDialog.current.showModal();
    };

    return (
        <div>
            <Modal ref={createEntryDialog} submitButton={{ title: 'Create entry', action: () => { ; createEntryDialog.current.close(); }}}>
                <div>
                    <label htmlFor="Title">Title</label>
                    <input type="text" name="Title" required />
                </div>
                <div>
                    <input type="text" name="Description" required />
                </div>
            </Modal>
            <Modal ref={viewEntriesDialog}>
                <ul>
                    {modalEntries && modalEntries.map(mEntry => <CalendarDayListItem itemDetails={mEntry} />)}
                </ul>
                
            </Modal>
            <div className={classes.calendar}>
                <div className={classes.calendar__control}><button onClick={() => changeCalendar(-1)}>{`<-`}</button>{userDateTime && <p>{`${currentCalendar.month}/${currentCalendar.year}`}</p>}<button onClick={() => changeCalendar(1)} >{`->`}</button></div>
                {/*currentCalendar &&  currentCalendarDays()*/}
                {(entries && !loading) && currentCalendarDays2()}
            </div>
            <button onClick={() => console.log(entries)}>Get Entries</button>
        </div>
    )
}

export default Calender