!function(){$(function(){$("button").button({})}),function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=(new Date).getTime(),f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-2987619-1","hailwatch.com"),ga("send","pageview"),$(function(){$("nav li").click(function(){window.location=$("a",this).attr("href")}),$("#logoutButton").button({icons:{primary:"ui-icon-locked"}}).click(function(){window.location="/aw-portal/logout"}),$("#shoppingCartButton").button({icons:{primary:"ui-icon-cart"}}).click(function(){window.location="/customer/account/login"})})}();