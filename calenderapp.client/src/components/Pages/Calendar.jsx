import React, { useContext } from 'react'
import { useEffect, useState, useRef } from 'react';
import Modal from '../Elements/Modal';
import CalendarDayListItem from '../Elements/CalendarDayListItem';
import { CalendarContext } from '../../context/CalendarProvider';
import classes from "./Calendar.module.css";
import CreateEntryForm from '../Elements/CreateEntryForm';

const Calender = () => {

    const [userDateTime, setUserDateTime] = useState();
    const [currentCalendar, setCurrentCalendar] = useState();
    const [modalEntries, setModalEntries] = useState();
    const [chosenDate, setChosenDate] = useState();

    const { entries, loading, retrieveCalendarEntries } = useContext(CalendarContext);


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
        setCurrentCalendar({ month: dateTime.month, year: dateTime.year });

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
        if (!currentCalendar) return [];
        let daysInMonth = new Date(currentCalendar.year, currentCalendar.month, 0).getDate();
        let display = [];
        for (let i = 1; i <= daysInMonth; i++) {
            let calDayContent = entries.filter(entry => entry.day == i && entry.month == currentCalendar.month && entry.year == currentCalendar.year);
            //if (calDayContent) console.log(calDayContent);
            display.push(<button key={"day" + i} id={i} name={`${currentCalendar.year}-${currentCalendar.month}-${i}`} className={classes.calendar__box} onClick={(e) => calendarDayHandler(calDayContent, e.currentTarget.name)}>
                <div className={classes.calendar__box_container}>
                    <p className={classes.calendar__box_date}>{i}</p>
                    <ul className={classes.calendar__box_eventlist}>
                        {calDayContent.map(dayCont => <li key={dayCont.title + "buttonContent"} className={classes.calendar__box_event}>{dayCont.title}</li>)}
                    </ul>
                </div>
            </button>);
        }
        return display;
    };

    const calendarDayHandler = (todaysEntries, todaysDate) => {
        console.log(todaysDate);
        const [year, month, day] = todaysDate.split('-');
        const formattedTodaysDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00`;
        setModalEntries(todaysEntries);
        setChosenDate(formattedTodaysDate);
        console.log('formattedDate', formattedTodaysDate);
        viewEntriesDialog.current.showModal();
    };

    const createEntryHandler = async () => {
        createEntryDialog.current.close();
        await retrieveCalendarEntries();
    };

    const openCreateEntryHandler = () => {

        createEntryDialog.current.showModal();
    }

    return (
        <div>
            <Modal ref={createEntryDialog}>
                <CreateEntryForm onSuccess={() => createEntryHandler()} chosenDate={chosenDate} />
            </Modal>
            <Modal ref={viewEntriesDialog}>
                <div>
                    <ul className={classes.entriesList}>
                        {modalEntries && modalEntries.map(mEntry => <CalendarDayListItem key={"entry" + mEntry.title} itemDetails={mEntry} />)}
                    </ul>
                    <button onClick={() => openCreateEntryHandler()}>Create Entry</button>
                </div>
            </Modal>
            <div className={classes.calendar}>
                <div className={classes.calendar__control}><button onClick={() => changeCalendar(-1)}>{`<-`}</button>{userDateTime && <p>{`${currentCalendar.month}/${currentCalendar.year}`}</p>}<button onClick={() => changeCalendar(1)} >{`->`}</button></div>
                {(currentCalendar && entries && !loading) && currentCalendarDays()}
            </div>
        </div>
    )
};

export default Calender;