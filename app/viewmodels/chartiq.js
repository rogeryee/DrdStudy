define(['jquery'],function($){

function ChartIQ() {

var self = this;
this.attached = function() {

console.log("chartiq");

try{
			// Declare a STXChart object. This is the main object for drawing charts
			// var stxx = new STXChart($$("chartContainer"));
			var container = $("#chartContainer")[0];
			var stxx = new STXChart(container);

			/*
			 * Modify the components in this function to establish the behavior of your UI.
			 */
			function initialize() {
				STXThemeManager.builtInThemes = {
					"Light": "css/chart-iq/stx-demo-theme-1.css",
					"Dark": "css/chart-iq/stx-demo-theme-2.css"
				};
				// Set up menu manager
				STXMenuManager.makeMenus();
				STXMenuManager.registerChart(stxx);
				//STXThemeManager.setThemes({enabledTheme: 'Light'}, stxx);

				//STXDrawingToolbar.initialize();
				//STXDrawingToolbar.setVectorType(stxx, null);

				STXTimeZoneWidget.initialize(STXStorageManager.get("timezone"), STXStorageManager.callbacker("timezone"));

				var config = {
					input: $$$("#symbol"),
					textCallback: '', // If you don't have a symbol lookup then just leave this blank
					selectCallback: '',
					filters: ["ALL", "STOCKS", "FOREX", "INDEXES"] // Change these filters to the security types that you support
				};
			}

			function prependHeadsUpHR() {
				if ($$("huOpen")) {
					var tick = Math.floor((STXChart.crosshairX - this.chart.left) / this.layout.candleWidth);
					var prices = this.chart.xaxis[tick];
					$$("huOpen").innerHTML = "";
					$$("huClose").innerHTML = "";
					$$("huHigh").innerHTML = "";
					$$("huLow").innerHTML = "";
					$$("huVolume").innerHTML = "";
					if (prices != null) {
						if (prices.data) {
							$$("huOpen").innerHTML = this.formatPrice(prices.data.Open);
							$$("huClose").innerHTML = this.formatPrice(prices.data.Close);
							$$("huHigh").innerHTML = this.formatPrice(prices.data.High);
							$$("huLow").innerHTML = this.formatPrice(prices.data.Low);
							$$("huVolume").innerHTML = condenseInt(prices.data.Volume);
						}
					}
				}
			}

			STXChart.prototype.prepend("headsUpHR", prependHeadsUpHR);


			function resizeContainers() {
				if (STX.ipad && STX.isIOS7) {
					// IOS7 bug in landscape mode doesn't report the pageHeight correctly. The fix is to fix the height
					// in css and then adjust the body height to the new size
					STX.appendClassName($$$("html"), "ipad ios7");
					$$$("body").style.height = pageHeight() + "px";
				}

				var chartContainer = $$("chartContainer");
				var chartArea = $$$(".stx-chartArea");
				var sidePanel = $$$(".stx-panel-side");
				var panelWidth = 0;
				if (sidePanel && sidePanel.offsetLeft) {
					panelWidth = chartArea.clientWidth - sidePanel.offsetLeft;
				}

				chartContainer.style.width = (chartArea.clientWidth - panelWidth) + "px";

				var bottomMargin = 0;
				if ($$$(".stx-footer")) bottomMargin = $$$(".stx-footer").clientHeight;

				chartContainer.style.height = (pageHeight() - getPos(chartContainer).y - bottomMargin) + "px";
				chartArea.style.height = (pageHeight() - getPos(chartArea).y - bottomMargin) + "px";

				if (stxx && stxx.chart.canvas != null) {
					stxx.resizeChart();
				}
			}

			function toggleFullScreenMode() {
				var wrapper = $$$(".stx-wrapper");
				if (window.fullScreenMode) {
					var rightSide = stxx.chart.maxTicks - stxx.chart.scroll;
					wrapper.style.position = null;
					wrapper.style.left = null;
					wrapper.style.top = null;
					wrapper.style.width = null;
					var chartContainer = $$("chartContainer");
					var chartArea = $$$(".stx-chartArea");
					chartContainer.style.height = null;
					chartContainer.style.width = null;
					chartArea.style.height = null;
					stxx.resizeChart();
					stxx.chart.scroll = stxx.chart.maxTicks - rightSide;
					stxx.draw();
				} else {
					// stx-wrapper must be at the body level of the page for full screen to work
					// and it must have a z-index greater than anything else on the page
					wrapper.style.position = "absolute";
					wrapper.style.left = "0px";
					wrapper.style.top = "0px";
					wrapper.style.width = "100%";
					resizeContainers();
					stxx.resizeChart();
					stxx.draw();
				}
				window.fullScreenMode = !window.fullScreenMode;
			}

			function resizeScreen() {
				if (stxx && stxx.chart.canvas != null) {
					if (window.fullScreenMode) {
						resizeContainers();
					} else {
						stxx.resizeChart();
					}
				}
			}

			function toggleCrosshairs() {
				stxx.layout.crosshair = true;
				stxx.changeOccurred('layout');
				stxx.doDisplayCrosshairs();
				stxx.draw();
				//may cause problem here
				//setTimeout(function () {
				//	stxx.resizeChart();
				//}, 100);
			}

			function displayChart() {
				var symbol = "SPY1";
				fetchMyData(symbol, "day", function (data) {
					stxx.newChart(symbol, data);
					stxx.setPeriodicityV2(1, "day");
					updateChartLoop();
				});

			}

			window.onresize = resizeScreen;
			
			initialize();

			var res = [];
			var datum = {};
			datum['Adj_Close'] = '27.90';
			datum['Close'] = '30.20';
			datum['Date'] = '2014-12-29';
			datum['High'] = '31.23';
			datum['Low'] = '26.52';
			datum['Open'] = '28.00';
			datum['Volume'] = '100000';
			res.push(datum);
				
			stxx.newChart('BABA', res);

			toggleCrosshairs();

			console.log("chartiq complete.");
}
catch(e){
	console.log(e);
}
}
}
	return ChartIQ;

})


