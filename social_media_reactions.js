function reltime(time_value) {
    var values = time_value.split(" ");
    time_value = values[2] + " " + values[1] + ", " + values[3] + " " + values[4];
    var parsed_date = Date.parse(time_value);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
    var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
    delta = delta + (relative_to.getTimezoneOffset() * 60);

    if (delta < 60) {
        return 'less than a minute ago';
    } else if(delta < 120) {
        return 'about a minute ago';
    } else if(delta < (60*60)) {
        return (parseInt(delta / 60)).toString() + ' minutes ago';
    } else if(delta < (120*60)) {
        return 'about an hour ago';
    } else if(delta < (24*60*60)) {
        return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
    } else if(delta < (48*60*60)) {
        return '1 day ago';
    } else {
        return (parseInt(delta / 86400)).toString() + ' days ago';
    }
}
function twCallback(rs) {
    if (rs.results.length>0) {
        document.getElementById('jmltweet').innerHTML = '('+rs.results.length+' Komentar)';
        var statusHTML = [];
        for (var i=0; i<rs.results.length; i++){
            var username = rs.results[i].from_user;
            var idx = rs.results[i].id_str;
            var status = rs.results[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
              return '<a target="_blank" href="'+url+'">'+url+'</a>';
            }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
              return  reply.charAt(0)+'<a target="_blank" href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
            });
            statusHTML.push('<li style="margin: 0px; padding: 0px; height: 51px; display: list-item;"><div><a target="_blank" href="http://twitter.com/'+username+'"><strong>@'+username+'</strong></a> <span>'+status+' <a  target="_blank" style="font-size:85%" href="http://twitter.com/'+username+'/status/'+idx+'">'+reltime(rs.results[i].created_at)+'</a></span></div></li>');
            document.getElementById('ulisttw').innerHTML = statusHTML.join('');
        }
    } else {
        // hide iframe
        document.getElementById("box_reactions").hide();
        parent.document.getElementById('iframe_reactions').hide();
    }
}