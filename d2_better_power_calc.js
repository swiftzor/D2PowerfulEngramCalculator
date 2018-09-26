function doCalc(runs) 
{
	var startLight = [
				parseInt($("#primary").val()),
				parseInt($("#energy").val()),
				parseInt($("#heavy").val()),
				parseInt($("#head").val()),
				parseInt($("#arms").val()),
				parseInt($("#chest").val()),
				parseInt($("#boots").val()),
				parseInt($("#classItem").val()),
					];
	var startAvgLight = startLight.reduce(getSum) / 8 ;
	//console.log(startLight);
	//console.log(startAvgLight);
	var avgPost = [];
	for(j = 0; j < runs; j++) 
	{
		var light = copyArray(startLight);
		var	avgLight = startAvgLight;
		var clan = 1;
		var capEngrams = [15, 3, 1, 7, 4];
		var collected = [0, 0, 0, 0, 0];
		
		var totalCollected = 0;
		var totalLeft = capEngrams.reduce(getSum);
		
		avgLight = startAvgLight;
		
		while (totalCollected < totalLeft)
		{
			var piece = random(8, 0);
			if(avgLight < 520 && collected[0] < capEngrams[0])
			{
				light[piece] = dropGear(avgLight, light[piece], 8, 2);
			}
			else if(avgLight < 540 && collected[1] < capEngrams[1])
			{
				light[piece] = dropGear(avgLight, light[piece], 8, 2);
			}
			else if(avgLight < 560 && collected[2] < capEngrams[2])
			{
				light[piece] = dropGear(avgLight, light[piece], 8, 2);
			}
			else if(avgLight < 580 && collected[3] < capEngrams[3])
			{
				light[piece] = dropGear(avgLight, light[piece], 8, 2);
			}
			else if(avgLight < 600 && collected[4] < capEngrams[4])
			{
				light[piece] = dropGear(avgLight, light[piece], 8, 2);
			}
			else
			{
				light[piece] = dropGear(avgLight, light[piece], 2, 0);
			}
		
			avgLight = light.reduce(getSum) / 8;
			totalCollected++;
			//console.log('piece: ' + piece + ' average light: ' + avgLight);
			//console.log(light);
		}
		
		//clan engram
		var piece = random(8, 0);
		light[piece] = dropGear(avgLight, light[piece], 0, 3);
		
		//console.log(avgLight);
		avgPost[j] = avgLight;
	}
	avgPost.sort();
	var per25 = avgPost[avgPost.length * .25], 
		per50 = avgPost[avgPost.length * .5], 
		per75 = avgPost[avgPost.length * .75];
		
	//console.log(avgPost);
	//console.log(avgPost.length);
	//console.log(avgPost.length * .25);
	//console.log(avgPost.length * .5);
	//console.log(avgPost.length * .75);
	
	//console.log(per25);
	//console.log(per50);
	//console.log(per75);
	
	//console.log(light);
	//console.log(startLight);
		
	//console.log(avgLight);
	//console.log(startAvgLight);
	
	$("#val25").text(per25);
	$("#val50").text(per50);
	$("#val75").text(per75);
}

function getSum(total, current)
{
	return total + current;
}

function random(range, lowPad)
{
	return val = Math.floor(Math.random() * range) + lowPad;
}

function dropGear(avgLight, equiped, range, lowPad)
{
	var newItem = random(range, lowPad) + avgLight;
	////console.log('old: ' + equiped + ' new: ' + newItem);
	return Math.floor((newItem > equiped) ? newItem : equiped);
}

function copyArray(fromArr)
{ 
	var retVal = [];
	for(i = 0; i < fromArr.length; i++)
	{
		retVal[i] = fromArr[i];
	}
	
	return retVal;
}