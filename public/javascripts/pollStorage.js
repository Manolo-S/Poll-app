var pollName;
var categories;
var votes;
var allPollsData;
var index = 0;
var str = '';

function changeChart() {
    var selectedPoll = document.getElementById('pollMenu').value;
    pollName = allPollsData[selectedPoll].pollName;
    categories = allPollsData[selectedPoll].pollItems.map(categoriesFun);
    categorieMenu();
    votes = allPollsData[selectedPoll].pollItems.map(votesFun);
    buildChart();
}

function buildChart() {
    var options = {
        chart: {
            renderTo: 'container',
            type: 'bar'
        },
         tooltip: {
            formatter: function () {
                return this.y;
            }
        },
        title: {
            text: pollName
        },        
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: 'Number of votes'
            }
        },
        series: [{
            data: votes
        }],
        legend: {
            enabled: false
        }
    };

    //build chart using options above

    var chart = new Highcharts.Chart(options);
}

function pollMenuStr(poll) {
    var pollName = poll.pollName;
    str = str + '<option value=' + index + '>' + pollName + '</option>'
    index++;
}

function categorieMenuStr(categorie){
    str = str + '<input type="radio" name="vote-cat" value=' + index + '>' + categorie + '</input><br>'
    index++;
}


function pollMenu() {
    str = '';
    str += '<select id="pollMenu" onchange="changeChart()">';
    allPollsData.map(pollMenuStr);
    str += '</select>';
    $('#poll-menu').append(str);
    index = 0;
}

function updatePoll(){
    var voteCategorie = $('input:checked').val();
    var selectedPoll = document.getElementById('pollMenu').value;
    var poll = allPollsData[selectedPoll];
    var votes = poll.pollItems[voteCategorie].votes;
    poll.pollItems[voteCategorie].votes = votes + 1;
    var updatedPoll = {updatedPoll: poll};
    $.post('https://poll-app-ms.herokuapp.com/store-vote', updatedPoll);
    changeChart();
    //TODO add functionality to only vote once use localstorage?
}

function categorieMenu(){
    str = '';
    str += '<form id="categorieMenu">';
    categories.map(categorieMenuStr);
    str += '</form>';
    $('#categorie-menu').empty();  
    $('#categorie-menu').append(str);   
    index = 0;

}

function categoriesFun(pollItem) {
    return pollItem.categorie;
}


function votesFun(pollItem) {
    return pollItem.votes;
}


function success(result) {
    allPollsData = result.pollData;
    pollName = result.pollData[0].pollName;
    categories = result.pollData[0].pollItems.map(categoriesFun);
    votes = result.pollData[0].pollItems.map(votesFun);
    pollMenu();
    categorieMenu();
    buildChart();
}


function abc() {
    $.getJSON('https://poll-app-ms.herokuapp.com/data/polldata', success)
}

