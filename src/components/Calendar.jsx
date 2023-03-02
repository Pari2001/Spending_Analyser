import React, { useEffect, useState } from 'react'
import '../styles/calendar.css'// import React and DatePicker

const Calendar = (props) => {

    const [dataDate, setDataDate] = useState(1);

    const setDate = (date) => {
        let days = document.querySelectorAll('.calendar-day-hover');
        days.forEach((day) => {
            day.classList.remove('selected__day');
        })
        days[date - 1].classList.add('selected__day');
        setDataDate(date);
    }

    const dateSubmit = () => {
        const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let di = (new Date()).getDate();
        if((document.querySelector('.selected__day'))!==null){
            di = document.querySelector('.selected__day').innerText;
        }
        let mi = month_names.indexOf(document.querySelector('.month-picker').innerHTML);
        let yi = document.querySelector('#year').innerHTML;
        // let dates = new Date(yi,mi,di);
        if(props.setType==='start'){
            props.setDate(new Date(yi,mi,di,0,0,0,0));
        }
        else{
            props.setDate(new Date(yi,mi,di,23,59,59,999));
        }
        console.log(new Date(yi,mi,di,0,0,0,0))
        props.setChoosen(true);
        props.setCalendar(false);
    }

    useEffect(() => {
        let calendar = document.querySelector('.calendar')

        const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        const isLeapYear = (year) => {
            return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
        }

        const getFebDays = (year) => {
            return isLeapYear(year) ? 29 : 28
        }

        const generateCalendar = (month, year) => {

            let calendar_days = calendar.querySelector('.calendar-days')
            let calendar_header_year = calendar.querySelector('#year')

            let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

            calendar_days.innerHTML = ''

            let currDate = new Date()
            // if (month === ) 
            if (!year) {
                month = currDate.getMonth()
                year = currDate.getFullYear()
            }
            let curr_month = `${month_names[month]}`
            month_picker.innerHTML = curr_month
            calendar_header_year.innerHTML = year

            // get first day of month

            let first_day = new Date(year, month, 1)

            for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
                let day = document.createElement('div')
                if (i >= first_day.getDay()) {
                    day.classList.add('calendar-day-hover')
                    // day.onclick(()=>{setDate(i+1)})
                    day.addEventListener('click', function () {
                        setDate(i - first_day.getDay() + 1);
                    })
                    day.innerHTML = i - first_day.getDay() + 1
                    day.innerHTML += `<span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>`
                    if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                        day.classList.add('curr-date')
                    }
                }
                calendar_days.appendChild(day)
            }
        }

        let month_list = calendar.querySelector('.month-list')
        month_names.forEach((e, index) => {
            let month = document.createElement('div')
            month.innerHTML = `<div data-month="${index}">${e}</div>`
            month.querySelector('div').onclick = () => {
                month_list.classList.remove('show')
                document.querySelector('.calendar-header').classList.remove('hide__visibility')
                document.querySelector('.calendar-body').classList.remove('hide__visibility')
                document.querySelector('.calendar__button__container').classList.remove('hide__visibility')
        
                curr_month.value = index
                generateCalendar(index, curr_year.value)
            }
            month_list.appendChild(month)
        })

        let month_picker = calendar.querySelector('#month-picker')

        month_picker.onclick = () => {
            month_list.classList.add('show')
            document.querySelector('.calendar-header').classList.add('hide__visibility')
            document.querySelector('.calendar-body').classList.add('hide__visibility')
            document.querySelector('.calendar__button__container').classList.add('hide__visibility')
        }

        let currDate = new Date()

        let curr_month = { value: currDate.getMonth() }
        let curr_year = { value: currDate.getFullYear() }

        generateCalendar(curr_month.value, curr_year.value)

        document.querySelector('#prev-year').onclick = () => {
            --curr_year.value
            generateCalendar(curr_month.value, curr_year.value)
        }

        document.querySelector('#next-year').onclick = () => {
            ++curr_year.value
            generateCalendar(curr_month.value, curr_year.value)
        }

    }, [])

    return (
        <>
            <div className="balance__modal">
                <div className='modify__calendar__container'>
                    <div className="section__title">Choose Date</div>
                    <i
                        onClick={() => {
                            props.setCalendar(false);
                        }}
                        className="uil uil-times services__modal-close"></i>
                    <div className="flexy">
                        <div class="calendar">
                            <div class="calendar-header ">
                                <span class="month-picker" id="month-picker">February</span>
                                <div class="year-picker">
                                    <span class="year-change" id="prev-year">
                                        <pre><i className='uil uil-arrow-left'></i></pre>
                                    </span>
                                    <span id="year">2021</span>
                                    <span class="year-change" id="next-year">
                                        <pre><i className='uil uil-arrow-right'></i></pre>
                                    </span>
                                </div>
                            </div>
                            <div className="flexy">

                                <div class="calendar-body">
                                    <div class="calendar-week-day grid sevengrid">
                                        <div>Sun</div>
                                        <div>Mon</div>
                                        <div>Tue</div>
                                        <div>Wed</div>
                                        <div>Thu</div>
                                        <div>Fri</div>
                                        <div>Sat</div>
                                    </div>
                                    <div class="calendar-days grid sevengrid"></div>
                                </div>
                            </div>

                            <div class="month-list"></div>
                            <div className='calendar__button__container grid'>
                                <button
                                    onClick={() => {
                                        dateSubmit(); 
                                    }}
                                    className="button custom__button">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calendar