function deparam(query){
    if(query === undefined){
        query = window.location.search;
    }
    
    var queryString = {};
    query.replace(
      new RegExp(
        "([^?=&]+)(=([^&#]*))?", "g"),
        function($0, $1, $2, $3) {
        	queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
        }
      );
    return queryString;
    
};