import React, { useCallback, useRef } from "react";

import { ISchedule, ICalendarInfo } from "tui-calendar";

import TUICalendar from "@toast-ui/react-calendar";

import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

interface PropsType {
  schedules: ISchedule[];
  calendars: ICalendarInfo[];
  addSchedule: Function;
  updateSchedule: Function;
  removeSchedule: Function;
};

function _Calendar(props: PropsType) {
  const cal:any = useRef(null);

  const onClickSchedule = (e: any) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);

    let { schedule } = e
    
    // console.log("onClickSchedule");
    // console.log(schedule);

    // cal.current.getInstance().prev() // 이전달 이동
    // cal.current.getInstance().next() // 다음달 이동
  }

  const onBeforeCreateSchedule = (scheduleData: any) => {
    const schedule = {
      id: String(Math.random()),
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? "allday" : "time",
      dueDateClass: "",
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw["class"]
      },
      calendarId: scheduleData.calendarId,
      state: scheduleData.state,
      isVisible: true,
      body: ''
    };

    props.addSchedule(schedule)
    cal.current.calendarInst.createSchedules([schedule]);
  }

  const onBeforeDeleteSchedule = (res: any) => {
    const { schedule } = res;
    const { id, calendarId } = schedule;
    
    props.removeSchedule(schedule);
    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }

  const onBeforeUpdateSchedule = (e: any) => {
    const { schedule, changes } = e;
    props.updateSchedule({...schedule, ...changes});

    cal.current.calendarInst.updateSchedule(
      schedule.id,
      schedule.calendarId,
      changes
    );
  }

  function _getFormattedTime(time: any) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule: any, isAllDay: any) {
    var html = [];

    if (!isAllDay) {
      html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(" Private");
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(" " + schedule.title);
    }

    return html.join("");
  }

  const templates = {
    time: function (schedule: any) {
      return _getTimeTemplate(schedule, false);
    }
  };

  return (
    <TUICalendar
      ref={cal}
      height="100%"
      view="month"
      useCreationPopup={true}
      useDetailPopup={true}
      template={templates}
      calendars={props.calendars}
      schedules={props.schedules}
      onClickSchedule={onClickSchedule}
      onBeforeCreateSchedule={onBeforeCreateSchedule}
      onBeforeDeleteSchedule={onBeforeDeleteSchedule}
      onBeforeUpdateSchedule={onBeforeUpdateSchedule}
    />
  );
}

export default _Calendar;