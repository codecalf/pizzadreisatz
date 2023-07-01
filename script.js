nPersons = 0;
nSlices = 0;
table = [];

function addPerson() {
	name = document.getElementById("newName").value;
	if (name == "") {
		name = "player " + nPersons;
	}
	tableRows = document.getElementById("slices").children[0].children[0];
	//<tr><td>mathis</td><td>18</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>";
	newLine = document.createElement("tr");
	newNameBox = document.createElement("td");
	newNameBox.innerText = name.toLowerCase();
	newLine.appendChild(newNameBox);
	for (i=0;i<5;i++) {
		newBox = document.createElement("td");
		newBox.innerText= "0";
		newBox.id = nPersons + "" + i;
		newBox.onclick = function () {
			current = parseInt(this.innerText);
			if (current >= 8) {
				current = -1;
			}
			this.innerText = current + 1;
			doMath();
		};
		newLine.appendChild(newBox);
	}
	tableRows.appendChild(newLine);
	table.push([0,0,0,0,0]);
	nPersons++;
}

function doMath() {
	nSlices = 0;
	for (i=0; i<nPersons; i++) {
		for (j=1;j<5;j++) {
			table[i][j] = parseInt(document.getElementById(i + "" + j).innerText);
			nSlices += table[i][j];
		}
		table[i][0] = 0;
	}

	nPizza = Math.floor(nSlices/8);
	itPizza = nPizza;//iterierbare pizza instanz
	rawPrice = 0;
	lowPrice = 0;
	for (j=1;j<5;j++) {
		for (i=0; i<nPersons; i++) {
			rawPrice += table[i][j]*(1.2+0.1*j);
			if (itPizza > 0 && table[i][j] != 0) {
				if (itPizza >= table[i][j]) {
					itPizza -= table[i][j];
				} else {
					lowPrice += (table[i][j]-itPizza)*(1.2+0.1*j)
					itPizza = 0;
				}
			} else {
				lowPrice += table[i][j]*(1.2+0.1*j);
			}
		}
	}
	plural = (nPizza == 1) ? "" : "s";
	stats = nPizza + " free slice" + plural + ", " + Math.floor(rawPrice*100+0.01)/100 + "€ -> " + Math.floor(lowPrice*100+0.01)/100 + "€";
	document.getElementById('stats').innerText = stats;
	for (i=0;i<nPersons;i++) {
		for (j=1;j<5;j++) {
			table[i][0] += table[i][j]*(1.2+0.1*j);
		}
		table[i][0] = Math.floor((table[i][0] * lowPrice / rawPrice)*100 +0.01 )/100;//+0.01 rounding bias
	}

	for (i=0; i<nPersons; i++) {
		document.getElementById(i+"0").innerText = table[i][0];
	}
}

function kill() {//delete last person
	document.getElementById("slices").children[0].children[0].deleteRow(nPersons+1);
	nPersons--;
	doMath();
}

//Enter in textfield starts update
document.getElementById("newName").addEventListener("keydown", function (e) {
	if (e.code === "Enter") {
		addPerson();
		this.value = "";
	}
});