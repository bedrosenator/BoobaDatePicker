function DatePicker(options) {
    this.date = options.date || new Date;
    this.inputElem = document.querySelector(options.selector);
    this.daysNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.table = null;

    this.init();
}

DatePicker.prototype.init = function () {
    this.drawTable();
    this.inputElem.value = this.date;
};

DatePicker.prototype.setActiveClass = function (date) {

};

DatePicker.prototype.drawTable = function() {
    this.table = document.createElement('table');
    var td;
    var tr;
    var i, j;
    var firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    var daysInMonth = this.date.getDaysInMonth(this.date.getFullYear(), this.date.getMonth());
    var daysInPrevMonth = this.date.getDaysInMonth(this.date.getFullYear(), this.date.getMonth() - 1);
    var tableOffset = this.daysNames.indexOf(this.daysNames[this.getFirstDayInMonth()]);

    var day;
    //+1 if week start from mo else + 0
    var prevMonthDays = daysInPrevMonth - tableOffset + 1;

    //append header with weeks names
    tr = document.createElement('tr');
    for (i = 0; i < this.daysNames.length; i++) {
        td = document.createElement('th');
        td.innerHTML = this.daysNames[i];
        tr.appendChild(td);
    }
    this.table.appendChild(tr);

    //append table body
    for (i = 0, j = 1; i < daysInMonth + tableOffset - 1; i++) {
        // + 2 if week starts from mo. else  + 1
        day = i + 2 - tableOffset;

        if (i % 7 == 0 || i == 0) {
            tr = document.createElement('tr');
        }
        td = document.createElement('td');

        //prev month
        if (day <= 0) {
            td.innerHTML = prevMonthDays++;
            // td.innerHTML = "&nbsp;"
        } else {
            td.innerHTML = day;
            td.className = day == (new Date()).getDate() ? 'active' : '';
        }

        if (i > daysInMonth) {
            // td.innerHTML = ++j;
            console.log(j);
        }

        tr.appendChild(td);
        //insert each week
        if (i % 7 == 0) {
            this.table.appendChild(tr);
        }


    }


    this.inputElem.parentNode.appendChild(this.table);
    
};

Date.prototype.getDaysInMonth = function(year, month) {
    return 33 - new Date(year, this.getMonth(), 33).getDate();
};

DatePicker.prototype.getFirstDayInMonth = function (year, month) {
    return (new Date(this.date.getFullYear(), this.date.getMonth(), 1)).getDay();
};

Date.prototype.getLocalDay = function (date) {
    var day = date.getDay();

    if (day == 0) {
        day = 7;
    }

    return day;
};