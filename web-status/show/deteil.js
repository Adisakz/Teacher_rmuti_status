const url = "https://status_api.pcnone.com/"

    fetch(url)
    .then((res) => res.json())
    .then(function(data){
        for(i=0;i<data.length;i++){
            if((data[i].name=='parsan') && (data[i].status=='0')){
              document.getElementById("p1").innerHTML = "ไม่อยู่"
              document.getElementById('p1').style.color = 'red';
              const myDiv = document.querySelector('.card:nth-of-type(1)');
              myDiv.style = "border:0.3vw solid red;";
            }
            else if((data[i].name=='parsan') && (data[i].status=='1')){
              document.getElementById("p1").innerHTML = "อยู่"
              document.getElementById('p1').style.color = 'green';
              const myDiv = document.querySelector('.card:nth-of-type(1)');
              myDiv.style = "border:0.3vw solid green;";
            }
            else if((data[i].name=='atirarj') && (data[i].status=='0')){
              document.getElementById("p2").innerHTML = "ไม่อยู่"
              document.getElementById('p2').style.color = 'red';
              const myDiv = document.querySelector('.card:nth-of-type(2)');
              myDiv.style = "border:0.3vw solid red;";
            }
            else if((data[i].name=='atirarj') && (data[i].status=='1')){
              document.getElementById("p2").innerHTML = "อยู่"
              document.getElementById('p2').style.color = 'green';
              const myDiv = document.querySelector('.card:nth-of-type(2)');
              myDiv.style = "border:0.3vw solid green;";
            }
            else if((data[i].name=='apiwat') && (data[i].status=='0')){
              document.getElementById("p3").innerHTML = "ไม่อยู่"
              document.getElementById('p3').style.color = 'red';
              const myDiv = document.querySelector('.card:nth-of-type(3)');
              myDiv.style = "border:0.3vw solid red;";
            }
            else if((data[i].name=='apiwat') && (data[i].status=='1')){
              document.getElementById("p3").innerHTML = "อยู่"
              document.getElementById('p3').style.color = 'green';
              const myDiv = document.querySelector('.card:nth-of-type(3)');
              myDiv.style = "border:0.3vw solid green;";
            }
            else if((data[i].name=='yotaka') && (data[i].status=='0')){
              document.getElementById("p4").innerHTML = "ไม่อยู่"
              document.getElementById('p4').style.color = 'red';
              const myDiv = document.querySelector('.card:nth-of-type(4)');
              myDiv.style = "border:0.3vw solid red;";
            }
            else if((data[i].name=='yotaka') && (data[i].status=='1')){
              document.getElementById("p4").innerHTML = "อยู่"
              document.getElementById('p4').style.color = 'green';
              const myDiv = document.querySelector('.card:nth-of-type(4)');
              myDiv.style = "border:0.3vw solid green;";
            }
            else if((data[i].name=='piyanuch') && (data[i].status=='0')){
              document.getElementById("p5").innerHTML = "ไม่อยู่"
              document.getElementById('p5').style.color = 'red';
              const myDiv = document.querySelector('.card:nth-of-type(5)');
              myDiv.style = "border:0.3vw solid red;";
            }
            else if((data[i].name=='piyanuch') && (data[i].status=='1')){
              document.getElementById("p5").innerHTML = "อยู่"
              document.getElementById('p5').style.color = 'green';
              const myDiv = document.querySelector('.card:nth-of-type(5)');
              myDiv.style = "border:0.3vw solid green;";
            }
            else if((data[i].name=='chaluemwut') && (data[i].status=='0')){
              document.getElementById("p6").innerHTML = "ไม่อยู่"
              document.getElementById('p6').style.color = 'red';
              const myDiv = document.querySelector('.card:nth-of-type(6)');
              myDiv.style = "border:0.3vw solid red;";
            }
            else if((data[i].name=='chaluemwut') && (data[i].status=='1')){
              document.getElementById("p6").innerHTML = "อยู่"
              document.getElementById('p6').style.color = 'green';
              const myDiv = document.querySelector('.card:nth-of-type(6)');
              myDiv.style = "border:0.3vw solid green;";
            }
            else if((data[i].name=='saweth') && (data[i].status=='0')){
              document.getElementById("p7").innerHTML = "ไม่อยู่"
              document.getElementById('p7').style.color = 'red';
              const myDiv = document.querySelector('.card:nth-of-type(7)');
              myDiv.style = "border:0.3vw solid red;";
            }
            else if((data[i].name=='saweth') && (data[i].status=='1')){
              document.getElementById("p7").innerHTML = "อยู่"
              document.getElementById('p7').style.color = 'green';
              const myDiv = document.querySelector('.card:nth-of-type(7)');
              myDiv.style = "border:0.3vw solid green;";
            }
            else if((data[i].name=='prapas') && (data[i].status=='0')){
              document.getElementById("p8").innerHTML = "ไม่อยู่"
              document.getElementById('p8').style.color = 'red';
              const myDiv = document.querySelector('.card:nth-of-type(8)');
              myDiv.style = "border:0.25vw solid red;";
            }
            else if((data[i].name=='prapas') && (data[i].status=='1')){
              document.getElementById("p8").innerHTML = "อยู่"
              document.getElementById('p8').style.color = 'green';
              const myDiv = document.querySelector('.card:nth-of-type(8)');
              myDiv.style = "border:0.25vw solid green;";
            }
            else if((data[i].name=='jagraphon') && (data[i].status=='0')){
              document.getElementById("p9").innerHTML = "ไม่อยู่"
              document.getElementById('p9').style.color = 'red';
              const myDiv = document.querySelector('.card:nth-of-type(9)');
              myDiv.style = "border:0.25vw solid red;";
            }
            else if((data[i].name=='jagraphon') && (data[i].status=='1')){
              document.getElementById("p9").innerHTML = "อยู่"
              document.getElementById('p9').style.color = 'green';
              const myDiv = document.querySelector('.card:nth-of-type(9)');
              myDiv.style = "border:0.25vw solid green;";
            }
            else if((data[i].name=='jakkrit') && (data[i].status=='0')){
              document.getElementById("p10").innerHTML = "ไม่อยู่"
              document.getElementById('p10').style.color = 'red';
              const myDiv = document.querySelector('.card:nth-of-type(10)');
              myDiv.style = "border:0.25vw solid red;";
            }
            else if((data[i].name=='jakkrit') && (data[i].status=='1')){
              document.getElementById("p10").innerHTML = "อยู่"
              document.getElementById('p10').style.color = 'green';
              const myDiv = document.querySelector('.card:nth-of-type(10)');
              myDiv.style = "border:0.25vw solid green;";
            }         
        }
         
    });

// Get the modal
var modal1 = document.getElementById("myModal1");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");
var modal4 = document.getElementById("myModal4");
var modal5 = document.getElementById("myModal5");
var modal6 = document.getElementById("myModal6");
var modal7 = document.getElementById("myModal7");
var modal8 = document.getElementById("myModal8");
var modal9 = document.getElementById("myModal9");
var modal10 = document.getElementById("myModal10");

// Get the button that opens the modal
var btn1 = document.getElementById("myBtn1");
var btn2 = document.getElementById("myBtn2");
var btn3 = document.getElementById("myBtn3");
var btn4 = document.getElementById("myBtn4");
var btn5 = document.getElementById("myBtn5");
var btn6 = document.getElementById("myBtn6");
var btn7 = document.getElementById("myBtn7");
var btn8 = document.getElementById("myBtn8");
var btn9 = document.getElementById("myBtn9");
var btn10 = document.getElementById("myBtn10");
// Get the <span> element that closes the modal
var span1 = document.getElementById("c1");
var span2 = document.getElementById("c2");
var span3 = document.getElementById("c3");
var span4 = document.getElementById("c4");
var span5 = document.getElementById("c5");
var span6 = document.getElementById("c6");
var span7 = document.getElementById("c7");
var span8 = document.getElementById("c8");
var span9 = document.getElementById("c9");
var span10 = document.getElementById("c10");
// When the user clicks the button, open the modal 
btn1.onclick = function() {
  modal1.style.display = "block";
}
btn2.onclick = function() {
  modal2.style.display = "block";
}
btn3.onclick = function() {
  modal3.style.display = "block";
}
btn4.onclick = function() {
  modal4.style.display = "block";
}
btn5.onclick = function() {
  modal5.style.display = "block";
}
btn6.onclick = function() {
  modal6.style.display = "block";
}
btn7.onclick = function() {
  modal7.style.display = "block";
}
btn8.onclick = function() {
  modal8.style.display = "block";
}
btn9.onclick = function() {
  modal9.style.display = "block";
}
btn10.onclick = function() {
  modal10.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modal1.style.display = "none"; 
}
span2.onclick = function() {
  modal2.style.display = "none"; 
}
span3.onclick = function() {
  modal3.style.display = "none"; 
}
span4.onclick = function() {
  modal4.style.display = "none"; 
}
span5.onclick = function() {
  modal5.style.display = "none"; 
}
span6.onclick = function() {
  modal6.style.display = "none"; 
}
span7.onclick = function() {
  modal7.style.display = "none"; 
}
span8.onclick = function() {
  modal8.style.display = "none"; 
}
span9.onclick = function() {
  modal9.style.display = "none"; 
}
span10.onclick = function() {
  modal10.style.display = "none"; 
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
  if (event.target == modal4) {
    modal4.style.display = "none";
  }
  if (event.target == modal5) {
    modal5.style.display = "none";
  }
  if (event.target == modal6) {
    modal6.style.display = "none";
  }
  if (event.target == modal7) {
    modal7.style.display = "none";
  }
  if (event.target == modal8) {
    modal8.style.display = "none";
  }
  if (event.target == modal9) {
    modal9.style.display = "none";
  }
  if (event.target == modal10) {
    modal10.style.display = "none";
  }
}