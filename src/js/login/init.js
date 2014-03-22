(function() {
    $(function() {
        $('button').button({});

    });
    (function(i, s, o, g, r, a, m) {
        i.GoogleAnalyticsObject = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments);
        };
        i[r].l = new Date().getTime();
        a = s.createElement(o);
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-2987619-1', 'hailwatch.com');
    ga('send', 'pageview');
    $(function() {

        $('nav li').click(function() {
            window.location = $('a', this).attr('href');
        });

        $('#logoutButton').button({
            icons : {
                primary : 'ui-icon-locked'
            }
        }).click(function() {
            window.location = '/aw-portal/logout';
        });

        $('#shoppingCartButton').button({
            icons : {
                primary : 'ui-icon-cart'
            }
        }).click(function() {
            window.location = '/customer/account/login';
        });

    });

})();