function return_date(date){

					var date_abflug = new Date(date);

					 var monthValue = date_abflug.getMonth() + 1;
					 var dayValue = date_abflug.getDate();
					 var yearValue = date_abflug.getFullYear();
					 var hoursValue = date_abflug.getHours();
					 var minutesValue = date_abflug.getMinutes();

					 if ( monthValue < 10 )
					  monthValue = '0' + monthValue;
					 if ( dayValue < 10 )
					  dayValue = '0' + dayValue;
					 if ( hoursValue < 10 )
					  hoursValue = '0' + hoursValue;
					 if ( minutesValue < 10 )
					  minutesValue = '0' + minutesValue;

					return dayValue+"-"+monthValue+"-"+yearValue+" "+hoursValue+":"+minutesValue;

}


function suchen_lufthansa_flug(flughafenVon, flughafenBis, dateAbflug) {

$("#table1").find('#tbody1').text("");

	var client_secret = 'jeXaktJwre';
	var client_id = '467ww7knhmu5p5j8wf67a3fe';

	
	    var host = 'api.lufthansa.com';

		var date = dateAbflug.split("-").reverse().join("-");

	    var origin = flughafenVon;
		var destination = flughafenBis;
		var url = 'https://'+host+'/v1/oauth/token';
	
	//	var country = 'US';

	//	var bearer_token = "m8fqp8sfctauvsg3rgd85g5w";

        (function doRequest() {
            $.ajax({
                type: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                dataType: 'json',
                data: "client_secret=" + client_secret + '&grant_type=client_credentials&client_id=' + client_id
            }).done(function(data) {

            var token = data.access_token;

            	$.ajax({
                	type: 'GET',
					url: 'https://'+host+'/v1/operations/schedules/'+ origin + '/' + destination + '/' + date + '?directFlights=1&limit=5',
					headers: {
                    	Authorization: 'Bearer ' + token,
						Accept: 'application/xml'
					},
						error:function (xhr, ajaxOptions, thrownError){
				    if(xhr.status==404) {
				        $('.table-responsive').hide();
				        $('#error_message_flug').show();
				    }
				}
				}).done(function(data) {

        	$('#error_message_flug').hide();
            $('.table-responsive').show();

				var elements = data.getElementsByTagName('Schedule');
		
				var arrival = elements[0].getElementsByTagName("Arrival");
				var departure = elements[0].getElementsByTagName("Departure");
		
				var origin = departure[0].getElementsByTagName("AirportCode");
				var destination = arrival[0].getElementsByTagName("AirportCode");
		
			
				for (var i = 0; i < elements.length; i++) {
		
					var departure = elements[i].getElementsByTagName("Departure");
					var arrival = elements[i].getElementsByTagName("Arrival");
		
					
					$("#table1").find('#tbody1').append($('<tr id=' + i + '>'));
					
					var row = document.getElementById(i);
					

					var x = row.insertCell(-1);
					
					x.innerHTML = return_date(departure[0].getElementsByTagName('DateTime')[0].childNodes[0].nodeValue);
					
					var x = row.insertCell(-1);
					try {
						x.innerHTML = departure[0].getElementsByTagName('Name')[0].childNodes[0].nodeValue;
					} catch (e) {
						x.innerHTML = '';						
					}
		
					var x = row.insertCell(-1);
					x.innerHTML = return_date(arrival[0].getElementsByTagName('DateTime')[0].childNodes[0].nodeValue);
		
					var x = row.insertCell(-1);
					try {
						x.innerHTML = arrival[0].getElementsByTagName('Name')[0].childNodes[0].nodeValue;
					} catch (e) {
						x.innerHTML = '';
					}

					var x = row.insertCell(-1);
					x.innerHTML = elements[i].getElementsByTagName('FlightNumber')[0].childNodes[0].nodeValue+" "+elements[i].getElementsByTagName('AirlineID')[0].childNodes[0].nodeValue;

				}


            	})
            })
        })()	

 return false;
		}



		$(function () {

$('.table-responsive').hide();
$('#error_message_flug').hide();

 $("#dateAbflug").val( moment().format('DD-MM-YYYY') );
// $("#dateLandung").val( moment().format('DD-MM-YYYY') );

$('#dateAbflug').datetimepicker({
//    var locale = window.navigator.userLanguage || window.navigator.language;
    locale: 'de',
    format: 'DD-MM-YYYY'
});

/*
$('#dateLandung').datetimepicker({
    locale: 'de',
    useCurrent: false, 
    //Important! See issue #1075
//    moment(testDate).format('MM/DD/YYYY');
    format: 'DD-MM-YYYY'
});*/

/*$("#dateAbflug").on("dp.change", function (e) {
    $('#dateLandung').data("DateTimePicker").minDate(e.date);
});
*/
/*
$("#dateLandung").on("dp.change", function (e) {
    $('#dateAbflug').data("DateTimePicker").maxDate(e.date);
});
*/

});


$( function() {

//	var j={"name":"binchen"};
//var array_string_flughafen = JSON.stringify(array_flughafen);
  
  for (var i = 0; i < array_flughafen.length; i++){ 

    var value = array_flughafen[i].value;
    var text = array_flughafen[i].text;

    $('#flughafenVon').append($(document.createElement("option")).
                        attr("value",value).text(text));


    $('#flughafenBis').append($(document.createElement("option")).
                        attr("value",value).text(text));
}


/*var jsonData = $.parseJSON(array_flughafen);

var $select = $('#flughafenVon');
$(jsonData).each(function (index, o) {    
    var $option = $("<option/>").attr("value", o.value).text(o.text);
    $select.append($option);
});

var $select2 = $('#flughafenBis');
$(jsonData).each(function (index, o) {    
    var $option = $("<option/>").attr("value", o.value).text(o.text);
    $select2.append($option);
});
*/

});


var array_flughafen = [ 

{ value: "POM", text: "Port Moresby Jacksons International Airport"},
{ value: "KEF", text: "Keflavik International Airport"},
{ value: "PRN", text: "Priština International Airport"},
{ value: "YEG", text: "Edmonton International Airport"},
{ value: "YHZ", text: "Halifax / Stanfield International Airport"},
{ value: "YOW", text: "Ottawa Macdonald-Cartier International Airport"},
{ value: "YQB", text: "Quebec Jean Lesage International Airport"},
{ value: "YUL", text: "Montreal / Pierre Elliott Trudeau International Airport"},
{ value: "YVR", text: "Vancouver International Airport"},
{ value: "YWG", text: "Winnipeg / James Armstrong Richardson International Airport"},
{ value: "YXU", text: "London Airport"},
{ value: "YYC", text: "Calgary International Airport"},
{ value: "YYJ", text: "Victoria International Airport"},
{ value: "YYT", text: "St. John's International Airport"},
{ value: "YYZ", text: "Lester B. Pearson International Airport"},
{ value: "ALG", text: "Houari Boumediene Airport"},
{ value: "ACC", text: "Kotoka International Airport"},
{ value: "ABV", text: "Nnamdi Azikiwe International Airport"},
{ value: "QUO", text: "Akwa Ibom International Airport"},
{ value: "LOS", text: "Murtala Muhammed International Airport"},
{ value: "TUN", text: "Tunis Carthage International Airport"},
{ value: "BRU", text: "Brussels Airport"},
{ value: "CRL", text: "Brussels South Charleroi Airport"},
{ value: "LGG", text: "Liège Airport"},
{ value: "SXF", text: "Berlin-Schönefeld International Airport"},
{ value: "DRS", text: "Dresden Airport"},
{ value: "FRA", text: "Frankfurt am Main International Airport"},
{ value: "FMO", text: "Münster Osnabrück Airport"},
{ value: "HAM", text: "Hamburg Airport"},
{ value: "CGN", text: "Cologne Bonn Airport"},
{ value: "DUS", text: "Düsseldorf International Airport"},
{ value: "MUC", text: "Munich International Airport"},
{ value: "NUE", text: "Nuremberg Airport"},
{ value: "LEJ", text: "Leipzig Halle Airport"},
{ value: "STR", text: "Stuttgart Airport"},
{ value: "TXL", text: "Berlin-Tegel International Airport"},
{ value: "HAJ", text: "Hannover Airport"},
{ value: "BRE", text: "Bremen Airport"},
{ value: "DTM", text: "Dortmund Airport"},
{ value: "FKB", text: "Karlsruhe Baden-Baden Airport"},
{ value: "TLL", text: "Tallinn Airport"},
{ value: "HEL", text: "Helsinki Vantaa Airport"},
{ value: "BFS", text: "Belfast International Airport"},
{ value: "BHD", text: "George Best Belfast City Airport"},
{ value: "BHX", text: "Birmingham International Airport"},
{ value: "MAN", text: "Manchester Airport"},
{ value: "DSA", text: "Robin Hood Doncaster Sheffield Airport"},
{ value: "CWL", text: "Cardiff International Airport"},
{ value: "BRS", text: "Bristol International Airport"},
{ value: "LPL", text: "Liverpool John Lennon Airport"},
{ value: "LTN", text: "London Luton Airport"},
{ value: "BOH", text: "Bournemouth Airport"},
{ value: "SOU", text: "Southampton Airport"},
{ value: "LGW", text: "London Gatwick Airport"},
{ value: "LCY", text: "London City Airport"},
{ value: "LHR", text: "London Heathrow Airport"},
{ value: "LBA", text: "Leeds Bradford Airport"},
{ value: "NCL", text: "Newcastle Airport"},
{ value: "EMA", text: "East Midlands Airport"},
{ value: "ABZ", text: "Aberdeen Dyce Airport"},
{ value: "GLA", text: "Glasgow International Airport"},
{ value: "EDI", text: "Edinburgh Airport"},
{ value: "NWI", text: "Norwich International Airport"},
{ value: "STN", text: "London Stansted Airport"},
{ value: "EXT", text: "Exeter International Airport"},
{ value: "LKZ", text: "RAF Lakenheath"},
{ value: "MHZ", text: "RAF Mildenhall"},
{ value: "FFD", text: "RAF Fairford"},
{ value: "BZZ", text: "RAF Brize Norton"},
{ value: "AMS", text: "Amsterdam Airport Schiphol"},
{ value: "MST", text: "Maastricht Aachen Airport"},
{ value: "EIN", text: "Eindhoven Airport"},
{ value: "ORK", text: "Cork Airport"},
{ value: "DUB", text: "Dublin Airport"},
{ value: "SNN", text: "Shannon Airport"},
{ value: "BLL", text: "Billund Airport"},
{ value: "CPH", text: "Copenhagen Kastrup Airport"},
{ value: "AAL", text: "Aalborg Airport"},
{ value: "LUX", text: "Luxembourg-Findel International Airport"},
{ value: "BOO", text: "Bodø Airport"},
{ value: "ENBR", text: "Bergen Airport"},
{ value: "OSL", text: "Oslo Gardermoen Airport"},
{ value: "TOS", text: "Tromsø Airport"},
{ value: "ENVA", text: "Trondheim Airport"},
{ value: "ENZV", text: "Stavanger Airport"},
{ value: "GDN", text: "Gdańsk Lech Wałęsa Airport"},
{ value: "KRK", text: "John Paul II International Airport Kraków-Balice Airport"},
{ value: "KTW", text: "Katowice International Airport"},
{ value: "WMI", text: "Modlin Airport"},
{ value: "POZ", text: "Poznań-Ławica Airport"},
{ value: "WAW", text: "Warsaw Chopin Airport"},
{ value: "WRO", text: "Copernicus Wrocław Airport"},
{ value: "GOT", text: "Gothenburg-Landvetter Airport"},
{ value: "MMX", text: "Malmö Sturup Airport"},
{ value: "LLA", text: "Luleå Airport"},
{ value: "ARN", text: "Stockholm-Arlanda Airport"},
{ value: "RMS", text: "Ramstein Air Base"},
{ value: "RIX", text: "Riga International Airport"},
{ value: "VNO", text: "Vilnius International Airport"},
{ value: "CPT", text: "Cape Town International Airport"},
{ value: "GRJ", text: "George Airport"},
{ value: "JNB", text: "OR Tambo International Airport"},
{ value: "DUR", text: "King Shaka International Airport"},
{ value: "LPA", text: "Gran Canaria Airport"},
{ value: "TFS", text: "Tenerife South Airport"},
{ value: "TFN", text: "Tenerife Norte Airport"},
{ value: "CMN", text: "Mohammed V International Airport"},
{ value: "DKR", text: "Léopold Sédar Senghor International Airport"},
{ value: "ADD", text: "Addis Ababa Bole International Airport"},
{ value: "CAI", text: "Cairo International Airport"},
{ value: "HRG", text: "Hurghada International Airport"},
{ value: "NBO", text: "Jomo Kenyatta International Airport"},
{ value: "MBA", text: "Mombasa Moi International Airport"},
{ value: "TIP", text: "Tripoli International Airport"},
{ value: "JUB", text: "Juba International Airport"},
{ value: "KRT", text: "Khartoum International Airport"},
{ value: "KNO", text: "Medan/Kuala Namu International Airport"},
{ value: "ABQ", text: "Albuquerque International Sunport Airport"},
{ value: "ADW", text: "Andrews Air Force Base"},
{ value: "AFW", text: "Fort Worth Alliance Airport"},
{ value: "AGS", text: "Augusta Regional At Bush Field"},
{ value: "AMA", text: "Rick Husband Amarillo International Airport"},
{ value: "ATL", text: "Hartsfield Jackson Atlanta International Airport"},
{ value: "AUS", text: "Austin Bergstrom International Airport"},
{ value: "AVL", text: "Asheville Regional Airport"},
{ value: "BAB", text: "Beale Air Force Base"},
{ value: "BAD", text: "Barksdale Air Force Base"},
{ value: "BDL", text: "Bradley International Airport"},
{ value: "BFI", text: "Boeing Field King County International Airport"},
{ value: "BGR", text: "Bangor International Airport"},
{ value: "BHM", text: "Birmingham-Shuttlesworth International Airport"},
{ value: "BIL", text: "Billings Logan International Airport"},
{ value: "BLV", text: "Scott AFB/Midamerica Airport"},
{ value: "BMI", text: "Central Illinois Regional Airport at Bloomington-Normal"},
{ value: "BNA", text: "Nashville International Airport"},
{ value: "BOI", text: "Boise Air Terminal/Gowen field"},
{ value: "BOS", text: "General Edward Lawrence Logan International Airport"},
{ value: "KBTR", text: "Baton Rouge Metropolitan"},
{ value: "BUF", text: "Buffalo Niagara International Airport"},
{ value: "BWI", text: "Baltimore/Washington International Thurgood Marshall Airport"},
{ value: "CAE", text: "Columbia Metropolitan Airport"},
{ value: "CBM", text: "Columbus Air Force Base"},
{ value: "CHA", text: "Lovell Field"},
{ value: "CHS", text: "Charleston Air Force Base-International Airport"},
{ value: "CID", text: "The Eastern Iowa Airport"},
{ value: "CLE", text: "Cleveland Hopkins International Airport"},
{ value: "CLT", text: "Charlotte Douglas International Airport"},
{ value: "CMH", text: "Port Columbus International Airport"},
{ value: "COS", text: "City of Colorado Springs Municipal Airport"},
{ value: "CPR", text: "Casper-Natrona County International Airport"},
{ value: "CRP", text: "Corpus Christi International Airport"},
{ value: "CRW", text: "Yeager Airport"},
{ value: "CVG", text: "Cincinnati Northern Kentucky International Airport"},
{ value: "CVS", text: "Cannon Air Force Base"},
{ value: "DAL", text: "Dallas Love Field"},
{ value: "DAY", text: "James M Cox Dayton International Airport"},
{ value: "DBQ", text: "Dubuque Regional Airport"},
{ value: "DCA", text: "Ronald Reagan Washington National Airport"},
{ value: "DEN", text: "Denver International Airport"},
{ value: "DFW", text: "Dallas Fort Worth International Airport"},
{ value: "DLF", text: "Laughlin Air Force Base"},
{ value: "DLH", text: "Duluth International Airport"},
{ value: "DOV", text: "Dover Air Force Base"},
{ value: "DSM", text: "Des Moines International Airport"},
{ value: "DTW", text: "Detroit Metropolitan Wayne County Airport"},
{ value: "DYS", text: "Dyess Air Force Base"},
{ value: "END", text: "Vance Air Force Base"},
{ value: "ERI", text: "Erie International Tom Ridge Field"},
{ value: "EWR", text: "Newark Liberty International Airport"},
{ value: "FFO", text: "Wright-Patterson Air Force Base"},
{ value: "FLL", text: "Fort Lauderdale Hollywood International Airport"},
{ value: "FSM", text: "Fort Smith Regional Airport"},
{ value: "FTW", text: "Fort Worth Meacham International Airport"},
{ value: "FWA", text: "Fort Wayne International Airport"},
{ value: "GEG", text: "Spokane International Airport"},
{ value: "GPT", text: "Gulfport Biloxi International Airport"},
{ value: "GRB", text: "Austin Straubel International Airport"},
{ value: "GSB", text: "Seymour Johnson Air Force Base"},
{ value: "GSO", text: "Piedmont Triad International Airport"},
{ value: "GSP", text: "Greenville Spartanburg International Airport"},
{ value: "GUS", text: "Grissom Air Reserve Base"},
{ value: "HIB", text: "Range Regional Airport"},
{ value: "HMN", text: "Holloman Air Force Base"},
{ value: "HOU", text: "William P Hobby Airport"},
{ value: "HSV", text: "Huntsville International Carl T Jones Field"},
{ value: "HTS", text: "Tri-State/Milton J. Ferguson Field"},
{ value: "IAD", text: "Washington Dulles International Airport"},
{ value: "IAH", text: "George Bush Intercontinental Houston Airport"},
{ value: "ICT", text: "Wichita Mid Continent Airport"},
{ value: "IND", text: "Indianapolis International Airport"},
{ value: "JAN", text: "Jackson-Medgar Wiley Evers International Airport"},
{ value: "JAX", text: "Jacksonville International Airport"},
{ value: "JFK", text: "John F Kennedy International Airport"},
{ value: "JLN", text: "Joplin Regional Airport"},
{ value: "LAS", text: "McCarran International Airport"},
{ value: "LAX", text: "Los Angeles International Airport"},
{ value: "LBB", text: "Lubbock Preston Smith International Airport"},
{ value: "LCK", text: "Rickenbacker International Airport"},
{ value: "LEX", text: "Blue Grass Airport"},
{ value: "LFI", text: "Langley Air Force Base"},
{ value: "LFT", text: "Lafayette Regional Airport"},
{ value: "LGA", text: "La Guardia Airport"},
{ value: "LIT", text: "Bill & Hillary Clinton National Airport/Adams Field"},
{ value: "LTS", text: "Altus Air Force Base"},
{ value: "LUF", text: "Luke Air Force Base"},
{ value: "MBS", text: "MBS International Airport"},
{ value: "MCI", text: "Kansas City International Airport"},
{ value: "MCO", text: "Orlando International Airport"},
{ value: "MDW", text: "Chicago Midway International Airport"},
{ value: "MEM", text: "Memphis International Airport"},
{ value: "MGM", text: "Montgomery Regional (Dannelly Field) Airport"},
{ value: "MHT", text: "Manchester Airport"},
{ value: "MIA", text: "Miami International Airport"},
{ value: "MKE", text: "General Mitchell International Airport"},
{ value: "MLI", text: "Quad City International Airport"},
{ value: "MLU", text: "Monroe Regional Airport"},
{ value: "MOB", text: "Mobile Regional Airport"},
{ value: "MSN", text: "Dane County Regional Truax Field"},
{ value: "MSP", text: "Minneapolis-St Paul International/Wold-Chamberlain Airport"},
{ value: "MSY", text: "Louis Armstrong New Orleans International Airport"},
{ value: "OAK", text: "Metropolitan Oakland International Airport"},
{ value: "OKC", text: "Will Rogers World Airport"},
{ value: "ONT", text: "Ontario International Airport"},
{ value: "ORD", text: "Chicago O'Hare International Airport"},
{ value: "ORF", text: "Norfolk International Airport"},
{ value: "PAM", text: "Tyndall Air Force Base"},
{ value: "PBI", text: "Palm Beach International Airport"},
{ value: "PDX", text: "Portland International Airport"},
{ value: "PHF", text: "Newport News Williamsburg International Airport"},
{ value: "PHL", text: "Philadelphia International Airport"},
{ value: "PHX", text: "Phoenix Sky Harbor International Airport"},
{ value: "PIA", text: "General Wayne A. Downing Peoria International Airport"},
{ value: "PIT", text: "Pittsburgh International Airport"},
{ value: "PWM", text: "Portland International Jetport Airport"},
{ value: "RDU", text: "Raleigh Durham International Airport"},
{ value: "RFD", text: "Chicago Rockford International Airport"},
{ value: "RIC", text: "Richmond International Airport"},
{ value: "RNO", text: "Reno Tahoe International Airport"},
{ value: "ROA", text: "Roanoke–Blacksburg Regional Airport"},
{ value: "ROC", text: "Greater Rochester International Airport"},
{ value: "RST", text: "Rochester International Airport"},
{ value: "RSW", text: "Southwest Florida International Airport"},
{ value: "SAN", text: "San Diego International Airport"},
{ value: "SAT", text: "San Antonio International Airport"},
{ value: "SAV", text: "Savannah Hilton Head International Airport"},
{ value: "SBN", text: "South Bend Regional Airport"},
{ value: "SDF", text: "Louisville International Standiford Field"},
{ value: "SEA", text: "Seattle Tacoma International Airport"},
{ value: "SFB", text: "Orlando Sanford International Airport"},
{ value: "SFO", text: "San Francisco International Airport"},
{ value: "SGF", text: "Springfield Branson National Airport"},
{ value: "SHV", text: "Shreveport Regional Airport"},
{ value: "SJC", text: "Norman Y. Mineta San Jose International Airport"},
{ value: "SKA", text: "Fairchild Air Force Base"},
{ value: "SLC", text: "Salt Lake City International Airport"},
{ value: "SMF", text: "Sacramento International Airport"},
{ value: "SNA", text: "John Wayne Airport-Orange County Airport"},
{ value: "SPI", text: "Abraham Lincoln Capital Airport"},
{ value: "SPS", text: "Sheppard Air Force Base-Wichita Falls Municipal Airport"},
{ value: "SRQ", text: "Sarasota Bradenton International Airport"},
{ value: "STL", text: "Lambert St Louis International Airport"},
{ value: "SUX", text: "Sioux Gateway Col. Bud Day Field"},
{ value: "SYR", text: "Syracuse Hancock International Airport"},
{ value: "TCM", text: "McChord Air Force Base"},
{ value: "TLH", text: "Tallahassee Regional Airport"},
{ value: "TOL", text: "Toledo Express Airport"},
{ value: "TPA", text: "Tampa International Airport"},
{ value: "TRI", text: "Tri Cities Regional Tn Va Airport"},
{ value: "TUL", text: "Tulsa International Airport"},
{ value: "TUS", text: "Tucson International Airport"},
{ value: "TYS", text: "McGhee Tyson Airport"},
{ value: "VBG", text: "Vandenberg Air Force Base"},
{ value: "VPS", text: "Eglin Air Force Base"},
{ value: "WRB", text: "Robins Air Force Base"},
{ value: "TIA", text: "Tirana International Airport Mother Teresa"},
{ value: "BOJ", text: "Burgas Airport"},
{ value: "PDV", text: "Plovdiv International Airport"},
{ value: "SOF", text: "Sofia Airport"},
{ value: "VAR", text: "Varna Airport"},
{ value: "LCA", text: "Larnaca International Airport"},
{ value: "PFO", text: "Paphos International Airport"},
{ value: "ZAG", text: "Zagreb Airport"},
{ value: "ALC", text: "Alicante International Airport"},
{ value: "BCN", text: "Barcelona International Airport"},
{ value: "MAD", text: "Adolfo Suárez Madrid–Barajas Airport"},
{ value: "AGP", text: "Málaga Airport"},
{ value: "PMI", text: "Palma De Mallorca Airport"},
{ value: "SCQ", text: "Santiago de Compostela Airport"},
{ value: "BOD", text: "Bordeaux-Mérignac Airport"},
{ value: "TLS", text: "Toulouse-Blagnac Airport"},
{ value: "MRS", text: "Marseille Provence Airport"},
{ value: "NCE", text: "Nice-Côte d'Azur Airport"},
{ value: "CDG", text: "Charles de Gaulle International Airport"},
{ value: "ORY", text: "Paris-Orly Airport"},
{ value: "BSL", text: "EuroAirport Basel-Mulhouse-Freiburg Airport"},
{ value: "ATH", text: "Eleftherios Venizelos International Airport"},
{ value: "HER", text: "Heraklion International Nikos Kazantzakis Airport"},
{ value: "SKG", text: "Thessaloniki Macedonia International Airport"},
{ value: "BUD", text: "Budapest Ferenc Liszt International Airport"},
{ value: "BRI", text: "Bari Karol Wojtyła Airport"},
{ value: "CTA", text: "Catania-Fontanarossa Airport"},
{ value: "PMO", text: "Falcone–Borsellino Airport"},
{ value: "CAG", text: "Cagliari Elmas Airport"},
{ value: "MXP", text: "Malpensa International Airport"},
{ value: "BGY", text: "Il Caravaggio International Airport"},
{ value: "TRN", text: "Turin Airport"},
{ value: "GOA", text: "Genoa Cristoforo Colombo Airport"},
{ value: "LIN", text: "Linate Airport"},
{ value: "CUF", text: "Cuneo International Airport"},
{ value: "BLQ", text: "Bologna Guglielmo Marconi Airport"},
{ value: "TSF", text: "Treviso-Sant'Angelo Airport"},
{ value: "VRN", text: "Verona Villafranca Airport"},
{ value: "VCE", text: "Venice Marco Polo Airport"},
{ value: "CIA", text: "Ciampino–G. B. Pastine International Airport"},
{ value: "FCO", text: "Leonardo da Vinci–Fiumicino Airport"},
{ value: "NAP", text: "Naples International Airport"},
{ value: "PSA", text: "Pisa International Airport"},
{ value: "LJU", text: "Ljubljana Jože Pučnik Airport"},
{ value: "PRG", text: "Ruzyně International Airport"},
{ value: "TLV", text: "Ben Gurion International Airport"},
{ value: "VDA", text: "Ovda International Airport"},
{ value: "MLA", text: "Malta International Airport"},
{ value: "VIE", text: "Vienna International Airport"},
{ value: "FAO", text: "Faro Airport"},
{ value: "TER", text: "Lajes Field"},
{ value: "PDL", text: "João Paulo II Airport"},
{ value: "OPO", text: "Francisco de Sá Carneiro Airport"},
{ value: "LIS", text: "Lisbon Portela Airport"},
{ value: "SJJ", text: "Sarajevo International Airport"},
{ value: "OTP", text: "Henri Coandă International Airport"},
{ value: "GVA", text: "Geneva Cointrin International Airport"},
{ value: "ZRH", text: "Zürich Airport"},
{ value: "ESB", text: "Esenboğa International Airport"},
{ value: "ADA", text: "Adana Airport"},
{ value: "AYT", text: "Antalya International Airport"},
{ value: "GZT", text: "Gaziantep International Airport"},
{ value: "NAV", text: "Nevşehir Kapadokya International Airport"},
{ value: "IST", text: "Atatürk International Airport"},
{ value: "ADB", text: "Adnan Menderes International Airport"},
{ value: "DLM", text: "Dalaman International Airport"},
{ value: "ERZ", text: "Erzurum International Airport"},
{ value: "TZX", text: "Trabzon International Airport"},
{ value: "ISE", text: "Süleyman Demirel International Airport"},
{ value: "BJV", text: "Milas Bodrum International Airport"},
{ value: "SAW", text: "Sabiha Gökçen International Airport"},
{ value: "BEG", text: "Belgrade Nikola Tesla Airport"},
{ value: "TGD", text: "Podgorica Airport"},
{ value: "BTS", text: "M. R. Štefánik Airport"},
{ value: "PUJ", text: "Punta Cana International Airport"},
{ value: "SDQ", text: "Las Américas International Airport"},
{ value: "KIN", text: "Norman Manley International Airport"},
{ value: "ACA", text: "General Juan N Alvarez International Airport"},
{ value: "GDL", text: "Don Miguel Hidalgo Y Costilla International Airport"},
{ value: "HMO", text: "General Ignacio P. Garcia International Airport"},
{ value: "MEX", text: "Licenciado Benito Juarez International Airport"},
{ value: "MTY", text: "General Mariano Escobedo International Airport"},
{ value: "PVR", text: "Licenciado Gustavo Díaz Ordaz International Airport"},
{ value: "SJD", text: "Los Cabos International Airport"},
{ value: "TIJ", text: "General Abelardo L. Rodríguez International Airport"},
{ value: "CUN", text: "Cancún International Airport"},
{ value: "PTY", text: "Tocumen International Airport"},
{ value: "HAV", text: "José Martí International Airport"},
{ value: "VRA", text: "Juan Gualberto Gomez International Airport"},
{ value: "GCM", text: "Owen Roberts International Airport"},
{ value: "NAS", text: "Lynden Pindling International Airport"},
{ value: "BZE", text: "Philip S. W. Goldson International Airport"},
{ value: "RAR", text: "Rarotonga International Airport"},
{ value: "AKL", text: "Auckland International Airport"},
{ value: "CHC", text: "Christchurch International Airport"},
{ value: "WLG", text: "Wellington International Airport"},
{ value: "BAH", text: "Bahrain International Airport"},
{ value: "DMM", text: "King Fahd International Airport"},
{ value: "DHA", text: "King Abdulaziz Air Base"},
{ value: "JED", text: "King Abdulaziz International Airport"},
{ value: "MED", text: "Prince Mohammad Bin Abdulaziz Airport"},
{ value: "RUH", text: "King Khaled International Airport"},
{ value: "IKA", text: "Imam Khomeini International Airport"},
{ value: "THR", text: "Mehrabad International Airport"},
{ value: "MHD", text: "Mashhad International Airport"},
{ value: "SYZ", text: "Shiraz Shahid Dastghaib International Airport"},
{ value: "TBZ", text: "Tabriz International Airport"},
{ value: "AMM", text: "Queen Alia International Airport"},
{ value: "KWI", text: "Kuwait International Airport"},
{ value: "BEY", text: "Beirut Rafic Hariri International Airport"},
{ value: "JNJ", text: "Duqm Jaaluni Airport"},
{ value: "AUH", text: "Abu Dhabi International Airport"},
{ value: "DXB", text: "Dubai International Airport"},
{ value: "DWC", text: "Al Maktoum International Airport"},
{ value: "SHJ", text: "Sharjah International Airport"},
{ value: "MCT", text: "Muscat International Airport"},
{ value: "ISB", text: "Benazir Bhutto International Airport"},
{ value: "SKT", text: "Sialkot Airport"},
{ value: "BGW", text: "Baghdad International Airport"},
{ value: "BSR", text: "Basrah International Airport"},
{ value: "ALP", text: "Aleppo International Airport"},
{ value: "DAM", text: "Damascus International Airport"},
{ value: "LTK", text: "Bassel Al-Assad International Airport"},
{ value: "FAI", text: "Fairbanks International Airport"},
{ value: "ANC", text: "Ted Stevens Anchorage International Airport"},
{ value: "PGUM", text: "Antonio B. Won Pat International Airport"},
{ value: "CGY", text: "Laguindingan Airport"},
{ value: "HNL", text: "Honolulu International Airport"},
{ value: "DOH", text: "Hamad International Airport"},
{ value: "KNH", text: "Kinmen Airport"},
{ value: "KHH", text: "Kaohsiung International Airport"},
{ value: "TPE", text: "Taiwan Taoyuan International Airport"},
{ value: "NRT", text: "Narita International Airport"},
{ value: "KIX", text: "Kansai International Airport"},
{ value: "CTS", text: "New Chitose Airport"},
{ value: "FUK", text: "Fukuoka Airport"},
{ value: "KOJ", text: "Kagoshima Airport"},
{ value: "NGO", text: "Chubu Centrair International Airport"},
{ value: "FSZ", text: "Mt. Fuji Shizuoka Airport"},
{ value: "ITM", text: "Osaka International Airport"},
{ value: "HND", text: "Tokyo International Airport"},
{ value: "OKO", text: "Yokota Air Base"},
{ value: "MWX", text: "Muan International Airport"},
{ value: "KUV", text: "Kunsan Air Base"},
{ value: "CJU", text: "Jeju International Airport"},
{ value: "PUS", text: "Gimhae International Airport"},
{ value: "ICN", text: "Incheon International Airport"},
{ value: "OSN", text: "Osan Air Base"},
{ value: "GMP", text: "Gimpo International Airport"},
{ value: "CJJ", text: "Cheongju International Airport"},
{ value: "OKA", text: "Naha Airport"},
{ value: "DNA", text: "Kadena Air Base"},
{ value: "CRK", text: "Clark International Airport"},
{ value: "MNL", text: "Ninoy Aquino International Airport"},
{ value: "DVO", text: "Francisco Bangoy International Airport"},
{ value: "CEB", text: "Mactan Cebu International Airport"},
{ value: "GRV", text: "Grozny North Airport"},
{ value: "EZE", text: "Ministro Pistarini International Airport"},
{ value: "BEL", text: "Val de Cans/Júlio Cezar Ribeiro International Airport"},
{ value: "BSB", text: "Presidente Juscelino Kubistschek International Airport"},
{ value: "CNF", text: "Tancredo Neves International Airport"},
{ value: "CWB", text: "Afonso Pena Airport"},
{ value: "FLN", text: "Hercílio Luz International Airport"},
{ value: "GIG", text: "RIOgaleão – Tom Jobim International Airport"},
{ value: "GRU", text: "Guarulhos - Governador André Franco Montoro International Airport"},
{ value: "NAT", text: "Governador Aluízio Alves International Airport"},
{ value: "CGH", text: "Congonhas Airport"},
{ value: "SSA", text: "Deputado Luiz Eduardo Magalhães International Airport"},
{ value: "SCL", text: "Comodoro Arturo Merino Benítez International Airport"},
{ value: "LTX", text: "Cotopaxi International Airport"},
{ value: "UIO", text: "Mariscal Sucre International Airport"},
{ value: "BOG", text: "El Dorado International Airport"},
{ value: "LIM", text: "Jorge Chávez International Airport"},
{ value: "CUZ", text: "Alejandro Velasco Astete International Airport"},
{ value: "MVD", text: "Carrasco International /General C L Berisso Airport"},
{ value: "SJU", text: "Luis Munoz Marin International Airport"},
{ value: "NBE", text: "Enfidha - Hammamet International Airport"},
{ value: "SXM", text: "Princess Juliana International Airport"},
{ value: "ALA", text: "Almaty Airport"},
{ value: "TSE", text: "Astana International Airport"},
{ value: "FRU", text: "Manas International Airport"},
{ value: "KGF", text: "Sary-Arka Airport"},
{ value: "GYD", text: "Heydar Aliyev International Airport"},
{ value: "EVN", text: "Zvartnots International Airport"},
{ value: "TBS", text: "Tbilisi International Airport"},
{ value: "KBP", text: "Boryspil International Airport"},
{ value: "DOK", text: "Donetsk International Airport"},
{ value: "SIP", text: "Simferopol International Airport"},
{ value: "HRK", text: "Kharkiv International Airport"},
{ value: "ODS", text: "Odessa International Airport"},
{ value: "LED", text: "Pulkovo Airport"},
{ value: "MSQ", text: "Minsk International Airport"},
{ value: "KJA", text: "Yemelyanovo Airport"},
{ value: "AER", text: "Sochi International Airport"},
{ value: "SVX", text: "Koltsovo Airport"},
{ value: "TAS", text: "Tashkent International Airport"},
{ value: "DME", text: "Domodedovo International Airport"},
{ value: "SVO", text: "Sheremetyevo International Airport"},
{ value: "CKL", text: "Chkalovskiy Airport"},
{ value: "VKO", text: "Vnukovo International Airport"},
{ value: "UFA", text: "Ufa International Airport"},
{ value: "KUF", text: "Kurumoch International Airport"},
{ value: "BOM", text: "Chhatrapati Shivaji International Airport"},
{ value: "GOI", text: "Dabolim Airport"},
{ value: "CMB", text: "Bandaranaike International Colombo Airport"},
{ value: "HRI", text: "Mattala Rajapaksa International Airport"},
{ value: "PNH", text: "Phnom Penh International Airport"},
{ value: "REP", text: "Siem Reap International Airport"},
{ value: "CCU", text: "Netaji Subhash Chandra Bose International Airport"},
{ value: "HKG", text: "Chek Lap Kok International Airport"},
{ value: "ATQ", text: "Sri Guru Ram Dass Jee International Airport"},
{ value: "DEL", text: "Indira Gandhi International Airport"},
{ value: "SLV", text: "Shimla Airport"},
{ value: "MFM", text: "Macau International Airport"},
{ value: "BLR", text: "Bengaluru International Airport"},
{ value: "COK", text: "Cochin International Airport"},
{ value: "CCJ", text: "Calicut International Airport"},
{ value: "HYD", text: "Rajiv Gandhi International Airport"},
{ value: "MAA", text: "Chennai International Airport"},
{ value: "TRV", text: "Trivandrum International Airport"},
{ value: "MLE", text: "Malé International Airport"},
{ value: "DMK", text: "Don Mueang International Airport"},
{ value: "BKK", text: "Suvarnabhumi Airport"},
{ value: "CNX", text: "Chiang Mai International Airport"},
{ value: "DAD", text: "Da Nang International Airport"},
{ value: "HAN", text: "Noi Bai International Airport"},
{ value: "SGN", text: "Tan Son Nhat International Airport"},
{ value: "MDL", text: "Mandalay International Airport"},
{ value: "RGN", text: "Yangon International Airport"},
{ value: "UPG", text: "Hasanuddin International Airport"},
{ value: "DPS", text: "Ngurah Rai (Bali) International Airport"},
{ value: "SUB", text: "Juanda International Airport"},
{ value: "BWN", text: "Brunei International Airport"},
{ value: "CGK", text: "Soekarno-Hatta International Airport"},
{ value: "KUL", text: "Kuala Lumpur International Airport"},
{ value: "SIN", text: "Singapore Changi International Airport"},
{ value: "BNE", text: "Brisbane International Airport"},
{ value: "MEL", text: "Melbourne International Airport"},
{ value: "PER", text: "Perth International Airport"},
{ value: "CBR", text: "Canberra International Airport"},
{ value: "SYD", text: "Sydney Kingsford Smith International Airport"},
{ value: "PEK", text: "Beijing Capital International Airport"},
{ value: "NAY", text: "Beijing Nanyuan Airport"},
{ value: "TSN", text: "Tianjin Binhai International Airport"},
{ value: "TYN", text: "Taiyuan Wusu Airport"},
{ value: "CAN", text: "Guangzhou Baiyun International Airport"},
{ value: "CSX", text: "Changsha Huanghua International Airport"},
{ value: "KWL", text: "Guilin Liangjiang International Airport"},
{ value: "NNG", text: "Nanning Wuxu Airport"},
{ value: "SZX", text: "Shenzhen Bao'an International Airport"},
{ value: "CGO", text: "Zhengzhou Xinzheng International Airport"},
{ value: "WUH", text: "Wuhan Tianhe International Airport"},
{ value: "HAK", text: "Haikou Meilan International Airport"},
{ value: "SYX", text: "Sanya Phoenix International Airport"},
{ value: "XIY", text: "Xi'an Xianyang International Airport"},
{ value: "KMG", text: "Kunming Wujiaba International Airport"},
{ value: "XMN", text: "Xiamen Gaoqi International Airport"},
{ value: "FOC", text: "Fuzhou Changle International Airport"},
{ value: "HGH", text: "Hangzhou Xiaoshan International Airport"},
{ value: "TNA", text: "Yaoqiang Airport"},
{ value: "NGB", text: "Ningbo Lishe International Airport"},
{ value: "NKG", text: "Nanjing Lukou Airport"},
{ value: "PVG", text: "Shanghai Pudong International Airport"},
{ value: "SHA", text: "Shanghai Hongqiao International Airport"},
{ value: "WNZ", text: "Wenzhou Yongqiang Airport"},
{ value: "CKG", text: "Chongqing Jiangbei International Airport"},
{ value: "KWE", text: "Longdongbao Airport"},
{ value: "CTU", text: "Chengdu Shuangliu International Airport"},
{ value: "URC", text: "Ürümqi Diwopu International Airport"},
{ value: "HRB", text: "Taiping Airport"},
{ value: "DLC", text: "Zhoushuizi Airport"},
{ value: "SHE", text: "Taoxian Airport"}

];