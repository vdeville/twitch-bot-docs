$(document).ready(function(){$("#navbar ul li ul").each(function(){$(this).replaceWith("<div>"+$(this).html()+"</div>")});$("#navbar ul li div li").each(function(){$(this).replaceWith($(this).html())});$("#navbar ul li div").addClass("dropdown-menu");$("#navbar ul li div a").addClass("dropdown-item");var d=1;$("#navbar ul li div").each(function(){$(this).attr("aria-labelledby","navbarDropdownMenuLink"+d);var e=$(this).parent();e.addClass("dropdown");e.find("> a").addClass("dropdown-toggle").attr("id","navbarDropdownMenuLink"+(d++)).attr("data-toggle","dropdown").attr("aria-haspopup","true").attr("aria-expanded","false")});$("#navbar ul").addClass("navbar-nav mr-auto");$("#navbar ul li").addClass("nav-item");$("#navbar ul li > a").addClass("nav-link");$("#theme-color").attr("content",rgb2hex($("header nav").css("background-color")));tocbot.init({tocSelector:"#nav-toc",contentSelector:"#content > article",headingSelector:"h1, h2, h3"});var b=$("header nav");var a=$("#nav-toc");a.css("max-width",a.width());var c=parseInt(a.css("margin-top"))+parseInt(a.css("padding-top"));$(window).scroll(function(){if(a.height()+(c*2)>$(window).height()||$(window).width()<768){resetPosition(a);return}if(b.is(":in-viewport")){resetPosition(a)}else{a.css("position","fixed")}});$(window).resize(function(){if(b.is(":in-viewport")){a.css("max-width","");a.css("max-width",a.width())}if(a.height()+(c*2)>$(window).height()||$(window).width()<768){resetPosition(a)}});anchors.options.placement="left";anchors.add("article h1, article h2, article h3, article h4");$("#content h1").each(function(){$(this).html($(this).html()+'<span class="print no-print"></span>')});$(".print").click(function(){$("article").print()});if(window.location.hash.length>0){goToHash(undefined,decodeURI(window.location.hash))}$("a[href*=\\#]").on("click",function(e){goToHash(e,decodeURI(this.hash))});if(("code[class^='language-']").length){$("head").append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css"/>');$.getScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js",function(){$("pre code").each(function(e,f){hljs.highlightBlock(f)})})}$("table").each(function(){$(this).replaceWith('<div class="table-responsive"><table class="table table-bordered">'+this.innerHTML+"</table></div>")})});function goToHash(b,c){if(c.length==0){return}var a=$(c);if(!a.length){return}if(!typeof b==="undefined"){b.preventDefault()}$("html, body").animate({scrollTop:a.offset().top},500);if(history.pushState){history.pushState(null,null,c)}else{location.hash=c}}function rgb2hex(a){if(/^#[0-9A-F]{6}$/i.test(a)){return a}a=a.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);function b(c){return("0"+parseInt(c).toString(16)).slice(-2)}return"#"+b(a[1])+b(a[2])+b(a[3])}function resetPosition(a){a.css("position","")}function localize(b){for(var a in b){var c=a.split("&");switch(c[1].toLowerCase()){case"html":$(c[0]).html(b[a]);break;default:$(c[0]).attr(c[1],b[a]);break}}};