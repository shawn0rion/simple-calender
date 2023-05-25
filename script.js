const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const years = [];
class Year{
    constructor(year){
        this.year = year;
        this.months = this.getMonths();
    }

    getMonths(){
        // create objects in for loop and push
        const months = [];
        for (let i = 0; i < 12; i++){
            console.log(this.year);
            const month = new Month(i,this.year);
            months.push(month);
        }
        return months;
    }
}

class Month {
    constructor(monthIdx, year){
        this.month = months[monthIdx];
        this.firstDayOfMonth = this.getFirstDayOfMonth(year);
        this.numDays = this.getNumDays(year);
        this.days = this.getDays();

    }

    getFirstDayOfMonth(year){
        return new Date(year, months.indexOf(this.month)).getDay();
    }

    getNumDays(year){
        return new Date(year, months.indexOf(this.month) + 1, 0).getDate();

    }

    getDays(){
        const days = [];

        let dayIdx = this.firstDayOfMonth;
        for (let i = 0; i < this.numDays; i++){
            // new week
            if (dayIdx % 7 === 0 && dayIdx !== 0){
                dayIdx = 0;
            } 
            const day = new Day(dayIdx, i + 1);
            days.push(day);
            dayIdx += 1;

        }
        return days;
    }
}

class Day {
    constructor(dayIdx, date){
        this.day = days[dayIdx];
        this.date = date;
        this.hours = this.getHours();
    }
    getHours(){
        // create objects in for loop and push
        // if hour > 12, hour - 12
        const hours = [];
        for (let hour = 0; hour < 24; hour++){
            hours.push(new Hour(hour))
        }
        return hours;
    }
}

class Hour {
    constructor(hour){
        this.hour = hour;
        this.time = this.getHour(hour);
        this.note = '';
    }

    getHour(hour){
        // 23 becomes 11 PM
          if (hour < 12){
            hour = `${hour} AM`;
          } else if (hour === 0 || hour === 12){
            hour = 12;
          } else{
            hour = `${hour - 12} PM`
          }
          return hour;
    }
    addNote(){
        // don't worry about edit and delete note
    };
}

class Calender {
    constructor(){

    }
}

const loadDate = {
    day: '',
    date: '',
    month: '',
    year: '',
}



window.addEventListener('DOMContentLoaded', () => {
    const d = new Date();
    
    // variables are idx's. example: month of may = 4
    loadDate.year = d.getFullYear();
    loadDate.month = d.getMonth();
    loadDate.date = d.getDate();
    loadDate.day = d.getDay();
    const year = new Year(loadDate.year);
    console.log(year);
    renderCalender(year, year.months[loadDate.month])
 })

 // TODO: update this using class data
 // purpose: log the days of a monthly calender which shows 5 full weeks
function getCalenderDates(year, month){
    const dates = [];
    const prevMonthLastDate = new Date(year, month - 1, 0).getDate();
    const thisMonthLastDate = new Date(year, month + 1, 0).getDate();
    const thisMonthFirstDay = new Date(year, month).getDay();
    for (let i = 0; i < 7 * 5; i++){
        if ( i < thisMonthFirstDay){
            // dates of last week of last month
            console.log(prevMonthLastDate - (thisMonthFirstDay - 1) + i)
        } else if (i > thisMonthLastDate){ 
            // dates of this month
            console.log( i - (thisMonthLastDate))
        } else{
            // dates of first week of next month
            console.log(i - (thisMonthFirstDay - 1));
        } 

    }
    return dates;
}



// TODO: handle new year and add events to month btns for clear and render Calender 
function renderCalender(year, month){
    const monthYearElement = document.querySelector('.month-year');
    monthYearElement.textContent = `${month.month} ${year.year}`;
    const dayElements = document.querySelectorAll('.day');
    dayElements.forEach((day, idx) => {
        day.textContent = days[idx][0];
    })
    const dateElements = document.querySelectorAll('.date');
    const monthIdx = year.months.indexOf(month);
    const lastMonth = year.months[monthIdx - 1];
    const nextMonth = year.months[monthIdx + 1];
    dateElements.forEach((dateElement, idx) => {
        let dateNumber = '';
        let dayObject = '';
        if (idx < month.firstDayOfMonth){
            dateNumber = lastMonth.numDays - (month.firstDayOfMonth + idx) + 1;
            dayObject = lastMonth.days.filter(day => day.date === dateNumber);
        } else if (idx < month.numDays + month.firstDayOfMonth){
            dateNumber = idx - month.firstDayOfMonth + 1;
            dayObject = month.days.filter(day => day.date === dateNumber);
        } else{
            dateNumber = idx - month.numDays - month.firstDayOfMonth + 1;
            dayObject = nextMonth.days.filter(day => day.date === dateNumber);
        }
        dateElement.textContent = dateNumber;
        dateElement.addEventListener('click', event=> {
            // console.log(event.target)
            renderDay(dayObject);
        })
    })

}
function renderDay(dayObject){
    console.log(dayObject)
}