function upload_jc(email, name, group, account, nogroup)
{
	
	function createCORSRequest(method, url) {
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {
			xhr.open(method, url, true);
	
		} else if (typeof XDomainRequest != "undefined") {
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			xhr = null;
		}
		return xhr;
	}
	
	function makeCorsRequest(url) {
		var xhr = createCORSRequest('GET', url);
		if (!xhr) {
			return;
		}
		xhr.onload = function () {
			var text = xhr.responseText;
		};
		xhr.onerror = function () {
		};
		xhr.send();
	}
	
	
    if (typeof account === "undefined")
    {
        account = "mediamars";
    }

    var url = "//" + account + ".justclick.ru/subscribe/process/?rid[0]=" + group;

    if (typeof nogroup !== "undefined")
    {
        url = url + "&ex_rid[0]=" + nogroup;
    }

    url = url + "&lead_name=" + name + "&lead_email=" + email;

    makeCorsRequest(url);
}

function send_country_phone_on_registration(email,phone,countryISO2)
{
	$.ajax({
		type: 'post',
        url: "https://pashka.club/YanService.asmx/Kostyl",
        data: JSON.stringify({"email":email,"phone":phone,"country":countryISO2}),//"{ email : 'emai1l@email.com', phone: 'phone', country: 'RU'}",
		contentType: "application/json; charset=utf-8;",
        dataType: "json",
        cache: false,
        success: function (status) {
  
        },
         error: function (e) {
            
        }
	});
}

function sendDataToMM(url, email) {
    $.ajax({
        type: "POST",
        url: "https://dazhush1.azurewebsites.net//Default.aspx/SendData",
        data: JSON.stringify({ url: url, email: email }),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
                
        }
    });
}

function getYaCounters() {
    var obj = window;
    var yaCounters = [];
    for (var key in obj) {
        if (key.indexOf("yaCounter") == 0) {
            yaCounters.push(key);
        }
    }
    return yaCounters;
}


var RegisterRegistrationForm = function()
{
	//var $ = jquery;
	var formContainer = $(".reg-form")[0];
	var formElement = $(formContainer).find("form")[0];
	//var registrationForm = $();
	var currentLocale = "ru";
	var serverUrl = "https://telegram10.ru/";
	var currentCountry = GetCountry("iso2","RU");
	
	var justclickData = {
		group:"1536071089.9687420239",
		account:"cmedianew"//,
		//nogroup:"1500822805.3875666377"
	};
	
	var js_form = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        country_code: "",
        country: "",
        areacode: "",
        phone: ""
    };
	
	//create_validators
	//bind_validators
	//get_ip_country
	//set_country
	//bind_country
	//create_clicks
	//bind_clicks
	
	
	
	
	var Register = function(e)
	{
	    e.preventDefault();
		
        if (!$(formElement).valid()) 
		{
			return;
		}
		
		HideRegistrationError()
		form_functions.refresh_js_form();
		ShowPreloader();
		SignalsApi.doRequestCreateCustomer();
	};
	
	var GoToNextSite = function()
	{
		var currentSite = window.location.protocol + "//" + window.location.hostname + "/";
		if(currentSite == serverUrl)
		{
			setTimeout(function(){ 
					window.location.href = serverUrl;//like button_click
					//window.location.replace(serverUrl);//like backend_redirect
				},1000);

		}
		else
		{
			$(formContainer).find(".popup").removeClass("hidden");
		}
	};
	
	
	var ShowRegistrationError = function(message)
	{
		$(formContainer).find(".reg-form_error.reg-error").text(message);
		$(formContainer).find(".reg-form_error.reg-error").removeClass("hidden");
	};
	
	var HideRegistrationError = function()
	{
		$(formContainer).find(".reg-form_error.reg-error").addClass("hidden");
	};
	
		
	var	GoToStepOne = function(e)
	{
		$(formContainer).find(".enroll-form__step1").removeClass("hidden");
		$(formContainer).find(".enroll-form__step2").addClass("hidden");
	};
	
	var GoToStepTwo = function(e)
	{
		e.preventDefault();
		
		if (!$(formElement).valid())
		{
			return;
		}
		
		form_functions.refresh_js_form();
		
		$(formContainer).find(".enroll-form__step1").addClass("hidden");
		$(formContainer).find(".enroll-form__step2").removeClass("hidden");
		
		if (typeof sendDataMMv2 === "function") {
			sendDataMMv2(document.URL, js_form.email);
		}
		
		if (typeof sendDataToMM === "function") {
			sendDataToMM(document.URL, js_form.email);
		}
		
	};
	
	var ShowPreloader = function()
	{
		$(formContainer).find(".reg-form__preloader").removeClass("hidden");
	};
	
	var HidePreloader = function()
	{
		$(formContainer).find(".reg-form__preloader").addClass("hidden");
		GoToStepOne();
	};
	
	var HidePreloaderSimple = function()
	{
		$(formContainer).find(".reg-form__preloader").addClass("hidden");
	};
	
	var ChangeCountryByCurrentIp = function()
	{
		$.ajax({
            url: 'https://s.mapiservice01.com/CurrentIpToCountry.php',
            type: 'GET',
            dataType: 'json',
            timeout: 60000
        }).always(function(data){
			
			
			if(data.ISO2 === "IL")
			{
				data.ISO2 = "RU";
			}
			currentCountry = GetCountry("iso2",data.ISO2);
			
			if(currentCountry === false)
			{
				currentCountry = GetCountry("iso2","RU");
			};
			
			$(formElement).find("input[name='areacode']").val("+" + currentCountry.phoneCode);			
		});		
	};
	
	var form_functions = {

            refresh_js_form: function () {
                js_form.firstname = $(formElement).find(" input[name=fname]").val();
                js_form.lastname = $(formElement).find(" input[name=lname]").val();
                js_form.email = $(formElement).find(" input[name=email]").val();
                js_form.password = $(formElement).find(" input[name=pass]").val();
                js_form.country_code = currentCountry.spotCode;
                js_form.country = currentCountry.iso2;
                js_form.areacode = $(formElement).find(" input[name=areacode]").val().replace(/\+/g, "");
                js_form.phone = '+' + js_form.areacode + $(formElement).find(" input[name=phone]").val().replace(/[- )(]/g, "");
				
				console.log("phone_cone="+js_form.areacode+"  phone="+js_form.phone);
            },

            localization: {
                'en': {
                    'required_field': 'This&nbsp;field&nbsp;is&nbsp;required',
                    'valid_email_required': 'Enter valid email',
                    'passwords_dont_match': "Passwords don't match",
                    'min_length': 'At least {0} chars',
                    'broker_reg_ok': "Broker registration completed",
                    'signal_reg_in_progress': 'Platform registration in progress',
                    'reg_completed': 'Registration completed successfully',
                    'already_exists': 'Customer already exists',
                    'data_processing_error': 'Data processing error',
                    'broker_reg_in_progress': 'Broker registration in progress',
                    'broker_ok_signals_fail': 'Broker registration completed successfully but Platform requare manual registration',
                    'only_numbers': 'Please enter a valid number',
                    'email_is_already_used': 'email is already used'
                },
                'ru': {
                    'required_field': 'Это&nbsp;обязательное&nbsp;поле',
                    'valid_email_required': 'Введите действующий адрес электронной почты',
                    'passwords_dont_match': "Пароли не совпадают",
                    'min_length': '"Минимум {0} символов"',
                    'broker_reg_ok': "Регистрация у брокера выполнена успешно!",
                    'signal_reg_in_progress': 'Регистрация на сигнальной платфоме',
                    'reg_completed': 'Регистрация выполнена успешно!',
                    'already_exists': 'Пользователь уже зарегистрирован',
                    'data_processing_error': 'Ошибка обработки данных',
                    'broker_reg_in_progress': 'идет регистрация у брокера...',
                    'broker_ok_signals_fail': 'Регистрация у брокера успешна но нужно в ручную зарегестрироваться на сигнальной платформе',
                    'only_numbers': 'Только цифры без пробелов',
                    'email_is_already_used': 'Похоже такой email уже существует'
                }
            },

            t: function (what) {
                if (typeof form_functions.localization[currentLocale][what] != 'undefined')
                    return form_functions.localization[currentLocale][what];
                else return what;
            },

            highlight: function (element) {
                $(element).addClass('form_has_error');
            },

            unhighlight: function (element) {
                $(element).removeClass('form_has_error');
            },
        };
	

	
	
	    var SignalsApi = {

            doRequestCreateCustomer: function () {

                function get_source_number()
                {
                    var sources = [
                        ["facebook", "1"],
                        ["twitter", "2"],
                        ["google", "3"],
                        ["vk", "4"],
                        ["bing", "5"],
                        ["yandex", "6"],
                        ["mail", "7"],
                        ["clicksure", "8"],
                 
                        ["sendpulse","7"],
                        ["justclick","7"]
                    ]

                    var source = getCookie("utm_source").toLowerCase();
                    var source_number = "5";
                    for(var i = 0;i<sources.length;i++)
                    {
                        if (source.indexOf(sources[i][0]) !== -1)
                        {
                            source_number = sources[i][1]; 
                        }
                    }

                    return source_number;
                }

                var broker_reg_data = {
                    name: js_form.firstname,
                    surname: js_form.lastname,
                    email: js_form.email,
                    password: js_form.password,
                    countryId: js_form.country_code,
                    phone: js_form.phone,
					//source: get_source_number()
                    source: 1
                };

                var broker_reg_data_ldp = {
                    first_name: js_form.firstname,
                    last_name: js_form.lastname,
                    email: js_form.email,
                    password: js_form.password,
                    country_code: js_form.country_code,
                    country: js_form.country,
                    areacode: js_form.areacode,
                    phone: js_form.phone,
                };


                function login()
                {
                    var login_data = {
                        action: "login",
                        email: js_form.email,
                        password: js_form.password
                    };

                    var link = serverUrl + "requests.php";

                    $.ajax({
                        url: link,
                        type: 'POST',
                        dataType: 'json',
                        xhrFields: {
                            withCredentials: true
                        },
                        data: login_data,
                        timeout: 60000
                    });
                }

                function success_check_phone()
                {

                    $.ajax({
                        url: serverUrl + "getcustomer.php",
                        type: 'POST',
                        dataType: 'json',
                        data: { jsondata: JSON.stringify(broker_reg_data) },
                        timeout: 60000
                    }).always(function (resp, textStatus, l_o) {

                        //format data
                        var resp_obj = resp;

                        //registration succesfull
                        if (textStatus == "success" && resp_obj.result == "ok") {

						
							if (typeof upload_jc === "function") {
								upload_jc(js_form.email, js_form.firstname, justclickData.group, justclickData.account/*,justclickData.nogroup*/);
							};
						
							send_country_phone_on_registration(js_form.email,js_form.phone,js_form.country);
                            if (typeof sendBrokerRegData === "function") {
                                sendBrokerRegData(broker_reg_data);
                            };

                            ShowRegistrationError(form_functions.t('reg_completed'));
					
							if (typeof goog_report_conversion === "function") {
								goog_report_conversion();
							}
							
							
                            //setGlobalCookie("c_name", js_form.firstname, 365);
                            //setGlobalCookie("c_email", js_form.email, 365);
                            //setGlobalCookie("c_bpas", js_form.base_password, 365);
                            //setGlobalCookie("c_broker", current_broker, 365);

							if (typeof getYaCounters === "function") {
                                var yandexCounters = getYaCounters();
								
								for (var i = 0; i < yandexCounters.length; i++) {
									window[yandexCounters[i]].reachGoal("LEAD");
								}
																
                            };


                            broker_reg_data_ldp.broker = resp_obj.broker.ApiUserName + " " + resp_obj.broker.ApiUrl;
                            broker_reg_data_ldp.campaign_id = resp_obj.broker.CampaignID;

                            if (typeof sendBrokerRegData === "function") {
                                sendBrokerRegData(broker_reg_data_ldp);
                            }
							
							if (typeof fbq === "function") {
                                fbq('track', 'Lead');
								fbq('track', "CompleteRegistration");
                            }

                            if (typeof goog_report_conversion === "function") {
                                goog_report_conversion();
                            }
                            if (typeof ga === "function") {
                                ga('send', {
                                    hitType: 'event',
                                    eventCategory: 'LEADS',
                                    eventAction: 'LEAD',
                                    eventLabel: 'metasensus_com_leads',
                                });
                            }


                            login();

                            GoToNextSite();

                            HidePreloader();
                            return true;
                        }
                        else if (textStatus == "success" && resp_obj.result === "error") {
                            //alert("error");
                            switch (resp_obj.error_type) {
                                case 4:
                                    ShowRegistrationError(resp_obj.last_broker_error[0].description);
                                    break;
                                default:
                                    ShowRegistrationError(resp_obj.description);
                            }

                            HidePreloader();
                            return false;
                        }
                        else //all fail,registration fail, show error
                        {
                            console.log("error form");
                            console.log(textStatus);
                            console.log(resp);
                            console.log(l_o);
                            var message = form_functions.t('data_processing_error');
                            ShowRegistrationError(message);
                            HidePreloader();
                            return false
                        }


                    });

                }

                

                $.ajax({

                    url: "https://apilayer.net/api/validate?access_key=" + "37fed20531d31262eacd49c3b5bd27a3" + "&number=" + broker_reg_data.phone,
                    dataType: 'json',

                }).always(function (resp, textStatus, l_o) {

                    if (resp.valid === true) {
                        success_check_phone();
                    }
                    else {
                        ShowRegistrationError("неверный номер телефона");
                        HidePreloaderSimple();
                        return false;
                    }

                })

            }
        };
	
	
	
	
	
	
	function GetCountry(paramName,paramValue) 
	{
		var countries = [
			{"iso2":"AD","phoneCode":"376","spotCode":"5","name":"Andorra"},
			{"iso2":"AE","phoneCode":"971","spotCode":"224","name":"United Arab Emirates"},
			{"iso2":"AF","phoneCode":"93","spotCode":"1","name":"Afghanistan"},
			{"iso2":"AG","phoneCode":"1","spotCode":"9","name":"Antigua and Barbuda"},
			{"iso2":"AI","phoneCode":"1","spotCode":"7","name":"Anguilla"},
			{"iso2":"AL","phoneCode":"355","spotCode":"2","name":"Albania"},
			{"iso2":"AM","phoneCode":"374","spotCode":"11","name":"Armenia"},
			{"iso2":"AN","phoneCode":"599","spotCode":"151","name":"Netherlands Antilles"},
			{"iso2":"AO","phoneCode":"244","spotCode":"6","name":"Angola"},
			{"iso2":"AQ","phoneCode":"672","spotCode":"8","name":"Antarctica"},
			{"iso2":"AR","phoneCode":"54","spotCode":"10","name":"Argentina"},
			{"iso2":"AS","phoneCode":"1","spotCode":"4","name":"American Samoa"},
			{"iso2":"AT","phoneCode":"43","spotCode":"14","name":"Austria"},
			{"iso2":"AU","phoneCode":"61","spotCode":"13","name":"Australia"},
			{"iso2":"AW","phoneCode":"297","spotCode":"12","name":"Aruba"},
			{"iso2":"AX","phoneCode":"358","spotCode":"243","name":"Åland Islands"},
			{"iso2":"AZ","phoneCode":"994","spotCode":"15","name":"Azerbaijan"},
			{"iso2":"BA","phoneCode":"387","spotCode":"27","name":"Bosnia and Herzegovina"},
			{"iso2":"BB","phoneCode":"1","spotCode":"19","name":"Barbados"},
			{"iso2":"BD","phoneCode":"880","spotCode":"18","name":"Bangladesh"},
			{"iso2":"BE","phoneCode":"32","spotCode":"21","name":"Belgium"},
			{"iso2":"BF","phoneCode":"226","spotCode":"34","name":"Burkina Faso"},
			{"iso2":"BG","phoneCode":"359","spotCode":"33","name":"Bulgaria"},
			{"iso2":"BH","phoneCode":"973","spotCode":"17","name":"Bahrain"},
			{"iso2":"BI","phoneCode":"257","spotCode":"35","name":"Burundi"},
			{"iso2":"BJ","phoneCode":"229","spotCode":"23","name":"Benin"},
			{"iso2":"BM","phoneCode":"1","spotCode":"24","name":"Bermuda"},
			{"iso2":"BN","phoneCode":"673","spotCode":"32","name":"Brunei Darussalam"},
			{"iso2":"BO","phoneCode":"591","spotCode":"26","name":"Bolivia"},
			{"iso2":"BR","phoneCode":"55","spotCode":"30","name":"Brazil"},
			{"iso2":"BS","phoneCode":"1","spotCode":"16","name":"Bahamas"},
			{"iso2":"BT","phoneCode":"975","spotCode":"25","name":"Bhutan"},
			{"iso2":"BV","phoneCode":"","spotCode":"29","name":"Bouvet Island"},
			{"iso2":"BW","phoneCode":"267","spotCode":"28","name":"Botswana"},
			{"iso2":"BY","phoneCode":"375","spotCode":"20","name":"Belarus"},
			{"iso2":"BZ","phoneCode":"501","spotCode":"22","name":"Belize"},
			{"iso2":"CA","phoneCode":"1","spotCode":"38","name":"Canada"},
			{"iso2":"CC","phoneCode":"61","spotCode":"46","name":"Cocos (Keeling) Islands"},
			{"iso2":"CD","phoneCode":"243","spotCode":"50","name":"Congo, The Democratic Republic Of The"},
			{"iso2":"CF","phoneCode":"236","spotCode":"41","name":"Central African Republic"},
			{"iso2":"CG","phoneCode":"242","spotCode":"49","name":"Congo"},
			{"iso2":"CH","phoneCode":"41","spotCode":"206","name":"Switzerland"},
			{"iso2":"CI","phoneCode":"225","spotCode":"53","name":"Côte D`Ivoire"},
			{"iso2":"CK","phoneCode":"682","spotCode":"51","name":"Cook Islands"},
			{"iso2":"CL","phoneCode":"56","spotCode":"43","name":"Chile"},
			{"iso2":"CM","phoneCode":"237","spotCode":"37","name":"Cameroon"},
			{"iso2":"CN","phoneCode":"86","spotCode":"44","name":"China"},
			{"iso2":"CO","phoneCode":"57","spotCode":"47","name":"Colombia"},
			{"iso2":"CR","phoneCode":"506","spotCode":"52","name":"Costa Rica"},
			{"iso2":"CU","phoneCode":"53","spotCode":"55","name":"Cuba"},
			{"iso2":"CV","phoneCode":"238","spotCode":"39","name":"Cape Verde"},
			{"iso2":"CX","phoneCode":"61","spotCode":"45","name":"Christmas Island"},
			{"iso2":"CY","phoneCode":"357","spotCode":"56","name":"Cyprus"},
			{"iso2":"CZ","phoneCode":"420","spotCode":"57","name":"Czech Republic"},
			{"iso2":"DE","phoneCode":"49","spotCode":"80","name":"Germany"},
			{"iso2":"DJ","phoneCode":"253","spotCode":"59","name":"Djibouti"},
			{"iso2":"DK","phoneCode":"45","spotCode":"58","name":"Denmark"},
			{"iso2":"DM","phoneCode":"1","spotCode":"60","name":"Dominica"},
			{"iso2":"DO","phoneCode":"1","spotCode":"61","name":"Dominican Republic"},
			{"iso2":"DZ","phoneCode":"213","spotCode":"3","name":"Algeria"},
			{"iso2":"EC","phoneCode":"593","spotCode":"62","name":"Ecuador"},
			{"iso2":"EE","phoneCode":"372","spotCode":"67","name":"Estonia"},
			{"iso2":"EG","phoneCode":"20","spotCode":"63","name":"Egypt"},
			{"iso2":"EH","phoneCode":"212","spotCode":"236","name":"Western Sahara"},
			{"iso2":"ER","phoneCode":"291","spotCode":"66","name":"Eritrea"},
			{"iso2":"ES","phoneCode":"34","spotCode":"199","name":"Spain"},
			{"iso2":"ET","phoneCode":"251","spotCode":"68","name":"Ethiopia"},
			{"iso2":"FI","phoneCode":"358","spotCode":"72","name":"Finland"},
			{"iso2":"FJ","phoneCode":"679","spotCode":"71","name":"Fiji"},
			{"iso2":"FK","phoneCode":"500","spotCode":"69","name":"Falkland Islands (Malvinas)"},
			{"iso2":"FM","phoneCode":"691","spotCode":"139","name":"Micronesia, Federated States Of"},
			{"iso2":"FO","phoneCode":"298","spotCode":"70","name":"Faroe Islands"},
			{"iso2":"FR","phoneCode":"33","spotCode":"73","name":"France"},
			{"iso2":"GA","phoneCode":"241","spotCode":"77","name":"Gabon"},
			{"iso2":"GB","phoneCode":"44","spotCode":"225","name":"United Kingdom"},
			{"iso2":"GD","phoneCode":"1","spotCode":"85","name":"Grenada"},
			{"iso2":"GE","phoneCode":"995","spotCode":"79","name":"Georgia"},
			{"iso2":"GF","phoneCode":"594","spotCode":"74","name":"French Guiana"},
			{"iso2":"GH","phoneCode":"233","spotCode":"81","name":"Ghana"},
			{"iso2":"GI","phoneCode":"350","spotCode":"82","name":"Gibraltar"},
			{"iso2":"GL","phoneCode":"299","spotCode":"84","name":"Greenland"},
			{"iso2":"GM","phoneCode":"220","spotCode":"78","name":"Gambia"},
			{"iso2":"GN","phoneCode":"224","spotCode":"89","name":"Guinea"},
			{"iso2":"GP","phoneCode":"590","spotCode":"86","name":"Guadeloupe"},
			{"iso2":"GQ","phoneCode":"240","spotCode":"65","name":"Equatorial Guinea"},
			{"iso2":"GR","phoneCode":"30","spotCode":"83","name":"Greece"},
			{"iso2":"GS","phoneCode":"500","spotCode":"198","name":"South Georgia and the South Sandwich Islands"},
			{"iso2":"GT","phoneCode":"502","spotCode":"88","name":"Guatemala"},
			{"iso2":"GU","phoneCode":"1","spotCode":"87","name":"Guam"},
			{"iso2":"GW","phoneCode":"245","spotCode":"90","name":"Guinea-Bissau"},
			{"iso2":"GY","phoneCode":"592","spotCode":"91","name":"Guyana"},
			{"iso2":"HK","phoneCode":"852","spotCode":"96","name":"Hong Kong"},
			{"iso2":"HM","phoneCode":"","spotCode":"93","name":"Heard and McDonald Islands"},
			{"iso2":"HN","phoneCode":"504","spotCode":"95","name":"Honduras"},
			{"iso2":"HR","phoneCode":"385","spotCode":"54","name":"Croatia"},
			{"iso2":"HT","phoneCode":"509","spotCode":"92","name":"Haiti"},
			{"iso2":"HU","phoneCode":"36","spotCode":"97","name":"Hungary"},
			{"iso2":"ID","phoneCode":"62","spotCode":"100","name":"Indonesia"},
			{"iso2":"IE","phoneCode":"353","spotCode":"103","name":"Ireland"},
			{"iso2":"IL","phoneCode":"972","spotCode":"104","name":"Israel"},
			{"iso2":"IN","phoneCode":"91","spotCode":"99","name":"India"},
			{"iso2":"IO","phoneCode":"246","spotCode":"31","name":"British Indian Ocean Territory"},
			{"iso2":"IQ","phoneCode":"964","spotCode":"102","name":"Iraq"},
			{"iso2":"IR","phoneCode":"98","spotCode":"101","name":"Iran, Islamic Republic Of"},
			{"iso2":"IS","phoneCode":"354","spotCode":"98","name":"Iceland"},
			{"iso2":"IT","phoneCode":"39","spotCode":"105","name":"Italy"},
			{"iso2":"JM","phoneCode":"1","spotCode":"106","name":"Jamaica"},
			{"iso2":"JO","phoneCode":"962","spotCode":"108","name":"Jordan"},
			{"iso2":"JP","phoneCode":"81","spotCode":"107","name":"Japan"},
			{"iso2":"KE","phoneCode":"254","spotCode":"110","name":"Kenya"},
			{"iso2":"KG","phoneCode":"996","spotCode":"115","name":"Kyrgyzstan"},
			{"iso2":"KH","phoneCode":"855","spotCode":"36","name":"Cambodia"},
			{"iso2":"KI","phoneCode":"686","spotCode":"111","name":"Kiribati"},
			{"iso2":"KM","phoneCode":"269","spotCode":"48","name":"Comoros"},
			{"iso2":"KN","phoneCode":"1","spotCode":"180","name":"Saint Kitts And Nevis"},
			{"iso2":"KP","phoneCode":"850","spotCode":"112","name":"Korea, Democratic People`s Republic Of"},
			{"iso2":"KR","phoneCode":"82","spotCode":"113","name":"Korea, Republic of"},
			{"iso2":"KW","phoneCode":"965","spotCode":"114","name":"Kuwait"},
			{"iso2":"KY","phoneCode":"1","spotCode":"40","name":"Cayman Islands"},
			{"iso2":"KZ","phoneCode":"7","spotCode":"109","name":"Kazakhstan"},
			{"iso2":"LA","phoneCode":"856","spotCode":"116","name":"Lao People`s Democratic Republic"},
			{"iso2":"LB","phoneCode":"961","spotCode":"118","name":"Lebanon"},
			{"iso2":"LC","phoneCode":"1","spotCode":"181","name":"Saint Lucia"},
			{"iso2":"LI","phoneCode":"423","spotCode":"122","name":"Liechtenstein"},
			{"iso2":"LK","phoneCode":"94","spotCode":"200","name":"Sri Lanka"},
			{"iso2":"LR","phoneCode":"231","spotCode":"120","name":"Liberia"},
			{"iso2":"LS","phoneCode":"266","spotCode":"119","name":"Lesotho"},
			{"iso2":"LT","phoneCode":"370","spotCode":"123","name":"Lithuania"},
			{"iso2":"LU","phoneCode":"352","spotCode":"124","name":"Luxembourg"},
			{"iso2":"LV","phoneCode":"371","spotCode":"117","name":"Latvia"},
			{"iso2":"LY","phoneCode":"218","spotCode":"121","name":"Libya"},
			{"iso2":"MA","phoneCode":"212","spotCode":"144","name":"Morocco"},
			{"iso2":"MC","phoneCode":"377","spotCode":"141","name":"Monaco"},
			{"iso2":"MD","phoneCode":"373","spotCode":"140","name":"Moldova, Republic of"},
			{"iso2":"ME","phoneCode":"382","spotCode":"241","name":"Montenegro"},
			{"iso2":"MG","phoneCode":"261","spotCode":"127","name":"Madagascar"},
			{"iso2":"MH","phoneCode":"692","spotCode":"133","name":"Marshall Islands"},
			{"iso2":"MK","phoneCode":"389","spotCode":"126","name":"Macedonia, the Former Yugoslav Republic Of"},
			{"iso2":"ML","phoneCode":"223","spotCode":"131","name":"Mali"},
			{"iso2":"MM","phoneCode":"95","spotCode":"146","name":"Myanmar"},
			{"iso2":"MN","phoneCode":"976","spotCode":"142","name":"Mongolia"},
			{"iso2":"MO","phoneCode":"853","spotCode":"125","name":"Macao"},
			{"iso2":"MP","phoneCode":"1","spotCode":"159","name":"Northern Mariana Islands"},
			{"iso2":"MQ","phoneCode":"596","spotCode":"134","name":"Martinique"},
			{"iso2":"MR","phoneCode":"222","spotCode":"135","name":"Mauritania"},
			{"iso2":"MS","phoneCode":"1","spotCode":"143","name":"Montserrat"},
			{"iso2":"MT","phoneCode":"356","spotCode":"132","name":"Malta"},
			{"iso2":"MU","phoneCode":"230","spotCode":"136","name":"Mauritius"},
			{"iso2":"MV","phoneCode":"960","spotCode":"130","name":"Maldives"},
			{"iso2":"MW","phoneCode":"265","spotCode":"128","name":"Malawi"},
			{"iso2":"MX","phoneCode":"52","spotCode":"138","name":"Mexico"},
			{"iso2":"MY","phoneCode":"60","spotCode":"129","name":"Malaysia"},
			{"iso2":"MZ","phoneCode":"258","spotCode":"145","name":"Mozambique"},
			{"iso2":"NA","phoneCode":"264","spotCode":"147","name":"Namibia"},
			{"iso2":"NC","phoneCode":"687","spotCode":"152","name":"New Caledonia"},
			{"iso2":"NE","phoneCode":"227","spotCode":"155","name":"Niger"},
			{"iso2":"NF","phoneCode":"672","spotCode":"158","name":"Norfolk Island"},
			{"iso2":"NG","phoneCode":"234","spotCode":"156","name":"Nigeria"},
			{"iso2":"NI","phoneCode":"505","spotCode":"154","name":"Nicaragua"},
			{"iso2":"NL","phoneCode":"31","spotCode":"150","name":"Netherlands"},
			{"iso2":"NO","phoneCode":"47","spotCode":"160","name":"Norway"},
			{"iso2":"NP","phoneCode":"977","spotCode":"149","name":"Nepal"},
			{"iso2":"NR","phoneCode":"674","spotCode":"148","name":"Nauru"},
			{"iso2":"NU","phoneCode":"683","spotCode":"157","name":"Niue"},
			{"iso2":"NZ","phoneCode":"64","spotCode":"153","name":"New Zealand"},
			{"iso2":"OM","phoneCode":"968","spotCode":"161","name":"Oman"},
			{"iso2":"PA","phoneCode":"507","spotCode":"165","name":"Panama"},
			{"iso2":"PE","phoneCode":"51","spotCode":"168","name":"Peru"},
			{"iso2":"PF","phoneCode":"689","spotCode":"75","name":"French Polynesia"},
			{"iso2":"PG","phoneCode":"675","spotCode":"166","name":"Papua New Guinea"},
			{"iso2":"PH","phoneCode":"63","spotCode":"169","name":"Philippines"},
			{"iso2":"PK","phoneCode":"92","spotCode":"162","name":"Pakistan"},
			{"iso2":"PL","phoneCode":"48","spotCode":"171","name":"Poland"},
			{"iso2":"PM","phoneCode":"508","spotCode":"182","name":"Saint Pierre And Miquelon"},
			{"iso2":"PN","phoneCode":"","spotCode":"170","name":"Pitcairn"},
			{"iso2":"PR","phoneCode":"1","spotCode":"173","name":"Puerto Rico"},
			{"iso2":"PS","phoneCode":"970","spotCode":"164","name":"Palestinian Territory, Occupied"},
			{"iso2":"PT","phoneCode":"351","spotCode":"172","name":"Portugal"},
			{"iso2":"PW","phoneCode":"680","spotCode":"163","name":"Palau"},
			{"iso2":"PY","phoneCode":"595","spotCode":"167","name":"Paraguay"},
			{"iso2":"QA","phoneCode":"974","spotCode":"174","name":"Qatar"},
			{"iso2":"RE","phoneCode":"262","spotCode":"175","name":"Réunion"},
			{"iso2":"RO","phoneCode":"40","spotCode":"176","name":"Romania"},
			{"iso2":"RS","phoneCode":"381","spotCode":"189","name":"Serbia"},
			{"iso2":"RU","phoneCode":"7","spotCode":"177","name":"Russian Federation"},
			{"iso2":"RW","phoneCode":"250","spotCode":"178","name":"Rwanda"},
			{"iso2":"SA","phoneCode":"966","spotCode":"187","name":"Saudi Arabia"},
			{"iso2":"SB","phoneCode":"677","spotCode":"195","name":"Solomon Islands"},
			{"iso2":"SC","phoneCode":"248","spotCode":"190","name":"Seychelles"},
			{"iso2":"SD","phoneCode":"249","spotCode":"201","name":"Sudan"},
			{"iso2":"SE","phoneCode":"46","spotCode":"205","name":"Sweden"},
			{"iso2":"SG","phoneCode":"65","spotCode":"192","name":"Singapore"},
			{"iso2":"SH","phoneCode":"290","spotCode":"179","name":"Saint Helena"},
			{"iso2":"SI","phoneCode":"386","spotCode":"194","name":"Slovenia"},
			{"iso2":"SJ","phoneCode":"47","spotCode":"203","name":"Svalbard And Jan Mayen"},
			{"iso2":"SK","phoneCode":"421","spotCode":"193","name":"Slovakia"},
			{"iso2":"SL","phoneCode":"232","spotCode":"191","name":"Sierra Leone"},
			{"iso2":"SM","phoneCode":"378","spotCode":"185","name":"San Marino"},
			{"iso2":"SN","phoneCode":"221","spotCode":"188","name":"Senegal"},
			{"iso2":"SO","phoneCode":"252","spotCode":"196","name":"Somalia"},
			{"iso2":"SR","phoneCode":"597","spotCode":"202","name":"Suriname"},
			{"iso2":"ST","phoneCode":"239","spotCode":"186","name":"Sao Tome and Principe"},
			{"iso2":"SV","phoneCode":"503","spotCode":"64","name":"El Salvador"},
			{"iso2":"SY","phoneCode":"963","spotCode":"207","name":"Syrian Arab Republic"},
			{"iso2":"SZ","phoneCode":"268","spotCode":"204","name":"Swaziland"},
			{"iso2":"TC","phoneCode":"1","spotCode":"220","name":"Turks and Caicos Islands"},
			{"iso2":"TD","phoneCode":"235","spotCode":"42","name":"Chad"},
			{"iso2":"TF","phoneCode":"","spotCode":"76","name":"French Southern Territories"},
			{"iso2":"TG","phoneCode":"228","spotCode":"213","name":"Togo"},
			{"iso2":"TH","phoneCode":"66","spotCode":"211","name":"Thailand"},
			{"iso2":"TJ","phoneCode":"992","spotCode":"209","name":"Tajikistan"},
			{"iso2":"TK","phoneCode":"690","spotCode":"214","name":"Tokelau"},
			{"iso2":"TL","phoneCode":"670","spotCode":"212","name":"Timor-Leste"},
			{"iso2":"TM","phoneCode":"993","spotCode":"219","name":"Turkmenistan"},
			{"iso2":"TN","phoneCode":"216","spotCode":"217","name":"Tunisia"},
			{"iso2":"TO","phoneCode":"676","spotCode":"215","name":"Tonga"},
			{"iso2":"TR","phoneCode":"90","spotCode":"218","name":"Turkey"},
			{"iso2":"TT","phoneCode":"1","spotCode":"216","name":"Trinidad and Tobago"},
			{"iso2":"TV","phoneCode":"688","spotCode":"221","name":"Tuvalu"},
			{"iso2":"TW","phoneCode":"886","spotCode":"208","name":"Taiwan, Republic Of China"},
			{"iso2":"TZ","phoneCode":"255","spotCode":"210","name":"Tanzania, United Republic of"},
			{"iso2":"UA","phoneCode":"380","spotCode":"223","name":"Ukraine"},
			{"iso2":"UG","phoneCode":"256","spotCode":"222","name":"Uganda"},
			{"iso2":"UM","phoneCode":"","spotCode":"227","name":"United States Minor Outlying Islands"},
			{"iso2":"US","phoneCode":"1","spotCode":"226","name":"United States"},
			{"iso2":"UY","phoneCode":"598","spotCode":"228","name":"Uruguay"},
			{"iso2":"UZ","phoneCode":"998","spotCode":"229","name":"Uzbekistan"},
			{"iso2":"VA","phoneCode":"39","spotCode":"94","name":"Holy See (Vatican City State)"},
			{"iso2":"VC","phoneCode":"1","spotCode":"183","name":"Saint Vincent And The Grenedines"},
			{"iso2":"VE","phoneCode":"58","spotCode":"231","name":"Venezuela, Bolivarian Republic of"},
			{"iso2":"VG","phoneCode":"1","spotCode":"233","name":"Virgin Islands, British"},
			{"iso2":"VI","phoneCode":"1","spotCode":"234","name":"Virgin Islands, U.S."},
			{"iso2":"VN","phoneCode":"84","spotCode":"232","name":"Vietnam"},
			{"iso2":"VU","phoneCode":"678","spotCode":"230","name":"Vanuatu"},
			{"iso2":"WF","phoneCode":"681","spotCode":"235","name":"Wallis and Futuna"},
			{"iso2":"WS","phoneCode":"685","spotCode":"184","name":"Samoa"},
			{"iso2":"YE","phoneCode":"967","spotCode":"237","name":"Yemen"},
			{"iso2":"YT","phoneCode":"262","spotCode":"137","name":"Mayotte"},
			{"iso2":"ZA","phoneCode":"27","spotCode":"197","name":"South Africa"},
			{"iso2":"ZM","phoneCode":"260","spotCode":"238","name":"Zambia"},
			{"iso2":"ZW","phoneCode":"263","spotCode":"239","name":"Zimbabwe"}
		];
				
		var i = countries.length;
		
		while (i--) 
		{
			if (countries[i][paramName] == paramValue) {
				return countries[i];
			}
		}
		return false;
	}
	
	

	var InitValidator = function()
	{
		function genValidationRules() {

				var formElement = $(formContainer).find("form")[0];
		
                //add new validation rule - phone number with min max and allowed symbols [- )(]
                $.validator.addMethod('light_phone', function (value, element, params) {
                    return this.optional(element) || new RegExp("^([- )(]*[0-9][- )(]*){" + params[0] + "," + params[1] + "}$").test(value);
                }, "Телефон без кода страны");

                //modify error messages
                jQuery.extend(jQuery.validator.messages, {
                    required: form_functions.t('required_field'),
                    email: form_functions.t('valid_email_required'),
                    equalTo: form_functions.t('passwords_dont_match'),
                    minlength: jQuery.validator.format(form_functions.t('min_length')),
                    number: form_functions.t('only_numbers')
                });

                //add rules to elements
                var validation_rules = {
                    fname: "required",
                    lname: "required",
                    areacode: "required",
                    phone: {
                        required: true,
                        light_phone: [6, 10]
                    },
                    //repass: 
                    //    equalTo: formElement.pass
                    //,
                    pass: {
                        required: true,
                        minlength: 8
                    },
                    email: {
                        required: true,
                        email: true
                    }
                };

                return validation_rules;
            };

            //bind validator
			
            $(formElement).validate({
                rules: genValidationRules(),
                errorClass: "form_error_msg",
                errorElement: "span",
                highlight: function (element) { form_functions.highlight(element); },
                unhighlight: function (element) { form_functions.unhighlight(element); }
            });
	}
	
	
	var BindEverything = function()
	{		
		InitValidator();
		ChangeCountryByCurrentIp();
		//bind step2 button
		$(formContainer).find(".btn-next").on("click",GoToStepTwo);
		//bind register button
		$(formContainer).find(".btn-reg").on("click",Register);
		//bind 
		$(formContainer).find(".popup .redirect_button").on("click",function(){
			window.location.href = serverUrl;
			//$(formContainer).find(".popup").addClass("hidden");
		});
	};
	
	BindEverything();
	
}


RegisterRegistrationForm();