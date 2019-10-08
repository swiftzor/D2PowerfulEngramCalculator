var calculator = {
	attributes : {
		capEngrams: [28, 10, 3, 1],
		runs: 1
	},
	registerEvents: function() 
	{
		var that = this;
		$("#calc").click(function() {
			that.execCalc();
		});
	},
	execCalc: function(me)
	{
		this.attributes.runs = $("#runs").val();
		var legacy = $(".legacyCb:checked").length;
		var tier1 = $(".tier1Cb:checked").length;
		var tier2 = $(".tier2Cb:checked").length;
		var pinacle = $(".pinacleCb:checked").length;
		this.attributes.capEngrams = [legacy, tier1, tier2, pinacle];
		console.log(legacy);
		this.doCalc();
		$("#result").show();
		$("#ran").text(this.runs);
	},
	doCalc : function() {
		var startLight = [
					parseInt($("#primary").val()),
					parseInt($("#energy").val()),
					parseInt($("#heavy").val()),
					parseInt($("#head").val()),
					parseInt($("#arms").val()),
					parseInt($("#chest").val()),
					parseInt($("#boots").val()),
					parseInt($("#classItem").val())
						];
		var artifactBonus = parseInt($("#artifact").val());
		var startAvgLight = (startLight.reduce(this.getSum) / 8) + artifactBonus ;
		var avgPost = [];
		for(j = 0; j < this.attributes.runs; j++) 
		{
			var light = this.copyArray(startLight);
			var	avgLight = startAvgLight;
			var clan = 1;
			var capEngrams = this.copyArray(this.attributes.capEngrams);
			var collected = [0, 0, 0, 0];
			
			var totalCollected = 0;
			var totalLeft = capEngrams.reduce(this.getSum);
			
			//avgLight = startAvgLight;
			
			while (totalCollected < totalLeft)
			{
				var piece = this.random(8, 0);
				if(collected[0] < capEngrams[0])
				{
					var gear = this.dropGear(avgLight, light[piece], -3, 0, 950);
					light[piece] = gear;
					collected[0]++;
				}
				if(collected[1] < capEngrams[1])
				{
					var gear = this.dropGear(avgLight, light[piece], 0, 3, 950);
					light[piece] = gear;
					collected[1]++;
				}
				if(collected[2] < capEngrams[2])
				{
					var gear = this.dropGear(avgLight, light[piece], 0, 4, 950);
					light[piece] = gear;
					collected[2]++;
				}
				if(collected[3] < capEngrams[3])
				{
					var gear = this.dropGear(avgLight, light[piece], 0, 5, 960);
					light[piece] = gear;
					collected[3]++;
				}
			
			 	avgLight = (light.reduce(this.getSum) / 8) + artifactBonus;
			 	totalCollected++;
			}
			
			avgPost[j] = avgLight;
		}
		avgPost.sort();
		var per25 = avgPost[Math.floor(avgPost.length * .25)], 
			per50 = avgPost[Math.floor(avgPost.length * .5)], 
			per75 = avgPost[Math.floor(avgPost.length * .75)];
		
		$("#primaryEnd").val(light[0]);
		$("#energyEnd").val(light[1]);
		$("#heavyEnd").val(light[2]);
		$("#headEnd").val(light[3]);
		$("#armsEnd").val(light[4]);
		$("#chestEnd").val(light[5]);
		$("#bootsEnd").val(light[6]);
		$("#classItemEnd").val(light[7]);
		
		$("#val25").text(per25);
		$("#val50").text(per50);
		$("#val75").text(per75);
	}, 
	random : function(range, lowPad) {
		return val = Math.floor(Math.random() * range) + lowPad;
	},
	getSum : function(total, current) {
		return total + current;
	},
	dropGear : function(avgLight, equiped, range, lowPad, maxLight) {
		var newItem = this.random(range, lowPad) + avgLight;
		newItem = (newItem > maxLight) ? maxLight : newItem;
		return Math.floor((newItem > equiped) ? newItem : equiped);
	},
	copyArray : function(fromArr) {
		var retVal = [];
		for(i = 0; i < fromArr.length; i++)
		{
			retVal[i] = fromArr[i];
		}
		
		return retVal;
	}
}