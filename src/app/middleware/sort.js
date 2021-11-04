module.exports = {
    date:function(tours) {
        tours.sort(function (a, b) {
            var dateA = new Date(a.start), dateB = new Date(b.start);
            return dateA - dateB;
        });
        return tours;
    },
    pricelowtohigh(tours){
        tours.sort(function(a,b){
            return a.cost - b.cost;
        });
        return tours;
    },
    pricehightolow(tours){
        tours.sort(function(a,b){
            return b.cost - a.cost;
        });
        return tours;
    },
    nameasc(tours){
        tours.sort(function(a, b) {
            var titleA = a.name.toLowerCase(), titleB = b.name.toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
        });
        return tours;
    },
    namedsc(tours){
        tours.sort(function(a, b) {
            var titleA = a.name.toLowerCase(), titleB = b.name.toLowerCase();
            if (titleA < titleB) return 1;
            if (titleA > titleB) return -1;
            return 0;
        });
        return tours;
    }
}