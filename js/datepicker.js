function DatePicker(options) {
    this.date = options.date || new Date;
    this.inputElem = document.querySelector(options.selector);
    this.daysNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.table = document.createElement('table');

    this.init();
}

DatePicker.prototype.init = function () {
    this.drawTable();
    this.inputElem.value = this.date;
};

DatePicker.prototype.setActiveClass = function (date) {
};

DatePicker.prototype.drawTable = function() {
    var td;
    var tr;
    var i, j;
    var year = this.date.getFullYear();
    var month = this.date.getMonth();
    var tableOffset = this.daysNames.indexOf(this.daysNames[this.getFirstDayInMonth(year, month)]);
    var daysPerPage = 6 * 7;

    // +1 if starts from sunday
    tableOffset = -Math.abs(this.getLocalDay(this.date)) + 2;

    //append header with weeks names
    tr = document.createElement('tr');
    for (i = 0; i < this.daysNames.length; i++) {
        td = document.createElement('th');
        td.innerHTML = this.daysNames[i];
        tr.appendChild(td);
    }
    this.table.appendChild(tr);

    //append table body
    tr = document.createElement('tr');
    for (i = 1, j = tableOffset; i <= daysPerPage; i++) {
        td = document.createElement('td');
        td.innerHTML = new Date(year, month, j++).getDate();
        tr.appendChild(td);

        if (i > 1 && i % 7 == 0) {
            this.table.appendChild(tr);
            tr = document.createElement('tr');
        }
    }

    this.table.appendChild(tr);
    this.inputElem.parentNode.appendChild(this.table);

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