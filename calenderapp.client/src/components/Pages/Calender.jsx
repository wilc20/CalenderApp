import React from 'react'
import { useEffect, useState } from 'react';
import classes from "./Calender.module.css";

const Calender = () => {

    const [userDateTime, setUserDateTime] = useState();
    const [currentCalender, setCurrentCalender] = useState();
    const [content, setContent] = useState();

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
        setCurrentCalender({ month: dateTime.month, year: dateTime.year });
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
    }, []);

    const changeCalender = (amount) => {
        let newAmount = { ...currentCalender };
        if ((currentCalender.month + amount) > 12) {
            newAmount.month = 1;
            newAmount.year++;
        } else if ((currentCalender.month + amount) < 1) {
            newAmount.month = 12;
            newAmount.year--;
        } else {
            newAmount.month += amount;
        }
        setCurrentCalender(newAmount);
    };

    
    const currentCalenderDays = () => {
        let daysInMonth = new Date(currentCalender.year, currentCalender.month, 0).getDate();
        let display = [];
        for (let i = 1; i <= daysInMonth; i++) {
            let calDayContent = content.filter(cont => cont.day == i && cont.month == currentCalender.month && cont.year == currentCalender.year);
            if (calDayContent) console.log(calDayContent);
            display.push(<button className={classes.calender__box} onClick={() => console.log(`Day:${i}`)}>
                <div className={classes.calender__box_container}>
                    <p className={classes.calender__box_date }>{i}</p>
                    <ul className={classes.calender__box_eventlist}>
                        {calDayContent.map(dayCont => <li className={classes.calender__box_event}>{dayCont.message}</li>)}
                    </ul>
                </div>
            </button>);
        }
        return display;
    }

    //const events =

    return (
        <div>
            <div className={classes.calender}>
                <div className={classes.calender__control}><button onClick={() => changeCalender(-1)}>{`<-`}</button>{userDateTime && <p>{`${currentCalender.month}/${currentCalender.year}`}</p>}<button onClick={() => changeCalender(1)} >{`->`}</button></div>
                {currentCalender &&  currentCalenderDays()}
            </div>
        </div>
    )
}

export default Calender