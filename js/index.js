function DatePicker(options) {
    options = options || {};
    //input element of datePicker
    this.inputElem = document.getElementById(options.id);

    //init date
    this.date = options.date.year && options.date.month ? new Date(options.date.year, options.date.month - 1) : new Date();

    this.uiClasses = {
        wrap: 'booba-datepicker-wrap',
        calendar: 'calendar-table',
        day: 'calendar-day',
        header: 'calendar-header',
        title: 'calendar-title',
        nextMonth: 'next-month',
        prevMonth: 'prev-month'
    };

    // calendar body
    this.calendar;

    // calendar header
    this.header;

    //calendar wrapper
    this.calendarWrap;

    //month in header
    this.month;

    //week days
    this.weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    //months
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //arrow next in header
    this.nextArrow;

    //arrow prev in the header
    this.prevArrow;

    this.init();

};

DatePicker.prototype.init = function() {
    this.setInputElemDate();
    this.drawWrap();
    this.drawHeader();
    this.drawCalendar();

    this.nextMonth.addEventListener('click', this.showNextMonth.bind(this));

};

DatePicker.prototype.formatDate = function(options) {
    var options = options || {};
    var separator = options.separator || '-';
    var date = options.date || this.date;

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if(day < 10) day = "0" + day;
    if(month < 10) month = "0" + month;

    return day + separator + month + separator + year;
};

DatePicker.prototype.setDate = function() {
};

/**
 * set date of input element
 * @returns {undefined}
 */
DatePicker.prototype.setInputElemDate = function() {
    this.inputElem.value = this.formatDate();
};

DatePicker.prototype.showNextMonth = function(e) {
    if(e.target.className !== this.uiClasses.nextMonth) return;
    //set next month
    this.date.setMonth(this.date.getMonth() + 1);

    this.clearCalendar();
    this.updateTitle();
    this.drawCalendar();

};
/**
 *
 * @returns {void}
 */
DatePicker.prototype.showPrevMonth = function() {};

DatePicker.prototype.drawWrap = function() {
    this.calendarWrap = document.createElement('div');
    this.calendarWrap.className = this.uiClasses.wrap;
};

/**
 * draws controls next arrow, previous arrow and month in header
 *
 * @returns {undefined}
 */
DatePicker.prototype.drawHeader = function() {
    this.header = document.createElement('div');
    this.header.className = this.uiClasses.header;

    this.nextMonth = document.createElement('a');
    this.nextMonth.className = this.uiClasses.nextMonth;
    this.nextMonth.innerHTML = '>';
    this.header.appendChild(this.nextMonth);


    this.prevMonth = document.createElement('a');
    this.prevMonth.className = this.uiClasses.prevMonth;
    this.prevMonth.innerHTML = '<';
    this.header.appendChild(this.prevMonth);

    this.title = document.createElement('div');
    this.title.className = this.uiClasses.title;
    this.title.innerHTML = this.months[this.date.getMonth()] + ' ' + this.date.getFullYear();
    this.header.appendChild(this.title);

    this.calendarWrap.appendChild(this.header);
    return this.header;

};

DatePicker.prototype.updateTitle = function() {
    this.title.innerHTML = this.months[this.date.getMonth()] + ' ' + this.date.getFullYear();
};

DatePicker.prototype.clearCalendar = function() {
    //debugger;
    var cells = this.calendar.childNodes;

    while(this.calendar.lastChild) {
        this.calendar.removeChild(this.calendar.lastChild);
    }

    this.calendar.parentNode.removeChild(this.calendar);

    //console.log(this.calendar.childNodes.length);
};



DatePicker.prototype.drawCalendar = function() {
    var date = this.date;
    var daysInMonth = date.daysInMonth();
    var weekStart = this.getMonthStartDay() - 1;
    var prevMonth = new Date(this.date.getMonth() - 1).getMonth();
    prevMonth = new Date(this.date.getFullYear(), prevMonth).daysInMonth();
    console.log(prevMonth);
    var td;
    var tr;
    var a;
    var totalCells =  weekStart + daysInMonth;
    //remove calendar table if exist
    if(this.calendar && this.calendar.hasChildNodes()) {
        this.clearCalendar();
    } else {
        this.calendar = document.createElement('table');
    }

    this.calendar.className = this.uiClasses.calendar;

    for (var i = 1, k = 0; i < totalCells, k <= daysInMonth; i++) {

        tr = document.createElement('tr');

        for (var j = 1; j <= 7; j++) {
            if (i > weekStart) k++;
            td = document.createElement('td');
            a = document.createElement('a');

            a.dataset.day = k;
            a.className = this.uiClasses.day;
            a.innerHTML = k;

            if(k == (this.date.getDate())) {
                a.className += ' active';
            }

            if (i <= weekStart) {
                a.innerHTML = "&nbsp;";
            }

            if(k > daysInMonth) {
                a.innerHTML = j - 1;
                a.className += ' not-active';
            }

            td.appendChild(a);
            tr.appendChild(td);

            i++;
        }

        this.calendar.appendChild(tr);
        tr = '';
    }


    this.calendarWrap.appendChild(this.calendar);

    //insert into document
    this.inputElem.parentNode.insertBefore(this.calendarWrap, this.inputElem.nextSibling);
};
DatePicker.prototype.showCalendar = function() {

};
DatePicker.prototype.hideCalendar = function() {};

//??
DatePicker.refreshCalendar = function() {};

Date.prototype.daysInMonth = function(month) {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

DatePicker.prototype.getMonthStartDay = function() {
    var date = new Date(this.date.getFullYear(), this.date.getMonth());
    return date.getDay();
};