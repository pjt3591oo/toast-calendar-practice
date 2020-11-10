import React, { useState, useEffect } from 'react';
import { ISchedule, ICalendarInfo } from "tui-calendar";

import Calendar from './components/calendar';

function App() {
  const start = new Date();
  const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

  const [created, setCreated] = useState<ISchedule[]>([]);
  const [schedules, setSchedules] = useState<ISchedule[]>([
    {
      calendarId: "1",
      category: "time",
      isVisible: true,
      title: "Study",
      body: "Test",
      start,
      end
    }, {
      calendarId: "2",
      category: "time",
      isVisible: true,
      title: "Meeting",
      body: "Description",
      start: new Date(new Date().setHours(start.getHours() + 1)),
      end: new Date(new Date().setHours(start.getHours() + 2))
    }
  ]);
  
  const [calendars, setCalendars] = useState<ICalendarInfo[]>([
    {
      id: "1",
      name: "My Calendar",
      color: "#ffffff",
      bgColor: "#ff0000",
      dragBgColor: "#9e5fff",
      borderColor: "#9e5fff"
    }, {
      id: "2",
      name: "Company",
      color: "#ffffff",
      bgColor: "#00ff00",
      dragBgColor: "#00a9ff",
      borderColor: "#00a9ff"
    }
  ]);

  useEffect(() => {
    if (created && created.length) {
      setSchedules(schedules.concat(created[created.length - 1]))
    }
  }, [created])

  const addSchedule = (payload: ISchedule) => {
    setCreated(created.concat(payload));
    // TODO: 서버로 해당 데이터 날리기.
  }
  const updateSchedule = (payload: any) => {
    let updatedIdx = _findIdx(schedules, payload);
    let temp = [...schedules];
    temp[updatedIdx] = payload;
    setSchedules(temp);
    // TODO: 서버로 해당 데이터 날리기.
  }
  const removeSchedule = (payload: any) => {
    let removedIdx = _findIdx(schedules, payload);
    let deleted = schedules.slice(0, removedIdx).concat(schedules.slice(removedIdx + 1, schedules.length))
    setSchedules(deleted);
    // TODO: 서버로 해당 데이터 날리기.
  }

  const _findIdx = (sources: any, target: any) => {
    let filtered = sources.filter((source: any, idx: number) => source.id === target.id ? source : false)[0]
    let findIdx = sources.findIndex((item: any, idx: number) => filtered.id === item.id)
    return findIdx;
  }

  return (
    <>
      <Calendar
        schedules={ schedules }
        calendars={ calendars }
        addSchedule={ addSchedule }
        updateSchedule={ updateSchedule }
        removeSchedule={ removeSchedule }
      />
    </>
  );
}

export default App;
