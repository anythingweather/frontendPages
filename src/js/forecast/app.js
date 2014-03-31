
var elForDaily = [
    'ForecastDate',
    'MaxDailyTemp',
    'MinDailyTemp',
    'WindSpeedPeak',
    'ProbabilityOfPrecipitation',
    'Precipitation',
    'Evapotranspiration'
];

var elForHour = [
    'ForecastDateLocal',
    'AirTemp',
    'MaxHourlyTemp',
    'MinHourlyTemp',
    'Dewpoint',
    'RelativeHumidity',
    'WindSpeed',
    'WindSpeed_80m',
    'WindGust',
    'WindDirection',
    'Rainfall',//NO data
    'ProbabilityOfPrecipitation',
    'Pressure',//NO data
    'SoilTemp',
    'SkyCoverPercentage',
    'NetSolarRadiation',
    'ShortwaveSolarRadiation',
    'Evapotranspiration'
];
var unitsForShow = {
    degreesF : '°',
    mph : '',
    inches : '"',
    '%' : '%',
};

function createDailyList(xmlData) {
    var html = '';
    //remove today
    $(xmlData).find('Table').each(function(index, dayData) {
        if(index === 0) {
            return;
        }
        listCls = '';
        if(1 === index) {
            listCls = ' data-list-first';
        }
        html += '<ul class="data-list' + listCls + '"><li class="head">Day' + index + '</li>';
        $(elForDaily).each(function(index, data) {
            if(!data) {
                html += '<li>-</li>'
            } else {
                html += '<li';
                var itemData = $(dayData).find(data);
                var unit = unitsForShow[itemData.attr('units') || ''] || '';
                var text = itemData.text();
                var floatData = parseFloat(text);
                if(data === 'ForecastDate') {
                    html += ' class="date">';
                    html += moment(text).format('[<div>]dddd[</div>] MMM Do');
                } else {
                    html += '>';
                    text =  (floatData > 900 || floatData < -100) ? '-' : (text + unit);
                    html += text;
                }
                html += '</li>';
            }
        });
        html += '</ul>';
    });
    $('#daily-data').html(html);
}

function createHourList(xmlData, startIndex) {
    var html = '';
    startIndex = startIndex || 0;
    $(xmlData).find('Table').each(function(mainIndex, dayData) {
        listCls = '';
        if(0 === mainIndex) {
            listCls = ' data-list-first';
            var now = $(dayData).find('Table').find('ForecastDateUTC');
            now = moment(now).format('[<div>]dddd[</div>] MMM Do');
            $('#hour-title').find('.head').html(now);
        }
        //used for pagination
//        if((startIndex + 7) < mainIndex) {
//            return false;
//        }
        html += '<ul class="data-list' + listCls + '">';
        $(elForHour).each(function(index, data) {
            html += '<li';
            var itemData = $(dayData).find(data);
            if(itemData.length === 0) {
                html += '>-</li>'
            } else {
                var unit = unitsForShow[itemData.attr('units') || ''] || '';
                var text = itemData.text();
                var floatData = parseFloat(text);
                if(data === 'ForecastDateLocal') {
                    html += ' class="head date"><div>Hour' + (mainIndex + 1) + '</div>';
                    html += moment(text).format('hh:mm A');
                } else {
                    html += '>';
                    text =  (floatData > 900 || floatData < -100) ? '-' : (text + unit);
                    html += text;
                }
            }
            html += '</li>';
        });
        html += '</ul>';
    });
    $('#hour-data').html(html);
}

//not need to do pagination
//function bindNavEvents() {
//    $('.prev').on('click', function() {
//        alert(1);
//    });
//    $('.next').on('click', function() {
//        alert(1);
//    });
//}

function bindScrollEvent(id) {
    if($('body').width() > 800) {
        return;
    }
    var target = $(id);
    var contentEl = target.parent('div').children('ul');
    var contentWidth = contentEl.width();
    var scrollLeft;
    window.onresize = function() {
        //reset width
        contentEl.width('');
        contentWidth = contentEl.width();
    }
    target.on('scroll', function(e) {
        scrollLeft = target.scrollLeft();
        if(!contentEl.hasClass('fadeOut') && scrollLeft >= contentWidth) {
            contentEl.addClass('fadeOut');
            contentEl.width('5em');
            return;
        }
        if(scrollLeft <= contentWidth) {
            contentEl.removeClass('fadeOut');
            contentEl.width(contentWidth + 'px');
        }
    });
}

$.ajax({
    url : '/src/tmp/daily.xml',
    dataType : 'xml',
    success : function(xmlData) {
        createDailyList(xmlData);
        bindScrollEvent('#daily-data');
    },
    error : function(e) {
    }
});

$.ajax({
    url : '/src/tmp/hour.xml',
    dataType : 'xml',
    success : function(xmlData) {
        createHourList(xmlData);
        bindScrollEvent('#hour-data');
        //bindNavEvents();
    },
    error : function(e) {
    }
});

