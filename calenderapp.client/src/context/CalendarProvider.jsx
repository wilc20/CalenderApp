
import React, { createContext, useEffect, useState } from 'react';
import api from '../components/axiosApi'; // the axios instance above

export const CalendarContext = createContext();

export function CalendarProvider({ children }) {
    const [entries, setEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/CalendarEntry')
            .then(res => {
                let formattedData = res.data.map(r => {
                    const date = new Date(r.eventDateTime);

                    return { ...r, year: date.getFullYear(), month: (date.getMonth()+1), day: date.getDate(), time: date.toTimeString().split(' ')[0]}
                });
                
                setEntries([...formattedData]);
            })
            .catch(() => setEntries(null))
            .finally(() => setLoading(false));
    }, []);

    const retrieveEntry = async (id) => {
        try {
            const retrievedEntry = await api.get(`/CalendarEntry/${id}`);
            setCurrentEntry({ ...retrievedEntry });
            return { success: true }
        } catch (err) {
            const errMessage = err.response?.data || "Failed to retrieve entry.";
            return { success: false, errMessage };
        }
    };

    const retrieveCalendarEntries = async () => {
        try {
            const retrievedEntries = await api.get(`/CalendarEntry`);
            setEntries([...retrievedEntries]);
            return { success: true }
        } catch (err) {
            const errMessage = err.response?.data || "Failed to retrieve entries.";
            return { success: false, errMessage };
        }
    };

    const createEntry = async (title, description, dateTime) => {
        try {
            const createdEntry = await api.post('/CalendarEntry/create', { title, description, dateTime });
            setCurrentEntry({ ...createdEntry });
            return { success: true };
        } catch (err) {
            const errMessage = err.response?.data || "Failed to create entry";
            return { success: false, errMessage };
        }
    };

    const updateEntry = async (id, title, description, dateTime) => {
        try {
            const updatedEntry = await api.put(`/CalendarEntry/${id}`, { title, description, dateTime });
            setCurrentEntry({ ...updatedEntry });
            return {success: true}
        } catch (err) {
            const errMessage = err.response?.data || "Failed to update entry.";
            return { success: false, errMessage };
        }
    };


    const deleteEntry = async (id) => {
        try {
            await api.delete(`/CalendarEntry/${id}`);
            return { success: true };
        } catch (err) {
            const errMessage = err.response?.data || 'Delete failed.';
            return { success: false, errMessage };
        }
        
    };

    return (
        <CalendarContext.Provider value={{ currentEntry, entries, loading, retrieveEntry, retrieveCalendarEntries, createEntry, updateEntry, deleteEntry }}>
            {children}
        </CalendarContext.Provider>
    );
}