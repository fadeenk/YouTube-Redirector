y =$(".yt-uix-button-content")[1].innerText.split(" ")[1].toString(); //look for sign in button
if( y != "in"){ //if dosent say sign in
   document.location = "http://www.youtube.com/feed/subscriptions"; //redirect
}
