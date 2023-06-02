
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const years = [];
const numCalenderWeeks = 6;
const calenderDate = {
    day: '',
    month: '',
    year: '', 
}
 
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
    getPrevYear(){
        // do nothing if year exists
        if (years.find(year => year.year == this.year - 1) === undefined){
            years.unshift(new Year(this.year - 1))
        }
    }

    getNextYear(){
        // do nothing if year exists
        if (years.find(year => year.year == this.year + 1) === undefined){
            years.push(new Year(this.year + 1))
        }
    }


}

class Month {
    constructor(monthIdx, year){
        this.monthIdx = monthIdx;
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

    getDay(date){
        console.log(date)
        return this.days[date-1];
    }

    getDate(date){
        return this.days[date-1];
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
    // trickle down and create month, date, day for this year
    const year = new Year(loadDate.year);
    years.push(year);

    const month = year.months[loadDate.month];
    const day = month.days[loadDate.date - 1]
    updateCalenderDate(day, loadDate.date, month, year);
    renderCalender(year, year.months[loadDate.month])
 })

 function updateCalenderDate(day='', date='', month='', year=''){
    calenderDate.day = day;
    calenderDate.date = date;
    calenderDate.month = month;
    calenderDate.year = year;
 }

 // TODO: update this using class data
 // purpose: log the days of a monthly calender which shows numCalenderWeeks full weeks
function getCalenderDates(year, month){
    const dates = [];
    const prevMonthLastDate = new Date(year, month - 1, 0).getDate();
    const thisMonthLastDate = new Date(year, month + 1, 0).getDate();
    const thisMonthFirstDay = new Date(year, month).getDay();
    for (let i = 0; i < 7 * numCalenderWeeks; i++){
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
    console.log('rendering', month.month  + ' ' + year.year)
    const monthYearElement = document.querySelector('.month-year');
    monthYearElement.textContent = `${month.month} ${year.year}`;
    const dayElements = document.querySelectorAll('.day');
    dayElements.forEach((day, idx) => {
        day.textContent = days[idx][0];
    })
    const dateElements = document.querySelectorAll('.date');


    const monthIdx = month.monthIdx;
    // handle prev month in prev year and get last month
    const lastMonth = monthIdx == 0 ? years[0].months[11] : year.months[monthIdx - 1]
    // handle next month in next year and get next month
    if (monthIdx == 11){
        console.log(monthIdx);
        console.log(years[years.length - 1].months[0])
    
    }
    const nextMonth = monthIdx == 11 ? years[years.length - 1].months[0] : year.months[monthIdx + 1];
    // render each dateElement's text, and render each Day on date click
    dateElements.forEach((dateElement, idx) => {
        let dateNumber = '';
        let dayObject = '';
        // prev month
        if (idx < month.firstDayOfMonth){
            dateNumber = lastMonth.numDays - (month.firstDayOfMonth + idx) + 1;
            dayObject = lastMonth.days.filter(day => day.date === dateNumber);
        // this month
        } else if (idx < month.numDays + month.firstDayOfMonth){
            dateNumber = idx - month.firstDayOfMonth + 1;
            dayObject = month.days.filter(day => day.date === dateNumber);
        // next month
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


// change month events
const nextMonthBtn = document.querySelector('#next');
const prevMonthBtn = document.querySelector('#prev');
nextMonthBtn.addEventListener('click', event => {
    // change month
    const currentMonthIdx = calenderDate.month.monthIdx;
    let nextMonthIdx = currentMonthIdx + 1;
    // handle last month, make new year
    if (currentMonthIdx == 10){
        calenderDate.year.getNextYear()
          // handle new year
    } else if (currentMonthIdx == 11){
        calenderDate.year = years[years.length - 1];
        nextMonthIdx = 0;
    }
    calenderDate.month = calenderDate.year.months[nextMonthIdx];

    renderCalender(calenderDate.year, calenderDate.month)
})

prevMonthBtn.addEventListener('click', event => {
    const currentMonthIdx = calenderDate.month.monthIdx;
    let prevMonthIdx = currentMonthIdx-1;
    if (currentMonthIdx == 1){
        calenderDate.year.getPrevYear();
    } else if (currentMonthIdx == 0){
        calenderDate.year = years[0];
        prevMonthIdx = 11;
    }
    calenderDate.month = calenderDate.year.months[prevMonthIdx];
    renderCalender(calenderDate.year, calenderDate.month)
})