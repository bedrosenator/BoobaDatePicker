function DatePicker(options) {
    this.date = options.date || new Date;
    this.inputElem = document.getElementById('datepicker');
    this.init();
}

DatePicker.prototype.init = function() {

    //console.log(this.inputElem.value);
    this.drawTable();
};

DatePicker.prototype.getWeekDays = function(days) {
    var weekDays = {};
    days = days || ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    weekDays = days;

    return weekDays;
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
    var td = document.createElement('td');
    td.colSpan = 7;
    td.innerHTML = months[this.date.getMonth()];
    tr.appendChild(td);
    return tr;
};

DatePicker.prototype.drawTable = function() {
    var table = document.createElement('table');
    var tr, td;
    var wrapTable = document.createElement('div');
    var daysInMonth = new Date(2015,5).daysInMonth();
    var weekDays = this.getWeekDaysDecorator();
    var month = this.getMonth();

    wrapTable.className = 'booba-datepicker';

    wrapTable.appendChild(table);
    table.appendChild(month);

    table.appendChild(weekDays);
    for (var i = 1; i < daysInMonth; i++) {


        tr = document.createElement('tr');
        for(var j = 1; j <= 7; j++) {
            td = document.createElement('td');
            td.innerHTML = i;
            if(i > daysInMonth) td.innerHTML = '&nbsp';

            tr.appendChild(td);
            i++;
        }
        table.appendChild(tr);
        tr = '';
    }
    document.body.appendChild(wrapTable);


};

Date.prototype.daysInMonth = function(month) {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};