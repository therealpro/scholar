/* =================================================================================================================================== */
//FACEBOOK STUFF
/*
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if(response.status === 'connected') {
  		// Logged into your app and Facebook.
  		testAPI();
	} 
	else if(response.status === 'not_authorized') {
  		// The person is logged into Facebook, but not your app.
  		document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
	} else {
  		// The person is not logged into Facebook, so we're not sure if
  		// they are logged into this app or not.
  		document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
  	statusChangeCallback(response);
	});
  document.getElementById('account').innerHTML = "<a id=\"account\" class=\"dropdown-toggle\" data-toggle=\"collapse\" href=\"#\"></a>";
}

window.fbAsyncInit = function() {
	FB.init({
	appId      : '922959764491949',
	cookie     : true,  // enable cookies to allow the server to access 
						// the session
	xfbml      : true,  // parse social plugins on this page
	version    : 'v2.2' // use version 2.2
});

// Now that we've initialized the JavaScript SDK, we call 
// FB.getLoginStatus().  This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.  They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//    your app or not.
//
// These three cases are handled in the callback function.

FB.getLoginStatus(function(response) {
	statusChangeCallback(response);
});

};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
	console.log('Welcome!  Fetching your information.... ');
	FB.api('/me', function(response) {
	  console.log('Successful login for: ' + response.name);
	  document.getElementById('status').innerHTML =
		'Thanks for logging in, ' + response.name + '!'; 
    change_account_display(response);
	});
}

FB.logout(function(response) {
   // Person is now logged out
}); */

/* ========================================================================================================================= */

/*window.onbeforeunload = function(event) {
	xmlhttp.onreadystatechange = function() {
										if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
											window.alert(xmlhttp.responseText);
										}
									};

	xmlhttp.open("GET","external/session_destroy.php");
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}*/

if((window.location.href.includes("/home")) || (window.location.href.includes("/shop")) || (window.location.href.includes("/cart"))) {
        try {
            $.mobile.loadingMessage = false; // Hides that stupid unnecessary loading message at bottom of jqm pages
        } catch(err) {
            
        }
}

// Test for illegal characters and valid email address strings
function validate_form_data(emailAddr, passwd, email_type, passwd_type, id) {
	// Optional args
	passwd = passwd || "";
	email_type = email_type || "";
	passwd_type = passwd_type || "";

	if(emailAddr == "null") {
		emailAddr = "blank@blank.com";	
	}

	if(passwd == "null") {
		passwd = "password";
	}

	$('#' + id).empty();
	if ((emailAddr == "") || (passwd == "")) { // This doesn't sort out the password verification ting
		$('#' + email_type).empty();
		$('#' + passwd_type).empty();
		//$('#' + id).html("Please fill in all the required fields");
		bootbox.alert("Please fill in all the required fields.");
		return false;
	}
		
	/*if (/^[a-zA-Z0-9-_\s ]*$/.test(usr) == false) {
		document.getElementById("response").innerHTML = "<p>Username contains illegal characters</p>";
		return false;
	}
	
	if ((usr.length < 5) || (usr.length > 20)) {
		document.getElementById("response").innerHTML = "<p>Username must be between 5 and 20 characters</p>";
		return false;
	}*/	
	
	if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailAddr) == false) {
		//$('#' + id).html("Email must have @ symbol and a valid domain e.g. '.com'");
		bootbox.alert("Email must have @ symbol and a valid domain e.g. '.com'");
		return false;
	}
	
	if (/\|\s/.test(passwd) == true) {
		//$('#' + id).html("Password cannot contain spaces or pipe character '|'");
		bootbox.alert("Password cannot contain spaces or pipe character '|'");
		return false;
	}
	
	if (passwd != null) {
		if ((passwd.length < 8) || (passwd.length > 16)) {
			//$('#' + id).html("Password must be between 8 and 16 characters");
			bootbox.alert("Password must be between 8 and 16 characters");
			return false;
		}
	} else { 
		return true; 
	}
}

/* ========================================================================================================================================================================================= */

function change_account_display() {
	if(window.location.href.includes("shop/music")) {
		var usernameList = '<ul class="dropdown-menu" id="usernameList">\
								<li><a href="../../../downloads">Downloads</a></li>\
								<li><a href="../../../settings">Settings</a></li>\
								<li><a href="#" onclick="sign_out()">Sign Out</a></li>\
						</ul>';
	} else if(window.location.href.includes("artists/")) {
		var usernameList = '<ul class="dropdown-menu" id="usernameList">\
								<li><a href="../../downloads">Downloads</a></li>\
								<li><a href="../../settings">Settings</a></li>\
								<li><a href="#" onclick="sign_out()">Sign Out</a></li>\
						</ul>';
    } else if(window.location.href.includes("external/") || window.location.href.includes("essays/")) {
		var usernameList = '<ul class="dropdown-menu" id="usernameList">\
								<li><a href="../downloads">Downloads</a></li>\
								<li><a href="../settings">Settings</a></li>\
								<li><a href="#" onclick="sign_out()">Sign Out</a></li>\
						</ul>';
	} else {
		var usernameList = '<ul class="dropdown-menu" id="usernameList">\
								<li><a href="downloads">Downloads</a></li>\
								<li><a href="settings">Settings</a></li>\
								<li><a href="#" onclick="sign_out()">Sign Out</a></li>\
							</ul>';
	}

	$("#accountList").replaceWith(usernameList);
}

function account_deleted_display() {
	var accountList = '<ul id="accountList" class="dropdown-menu">\
							<form role="form" id="signInFrm">\
								<div class="form-group">\
									<label id="signInEmailLbl" for="email">Email:</label>\
									<input type="text" class="form-control" id="signInEmail">\
									<br>\
									<label id="signInPasswordLbl" for="password">Password:</label>\
									<input type="password" class="form-control" id="signInPassword">\
									<p id="response" style="color: red"></p>\
									<input id="check" type="checkbox">  <label id="checkLbl">Stay logged in?</label>\
								</div>\
								<button id="signInBtn" type="button" onclick="sign_in()">Sign In</button><br><br>\
								<!--fb:login-button id="fb" scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button-->\
								<div id="status"></div>\
								<a id="forgotten" href="renew">Forgotten details?</a>\
								<br><br>\
								<a id="enrol" href="sign_up">Enrol</a>\
								<p id="emptyFields" style="color: red"></p>\
							</form>\
						</ul>';


	localStorage.clear();
	$("#usernameList").replaceWith(accountList);
}

/* ========================================================================================================================= */

// Transferring cookies between devices
function transfer_cookies(cookies) {
	for(var name in cookies) {
		var cookie = cookies[name];
		var item = JSON.parse(cookie);
		var itemID = JSON.stringify(item.ID);
		if(!$.cookie(item.ID)) {
			item = JSON.stringify(item);
			$.cookie(itemID, item, { expires: 7, path: "/" });
		} 
		//item = JSON.stringify(item);
		//window.alert(item);
	}
}

/* ========================================================================================================================= */

$(document).ready(function() {
	function delete_link() {
		if(window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
	   		xmlhttp = new XMLHttpRequest();
		} 
		else {
	  		// code for IE6, IE5
	  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}	

		xmlhttp.onreadystatechange = function() {
										if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
											window.alert(xmlhttp.responseText);
										}
									};


		xmlhttp.open("GET","../php/delete_link.php?link="+window.location.href,true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send();
	}
});
/* ========================================================================================================================== */

function verify_account() {
	var url = window.location.href;
	var hash = url.split("?")[1]

	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} 
	else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
									if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
										document.getElementById("para").innerHTML = xmlhttp.responseText;
										setTimeout(function(){ window.location.href = "https://scholar-records.uk/home"; }, 5000);
									}
								};
	//xmlhttp.open("GET","../external/verify_account.php?url="+window.location.href,true);
	xmlhttp.open("POST","../external/verify_account.php");
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(hash);
}


/* ============================================================================================================================= */

function sign_in() { // Change this name to something less obvious
	var signInEmail = "signInEmail";
	var signInPassword = "signInPassword";
	var email = document.forms["signInFrm"]["signInEmail"].value;
	var password = document.forms["signInFrm"]["signInPassword"].value;
	//var check = document.forms["SignInFrm"]["check"].value;
	var check = document.getElementById("check").checked;
	
	if (validate_form_data(email, password, signInEmail, signInPassword, 'response') == false) {
		return;
	} 

	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
   		xmlhttp = new XMLHttpRequest();
	} 
	else {
  		// code for IE6, IE5
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}	

	xmlhttp.onreadystatechange = function() {
									if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

										if (xmlhttp.responseText == -1) { 
											$("#response").html("Account unrecognised!");
											bootbox.alert("Account unrecognised!");
										} else if (xmlhttp.responseText == -2) {
											$("#response").html("Too many requests with this email address, locked out for 10 minutes");
											bootbox.alert("Too many requests with this email address, locked out for 10 minutes");
										} else {											
											localStorage.logged = true;
											location.reload();
										}
									}
								};

	if(window.location.href.includes("shop/music")) {
		xmlhttp.open("POST","../../../external/sign_in.php",true);
	} else if ((window.location.href.includes("shop/merch")) || (window.location.href.includes("artists/"))) {
		xmlhttp.open("POST","../../external/sign_in.php",true);
	} else if (window.location.href.includes("/essays/")) {
		xmlhttp.open("POST","../external/sign_in.php",true);
	} else if (window.location.href.includes("external/")) {
		xmlhttp.open("POST","sign_in.php",true);
	} else {
		xmlhttp.open("POST","external/sign_in.php",true);
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("email="+email + "&password="+password + "&check="+check);
}

/* ========================================================================================================================= */

function sign_out() {
	var accountList = '<ul id="accountList" class="dropdown-menu">\
							<form role="form" id="signInFrm">\
								<div class="form-group">\
									<label id="signInEmailLbl" for="email">Email:</label>\
									<input type="text" class="form-control" id="signInEmail">\
									<br>\
									<label id="signInPasswordLbl" for="password">Password:</label>\
									<input type="password" class="form-control" id="signInPassword">\
									<p id="response" style="color: red"></p>\
									<input id="check" type="checkbox">  <label id="checkLbl">Stay logged in?</label>\
								</div>\
								<button id="signInBtn" type="button" onclick="sign_in()">Sign In</button><br><br>\
								<!--fb:login-button id="fb" scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button-->\
								<div id="status"></div>\
								<a id="forgotten" href="renew">Forgotten details?</a>\
								<br><br>\
								<a id="enrol" href="sign_up">Enrol</a>\
								<p id="emptyFields" style="color: red"></p>\
							</form>\
						</ul>';

	$("#usernameList").replaceWith(accountList);

	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
   		xmlhttp = new XMLHttpRequest();
	} 
	else {
  		// code for IE6, IE5
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}	

	xmlhttp.onreadystatechange = function() {
									if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
										localStorage.clear();
										window.location.href = "https://scholar-records.uk/home";
									}
								};


	xmlhttp.open("GET","/external/sign_out.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}

/* ============================================================================================================================= */

function renew_details() {
	var email = document.forms["renewFrm"]["renewEmail"].value;
		
	cookie = get_cookies();
	if ((name == "PHPSESSID") || (name == "scholar_session") || (name == "_ga") || (name == "_gid") || (name == "_gat_gtag_UA_122075335_1")) {
		window.alert("Cannot complete this action while logged in...");
		return false;
	}
	/*if (validate_form_data(email, '', '', '','error') == false) {
		return;
	}
	
	else { */
    	if(window.XMLHttpRequest) {
    		// code for IE7+, Firefox, Chrome, Opera, Safari
       		xmlhttp = new XMLHttpRequest();
    	} 
		else {
      		// code for IE6, IE5
      		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    	}
    
		xmlhttp.onreadystatechange = function() {
										if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
											
										}
									};
	
		xmlhttp.open("POST","external/forgotten.php",true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("email="+email);

		document.getElementById("renewFrm").style.display = "none";
  	//}
}

function verify_password() {
	var password = document.forms["renewFrm"]["renewPassword"].value;
	var password2 = document.forms["renewFrm"]["renewPassword2"].value;

	if (password2 != password) {
		document.getElementById("error").innerHTML = "Passwords don't match!"
		return false;
	}

	var total = password + '|' + window.location.href + '\0';
	
	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} 
	else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
									if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
										if (xmlhttp.responseText == -1) {
											$("#info").html("AN ERROR HAS OCCURRED!");
											return false;
										} else if (xmlhttp.responseText == 0) {
											$("#info").html("YOUR PASSWORD HAS BEEN CHANGED!");	
										}
									}
								};
	xmlhttp.open("POST","external/verify_password.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("str="+total);

	$("#renewFrm").hide();
}

/* ============================================================================================================================= */

function verify_email() {
	var email = document.forms["renewFrm"]["renewEmail"].value;

	/*if (validate_form_data(email, password, signUpEmail, signUpPassword, 'error') == false) {			
		return;
	}*/

	var total = email + '|' + window.location.href + '\0';
	
	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} 
	else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
									if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
										if (xmlhttp.responseText == -1) {
											$("#info").html("AN ERROR HAS OCCURRED!");
											return false;
										} else if (xmlhttp.responseText == 0) {
											$("#info").html("YOUR EMAIL HAS BEEN CHANGED!");	
										}
									}
								};
	xmlhttp.open("POST","external/verify_email.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("str="+total);
}

/* ============================================================================================================================= */

function subscribe() {
	var email = document.getElementById('subscribeEmail').value;

	if (validate_form_data(email, "null", null, null, 'newsletterInfo') == false) {
		return;
	} 

	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} 
	else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
									if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
										bootbox.alert("Successfully subscribed to the Scholar newsletter");
										//document.getElementById('newsletterInfo').innerHTML = xmlhttp.responseText;
										//document.getElementById('subscribeEmail').value = "";
										$('#subscribeEmail').val("");
										setTimeout(function() {
											document.getElementById('newsletterInfo').innerHTML = "";
										}, 2000);
									}
								};
	
	if(window.location.href.includes("/external")) {
		xmlhttp.open("POST","subscribe.php",true);
	} else {
		xmlhttp.open("POST","external/subscribe.php",true);
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("email="+email);
}

/* ============================================================================================================================= */

function unsubscribe() {
	var email = document.getElementById('subscribeEmail').value;

	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} 
	else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
									if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
										document.getElementById('newsletterInfo').innerHTML = xmlhttp.responseText;
									}
								};
	xmlhttp.open("POST","external/unsubscribe.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("email="+email);
}

/* ========================================================================================================================= */

function resend() {
	var url = window.location.href;
	var id = url.split("?")[1]

	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} 
	else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
									if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
										location.reload();
									}
								};
	xmlhttp.open("POST","resend.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(id);
}

/* ============================================================================================================================= */

function show_passwd_box(id) {
	var emailFrm = '<form id="settingsFrm" method="post" action="https://scholar-records.uk/settings">\
						<a id="aliasLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Change alias</a><br><br>\
						<a id="passLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Change password</a><br><br>\
						<a id="unsubLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Unsubscribe from mailing list</a><br><br>\
						<a id="deleteLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Delete Account</a><br><br>\
						<p style="font-family: batang; font-size: 150%; color: white">Change email<p>\
				 		<label for="emailPassword">Enter your new email:</label><br>\
				 		<input id="newEmail" type="text" class="form-control" name="new_email" required autofocus style="width: 300px">\
				 		<span class="error" style="color: red"><?php if (isset($emailErr)) { echo " " . $emailErr; }?></span><br>\
				 		<label for="emailPassword">Enter your password:</label><br>\
				 		<input id="emailPassword" type="password" class="form-control" name="email_password" required autofocus style="width: 300px">\
				 		<span class="error" style="color: red"><?php if (isset($emailPasswordErr)) { echo " " . $emailPasswordErr; }?></span><br><br>\
				 		<input type="submit" name="submit" value="Submit">\
				 	</form>';

	var aliasFrm = '<form id="settingsFrm" method="post" action="https://scholar-records.uk/settings">\
				 		<a id="emailLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Change email</a><br><br>\
						<a id="passLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Change password</a><br><br>\
						<a id="unsubLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Unsubscribe from mailing list</a><br><br>\
						<a id="deleteLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Delete account</a><br><br>\
						<p style="font-family: batang; font-size: 150%; color: white">Change alias<p>\
						<label for="aliasPassword">Enter your new alias:</label><br>\
				 		<input id="newAlias" type="text" class="form-control" name="new_alias" required autofocus style="width: 300px">\
				 		<span class="error" style="color: red"><?php if (isset($aliasErr)) { echo " " . $aliasErr; }?></span><br>\
				 		<label for="alias">Enter your password:</label><br>\
				 		<input id="aliasPassword" type="password" class="form-control" name="alias_password" required autofocus style="width: 300px">\
				 		<span class="error" style="color: red"><?php if (isset($aliasPasswordErr)) { echo " " . $aliasPasswordErr; }?></span><br><br>\
				 		<input type="submit" name="submit" value="Submit">\
				 	</form>';

	var passwdFrm = '<form id="settingsFrm" method="post" action="https://scholar-records.uk/settings">\
						<a id="emailLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Change email</a><br><br>\
						<a id="aliasLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Change alias</a><br><br>\
						<a id="unsubLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Unsubscribe from mailing list</a><br><br>\
						<a id="deleteLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Delete account</a><br><br>\
						<p style="font-family: batang; font-size: 150%; color: white">Change password<p>\
				   		<p id="info1" style="font-family: batang; color:white">Passwords can use any character except spaces<br>and can range from 8-16 characters.<p>\
				   		<label for="currentPassword">Current password: </label><br>\
				   		<input id="currentPassword" type="password" class="form-control" name="current_password" required autofocus style="width: 300px">\
				   		<span class="error" style="color: red"><?php if (isset($currentErr)) { echo " " . $currentErr; }?></span><br>\
				  		<label for="newPassword1">New password: </label>\
				   		<input id="newPassword1" type="password" class="form-control" name="password1" required autofocus style="width: 300px">\
				   		<span class="error" style="color: red"><?php if (isset($passwordErr1)) { echo " " . $passwordErr1; }?></span><br>\
				   		<label for="newPassword2">Re-enter new password: </label>\
				   		<input id="newPassword2" type="password" class="form-control" name="password2" required autofocus style="width: 300px">\
				   		<span class="error" style="color: red"><?php if (isset($passwordErr2)) { echo " " . $passwordErr2; }?></span><br><br>\
				   		<input type="submit" name="submit" value="Submit">\
				   </form>';

	var unsubFrm = '<form id="settingsFrm" method="post" action="https://scholar-records.uk/settings">\
				    	<a id="emailLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Change email</a><br><br>\
				    	<a id="aliasLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Change alias</a><br><br>\
						<a id="passLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Change password</a><br><br>\
						<a id="deleteLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Delete account</a><br><br>\
						<p style="font-family: batang; font-size: 150%; color: white">Unsubscribe from mailing list <p>\
						<p id="info2" style="font-family: batang; color:white">You will not receive any future emails from us.<p>\
				 		<label for="unsubscribe">Enter your password:</label><br>\
				 		<input id="unsubPassword" type="password" class="form-control" name="unsub_password" required autofocus style="width: 300px">\
				 		<span class="error" style="color: red"><?php if (isset($unsubPasswordErr)) { echo " " . $unsubPasswordErr; }?></span><br><br>\
				 		<input type="submit" name="submit" value="Submit">\
				 	</form>';

	var deleteFrm = '<form id="settingsFrm" method="post" action="https://scholar-records.uk/settings">\
				   		<a id="emailLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Change email</a><br><br>\
				   		<a id="aliasLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Change alias</a><br><br>\
						<a id="passLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Change password</a><br><br>\
						<a id="unsubLink" onclick="show_passwd_box(this.id)" style="cursor: pointer">Unsubscribe from mailing list</a><br><br>\
						<p style="font-family: batang; font-size: 150%; color: white">Delete account<p>\
						<p id="info2" style="font-family: batang; color:white">You will lose all your downloads if you click delete.<p>\
				 		<label for="deleteAccount">Enter your password:</label><br>\
				 		<input id="deletePassword" type="password" class="form-control" name="delete_password" required autofocus style="width: 300px">\
				 		<span class="error" style="color: red"><?php if (isset($deletePasswordErr)) { echo " " . $deletePasswordErr; }?></span><br><br>\
				 		<input type="submit" name="submit" value="Delete" onclick="account_deleted_display()">\
				 	</form>';

	$("#error").remove();

	if (id == "emailLink") {		
		$("#settingsFrm").replaceWith(emailFrm);
	} else if (id == "aliasLink") {
		$("#settingsFrm").replaceWith(aliasFrm);
	} else if (id == "passLink") {
		$("#settingsFrm").replaceWith(passwdFrm);
	} else if (id == "unsubLink") {
		$("#settingsFrm").replaceWith(unsubFrm);
	} else if (id == "deleteLink") {
		$("#settingsFrm").replaceWith(deleteFrm);
	}

	//<button type="button" id="changeEmailBtn" onclick="change_email()">Submit</button>\
	//<button type="button" id="changePasswordBtn" onclick="change_password()">Submit</button><br>\
}

/* ========================================================================================================================= */

function change_email() {
	var email = document.getElementById("addr").innerHTML;
	var password = document.getElementById("emailInput").value; // Stupid naming for password input id

	/*if (validate_form_data('', password, '', '','error') == false) {
		window.alert("?");
		return;
	}*/
		
	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
   		xmlhttp = new XMLHttpRequest();
	} 
	else {
  		// code for IE6, IE5
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
									if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
										/*if (xmlhttp.responseText == -1) {
											$("#changeEmail").replaceWith('<p>AN ERROR OCCURRED!<p>');
											$("#changePassword").remove();
											$("#emailLbl").remove();
											return false;
										} else if (xmlhttp.responseText == 0) {
											$("#changeEmail").replaceWith('<p>A link has been sent to your email for you to change your email.<p>');	
											$("#changePassword").remove();
										}*/
										window.alert(xmlhttp.responseText);
									}
								};

	xmlhttp.open("POST","external/change_email.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("changeEmail="+email + "&changePassword="+password);
}

/* ========================================================================================================================= */

function change_password() {
	var email = document.getElementById("addr").innerHTML;
	var password = document.getElementById("passwordInput").value;

	/*if (validate_form_data('', password, '', '','error') == false) {
		window.alert("?");
		return;
	}*/
		
	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
   		xmlhttp = new XMLHttpRequest();
	} 
	else {
  		// code for IE6, IE5
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
									if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
										/*if (xmlhttp.responseText == -1) {
											$("#changeEmail").replaceWith('<p>AN ERROR OCCURRED!<p>');
											$("#changePassword").remove();
											$("#emailLbl").remove();
											return false;
										} else if (xmlhttp.responseText == 0) {
											$("#changeEmail").replaceWith('<p>A link has been sent to your email for you to reset your password.<p>');	
											$("#changePassword").remove();
										}*/
										window.alert(xmlhttp.responseText);
									}
								};

	xmlhttp.open("POST","external/change_password.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("changeEmail="+email + "&changePassword="+password);
}

/* ========================================================================================================================= */

function get_downloads() {
	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
   		xmlhttp = new XMLHttpRequest();
	} 
	else {
  		// code for IE6, IE5
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}	

	xmlhttp.onreadystatechange = function() {
									if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
										var j = 0; var info = [];
										for(var i = 1; i < xmlhttp.responseText.length; i++) {
											if(xmlhttp.responseText[i] == '@') {
												info = split_item_info(info);
												$("#downloads").append('<tr>\
																		<td>'+info[0]+'</td>\
																		<td>'+info[1]+'</td>\
																		<td>'+info[2]+'</td>\
																		<div class="download">\
																			<td><img id=\"'+info[3]+'\" alt=\"Download \''+info[0]+ '\' by ' +info[1]+ ' in ' +info[2]+' format\" src="../media/images/download-black.png"\
																					style="cursor: pointer; width: 30px; height: 30px;"\
																					onclick="download(this.id)">\
																			</td>\
																		</div>\
																		</tr>\
																		<br>\
															  ');
												j = 0;
											} else {
												info[j] = xmlhttp.responseText[i];
												j++;
											}
										}
									}
								};
	xmlhttp.open("GET","external/get_downloads.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}

/* ============================================================================================================================= */

// Strip track information for display on downloads page
function display_track_info(info) {
	var j = 0; var sep = 0;
	var a = [], b = [], c = [], d = [];
		for (i = 0; i < info.length; i++) {
			if ((info[i] != '|') && (sep == 0)) {
				a[i] = info[i];
				if (info[i+1] == '|') {
					i++; sep++;
				}
			} else if ((info[i] != '|') && (sep == 1)) {
				b[j] = info[i];
				if (info[i+1] == '|') {
					i++; sep++; j = 0;
					continue;
				} else {
					j++;
				}
			} else if ((info[i] != '|') && (sep == 2)) {
				c[j] = info[i];
				if (info[i+1] == '|') {
					i++; sep++; j = 0;
					continue;
				} else {
					j++;
				}
			} else if ((info[i] != '|') && (sep == 3)) {
				d[j] = info[i];
				if (info[i+1] == '|') {
					i++; sep++; j = 0;
					continue;
				} else {
					j++;
				}
			} 
		}

		a = a.toString(); a = a.replace(/\,/g,"");
		b = b.toString(); b = b.replace(/\,/g,"");
		c = c.toString(); c = c.replace(/\,/g,"");
		d = d.toString(); d = d.replace(/\,/g,"");		

		return arr = [a,b,c,d];
}

/* ========================================================================================================================= */

function update_downloads() {
	var cookies = get_cookies();
	// Make sure the cookies are digital products

	for(var name in cookies) {
		if ((name == "PHPSESSID") || (name == "scholar_session") || (name == "_ga") || (name == "_gid") || (name == "_gat_gtag_UA_122075335_1")) { // First cookie is PHPSESS, skip past this
			continue;
		} else {
			var cookie = $.cookie(name);
			item = JSON.parse(cookie);
			if (digital(item.format)) {
				if(window.XMLHttpRequest) {
					// code for IE7+, Firefox, Chrome, Opera, Safari
					xmlhttp = new XMLHttpRequest();
			    } 
				else {
					// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			    }
			  
			    xmlhttp.onreadystatechange = function() {
			    								if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			    									if (xmlhttp.response == -1) {
			      										window.alert("COULDN'T UPDATE DOWNLOADS!");
			      									} else if (xmlhttp.responseText == 0) {
			      										window.alert("NEW TRACKS ADDED TO YOUR ACCOUNT!");
			      									}
			      								}
			  	};
				xmlhttp.open("GET","external/update_downloads.php?idTrack="+item.ID,true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send();
			} else {
				continue;
			}
		}
	}

	// Separate for loop gets rid of physical product cookies
	document.getElementById("cart").innerHTML = "<span class=\"glyphicon glyphicon-shopping-cart\"></span> Cart(0)";
	for(var name in cookies) {
		if ((name == "PHPSESSID") || (name == "scholar_session") || (name == "_ga") || (name == "_gid") || (name == "_gat_gtag_UA_122075335_1")) { // First cookie is PHPSESS, skip past this
			continue;
		} else {
			$.removeCookie(name, { path: '/' });	
		} 
	}
}

/* ========================================================================================================================= */

function download(trackID) {
	//var id = localStorage.idUser.replace(/\s/g, '');// remove space from string
	//var total = trackID + '|' + id + '\0';

	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
    } 
	else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xmlhttp.onreadystatechange = function() {
    								if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	      								var loc = xmlhttp.responseText;
	    								location.replace(loc);
	    								//window.alert(xmlhttp.responseText);
      								}
  	};
	xmlhttp.open("GET","external/find.php?id="+trackID,true);
	xmlhttp.send();
}

/* ============================================================================================================================ */

$(document).keyup(function(e) {
	//var attr = $('#account')[0].hasAttribute("aria-expanded");

	var email = $('#signInEmail').val();
	var retVal = false;

 	/*$("#signInEmail").autocomplete({
		source: [email],
		close: function(e, ui) {
			//console.log("oh gosh!");
			retVal = true;
			//$('#signInEmail').autocomplete('enable');
			//return false;
		}
 	});*/

	var attr = $('#account').parent().hasClass('open');

	if ((e.keyCode == 13) && (attr == true) && ($("#signInEmail").is(":focus"))) { // escape key maps to keycode `27`
		$('#signInPassword').focus();
        //$('#accountList').parent().removeClass('open');
		return true;
    } else if ((e.keyCode == 13) && (attr == true) && ($("#signInPassword").is(":focus"))) { // escape key maps to keycode `27`
    	$('#signInBtn').focus();
    	$('#signInBtn').trigger("click");
        //$('#accountList').parent().removeClass('open');
		return true;
    } else if ((e.keyCode == 13) && (attr == true) && ($("#check").is(":focus")) && ($("#signInEmail").val() != "") && ($("#check").val() != "")) {
    	$('#signInBtn').focus();
    	$('#signInBtn').trigger("click");
    }
});

/* ============================================================================================================================== */

$(document).keyup(function(e) {
	//var attr = $('#newsletter')[0].hasAttribute("aria-expanded");
	var attr = $('#newsletter').parent().hasClass('open');

    if ((e.keyCode == 13) && (attr == true)){ // escape key maps to keycode `27`
        if($('#subscribeBtn').focus()) {
        	$('#subscribeBtn').trigger("click");
        }
        $('#newsletter').parent().removeClass('open');
		return true;
    }
});

/* ============================================================================================================================================================================================= */

$(document).ready(function() {
	/*if($('#accountList').css('display') == 'none') { window.alert();
		$('.dropdown open').toggleClass('dropdown');
		$('#account').attr('aria-expanded', "false");
	}*/

	$('body').on('click', function(e) {
		click_off(e);
	});

    $('body').on('tap', function(e) {
		click_off(e);
	});
});

/* ================================================================================================== */

function click_off(e){
		if((e.target.id == "signInFrm") || (e.target.id == "signInEmailLbl") || (e.target.id == "signInEmail") || (e.target.id == "signInPasswordLbl") || (e.target.id == "signInPassword") ||
		  ((e.target.id == "check") || (e.target.id == "checkLbl") || (e.target.id == "info") || e.target.id == "response") || (e.target.id == "status") || (e.target.id == "emptyFields") || 
		  (e.target.id == "account") || (e.target.id == "newsletter")) {
			return;
		} else if((e.target.id == "newsletterFrm") || (e.target.id == "newsletterEmailLbl") || (e.target.id == "subscribeEmail") || (e.target.id == "newsletterInfo")) {
			return;
		} else {
			attr = $('#account').parent().hasClass('open');
			//if((attr == true) && (display == 'none')) {
			if(attr == true) {
				$('#accountList').fadeOut(200);
				//$('#account').attr('aria-expanded', 'false');
				//$('#accountList').parent().removeClass('open');
			}
			
			attr = $('#newsletterList').parent().hasClass('open');
			if(attr == true) {
				$('#newsletterList').fadeOut(200);
				//$('#newsletter').attr('aria-expanded', 'false');
				//$('#newsletterList').parent().removeClass('open');
			}

			attr = $('#usernameList').parent().hasClass('open');
			if(attr == true) {
				$('#usernameList').fadeOut(200);
				//$('#account').attr('aria-expanded', 'false');
				//$('#usernameList').parent().removeClass('open');
			}

            attr = $('.navbar-menubuilder').hasClass('in');
			if(attr == true) {
				 $('.navbar-menubuilder').collapse('hide');
				//$('#account').attr('aria-expanded', 'false');
				//$('#usernameList').parent().removeClass('open');
			}

			$('#account').parent().removeClass('open');
			$('#newsletterList').parent().removeClass('open');
			$('#usernameList').parent().removeClass('open');
		}
}

/* ================================================================================================== */

$(document).ready(function() {
	$("#account").on('click', function() {
		var attr = $('#account')[0].hasAttribute("aria-expanded");

		if(attr == false) {
	    	$('#accountList').fadeToggle(200);
		} else if(attr == true) {
			$('#accountList').fadeToggle(200);
		}

		if(attr == false) {
	    	$('#usernameList').fadeToggle(200);
		} else if(attr == true) {
			$('#usernameList').fadeToggle(200);
		}

		attr = $('#newsletterList').parent().hasClass('open');
		if(attr == true) {
			$('#newsletterList').fadeOut(200);
		}

		$('#account').parent().removeClass('open');
		$('#newsletterList').parent().removeClass('open');
		$('#usernameList').parent().removeClass('open');
	});
});

/* ==================================================================================================== */


$(document).ready(function() {
	$("#newsletter").on('click', function() {
		var attr = $('#newsletterFrm')[0].hasAttribute("aria-expanded");

		if(attr == false) {
	    	$('#newsletterList').fadeToggle(200);
		} else if(attr == true) {
			$('#newsletterList').fadeToggle(200);
		}
		
		attr = $('#accountList').parent().hasClass('open');
		if(attr == true) {
			$('#accountList').fadeOut(200);
		}

		attr = $('#usernameList').parent().hasClass('open');
		if(attr == true) {
			$('#usernameList').fadeOut(200);
		}

		$('#account').parent().removeClass('open');
		$('#newsletterList').parent().removeClass('open');
		$('#usernameList').parent().removeClass('open');
	});
});

/* ==================================================================================================== */

$(document).ready(function() {
	$(window).scroll(function(){
		var top = $('#title').height();
		if($(this).scrollTop() >= top){
	    	$('.navbar-inverse').addClass('navbar-fixed-top');
	    	$('.navbar-inverse').css('margin-top', '0px');
		} else {
			$('.navbar-inverse').removeClass('navbar-fixed-top');
		}
	});
});
/* ==================================================================================================== */

/*window.addEventListener('load', function(){
    var audioPlayer = $('.audioPlayer');

    $('.releaseSizeHoverTop').on("tap", function(e){
		var releaseTop = $(this);
		var releaseBottom = $(this).parent().parent().find('img:eq(2)');
		var releaseTopUrl = $(this).parent();

    	$('.releaseSizeHoverTop').css('opacity', '0');
		$('.releaseSizeHoverTop').css('transition: opacity .25s ease-out');
		$('.releaseSizeHoverBottom').css('opacity', '0');
		$('.releaseSizeHoverBottom').css('transition: opacity .25s ease-out');

		if($(this).css('opacity') == 0.9){
			releaseTopUrl[0].addEventListener('touchstart', function(e){
    			$(releaseTopUrl).unbind('click');
    		});
		} else {
			e.preventDefault();
			$(this).css('opacity', '0.9');
			$(this).css('transition: opacity .25s ease-in');
    		$(releaseBottom).css('opacity', '0.9');
			$(releaseBottom).css('transition: opacity .25s ease-in');
		}
    });

    $('.releaseSizeHoverBottom').on("tap", function(e){
    	var releaseBottom = $(this);
		var releaseTop = $(this).parent().find('a').find('img');

    	$('.releaseSizeHoverTop').css('opacity', '0');
		$('.releaseSizeHoverTop').css('transition: opacity .25s ease-out');
		$('.releaseSizeHoverBottom').css('opacity', '0');
		$('.releaseSizeHoverBottom').css('transition: opacity .25s ease-out');

		if($(this).css('opacity') == 0.9) {
			releaseBottom[0].addEventListener('touchstart', function(e){
    			console.log(releaseBottom);
    			$(audioPlayer).unbind('click');
    		});
		} else {
			e.preventDefault();
			$(this).css('opacity', '0.9');
			$(this).css('transition: opacity .25s ease-in');
    		$(releaseTop).css('opacity', '0.9');
			$(releaseTop).css('transition: opacity .25s ease-in');
		}
    });
}, false);

window.addEventListener('load', function(){ window.alert();
    var audioPlayer = $('.audioPlayer');

    $('.shopSizeHoverTop').on("tap", function(e){
		var shopTop = $(this);
		var shopBottom = $(this).parent().parent().find('img:eq(2)');
		var shopTopUrl = $(this).parent();

    	$('.shopSizeHoverTop').css('opacity', '0');
		$('.shopSizeHoverTop').css('transition: opacity .25s ease-out');
		$('.shopSizeHoverBottom').css('opacity', '0');
		$('.shopSizeHoverBottom').css('transition: opacity .25s ease-out');

		if($(this).css('opacity') == 0.9){
			shopTopUrl[0].addEventListener('touchstart', function(e){
    			$(shopTopUrl).unbind('click');
    		});
		} else {
			e.preventDefault();
			$(this).css('opacity', '0.9');
			$(this).css('transition: opacity .25s ease-in');
    		$(shopBottom).css('opacity', '0.9');
			$(shopBottom).css('transition: opacity .25s ease-in');
		}
    });

    $('.shopSizeHoverBottom').on("tap", function(e){
    	var shopBottom = $(this);
		var shopTop = $(this).parent().find('img:eq(1)');

    	$('.shopSizeHoverTop').css('opacity', '0');
		$('.shopSizeHoverTop').css('transition: opacity .25s ease-out');
		$('.shopSizeHoverBottom').css('opacity', '0');
		$('.shopSizeHoverBottom').css('transition: opacity .25s ease-out');

		if($(this).css('opacity') == 0.9) {
			shopBottom[0].addEventListener('touchstart', function(e){
    			console.log(shopBottom);
    			$(audioPlayer).unbind('click');
    		});
		} else {
			e.preventDefault();
			$(this).css('opacity', '0.9');
			$(this).css('transition: opacity .25s ease-in');
    		$(shopTop).css('opacity', '0.9');
			$(shopTop).css('transition: opacity .25s ease-in');
		}
    });
}, false);*/


$(document).ready(function() { 
	$('.releaseSizeHoverTop').hover(function(){
		var top = $(this);
		var bottom = $(this).parent().parent().find('img:eq(2)');


		$(top).css('opacity', '0.9');
		$(top).css('transition: opacity .25s ease-in');
		$(bottom).css('opacity', '0.7');
		$(bottom).css('transition: opacity .25s ease-in');
	}, function() {
		var top = $(this);
		var bottom = $(this).parent().parent().find('img');

		$(top).css('opacity', '0');
		$(top).css('transition: opacity .25s ease-out');
		$(bottom).css('opacity', '0');
		$(bottom).css('transition: opacity .25s ease-out');
		$('.releaseSize').find('img:first').css('opacity', '1');
	});

	$('.releaseSizeHoverBottom').hover(function(){
		var bottom = $(this);
		var top = $(this).parent().find('a').find('img');

		$(bottom).css('opacity', '0.9');
		$(bottom).css('transition: opacity .25s ease-in');
		$(top).css('opacity', '0.7');
		$(top).css('transition: opacity .25s ease-in');
	}, function() {
		var bottom = $(this);
		var top = $(this).parent().parent().find('img');

		$(bottom).css('opacity', '0');
		$(bottom).css('transition: opacity .25s ease-out');
		$(top).css('opacity', '0');
		$(top).css('transition: opacity .25s ease-out');
		$('.releaseSize').find('img:first').css('opacity', '1');
	});
});

$(document).ready(function() { 
	$('.shopSizeHoverTop').hover(function(){
		var top = $(this);
		var bottom = $(this).parent().parent().find('img:eq(2)');


		$(top).css('opacity', '0.9');
		$(top).css('transition: opacity .25s ease-in');
		$(bottom).css('opacity', '0.7');
		$(bottom).css('transition: opacity .25s ease-in');
	}, function() {
		var top = $(this);
		var bottom = $(this).parent().parent().find('img:eq(2)');

		$(top).css('opacity', '0');
		$(top).css('transition: opacity .25s ease-out');
		$(bottom).css('opacity', '0');
		$(bottom).css('transition: opacity .25s ease-out');
		$('.shopSize').find('img:first').css('opacity', '1');
	});

	$('.shopSizeHoverBottom').hover(function(){
		var bottom = $(this);
		var top = $(this).parent().find('img:eq(1)');

		$(bottom).css('opacity', '0.9');
		$(bottom).css('transition: opacity .25s ease-in');
		$(top).css('opacity', '0.7');
		$(top).css('transition: opacity .25s ease-in');
	}, function() {
		var bottom = $(this);
		var top = $(this).parent().find('img:eq(1)');

		$(bottom).css('opacity', '0');
		$(bottom).css('transition: opacity .25s ease-out');
		$(top).css('opacity', '0');
		$(top).css('transition: opacity .25s ease-out');
		$('.shopSize').find('img:first').css('opacity', '1');
	});
});

$(document).ready(function() {
	if(window.location.href.includes("shop/music")) {
		var social = "<a href=\"https://www.facebook.com/ScholarRecordsUK\"><img src=\"../../../media/images/facebook.png\" alt=\"Facebook icon\"\"></a>\
					  <a href=\"https://twitter.com/Scholar_Records?lang=en-gb\"><img src=\"../../../media/images/twitter.png\" alt=\"Twitter icon\"\"></a>\
					  <a href=\"https://www.instagram.com/scholarrecords/\"><img src=\"../../../media/images/instagram.png\" alt=\"Instagram icon\"\"></a>\
					  <a href=\"https://www.youtube.com/channel/UCK89pjM3uWlWgKNTut3lztA\"><img src=\"../../../media/images/youtube.png\" alt=\"Youtube icon\"\"></a>\
					  <a href=\"https://www.soundcloud.com/scholar_records\"><img src=\"../../../media/images/soundcloud.png\" alt=\"Soundcloud icon\"\"></a>";
	} else if(window.location.href.includes("shop/merch") || window.location.href.includes("/artists")) {
		var social = "<a href=\"https://www.facebook.com/ScholarRecordsUK\"><img src=\"../../media/images/facebook.png\" alt=\"Facebook icon\"\"></a>\
					  <a href=\"https://twitter.com/Scholar_Records?lang=en-gb\"><img src=\"../../media/images/twitter.png\" alt=\"Twitter icon\"\"></a>\
					  <a href=\"https://www.instagram.com/scholarrecords/\"><img src=\"../../media/images/instagram.png\" alt=\"Instagram icon\"\"></a>\
					  <a href=\"https://www.youtube.com/channel/UCK89pjM3uWlWgKNTut3lztA\"><img src=\"../../media/images/youtube.png\" alt=\"Youtube icon\"\"></a>\
					  <a href=\"https://www.soundcloud.com/scholar_records\"><img src=\"../../media/images/soundcloud.png\" alt=\"Soundcloud icon\"\"></a>";
	} else if(window.location.href.includes("external") || window.location.href.includes("/essays/")) {
		var social = "<a href=\"https://www.facebook.com/ScholarRecordsUK\"><img src=\"../media/images/facebook.png\" alt=\"Facebook icon\"\"></a>\
					  <a href=\"https://twitter.com/Scholar_Records?lang=en-gb\"><img src=\"../media/images/twitter.png\" alt=\"Twitter icon\"\"></a>\
					  <a href=\"https://www.instagram.com/scholarrecords/\"><img src=\"../media/images/instagram.png\" alt=\"Instagram icon\"\"></a>\
					  <a href=\"https://www.youtube.com/channel/UCK89pjM3uWlWgKNTut3lztA\"><img src=\"../media/images/youtube.png\" alt=\"Youtube icon\"\"></a>\
					  <a href=\"https://www.soundcloud.com/scholar_records\"><img src=\"../media/images/soundcloud.png\" alt=\"Soundcloud icon\"\"></a>";
	} else {
		var social = "<a href=\"https://www.facebook.com/ScholarRecordsUK\"><img src=\"media/images/facebook.png\" alt=\"Facebook icon\"\"></a>\
					  <a href=\"https://twitter.com/Scholar_Records?lang=en-gb\"><img src=\"media/images/twitter.png\" alt=\"Twitter icon\"\"></a>\
					  <a href=\"https://www.instagram.com/scholarrecords/\"><img src=\"media/images/instagram.png\" alt=\"Instagram icon\"\"></a>\
					  <a href=\"https://www.youtube.com/channel/UCK89pjM3uWlWgKNTut3lztA\"><img src=\"media/images/youtube.png\" alt=\"Youtube icon\"\"></a>\
					  <a href=\"https://www.soundcloud.com/scholar_records\"><img src=\"media/images/soundcloud.png\" alt=\"Soundcloud icon\"\"></a>";
	} 

	var socialCheck = 0;
	var width = $(window).width();
	if((width <= 980) && (socialCheck == 0)) {
		$(".social").html("");
		$(social).appendTo(".navSocial");
		socialCheck = 1;
	} else if ((width > 980) && (socialCheck == 1)) {
		$(".navSocial").html("");
		$(social).appendTo(".social");
		socialCheck = 0; 
	}

	$(window).resize(function(){
		var width = $(window).width();
		if((width <= 980) && (socialCheck == 0)) {
			$(".social").html("");
			$(social).appendTo(".navSocial");
			socialCheck = 1;
		} else if ((width > 980) && (socialCheck == 1)) {
			$(".navSocial").html("");
			$(social).appendTo(".social");
			socialCheck = 0; 
		}
	});
});

$(document).ready(function() { 
	$('tr').hover(function(){
		$('tr').animate({
			height: 0.25,
		}, 100, function() {
    		opacity: 0;
  		});
  	});
});

// Incase escape is pressed, add back into stock
$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        adjust_stock("add");
    }
});	

/* ================================================================================================================================ */

// Temporary fix for tab table rendering
function table_reload() {
    $('.nav-tabs a[href="#menu2"]').tab('show');
    $('.nav-tabs a[href="#menu1"]').tab('show');
}

$(document).ready(function() {
	table_reload();
});

/* ================================================================================================================================ */

/*setInterval(function() {
	check_stock_cart();
}, 3000);*/


/* ================================================================================================================================ */

function check_stock(itemID) { // This tells the button on the music page to get lost if the product is out of stock
	var itemID = []; var i = 0; var index = 0; // Set index to minus one so returns index 0 on first run
	$('.physical').each(function () {
    	itemID.push(this.id);
	});

	function pass_item_id(i) {
		return itemID[i];
	}

	for(i = 0; i < itemID.length; i++) {
		if(window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
	   		xmlhttp = new XMLHttpRequest();
		} 
		else {
	  		// code for IE6, IE5
	  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xmlhttp.onreadystatechange = function() {
										if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
											var j = 0; // used for item id index
											if (xmlhttp.responseText == -1) {
												$("#error").html("AN ERROR OCCURRED");
												bootbox.alert("AN ERROR OCCURRED");
											} else if (xmlhttp.responseText == -2) {

											} else {
												var id = xmlhttp.responseText;
												id = id.replace(/\s/g, '');
												$('#'+id).replaceWith('<p style="font-family: batang; color: white">OUT OF STOCK<p>');
												$('.'+id).remove('.'+id);
												$('#buylp').remove();
												j++; 
												index++;
											}
										}
									};

		xmlhttp.open("GET","../../../external/stock.php?str="+itemID[i],false);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send();	
	}

	setTimeout(function() {
		session();
	}, 10);
}

/* ================================================================================================================================ */

function finalise_stock() { // Called when IPN confirms everything is ok and will delete order so the stock cannot be adjusted
	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
   		xmlhttp = new XMLHttpRequest();
	} 
	else {
  		// code for IE6, IE5
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

    xmlhttp.onreadystatechange = function() {
    								if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {}
  								};


	xmlhttp.open("POST","external/finalise_stock.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id="+localStorage.idUser);
}

/* ================================================================================================================================ */

function get_quantity() {
	var quantity = 0;
	//var cookies = get_cookies();
	var i = 0;

	if(!(cookies = get_cookies())) {
		$("#emptyMessage").show();
		//$("cart").html("<span class=\"glyphicon glyphicon-shopping-cart\"></span> Cart ("+ quantity +")");
		document.getElementById('cart').innerHTML = "<span class=\"glyphicon glyphicon-shopping-cart\"></span> Cart ("+ quantity +")";
		return;
	}

	for(var name in cookies) {
		if ((name == "PHPSESSID") || (name == "scholar_session") || (name == "_ga") || (name == "_gid") || (name == "_gat_gtag_UA_122075335_1")) { // First cookie is PHPSESS, skip past this
			continue;
		} else {
			var cookie = $.cookie(name);
			var item = JSON.parse(cookie);
			quantity = quantity + parseInt(item.qty);	
		}
	}
	quantity = parseInt(quantity);
	//$("cart").html("<span class=\"glyphicon glyphicon-shopping-cart\"></span> Cart ("+ quantity +")");
	document.getElementById('cart').innerHTML = "<span class=\"glyphicon glyphicon-shopping-cart\"></span> Cart ("+ quantity +")";

	return quantity;
}

/* ================================================================================================================================ */

function digital(itemFormat) {
	/*var pat1 = new RegExp("MP3");
	var pat2 = new RegExp("WAV");
	//if ((/^MP3$/.test(itemFormat)) || (/^WAV$/.test(itemFormat))) {
	if ((pat1.test(itemFormat)) || pat2.test(itemFormat)) {*/
	if ((itemFormat == "WAV") || (itemFormat == "MP3")) {
		return true;
	} else {
		return false;
	}
}

/* ================================================================================================================================ */

// Stupid longed out function separate strings, change to regex eventually
function split_item_info(info) {
	var j = 0; var sep = 0;
	var a = [], b = [], c = [], d = [];
		for (i = 0; i < info.length; i++) {
			if ((info[i] != '|') && (sep == 0)) {
				a[i] = info[i];
				if (info[i+1] == '|') {
					i++; sep++;
				}
			} else if ((info[i] != '|') && (sep == 1)) {
				b[j] = info[i];
				if (info[i+1] == '|') {
					i++; sep++; j = 0;
					continue;
				} else {
					j++;
				}
			} else if ((info[i] != '|') && (sep == 2)) {
				c[j] = info[i];
				if (info[i+1] == '|') {
					i++; sep++; j = 0;
					continue;
				} else {
					j++;
				}
			} else if ((info[i] != '|') && (sep == 3)) {
				d[j] = info[i];
				if (info[i+1] == '|') {
					i++; sep++; j = 0;
					continue;
				} else {
					j++;
				}
			}
		}

		a = a.toString(); a = a.replace(/\,/g,"");
		b = b.toString(); b = b.replace(/\,/g,"");
		c = c.toString(); c = c.replace(/\,/g,"");
		d = d.toString(); d = d.replace(/\,/g,"");

		return arr = [a,b,c,d];
}

function get_item(itemID) {
	if (localStorage.logged == null) {		 
		window.alert("Must be logged in to shop");
		return;
	} else {
		if(window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
	   		xmlhttp = new XMLHttpRequest();
		} 
		else {
	  		// code for IE6, IE5
	  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}	

		xmlhttp.onreadystatechange = function() {
										if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
											//window.alert(xmlhttp.responseText);
											var info = split_item_info(xmlhttp.responseText);
											bootbox.alert(info[3]);
										}
									};
		xmlhttp.open("GET","external/get_track.php?itemID="+itemID,true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send();
	}
}

/* ================================================================================================================================ */

$(document).ready(function() {
	if(window.location.href.includes("shop/music") || window.location.href.includes("shop/merch")) {
		var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", "jquery.magnific-popup.min.js");
        fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", "css/magnific-popup.css");

		$('.gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			gallery: {enabled:true},
			mainClass: 'mfp-with-zoom', // this class is for CSS animation below
		  	zoom: {
			    enabled: true, // By default it's false, so don't forget to enable it

			    duration: 300, // duration of the effect, in milliseconds
			    easing: 'ease-in-out', // CSS transition easing function

			    // The "opener" function should return the element from which popup will be zoomed in
			    // and to which popup will be scaled down
			    // By defailt it looks for an image tag:
			    opener: function(openerElement) {
			      // openerElement is the element on which popup was initialized, in this case its <a> tag
			      // you don't need to add "opener" option if this code matches your needs, it's defailt one.
			      return openerElement.is('img') ? openerElement : openerElement.find('img');
			    }
			}
		})
	}
});

/* ================================================================================================================================ */

function add_to_cart(f_type, itemID, itemName, itemArtist, itemFormat, itemPrice, digitalID, digitalName) {
	var item = { f_type:'', ID: 0, prod:'', artist:'', format:'', qty: 0, base: 0, sum: 0, digitalID: 0 };

	if (localStorage.logged != "true") { // If not logged in
		bootbox.alert("Must be logged in to shop");
		return;
	} else if ($.cookie(itemID) == null) { // First item put into basket, doesn't call get_cookies hence while this is a separate if
		if (f_type == "vinyl") { // If it's vinyl do the following
			item.f_type = f_type;
			item.ID = itemID;
			item.prod = itemName;
			item.artist = itemArtist;
			item.format = itemFormat;
			item.qty++;
			item.base = itemPrice;
			item.sum = item.qty * itemPrice;
			item.digitalID = digitalID;
			item = JSON.stringify(item);
			//include_digital("digital", digitalID, digitalName, itemArtist, "MP3", "0", digitalID);
			$.cookie(itemID, item, { expires: 7, path: "/" });
			$.amaran({
    			'message': itemName + ' ' + itemFormat + ' added to basket',
    			'position': 'bottom right',
    			'cssanimationIn': 'swing',
    			'cssanimationOut': 'bounceOut'
			});
			localStorage.quantity += 2;
		} else { // else treat all other products the same
			item.f_type = f_type;
			item.ID = itemID;
			item.prod = itemName;
			item.artist = itemArtist;
			item.format = itemFormat;
			item.qty++;
			item.base = itemPrice;
			item.sum = item.qty * itemPrice;
			item.digitalID = digitalID;
			item = JSON.stringify(item);
			$.cookie(itemID, item, { expires: 7, path: "/" });
			$.amaran({
    			'message': itemName + ' ' + itemFormat + ' added to basket',
    			'position': 'bottom right',
    			'cssanimationIn': 'swing',
    			'cssanimationOut': 'bounceOut'
			});
			localStorage.quantity++; // For shopping basket nav bar display
		}
	} else { // Else if there is at least one item in the basket, cookies have to be retrieved
		var cookies = get_cookies();
		var cookie = $.cookie(itemID);
		var item = JSON.parse(cookie);
		if ((digital(item.format)) && (parseInt(item.qty) > 0)) {
			$.amaran({
				'message': 'This item is already in your basket!',
				'position': 'bottom right',
				'cssanimationIn': 'swing',
    			'cssanimationOut': 'bounceOut'
			});
			return;
		} else if (f_type == "vinyl") {
			item.f_type = f_type;
			item.ID = itemID;
			item.prod = itemName;
			item.artist = itemArtist;
			item.format = itemFormat;
			item.qty++;
			item.base = itemPrice;
			item.sum = item.qty * itemPrice;
			item.digitalID = digitalID;
			item = JSON.stringify(item);
			$.cookie(itemID, item, { expires: 7, path: "/" });
			//include_digital("digital", digitalID,digitalName, itemArtist, "MP3", "0", digitalID);
			//window.alert($.cookie(itemID));
			$.amaran({
    			'message': itemName + ' ' + itemFormat + ' added to basket',
    			'position': 'bottom right',
    			'cssanimationIn': 'swing',
    			'cssanimationOut': 'bounceOut'
			});
			localStorage.quantity += 2; // For shopping basket nav bar display
		} else {
			cookie = $.cookie(itemID);
			item = JSON.parse(cookie);
			item.f_type = f_type;
			item.ID = itemID;
			item.prod = itemName;
			item.artist = itemArtist;
			item.format = itemFormat;
			item.qty++;
			item.base = itemPrice;
			item.sum = item.qty * itemPrice;
			item.digitalID = digitalID;
			item = JSON.stringify(item);
			//include_digital("digital", digitalID, digitalName, itemArtist, "MP3", "0", digitalID);
			$.cookie(itemID, item, { expires: 7, path: "/" });
			$.amaran({
				'message': itemName + ' ' + itemFormat + ' added to basket',
				'position': 'bottom right',
				'cssanimationIn': 'swing',
    			'cssanimationOut': 'bounceOut'
			});
			localStorage.quantity++;
		}		
	}

	get_quantity();

	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
   		xmlhttp = new XMLHttpRequest();
	} 
	else {
  		// code for IE6, IE5
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

    xmlhttp.onreadystatechange = function() {
    								if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    									
    								}
  								};


	xmlhttp.open("POST","../../../external/save_cookies_to_cookies.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}

/* ================================================================================================================================ */

// Includes mp3s with vinyl products
function include_digital(f_type, itemID, itemName, itemArtist, itemFormat, itemPrice, digitalID) {
	var item = { f_type:'', ID: 0, prod:'', artist:'', format:'', qty: 0, base: 0, sum: 0, digitalID: 0 };

	item.f_type = f_type;
	item.ID = itemID;
	item.prod = itemName;
	item.artist = itemArtist;
	item.format = itemFormat;
	item.qty++;
	item.base = itemPrice;
	item.sum = item.qty * itemPrice;
	item.digitalID = digitalID;
	item = JSON.stringify(item);
	$.cookie(itemID, item, { expires: 7, path: "/" });
}

/* ================================================================================================================================ */

function get_cookies() {
    var cookies = { };

    if (document.cookie && document.cookie != '') {
        var split = document.cookie.split('; ');
        for (var i = 0; i < split.length; i++) {
            var name_value = split[i].split("=");
            //name_value[0] = name_value[0].replace(/^ /, '');
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
        }
    }

    return cookies;
}

function sort_cookies() {
	var cookies = get_cookies();
	var array = [];
	var names = [];
	for(var name in cookies) {
		if ((name == "PHPSESSID") || (name == "scholar_session") || (name == "_ga") || (name == "_gid") || (name == "_gat_gtag_UA_122075335_1")) { // First cookie is PHPSESS, skip past this
			continue;
		} else {
			var cookie = $.cookie(name);
			array.push(cookie);
			names.push(name);
		}
	}
	
	array = array.sort();

	for(var name in array) {
		var item = JSON.parse(array[name]);
		$.removeCookie(item.ID, { path: '/' });
		$.cookie(item.ID, array[name], { expires: 7, path: "/" });
	}

	cookies = get_cookies();
	//console.log(cookies);
}

/* ================================================================================================================================ */

function save_cookies() {
	var lookup = document.getElementById('lookup').value; 

	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
   		xmlhttp = new XMLHttpRequest();
	} 
	else {
  		// code for IE6, IE5
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

    xmlhttp.onreadystatechange = function() {
    								if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    									/*var str = xmlhttp.responseText;
    									document.getElementById('custom').value = str.trim();*/
    								}
  								};


	xmlhttp.open("POST","external/save_cookies.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("lookup="+lookup);
}

/* ================================================================================================================================ */

function animate(id) {
	$(id).hover(function(){
    	$(this).animate({left: '250px'});
	});
}

/* ================================================================================================================================ */

function show_audio(trackName, trackPath, trackFormat) {
	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
    } 
	else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xmlhttp.onreadystatechange = function() {
    								if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	      								var trackPath = xmlhttp.responseText;
	      								$('.audioSource').attr('src', trackPath);
	      								if($('.audioPlayer').length == 0) {
		      								$.amaran({
											    content:{
											        themeName	:'audioPlayer',
											        tune	:trackName,
											        path 	:trackPath,
											        format 	:trackFormat,
											    },
											    'sticky'	:true,
											    themeTemplate:function(info){
											    	return '<p class="track" style="font-family: batang; font-size: 150%">' + info.tune + '<p>\
											    			<audio controls class="audioPlayer">\
																<source class="audioSource" src="' + info.path + '" type="' + info.format +'">\
															</audio>';
											    },
											    position:'bottom right',
											    closeOnClick:false,
											    closeButton:true
											});
		      							} else {
											$('.track').text(trackName);
											$('.audioSource').attr('type', trackFormat);
											$('.audioPlayer').load();
		      							}
      								}
  	};

  	if(window.location.href.includes("/shop/music")) {
		xmlhttp.open("GET","../../../external/get_preview.php?id="+trackPath,true);
		xmlhttp.send();
	} else {
		xmlhttp.open("GET","external/get_preview.php?id="+trackPath,true);
		xmlhttp.send();
	}

	/*if($('.audioPlayer').length) {
		//$('.audioPlayer').remove();
		$('.track').text(trackName);
		$('.audioSource').attr('type', trackFormat);
		$('.audioPlayer').load();

		return;
	}
	
	//var mq = window.matchMedia("(min-width: 500px)");

	//if (mq.matches) { 
		/*$.amaran({
		    content:{
		        themeName	:'audioPlayer',
		        tune	:trackName,
		        path 	:trackPath,
		        format 	:trackFormat,
		    },
		    'sticky'	:true,
		    themeTemplate:function(info){
		    	return '<p class="track" style="font-family: batang; font-size: 150%">' + info.tune + '<p>\
		    			<audio controls class="audioPlayer">\
							<source class="audioSource" src="' + info.path + '" type="' + info.format +'">\
						</audio>';
		    },
		    position:'bottom right'
		});
	/*} else {
		$.amaran({
		    content:{
		        themeName	:'audioPlayer',
		        tune	:trackName,
		        path 	:trackPath,
		        format 	:trackFormat,
		    },
		    'sticky'	:true,
		    themeTemplate:function(info){
		    	return '<p style="font-family: batang; font-size: 150%">' + info.tune + '<p>\
		    			<audio controls class="audioPlayer">\
							<source src="' + info.path + '" type="' + info.format +'">\
						</audio>';
		    },
		    position:'center'
		});
	}*/
}

/* ============================================================================================================================================= */

/*function resize_for_phone() {
		if ($(window).width() <= 480) {  
			$('.col-xs-2').toggleClass('.col-xs-2', '.col-centered');	
		} else {
			$('.col-centered').toggleClass('.col-centered', '.col-xs-2');
		}   
	});
}*/

function empty_cart() { 
	var cookies = get_cookies();
	var i = 0;

	for(var name in cookies) {
		if ((name == "PHPSESSID") || (name == "scholar_session") || (name == "_ga") || (name == "_gid") || (name == "_gat_gtag_UA_122075335_1")) { // First cookie is PHPSESS, skip past this
			continue;
		} else {
			var cookie = $.cookie(name);
			item = JSON.parse(cookie);
			// If item is digital don't bother trying to update stock
			/*if ((!digital(item.format))) {
				add_to_stock(item.ID);
			}*/

			$.removeCookie(name, { path: '/' });	
		}
		// Put the items back into stock if they've been placed on order list
	}

	if(window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
   		xmlhttp = new XMLHttpRequest();
	} 
	else {
  		// code for IE6, IE5
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

    xmlhttp.onreadystatechange = function() {
    								if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    									
    								}
  								};


	if((window.location.href.includes("/shop/music") || window.location.href.includes("/shop/merch"))) {
		//xmlhttp.open("POST","external/../../../../external/empty_cookies.php",true);
        xmlhttp.open("POST","../../../../external/empty_cookies.php",true);
	} else if(window.location.href.includes("/essays/")) {
            xmlhttp.open("POST","../external/empty_cookies.php",true);
    } else if(window.location.href.includes("/external")) {
            xmlhttp.open("POST","empty_cookies.php",true);
	} else {
		xmlhttp.open("POST","external/empty_cookies.php",true);
	}
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}

/* ============================================================================================================================================= */

function session() { // If not logged in
	if (localStorage.logged == undefined) {
		$(document).ready(function(){
			if(window.location.href.includes("cart")) {
				var table = new google.visualization.Table(document.getElementById('shoppingTable'));
				table.clearChart();

				$("#shoppingTable").append("<p style=\"color: white\">Your shopping basket is empty.<a href=\"\"> START SHOPPING!</a><p>");
				var basket = document.getElementsByClassName('basket');
				basket[0].remove();
				var ppButton = document.getElementById('ppButton');
				if(ppButton) //TEMP FIX
					ppButton.remove(); 
				var shippingLbl = document.getElementsByClassName('shipping');
				shippingLbl[0].remove();
				//$(".basket").remove();
				//$("#ppButton").remove();		
				//$(".shipping").remove();
			}
		});
	} else if (localStorage.logged == "true") { // If logged in
		var qty = get_quantity();
		$(document).ready(function(){
			if(window.location.href.includes("cart")) { 
				if (qty == 0) { 
					var table = new google.visualization.Table(document.getElementById('shoppingTable'));
					table.clearChart();
					$("#shoppingTable").append("<p style=\"color: white\">Your shopping basket is empty.<a href=\"\"> START SHOPPING!</a><p>");
					$('.shipping').remove();
					$(".basket").remove();
					//var basket = document.getElementsByClassName('basket');
					//basket[0].remove();
					$(".total").html("Total: £0.00");
					$("#ppButton").remove(); 
					//var ppButton = document.getElementById('ppButton');
					//ppButton.remove();
				}
			}
		});
		change_account_display();
	}
}
