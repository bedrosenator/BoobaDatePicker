function DatePicker(options) {
    this.date = options.date || new Date;
    this.firstDayOfWeek = options.firstDayOfWeek ? options.firstDayOfWeek : "MO";

    this.inputElem = document.querySelector(options.selector);
    this.daysNames = this.firstDayOfWeek == "MO" ? ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.ui = {};
    this.ui.classes = {
        table: 'datepicker-table'
    };
    this.init();
}

DatePicker.prototype.init = function () {
    this.createTable();
    this.drawTable();
    this.inputElem.value = this.date;

    this.inputElem.addEventListener('click', this.showCalendar.bind(this));
    document.documentElement.addEventListener('click', this.hideCalendar.bind(this));
    this.table.addEventListener('click', this.setActiveDate.bind(this));
    this.nextMonth.addEventListener('click', this.setNextMonth.bind(this));
    this.prevMonth.addEventListener('click', this.setPrevMonth.bind(this));
};

DatePicker.prototype.setNextMonth = function (e) {
    // var setNextMonthEvent = new Event('setNextMonthEvent');
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate());
    // this.table.dispatchEvent(setNextMonthEvent);

    this.removeTable();
    debugger
    this.drawTable.bind(this);
    //this.table.addEventListener('setNextMonthEvent', this.drawTable.bind(this));
};

DatePicker.prototype.setPrevMonth = function () {

};

DatePicker.prototype.createTable = function () {
    this.table = document.createElement('table');
    this.table.style.display = 'none';
    this.table.className = this.ui.classes.table;
};

DatePicker.prototype.setActiveClass = function (date) {
};

DatePicker.prototype.showCalendar = function (e) {
    this.table.style.display = '';
};

DatePicker.prototype.hideCalendar = function (e) {
    var target = e.target;

    while (target !== null) {
        if (target.className == this.ui.classes.table || target == this.inputElem)
            return;
        target = target.parentNode;
    }

    this.table.style.display = 'none';
};

DatePicker.prototype.getTableOffset = function() {
    // +1 if starts from sunday. +2 if starts from MO
    var offset = this.firstDayOfWeek == "SU" ? 1 : 2;
    return -Math.abs(this.getLocalDay(this.date)) + offset;
};

DatePicker.prototype.drawControlHeader = function() {
    var tr = document.createElement('tr');
    var td;

    td = document.createElement('td');
    td.innerHTML = '<';
    td.classList.add('prev-month');
    this.prevMonth = td;
    tr.appendChild(td);
    td = document.createElement('td');
    td.colSpan = 5;
    td.innerHTML = "MONTH";
    td.classList.add('selected-month');
    this.selectedMonthHeader = td;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = '>';
    td.classList.add('next-month');
    this.nextMonth = td;
    tr.appendChild(td);
    this.table.appendChild(tr);
};

DatePicker.prototype.drawHeader = function () {
    var tr = document.createElement('tr');
    var td, i;

    for (i = 0; i < this.daysNames.length; i++) {
        td = document.createElement('th');
        td.innerHTML = this.daysNames[i];
        tr.appendChild(td);
    }
    this.table.appendChild(tr);
};

DatePicker.prototype.removeTable = function () {
    //todo replace this part
    this.table.removeChild(document.querySelector('table tbody'))
};

DatePicker.prototype.drawTable = function() {
    var td;
    var tr;
    var i, j;
    var year = this.date.getFullYear();
    var month = this.date.getMonth();
    var tableOffset = this.daysNames.indexOf(this.daysNames[this.getFirstDayInMonth(year, month)]);
    var DAYS_PER_PAGE = 6 * 7;
    var todayDate = new Date();
    var currentDate;
    var tBody = document.createElement('tbody');
    tableOffset = this.getTableOffset();

    this.drawControlHeader();
    //append header with weeks names
    this.drawHeader();

    //append table body
    tr = document.createElement('tr');
    for (i = 1, j = tableOffset; i <= DAYS_PER_PAGE; i++) {
        currentDate = new Date(year, month, j++);
        td = document.createElement('td');
        td.innerHTML = currentDate.getDate();
        td.dataset.year = currentDate.getFullYear();
        td.dataset.month = currentDate.getMonth();
        td.dataset.day = td.innerHTML;
        if (currentDate.getTime() == new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDay()).getTime()) {
            td.className = 'active';
        }
        tr.appendChild(td);

        if (i > 1 && i % 7 == 0) {
            tBody.appendChild(tr);
            tr = document.createElement('tr');
        }
    }

    tBody.appendChild(tr);
    this.table.appendChild(tBody);
    this.inputElem.parentNode.appendChild(this.table);

};

DatePicker.prototype.setActiveDate = function(e) {
    var target = e.target;
    var activeItem;
    while(target !== null) {
        if (target.tagName == 'TD' && target.dataset.year) {
            activeItem = document.querySelector('td.active');
            if (activeItem)
                activeItem.classList.remove('active');
            target.classList.add('active');
            this.inputElem.value = new Date(target.dataset.year, target.dataset.month, target.dataset.day);
            return;
        }
        target = target.parentNode;
    }
};

Date.prototype.getDaysInMonth = function(year, month) {
    return 33 - new Date(year, month, 33).getDate();
};

DatePicker.prototype.getFirstDayInMonth = function (year, month) {
    return (new Date(year, month, 1)).getDay();
};

DatePicker.prototype.getLastDayInMonth = function (year, month) {
    return (new Date(year, month + 1, 0)).getDay();
};

DatePicker.prototype.getWeeksCountInMonth = function (year, month) {
    var firstOfMonth = new Date(year, month, 1);
    var lastOfMonth = new Date(year, month + 1, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil( used / 7);
};

DatePicker.prototype.getLocalDay = function (date) {
    var day = date.getDay();

    if (day == 0) {
        day = 7;
    }

    return day;
};