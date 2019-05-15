/**
 * Indicate whether Javascript is enabled or supported by replacing the .no-js class on
 * the <html> element with a .js class.
 */

document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

var dkp=true;

if(!dkp) {
  document.querySelector(".dkp").style.display = "none";
}
