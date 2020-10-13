document.addEventListener('DOMContentLoaded', function() {
    botCalendar.init();
});

var botCalendar = {
    init: function(){

        var calendarMonthEl = document.getElementById('calendar-month');
        var calendarMonth = new FullCalendar.Calendar(calendarMonthEl, {
            initialView: 'dayGridMonth',
            buttonText: {
                today:    'Today',
                month:    'Month',
                week:     'Week',
                day:      'Day',
                list:     'List'
            },
            headerToolbar: {
                left: 'title',
                center: '',
                right: 'prev,next'
            },
            height: 'auto',
            displayEventTime: false,
            selectable: true,
            longPressDelay:10,
            select: function(arg) {
                var date = moment(arg.start).format('YYYY-MM-DD HH:mm:ss');
                calendar.gotoDate(date)
            }
        });
        calendarMonth.render();

        //https://fullcalendar.io/docs
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'timeGridWeek',
            buttonText: {
                today:    'Today',
                month:    'Month',
                week:     'Week',
                day:      'Day',
                list:     'List'
            },
            headerToolbar: {
                left: 'title prev,next today',
                center: '',
                right: ''//'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            height: 'auto',
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            selectable: true,
            selectMirror: true,
            navLinks: true, // can click day/week names to navigate views
            businessHours: true, // display business hours
            businessHours: [
                {
                daysOfWeek: [ 1, 2, 3, 4, 5 ],
                startTime: '08:00',
                endTime: '17:00'
                },
                {
                daysOfWeek: [ 6 ],
                startTime: '9:00',
                endTime: '13:00'
                }
            ],
            slotDuration: '00:15:00',
            slotMinTime: "07:00:00",
            slotMaxTime: "18:00:00",
            
            allDaySlot: false,

            selectAllow: function(selectInfo) {
                return moment().diff(selectInfo.start) <= 0
            },
            selectConstraint: "businessHours",
            selectOverlap:false,
            //Create an event
            select: function(arg) {
                var check = moment(arg.start).format('YYYY-MM-DD HH');
                var today = moment(new Date()).format('YYYY-MM-DD HH');
                if(check > today) {
                    var title = prompt('Event Title:');
                    if (title) {

                        var starttime = moment(arg.start).format('YYYY-MM-DD HH:mm:ss');
                        var endtime = moment(arg.end).format('YYYY-MM-DD HH:mm:ss');
                        calendar.addEvent({
                            title: title,
                            start: starttime,
                            end: endtime,
                            constraint: 'businessHours',
                            allDay: arg.allDay
                        })
                        
                        console.log('Create event', starttime, endtime, title)
                        // $.ajax({
                        //     url: "insert.php",
                        //     type: "POST",
                        //     data: {
                        //         title: title,
                        //         start: starttime,
                        //         end: endtime
                        //     },
                        //     success: function() {
                        //         alert("Event Booked Successfully");
                        //     }
                        // })
                    }
                    calendar.unselect()
                } else {
                    console.warn('Can\'t add event on past date ' + check);
                }
            },
            //Click on an event
            eventClick: function(info) {
                if(info.event.constraint !== 'booked' && confirm('Are you sure you want to delete this event?')) {
                    console.log('REMOVE event', info.event.start, info.event.end)
                    info.event.remove()
                }
            },
            //Move event
            eventDrop: function(info) {
                alert(info.event.title + " was dropped on " + info.event.start.toISOString());
            
                if (!confirm("Are you sure about this change?")) {
                    info.revert();
                } else {
                    console.log('MOVE event', info.event.start, info.event.end)
                    /**
                     * Todo AJAX update values 
                     * info.event.start
                     * info.event.end
                     */
                }
            },
            //Resize event
            eventResize: function(info) {
                alert(info.event.title + " end is now " + info.event.end.toISOString());

                if (!confirm("is this okay?")) {
                    info.revert();
                } else {
                    console.log('RESIZE event', info.event.start, info.event.end)
                    /**
                     * Todo AJAX update values 
                     * info.event.start
                     * info.event.end
                     */
                }
            },
            slotEventOverlap:false,
            eventOverlap: false,
            nowIndicator: true,
            events: [
                {
                    title: 'Booked',
                    start: '2020-10-12T08:00:00',
                    end: '2020-10-12T17:00:00',
                    constraint: 'booked',
                    color: '#BEBEBE'
                },
                {
                    title: 'Booked',
                    start: '2020-10-13T08:00:00',
                    end: '2020-10-13T10:30:00',
                    constraint: 'booked',
                    color: '#BEBEBE'
                },
                {
                    title: 'Booked',
                    start: '2020-10-13T12:00:00',
                    end: '2020-10-13T15:30:00',
                    constraint: 'booked',
                    color: '#BEBEBE'
                },
                {
                    title: 'Booked',
                    start: '2020-10-14T08:00:00',
                    end: '2020-10-14T17:00:00',
                    constraint: 'booked',
                    color: '#BEBEBE'
                },
                {
                    title: 'Booked',
                    start: '2020-10-15T08:00:00',
                    end: '2020-10-15T12:00:00',
                    constraint: 'booked',
                    color: '#BEBEBE'
                },
                {
                    title: 'Booked',
                    start: '2020-10-15T15:00:00',
                    end: '2020-10-15T17:00:00',
                    constraint: 'booked',
                    color: '#BEBEBE'
                },
                {
                    title: 'Booked',
                    start: '2020-10-16T08:00:00',
                    end: '2020-10-16T17:00:00',
                    constraint: 'booked',
                    color: '#BEBEBE'
                }
            ],
            longPressDelay:100
        });

        calendar.render();

    }

    
};