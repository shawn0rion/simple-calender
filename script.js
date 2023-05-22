const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

class Year{
    constructor(year){
        this.year = year;
        this.months = [];
    }

    getMonths(){
        // create objects in for loop and push
    }
}

class Month {
    constructor(monthIdx){
        this.month = months[monthIdx];
        this.days = [];
    }
    getDays(){
        // create objects in for loop and push
    }
}

class Day {
    constructor(dayIdx, date){
        this.day = days[dayIdx];
        this.date = date;
        this.hours = [];
    }
    getHours(){
        // create objects in for loop and push
    }
}

class Hour {
    constructor(hrIdx){
        this.time = getHour;
        this.note = '';
    }

    getHour(){
        // 23 becomes 11 PM
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
    
    loadDate.year = d.getFullYear();
    loadDate.month = months[d.getMonth()];
    loadDate.date = d.getDate();
    loadDate.day = days[d.getDay()];
})


// log the days of a monthly calender which shows 5 full weeks
function logCalender(year, month){
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
}

logCalender(loadDate.year, loadDate.month);