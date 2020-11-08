$(document).ready(function () {
    var id = 0;
    var events = {
        sidebarToggler: true,
        sidebarDisplayDefault: true,
        eventListToggler: true,
        eventDisplayDefault: true,
        language: 'mk',
        calendarEvents: [
            {
                id: 'bHay68s', // Event's ID (required)
                name: "New Year", // Event name (required)
                date: "January/1/2020", // Event date (required)
                type: "holiday", // Event type (required)
                everyYear: true // Same event every year (optional)
            },
            {
                id: 'something',
                name: "Vacation Leave",
                badge: "02/13 - 02/15", // Event badge (optional)
                date: ["February/13/2020", "February/15/2020"], // Date range
                description: "Vacation leave for 3 days.", // Event description (optional)
                type: "event",
                color: "#63d867" // Event custom color (optional)
            }
        ]
    };
    events.calendarEvents.push({
        id: 'something',
        name: "Added from form",
        badge: "02/13 - 02/15", // Event badge (optional)
        date: ["February/14/2020", "February/20/2020"], // Date range
        description: "Vacation leave for 3 days.", // Event description (optional)
        type: "event",
        color: "#63d867" // Event custom color (optional)
    });
    $("#calendar").evoCalendar(events);
    $('button[data-toggle]').click(function () {
        $("#exampleModalLabel").text('Нов настан за ' + $(".event-header p").text());
    });
    $("#add").click(function () {
        var active = $('#calendar').evoCalendar('getActiveDate');
        var eventName = $('#event-name').val();
        var eventType = $('#event-type').val();
        var eventDescription = $('#event-description').val();
        var eventTime = $('#event-time').val();
        var eventImage = $('#event-image').val();
        var eventVideo = $('#event-video').val();
        if (eventName != '' && eventDescription != '') {
            $('#event-name').val('');
            $('#event-type').val('');
            $('#event-description').val('');
            $('#event-time').val('');
            $('#event-image').val('');
            $('#event-video').val('');
            $("#calendar").evoCalendar('addCalendarEvent', [
                {
                    id: id,
                    name: eventName,
                    date: active,
                    type: eventType,
                    everyYear: true,
                    badge: eventTime,
                    description: eventDescription,
                    imageURL: eventImage,
                    video: eventVideo
                }
            ]);
            id++;
            alert("Успешно го додадвте настанот!");
        } else {
            alert('Полето за име на настанот и опис на настанот не смеат да бидат празни!');
        }
    });
    $("#calendar").on('selectDate', function () {
        console.log($('#calendar').evoCalendar('getActiveEvents'));
    });
    $('#calendar').on('selectEvent', function (event, activeEvent) {
        $('.modal').show(500);
        $('.modal .modal-title').text(activeEvent.name);
        $('.modal .modal-title').append(`<br><p>Време: ${activeEvent.date} ${activeEvent.badge}</p>`)
        $("#opis").text(activeEvent.description);
        if (activeEvent.imageURL) {
            $("#slika").removeAttr('hidden');
            $('#slika').attr('src', activeEvent.imageURL);

        }
        if (activeEvent.video) {
            var splited = activeEvent.video.split('?')[1].split('=')[1];
            $('iframe').removeAttr('hidden');
            $('iframe').attr('src', 'https://www.youtube.com/embed/' + splited);
        }
        $("#edit").click(function () {
            $('.modal').hide(500);
            $("#exampleModal").modal('show');
            var active = $('#calendar').evoCalendar('getActiveDate');
            $('#event-name').val(activeEvent.name);
            $('#event-type').val(activeEvent.type);
            $('#event-description').val(activeEvent.description);
            $('#event-time').val(activeEvent.badge);
            $('#event-image').val(activeEvent.imageURL);
            $('#event-video').val(activeEvent.video);
            $('#calendar').evoCalendar('removeCalendarEvent', activeEvent.id);
        });
        $("#delete").click(function () {
            $('#calendar').evoCalendar('removeCalendarEvent', activeEvent.id);
            $('#calendar').evoCalendar('selectDate', 'February 15, 2020');
            $('#calendar').evoCalendar('selectDate', activeEvent.date);
            $('.modal').hide(500);
        });
    });
    $(".close").click(() => $("#close").trigger('click'))
    $("#close").click(function () {
        $('.modal').hide(500);
    });
})