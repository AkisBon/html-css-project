/* !
 AccDC Bootstrap R1.2
 Copyright 2010-2017 Bryan Garaventa (WhatSock.com)
 Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
 
 Please edit this file however desired to customize functionality.
 
 */

(function ($) {
    $A.bootstrap = function (context) {
        var context = context && context.nodeType === 1 ? context : document;

        // Accessible Calendar Pickers
        // Parse all A and button tags that include the class 'accCalendar'
        // An Input tag with type=text is specified as the return recipient by matching the data-name attribute of the A/Button with the Input tag's Name attribute.
        // A and Button tags were chosen because they are always active elements, to ensure keyboard accessibility.
        if ($A.setCalendar) {
            $A.query('a.substartCalendar', context, function (i, o) {

                if ($A.reg[o.id] && $A.reg[o.id].loaded) {
                    var tdc = $A.reg[o.id];
                    tdc.returnFocus = false;
                    tdc.close();
                    tdc.returnFocus = true;
                }
console.log("tested old: "+$A.getAttr(o, 'data-name'));
                var targ = $A.query('input[name="' + $A.getAttr(o, 'data-name') + '"]', context)[0];

                // Prevent duplicate event bindings when nested within multi-level same page apps
                if ($A.internal.data(o, 'bound')) {
                    var multiple = true;
                } else {
                    $A.internal.data(o, 'bound', true);
                }

                if (!multiple) {
                    $A.setCalendar(o.id, o, targ, false, function (ev, dc) {
                        var oldValue = targ.value;
                        var date = oldValue.split('/');
                        var newMonth = ('0' + (dc.range.current.month + 1)).slice(-2);
                        var newDay = ('0' + dc.range.current.mDay).slice(-2);
                        var newYear = '' + dc.range.current.year;


                        targ.value = (newMonth + '/' + newDay + '/' + newYear);

                        dc.close();
                    },
                            {
                                // Uncomment to disable auto positioning
                                targetObj: document.getElementById('datePickerId1'),
                                autoPosition: 9,
                                offsetTop: 40,
                                offsetLeft: 0,
                                posAnchor: $('[data-drupal-selector="edit-subscription-start-date"]')[0],
                                cssObj:
                                        {
                                            position: 'absolute',
                                            zIndex: 1
                                        },
                                // Uncomment the following to enable disabled date ranges

                                disabledTxt: 'Disabled',
                                ajax: function (dc, save) {

                                    // Run before the datepicker renders

                                    // Set current date variables
                                    var date = new Date(), current =
                                            {
                                                day: date.getDate() + 3,
                                                month: date.getMonth(),
                                                year: date.getFullYear(),
                                                weekDay: date.getDay()
                                            };
                                    console.log(current.day);
                                    // Disable all days after 60 months from current date.
                                    date.setMonth(current.month + 60);
                                    var max = {
                                        day: date.getDate() + 3,
                                        month: date.getMonth(),
                                        year: date.getFullYear(),
                                        weekDay: date.getDay()
                                    };

                                    // Disable all dates prior to the current day
                                    if (current.year > dc.range.current.year
                                            || (current.year === dc.range.current.year && current.month > dc.range.current.month)
                                            || (dc.range.current.year > max.year)
                                            || (max.year === dc.range.current.year && dc.range.current.month > max.month)) {
                                        dc.range[dc.range.current.month].disabled[dc.range.current.year] =
                                                [
                                                    1,
                                                    2,
                                                    3,
                                                    4,
                                                    5,
                                                    6,
                                                    7,
                                                    8,
                                                    9,
                                                    10,
                                                    11,
                                                    12,
                                                    13,
                                                    14,
                                                    15,
                                                    16,
                                                    17,
                                                    18,
                                                    19,
                                                    20,
                                                    21,
                                                    22,
                                                    23,
                                                    24,
                                                    25,
                                                    26,
                                                    27,
                                                    28,
                                                    29,
                                                    30,
                                                    31
                                                ];
                                    }

                                    if (current.year === dc.range.current.year && current.month === dc.range.current.month) {
                                        dc.range[dc.range.current.month].disabled[dc.range.current.year] = [];

                                        for (var day = 1; day < current.day; day++) {
                                            dc.range[dc.range.current.month].disabled[dc.range.current.year].push(day);
                                        }
                                    }

                                    if (max.year === dc.range.current.year && max.month === dc.range.current.month) {
                                        dc.range[dc.range.current.month].disabled[dc.range.current.year] = [];
                                        for (var max = max.day; max <= dc.range[dc.range.current.month].max; max++) {
                                            dc.range[dc.range.current.month].disabled[dc.range.current.year].push(max);
                                        }
                                    }


                                    // Disable all dates that fall on Saturday or Sunday
                                    /* if (!dc.range[dc.range.current.month].disabled[dc.range.current.year])
                                     dc.range[dc.range.current.month].disabled[dc.range.current.year] = [];
                                     date.setFullYear(dc.range.current.year);
                                     date.setMonth(dc.range.current.month);
                                     var max = dc.range[dc.range.current.month].max;
                                     
                                     if (dc.range.current.month === 1)
                                     max = (new Date(dc.range.current.year, 1, 29).getMonth() == 1) ? 29 : 28;
                                     
                                     for (var day = 1; day <= max; day++){
                                     date.setDate(day);
                                     var weekDay = date.getDay();
                                     
                                     // 0 = Sunday, 6 = Saturday
                                     if (weekDay === 0 || weekDay === 6)
                                     dc.range[dc.range.current.month].disabled[dc.range.current.year].push(day);
                                     }*/

                                    // Now render the datepicker after configuring the disabled date ranges
                                    dc.open();
                                }

                            });
                }
            });

            $A.query('a.subendCalendar', context, function (i, o) {
                if ($A.reg[o.id] && $A.reg[o.id].loaded) {
                    var tdc = $A.reg[o.id];
                    tdc.returnFocus = false;
                    tdc.close();
                    tdc.returnFocus = true;
                }

                var targ = $A.query('input[name="' + $A.getAttr(o, 'data-name') + '"]', context)[0];

                // Prevent duplicate event bindings when nested within multi-level same page apps
                if ($A.internal.data(o, 'bound')) {
                    var multiple = true;
                } else {
                    $A.internal.data(o, 'bound', true);
                }

                if (!multiple) {
                    $A.setCalendar(o.id, o, targ, false, function (ev, dc) {
                        var oldValue = targ.value;
                        var date = oldValue.split('/');
                        var newMonth = ('0' + (dc.range.current.month + 1)).slice(-2);
                        var newDay = ('0' + dc.range.current.mDay).slice(-2);
                        var newYear = '' + dc.range.current.year;

                        targ.value = (newMonth + '/' + newDay + '/' + newYear);

                        dc.close();
                    },
                            {
                                // Uncomment to disable auto positioning
                                targetObj: document.getElementById('datePickerId2'),
                                autoPosition: 9,
                                offsetTop: 40,
                                offsetLeft: 0,
                                posAnchor: $('[data-drupal-selector="edit-subscription-end-date"]')[0],
                                cssObj:
                                        {
                                            position: 'absolute',
                                            zIndex: 1
                                        },
                                // Uncomment the following to enable disabled date ranges

                                disabledTxt: 'Disabled',
                                ajax: function (dc, save) {

                                    // Run before the datepicker renders

                                    // Set current date variables
                                    var date = new Date(), current =
                                            {
                                                day: date.getDate() + 3,
                                                month: date.getMonth(),
                                                year: date.getFullYear(),
                                                weekDay: date.getDay()
                                            };
                                    // Disable all days after 1 months from current date.
                                    date.setMonth(current.month + 60);
                                    var max = {
                                        day: date.getDate(),
                                        month: date.getMonth(),
                                        year: date.getFullYear(),
                                        weekDay: date.getDay()
                                    };

                                    // Disable all dates prior to the current day
                                    if (current.year > dc.range.current.year
                                            || (current.year === dc.range.current.year && current.month > dc.range.current.month)
                                            || (dc.range.current.year > max.year)
                                            || (max.year === dc.range.current.year && dc.range.current.month > max.month)) {
                                        dc.range[dc.range.current.month].disabled[dc.range.current.year] =
                                                [
                                                    1,
                                                    2,
                                                    3,
                                                    4,
                                                    5,
                                                    6,
                                                    7,
                                                    8,
                                                    9,
                                                    10,
                                                    11,
                                                    12,
                                                    13,
                                                    14,
                                                    15,
                                                    16,
                                                    17,
                                                    18,
                                                    19,
                                                    20,
                                                    21,
                                                    22,
                                                    23,
                                                    24,
                                                    25,
                                                    26,
                                                    27,
                                                    28,
                                                    29,
                                                    30,
                                                    31
                                                ];
                                    }

                                    if (current.year === dc.range.current.year && current.month === dc.range.current.month) {
                                        dc.range[dc.range.current.month].disabled[dc.range.current.year] = [];

                                        for (var day = 1; day < current.day; day++) {
                                            dc.range[dc.range.current.month].disabled[dc.range.current.year].push(day);
                                        }
                                    }

                                    if (max.year === dc.range.current.year && max.month === dc.range.current.month) {
                                        dc.range[dc.range.current.month].disabled[dc.range.current.year] = [];
                                        for (var max = max.day; max <= dc.range[dc.range.current.month].max; max++) {
                                            dc.range[dc.range.current.month].disabled[dc.range.current.year].push(max);
                                        }
                                    }


                                    // Disable all dates that fall on Saturday or Sunday
                                    /* if (!dc.range[dc.range.current.month].disabled[dc.range.current.year])
                                     dc.range[dc.range.current.month].disabled[dc.range.current.year] = [];
                                     date.setFullYear(dc.range.current.year);
                                     date.setMonth(dc.range.current.month);
                                     var max = dc.range[dc.range.current.month].max;
                                     
                                     if (dc.range.current.month === 1)
                                     max = (new Date(dc.range.current.year, 1, 29).getMonth() == 1) ? 29 : 28;
                                     
                                     for (var day = 1; day <= max; day++){
                                     date.setDate(day);
                                     var weekDay = date.getDay();
                                     
                                     // 0 = Sunday, 6 = Saturday
                                     if (weekDay === 0 || weekDay === 6)
                                     dc.range[dc.range.current.month].disabled[dc.range.current.year].push(day);
                                     }*/

                                    // Now render the datepicker after configuring the disabled date ranges
                                    dc.open();
                                }

                            });
                }
            });
        }
    };

    $A.bind(window, 'load', $A.bootstrap);
})(jQuery);