function startWorkout()
{
	document.getElementById("startBtn").style.display = "none";
	document.getElementById("stopBtn").style.display = "inline";
	document.getElementById("addNewBtn").style.display = "inline";
}

function addNewExercise()
{
	var exersizeName = prompt("Exersize Name");
	var sets = prompt("How many sets?");
	if(sets == null)
	{
		return;
	}

	while(!(/[0-9]+/).test(sets))
	{
		var sets = prompt("Invalid input. How many sets?");
		if(sets == null)
		{
			return;
		}
	}

	var totalWeight = 0;
	for(var i = 0; i < sets; i++)
	{
		var reps = prompt("How many reps for set " + (i+1) + "?");
		if(reps == null)
		{
			return;
		}

		while(!(/[0-9]+/).test(reps))
		{
			var reps = prompt("How many reps for set " + (i+1) + "?");
			if(reps == null)
			{
				return;
			}
		}

		weightInput = prompt("How much weight (in lbs) for set " + (i+1) + "?");
		if(weightInput == null)
		{
			return;
		}

		while(!(/^[0-9]+(\.[0-9]+)?$/).test(weightInput))
		{
			var weightInput = prompt("How much weight (in lbs) for set " + (i+1) + "?");
			if(weightInput == null)
			{
				return;
			}
		}

		totalWeight += (reps*weightInput);
	}

    $("#workoutTable").find('tbody')
    .append($('<tr>')
    	.append($('<td>')
    		.append(exersizeName)
    	)
    	.append($('<td>')
    		.append(totalWeight + " lbs")
    	)
        .append($('<td>')
            .append($('<img>')
                .attr('src', 'remove.png')
            )
        )
    );

    var $tableBody= $('#workoutTable').find("tbody");
    var $lastCell = $tableBody.find("td:last");
    var $removeImg = $lastCell.find("img");
    $removeImg.click(function(){
    	$(this).closest('tr').remove();
    });
}

/*function removeExercise(var row)
{
	row.remove();
}*/

function stopWorkout()
{

}