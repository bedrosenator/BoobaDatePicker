function DatePicker(options) {
    this.date = options.date || new Date;
    this.inputElem = document.getElementById('datepicker');
    this.dateSeparator = options.dateSeparator || '-';

    this.init();
}

DatePicker.prototype.init = function() {
    //console.log(this.inputElem.value);
    this.drawTable();
    this.inputElem.addEventListener('click', this.showCalendar.bind(this));
    document.documentElement.addEventListener('click', this.hideCalendar.bind(this));
    this.setDate();
    this.wrapTable.addEventListener('click', this.setDate.bind(this));

};

DatePicker.prototype.getWeekDays = function(days) {
    var weekDays = {};
    days = days || ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    weekDays = days;

    return weekDays;
};

DatePicker.prototype.setDate = function(e) {
    var date = this.date;
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    if(e && e.target) {
        day = e.target.dataset.date;
    }

    if(day < 10) day = "0" + day;
    if(month < 10) month = "0" + month;
    this.inputElem.value = day + this.dateSeparator + month + this.dateSeparator + year;
};

DatePicker.prototype.showCalendar = function() {
    this.wrapTable.style.display = '';
};

DatePicker.prototype.hideCalendar = function(e) {
    var target = e.target;


    if(target.className === this.inputElem.className || target.className === this.nextMonth.className ||
        target.className === this.prevMonth.className) return; //|| e.target.className === this.wrapTable.className) return;
//debugger;

    /*while(target !== this) {
        console.log(target);
        if(target.parentNode !== null)
            target = target.parentNode;
    }*/
    this.wrapTable.style.display = 'none';

};

DatePicker.prototype.getWeekDaysDecorator = function() {
    var weekDays = this.getWeekDays();
    var tr = document.createElement('tr');
    var td, text;
    for(var i = 0; i < weekDays.length; i++) {
        td = document.createElement('td');
        text = document.createTextNode(weekDays[i]);

        td.appendChild(text);
        tr.appendChild(td);
    }

    return tr;
};

DatePicker.prototype.getMonth = function() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var tr = document.createElement('tr');
    var monthName = document.createElement('td');
    var nextMonthTd = document.createElement('td');
    var prevMonthTd = document.createElement('td');
    this.prevMonth = document.createElement('a');
    this.nextMonth = document.createElement('a');

    var tds = [];

    this.prevMonth.href = this.nextMonth.href = 'javascript:;';
    this.nextMonth.innerHTML = '&#x203A;';
    this.prevMonth.innerHTML = '&#x2039';

    this.nextMonth.className = 'next-month';
    this.prevMonth.className = 'prev-month';

    nextMonthTd.appendChild(this.nextMonth);
    prevMonthTd.appendChild(this.prevMonth);

    monthName.colSpan = 5;
    monthName.innerHTML = months[this.date.getMonth()];
    monthName.className = 'month-name';

    tds = [prevMonthTd, monthName, nextMonthTd];
    for(var i = 0; i < tds.length; i++) {
        tr.appendChild(tds[i]);
    }

    return tr;
};

DatePicker.prototype.drawTable = function() {
    var table = document.createElement('table');
    var tr, td, a;
    this.wrapTable = document.createElement('div');
    var daysInMonth = new Date(2015,5).daysInMonth();
    var weekDays = this.getWeekDaysDecorator();
    var month = this.getMonth();

    this.wrapTable.className = 'booba-datepicker-wrap';
    this.wrapTable.style.display = 'none';

    this.wrapTable.appendChild(table);
    table.appendChild(month);
    table.appendChild(weekDays);

    for (var i = 1; i < daysInMonth; i++) {

        tr = document.createElement('tr');
        for(var j = 1; j <= 7; j++) {
            td = document.createElement('td');
            a = document.createElement('a');
            a.href = "javascript:;";
            a.dataset.date = i;
            a.innerHTML = i;
            td.appendChild(a);
            if(i > daysInMonth) td.innerHTML = '&nbsp';

            tr.appendChild(td);
            i++;
        }
        table.appendChild(tr);
        tr = '';
    }
    document.body.appendChild(this.wrapTable);
};

Date.prototype.daysInMonth = function(month) {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};