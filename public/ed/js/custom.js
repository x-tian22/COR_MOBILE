function get_chart_data()
{
    $.post("load_chart", {year: $("#year").val(), month: $("#month").val()}, function(data) {
        data = $.parseJSON(data);

        $(".rate").find("span.ac").text(parseFloat(data.rate));
        $(".total_actual_calls").find("span#txdata").text(parseFloat(data.rate));
        $(".rate").find("span.pc").text(parseFloat(data.target));
        $(".planned_calls").find("span#txdata").text(parseFloat(data.target));
        $(".reach").find("span.ac").text(parseFloat(data.reach));
        $(".freq").find("span.ac").text(parseFloat(data.freq));
        $(".reach").find("span.pc").text(parseFloat(data.mdlist));

        load_chart();
    });
}
function load_chart()
{
    var month_name = $("#month option:selected").text();
    var rate = parseFloat($(".rate").find("span.ac").text());
    var target = parseFloat($(".rate").find("span.pc").text());
    var reach = parseFloat($(".reach").find("span.ac").text());
    var mdlist = parseFloat($(".reach").find("span.pc").text());
    var freq = parseFloat($(".freq").find("span.ac").text());
    var rate_value = (rate / target) * 100;
    var reach_value = (reach / mdlist) * 100;
    var freq_value = (freq / mdlist) * 100;
    if ($('#ovchart_rate').length > 0) {
        var ctx_rate = document.getElementById('ovchart_rate').getContext('2d');
        var ctx_reach = document.getElementById('ovchart_reach').getContext('2d');
        var ctx_freq = document.getElementById('ovchart_freq').getContext('2d');
        var config_rate = {
            type: 'line',
            data: {
                labels: ['', month_name],
                datasets: [
                {
                    label: '% Call Rate',
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    data: [
                        0, rate_value
                    ],
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: false,
                    text: 'Call Rate'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        position: 'right'
                    }]
                },
                tooltips: {
                	callbacks: {
    	                label: function(tooltipItem, data) {
    	                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

    	                    if (label) {
    	                        label += ': ';
    	                    }

    	                    label += Math.round(tooltipItem.yLabel * 100) / 100;
    	                    return label;
    	                }
    	            }
                }
            }
        };
        var config_reach = {
            type: 'line',
            data: {
                labels: ['', month_name],
                datasets: [
                {
                    label: '% Call Reach',
                    backgroundColor: window.chartColors.green,
                    borderColor: window.chartColors.green,
                    data: [
                        0, reach_value
                    ],
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: false,
                    text: 'Call Reach'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        position: 'right'
                    }]
                },
                tooltips: {
                	callbacks: {
    	                label: function(tooltipItem, data) {
    	                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

    	                    if (label) {
    	                        label += ': ';
    	                    }

    	                    label += Math.round(tooltipItem.yLabel * 100) / 100;
    	                    return label;
    	                }
    	            }
                }
            }
        };
        var config_freq = {
            type: 'line',
            data: {
                labels: ['', month_name],
                datasets: [
                {
                    label: '% Call Frequency',
                    backgroundColor: window.chartColors.blue,
                    borderColor: window.chartColors.blue,
                    data: [
                        0, freq_value
                    ],
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: false,
                    text: 'Call Frequency'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        position: 'right'
                    }]
                },
                tooltips: {
                	callbacks: {
    	                label: function(tooltipItem, data) {
    	                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

    	                    if (label) {
    	                        label += ': ';
    	                    }

    	                    label += Math.round(tooltipItem.yLabel * 100) / 100;
    	                    return label;
    	                }
    	            }
                }
            }
        };
        if (window.line_rate != undefined) {
            window.line_rate.destroy(); 
        }
        if (window.line_reach != undefined) {
            window.line_reach.destroy(); 
        }
        if (window.line_freq != undefined) {
            window.line_freq.destroy(); 
        }

        window.line_rate = new Chart(ctx_rate, config_rate);
        window.line_reach = new Chart(ctx_reach, config_reach);
        window.line_freq = new Chart(ctx_freq, config_freq);
    }
}
$(document).ready(function(){
	window.chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
    };
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var d = new Date();
    var month = d.getMonth();
    var year = d.getFullYear();
    for (var i = 0; i < 2; i++) {
    	var value = year - i;
    	$("<option/>").val(value).html(value).appendTo("#year");
    }
    $.each(MONTHS, function(key, value) {
    	$("<option/>").val(key + 1).html(value).appendTo("#month");
    });
    $("#year").val(year);
    $("#month").val(month + 1);

	load_chart();
	//Mobile menu
	
	$('#mmenu').click(function(){
		$('#hright').toggleClass('active');
		$('.left-menu').removeClass('active');		
	});
	
	$('#dmmenu').click(function(){
		$('.left-menu').toggleClass('active');
		$('#hright').removeClass('active');		
	});	
    $("#year").change(function() {
        get_chart_data();
    });
    $("#month").change(function() {
        get_chart_data();
    });
	


	
	//Smootscroll
	
	//$('body').scrollspy({ target: '#hright' });
	
	var vpw = $(window).width();
	
		if(vpw > 1024) {

			smoothScroll.init({
					offset: 85
			});			
			
		} else {	
			
			smoothScroll.init({
					offset: 80
			});				
		
		}
	
	var maxHeight = 0;
	
	 setTimeout(function(){
		$("#stepsel .item .card,#packages .card.pcard").each(function(){
		   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
		});

		$("#stepsel .item .card,#packages .card.pcard").height(maxHeight);	
	}, 3000);
	
	//Owl Carousel
	
	$("#advsel").owlCarousel({
		//animateOut: 'fadeOut',
		items:1,
		loop: true,
		margin:0,
		dots: false,
		nav: true,
		navText: ["<i class=\"fas fa-chevron-left\"></i>","<i class=\"fas fa-chevron-right\"></i>"],
		autoplay: true,
		center: false,
		stagePadding:0,
		smartSpeed:400		
	});	
	
	$("#adssel").owlCarousel({
		animateOut: 'fadeOut',
		items:1,
		loop: true,
		margin:0,
		dots: false,
		nav: false,
		navText: ["<i class=\"fas fa-chevron-left\"></i>","<i class=\"fas fa-chevron-right\"></i>"],
		autoplay: true,
		center: false,
		stagePadding:0,
		smartSpeed:400		
	});		
	
	$("#progsel").owlCarousel({
		//animateOut: 'fadeOut',
		items:1,
		loop: true,
		margin:20,
		dots: false,
		nav: true,
		navText: ["<i class=\"fas fa-chevron-left\"></i>","<i class=\"fas fa-chevron-right\"></i>"],
		autoplay: true,
		center: true,
		stagePadding:0,
		smartSpeed:400,
		responsive:{			
			1024:{
				items:2
			},
			1300:{
				items:2
			}			
		}		
	});		
	
	$("#galsel").owlCarousel({
		//animateOut: 'fadeOut',
		items:1,
		loop: false,
		margin:40,
		dots: true,
		nav: true,
		navText: ["<i class=\"fas fa-arrow-circle-left\"></i>","<i class=\"fas fa-arrow-circle-right\"></i>"],
		autoplay: true,
		center: false,
		stagePadding:20,
		smartSpeed:400,		
		responsive:{			
			1024:{
				items:3
			},
			1300:{
				items:4
			}			
		}		
	});		

	
	//Scroll
	
	vph = $(window).height();
	dph = $(document).height();	


		/*$(window).scroll(function () {
			// set distance user needs to scroll before we start fadeIn
			if ($(this).scrollTop() < vph/8){
				$('body').removeClass('scrolled');				
			}
			else {
				$('body').addClass('scrolled');
			}
			
			if(vpw > 1024) {			
			
				
			
			}
			
		});*/

	
});