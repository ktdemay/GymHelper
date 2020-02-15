var elapsed, timer;

function startWorkout()
{
	var start = new Date().getTime();
    elapsed = '0.0';

	timer = setInterval(function()
	{
	    var time = new Date().getTime() - start;

	    elapsed = Math.floor(time / 100) / 10;
	    if(Math.round(elapsed) == elapsed) 
	    { 
	    	elapsed += '.0'; 
	    }
	}, 100);

	$('#workoutTable').toggle();
	document.getElementById("startBtn").style.display = "none";
	document.getElementById("stopBtn").style.display = "inline";

	if(localStorage.getItem('goals') != null && localStorage.getItem('goals') != '')
	{
		document.getElementById("lastGoals").style.display = "inline";
		document.getElementById("lastGoalsHr").style.display = "block";
		document.getElementById("lastGoals").innerHTML = "<b>Goals:</b> " + localStorage.getItem('goals');
	}
}

function addNewExercise()
{
	$('#workoutTable').toggle();
	document.getElementById('exerciseInput').style.display = "inline";
	document.getElementById('setsInput').style.display = "inline";
	document.getElementById('nextBtn').style.display = "inline";
}

function getDetails()
{
	document.getElementById('exerciseInput').style.display = "none";
	document.getElementById('setsInput').style.display = "none";
	document.getElementById('nextBtn').style.display = "none";

	var sets = document.getElementById('setsInput').value;
	document.getElementById('setsInput').value = "";

	var $tableBody = $('#setTable').find('tbody');
	for(var i = 0; i < sets; i++)
	{
		$tableBody
		.append($('<tr>')
			.append($('<th>')
				.text(i+1)
			)
			.append($('<td>')
				.append($('<input oninput="this.value=this.value.replace(/(?![0-9])./gmi,\'\')">')
					.attr('class', 'form-control')
				)
			)
			.append($('<td>')
				.append($('<input>')
					.attr('oninput', 'oninput="this.value=this.value.replace(/(?![0-9.])./gmi,\'\')"')
					.attr('class', 'form-control')
				)
			)
		)
	}

	$('#setTable').toggle();
	document.getElementById('doneBtn').style.display = "inline";
}

function addExercise()
{
	var exerciseName = document.getElementById('exerciseInput').value;
	document.getElementById('exerciseInput').value = "";

	var reps = 0;
	var totalWeight = 0;

	var repOrWeight = 'r';
	$('#setTable').find('td').each (function() {
		if(repOrWeight == 'r')
		{
			repOrWeight = 'w';
			reps = this.firstChild.value;
		}
		else
		{
			repOrWeight = 'r';
			totalWeight += (reps*this.firstChild.value);
		}
	}); 

	$("#workoutTable").find('tbody tr:last')
    .before($('<tr>')
    	.append($('<td>')
    		.append(exerciseName)
    	)
    	.append($('<td>')
    		.append(totalWeight + " lbs")
    	)
        .append($('<td class=\'text-center\'>')
            .append($('<img>')
                .attr('src', 'remove.png')
            )
        )
    );

	var $tableBody = $('#workoutTable').find("tbody");
    var $newCell = $tableBody.find("tr:last").prev().find('td:eq(2)');
    var $removeImg = $newCell.find("img");
    $removeImg.click(function(){
    	$(this).closest('tr').remove();
    });

    $("#setTable > tbody").empty();

    $('#setTable').toggle();
	document.getElementById('doneBtn').style.display = "none";
	$('#workoutTable').toggle();
}

function stopWorkout()
{
	clearInterval(timer);

	var tips = [
		"Taking rest days is important, remember not to over-exert yourself!",
		"Make sure you're getting enough protein, it's essential for rebuilding muscles.",
		"Drink. More. Water. There's a good chance you're not drinking enough.",
		"Use good form. If you're unsure how to do an exercise, watch a video on it and have someone critique your form or record it and compare it to the video.",
		"The easiest way to keep going to the gym is to make a routine out of it. Don't make excuses.",
		"If you keep putting in the effort, you will see results.",
		"Don't get discouraged if you don't see results in the short-term, it takes around 2-3 weeks to see any muscle growth",
		"Eat well. Eating right is just as important as the workout itself.",
		"Set goals. If you set goals the gym will feel much more rewarding. Don't make it easy on yourself but also don't make it impossible.",
		"Find a workout plan tht you enjoy doing, you won't want to go to the gym if you aren't enjoying yourself."
	]

	var totalWeight = getWeight();

	var mainDiv = document.getElementById('mainDiv');
	mainDiv.innerHTML = "";

	$('#mainDiv')
	.append($('<h1>')
		.text("Nice job!")
	);

	$('#mainDiv')
	.append($('<hr>')
	);

	$('#mainDiv')
	.append($('<h5>')
		.text("Your workout lasted for:")
	);

	$('#mainDiv')
	.append($('<h3>')
		.text(getTime())
	);

	$('#mainDiv')
	.append($('<h5>')
		.text("and you lifted")
	);

	$('#mainDiv')
	.append($('<h3>')
		.text(totalWeight + " lbs")
	);

	$('#mainDiv')
	.append($('<hr>')
	);

	tip = tips[Math.floor(Math.random()*10)];

	$('#mainDiv')
	.append($('<p>')
		.text("Tip: " + tip)
	);

	$('#mainDiv')
	.append($('<hr>')
	);

	$('#mainDiv')
	.append($('<h4>')
		.text("Goals for next time:")
	);

	$('#mainDiv')
	.append($('<textarea class="form-control" rows="3" placeholder="Goals" id="goals">')
	);

	$('#mainDiv')
	.append($('<button onclick=finishWorkout()>')
		.text("Finish Workout")
		.attr("class", "btn btn-dark btn-outline-info")
	);
}

function getTime() {
    var pad = function(num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(elapsed).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60);

    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
}

function finishWorkout()
{
	localStorage.removeItem('goals');

	var goals = document.getElementById('goals').value;

	localStorage.setItem('goals', goals);

	document.location.reload(true);
}

function getWeight()
{
	var totalWeight = 0;
	var whichCell = "name";
	$('#workoutTable tr').each (function() 
	{
		$(this).find('td').each (function()
		{
			if(whichCell == "name")
			{
				whichCell = "weight";
			}
			else if(whichCell == "weight")
			{
				console.log(this.innerHTML);
				console.log(parseInt(this.innerHTML));
				totalWeight += parseInt(this.innerHTML);
				whichCell = "remove";
			}
			else
			{
				whichCell = "name";
			}
		})
	}); 

	return totalWeight;
}












