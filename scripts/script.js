var tiempoAp = 0;
var tiempo = 5;
var tamCola = 1;
var x = 20;
var y = 20;
var lienzo = $("#lienzo")[0];
var context = lienzo.getContext("2d");
var finish = false;
var inicio = false;
var cajas = [];
var bancoPreguntas = [];

//Conexión PHP con JavaScript, con Ajax, Jquery y metodo POST
function conexion(){
	for (var i = 1; i < 31; i++) {
		var parametros = {
			"id" : i
		};
		$.ajax({
			data:  parametros,
			url:   '/JuegoIO3/php/Gestor.php',
			type:  'post',
			beforeSend: function () {
			},
			success:  function (response) {
				var infoBanco=response.split("\n");
				bancoPreguntas.push(new pregunta(infoBanco[0],infoBanco[1],infoBanco[2],infoBanco[3],infoBanco[4],parseInt(infoBanco[5]),parseInt(infoBanco[6])));
				actual = bancoPreguntas[Math.floor((Math.random() * (bancoPreguntas.length-1)))];
			}
		});
	}
}

/*var bancoPreguntas = [new pregunta("¿Quien fue Tutankamón?","a. Un plomero","b. Un faraon","c. Un abogado","d. Un presidente",1,1),
					  new pregunta("¿Como se llama el tipo que hizo el script de este juego?","a. Norbey","b. Sebastian","c. Cristian","d. Camilo",2,2),
					  new pregunta("¿Que siginifica abyecto?","a. Preocupado","b. Hambriento","c. Sorprendido","d. Despreciable",3,3),
					  new pregunta("¿El Anthrax es producido por?","a. Un coco","b. Un bacilo","c. Una vibria","d. Un virus",1,4),
					  new pregunta("¿El albúm debut de metallica fue lanzado en el año?","a. 1983","b. 1990","c. 1991","d. 2000",0),5];
*/
var actual = bancoPreguntas[Math.floor((Math.random() * (bancoPreguntas.length-1)))];
var cajaPulsada = -1;
var cajaPorSeleccionar = -1;
vel = 1;
var puntaje = 0;

//Imagenes
var imgInicio = new ImgInicio();
var imgEnigma = new EnigmaMiniatura();
var fondo = new Fondo();
var cliente = new Cliente();
var cronometro = new Cronometro();
var dialogo = new Dialogo();
var opcion = new Opcion();
var opcionSel = new OpcionSel();
var tabPuntaje= new TabPuntaje();
var imgsEspera = new ImgEspera();
//Fin imagenes

//Sonidos
var sndFondo1 = new Audio("snds/Fondo1.wav");
var sndFondo2 = new Audio("snds/Fondo2.wav");
var sndFondo3 = new Audio("snds/Fondo3.wav");
var sndAcierto = new Audio("snds/acierto.mp3");
var sndError = new Audio("snds/error.mp3");
//Fin sonidos

cajas.push({
	x: 0, y: 0,
	width: 0, height: 0,
	color: '#00f'
});

cajas.push({
	x: 0, y: 0,
	width: 0, height: 0,
	color: '#00f'
});

cajas.push({
	x: 0, y: 0,
	width: 0, height: 0,
	color: '#00f'
});
	
cajas.push({
	x: 0, y: 0,
	width: 0, height: 0,
	color: '#00f'
});

lienzo.onclick = function(event){
	var cx = event.clientX - lienzo.getBoundingClientRect().left;
	var cy = event.clientY - lienzo.getBoundingClientRect().top;
	for (var i = 0; i < cajas.length; i++){
	if(cajas[i].x < cx 
	&& (cajas[i].width + cajas[i].x > cx)
	&& cajas[i].y < cy
	&& (cajas[i].height + cajas[i].y > cy)){
	cajaPulsada = i;
	break;
	}
	}
};

lienzo.onmousemove = function(event){
	var cx = event.clientX - lienzo.getBoundingClientRect().left;
	var cy = event.clientY - lienzo.getBoundingClientRect().top;
	for (var i = 0; i < cajas.length; i++){
	if(cajas[i].x < cx 
	&& (cajas[i].width + cajas[i].x > cx)
	&& cajas[i].y < cy
	&& (cajas[i].height + cajas[i].y > cy)){
		cajaPorSeleccionar = i;
		break;
	}else{
		cajaPorSeleccionar = -1;
	}
	}
};
	
window.onload = gameloop();

		
function pregunta(pre, op1, op2, op3, op4, opC, Np){
	this.Np = Np;
	this.pre = pre;
	this.op = [op1, op2, op3, op4];
	this.opC = opC;
}

function gameloop(){
	if(!finish){
		actualizar();
		dibujar();
		setTimeout("gameloop()",20);
	}
}
		
function actualizar(){
	if(inicio && tamCola<11){
	var ran = Math.floor((Math.random() * (bancoPreguntas.length-1)));
	tiempoAp+=vel;
	if(tiempoAp >= 51){
		tiempo-=1;
		tiempoAp = 0;
	}
	if(tiempo == -1){
		tamCola+=1;
		tiempo = 5;
	}
	if(cajaPulsada!=-1){
		if(cajaPulsada==actual.opC){
			sndAcierto.load();
			sndAcierto.play();
			tamCola-=1;
			if(tamCola==0){
				puntaje+=2;
			}else{
				puntaje+=1;
			}
			while(ran==actual.Np-1){
				ran = Math.floor((Math.random() * (bancoPreguntas.length-1)));
			}
			actual = bancoPreguntas[ran];
			if(puntaje >= 10 && puntaje < 20){
				vel=2;
				if(sndFondo2.muted){
					sndFondo1.muted = true;
					sndFondo1.pause();
					sndFondo2.muted = false;
					sndFondo2.play();
				}
			}
			if(puntaje >= 20){
				vel=4;
				if(sndFondo3.muted){
					sndFondo2.muted = true;
					sndFondo2.pause();
					sndFondo3.muted = false;
					sndFondo3.play();
				}
			}
		}else{
			sndError.load();
			sndError.play();
			tamCola+=1;
			while(ran==actual.Np-1){
				ran = Math.floor((Math.random() * 4));
			}
			actual = bancoPreguntas[ran];
		}
		cajaPulsada=-1;
	}
	}
}

function ImgInicio(){
	//Solo al inicio
	conexion();
	
	this.img = new Image();
	this.img.src = "imgs/Inicio.png";
	
	this.dibujar = function(ctx){
		ctx.save();
		ctx.drawImage(this.img,0,0,640,480);
		ctx.restore();
	}
}

function EnigmaMiniatura(){
	this.img = new Image();
	this.img.src = "imgs/EnigmaMin.png";
	
	this.dibujar = function(ctx,x1,y1,width,height){
		ctx.save();
		ctx.drawImage(this.img,x1,y1,width,height);
		ctx.restore();
	}
}

function Fondo(){
	this.img = new Image();
	this.img.src = "imgs/Fondo.png";
	
	this.dibujar = function(ctx){
		ctx.save();
		ctx.drawImage(this.img,0,0,640,480);
		ctx.restore();
	}
}

function Cliente(){
	this.img = new Image();
	this.img.src = "imgs/Cliente.png";
	
	this.dibujar = function(ctx, x1, x2){
		ctx.save();
		ctx.drawImage(this.img,x1,x2,50,50);
		ctx.restore();
	}
}

function Cronometro(){
	this.img = new Image();
	this.img.src = "imgs/Cronometro.png";
	
	this.dibujar = function(ctx){
		ctx.save();
		ctx.drawImage(this.img,10,380,50,80);
		ctx.restore();
	}
}

function Dialogo(){
	this.img = new Image();
	this.img.src = "imgs/Dialogo.png";
	
	this.dibujar = function(ctx){
		ctx.save();
		ctx.drawImage(this.img,70,10,500,100);
		ctx.restore();
	}
}

function Opcion(){
	this.img = new Image();
	this.img.src = "imgs/CajaN.png";
	
	this.dibujar = function(ctx,x1,y1,width,height){
		ctx.save();
		ctx.drawImage(this.img,x1,y1,width,height);
		ctx.restore();
	}
}

function OpcionSel(){
	this.img = new Image();
	this.img.src = "imgs/CajaS.png";
	
	this.dibujar = function(ctx,x1,y1,width,height){
		ctx.save();
		ctx.drawImage(this.img,x1,y1,width,height);
		ctx.restore();
	}
}

function TabPuntaje(){
	this.img = new Image();
	this.img.src = "imgs/puntaje.png";
	
	this.dibujar = function(ctx,x1,y1,width,height){
		ctx.save();
		ctx.drawImage(this.img,x1,y1,width,height);
		ctx.restore();
	}
}

function ImgEspera(){
	this.img = new Image();
	this.rnd = 0;
	
	this.dibujar = function(ctx){
		this.img.src = ("imgs/"+rnd+".jpg");
		ctx.save();
		ctx.drawImage(this.img,105,105,430,273);
		ctx.restore();
	}
	
	this.num = function(){
		rnd = Math.floor(Math.random()*8)+1;
	}
}
	
function dibujar(){
	
	if(!inicio){
		imgInicio.dibujar(context);
		context.fillStyle = "black";
		cajas[0].x = 425;
		cajas[0].y = 106;
		cajas[0].width = 145;
		cajas[0].height = 67;
		context.strokeRect(cajas[0].x, cajas[0].y, cajas[0].width , cajas[0].height);
		if(cajaPulsada!=-1){
			inicio = true;
			cajaPulsada=-1;
			sndFondo1.muted = true;
			sndFondo2.muted = true;
			sndFondo3.muted = true;
			sndFondo1.loop = true;
			sndFondo2.loop = true;
			sndFondo3.loop = true;
		}
	}
	
	if(sndFondo1.muted&&sndFondo2.muted&&sndFondo3.muted){
		sndFondo1.muted = false;
		sndFondo1.play();
	}
	
	if(tamCola<11&&inicio){
		fondo.dibujar(context);
		context.fillStyle = "cyan";
		imgEnigma.dibujar(context,13,10,50,60);
		context.fillStyle = "black";
		context.font = "italic 30px Times New Roman";
		//Cola
		if(tamCola<6){
			for(i=1; i<=tamCola; i++){
				cliente.dibujar(context, 13,20+i*50);
			}
		}else{
			for(i=1; i<6; i++){
				cliente.dibujar(context, 13,20+i*50);
			}
			context.fillStyle = "grey";
			context.fillRect(13,330,50,50);
			context.fillStyle = "black";
			context.strokeRect(13,330,50,50);
			context.fillText("+"+(tamCola-5),17,367);
		}
		//FinCola
		//Cronometro
		context.fillStyle = "red";
		context.font = "bold 30px Times New Roman";
		cronometro.dibujar(context);
		context.fillText(" "+tiempo,20,446);
		//Fin cronometro
		
		//Puntaje
		tabPuntaje.dibujar(context,390,390,200,80);
		context.fillStyle = "black";
		context.fillText("Puntaje: "+puntaje,400,417);
		//Fin puntaje
		if(tamCola==0){
			imgsEspera.dibujar(context);
			for(i = 0; i <4; i++){
				cajas[i].x = 0;
				cajas[i].y = 0;
				cajas[i].width = 0;
				cajas[i].height = 0;
			}
		}else{
			imgsEspera.num();
			dialogo.dibujar(context);
			context.fillStyle = "black";
			context.font = "italic 30px Times New Roman";
			ajusteDeTexto(actual.pre,130,50,400,30);
			context.font = "normal 30px Times New Roman";
			for(i = 0; i <4; i++){
				context.fillStyle = "green";
				cajas[i].x = 230;
				cajas[i].y = (70+(i+1)*60);
				cajas[i].width = actual.op[i].length*15;
				cajas[i].height = 30;
				if((cajaPorSeleccionar!=-1)&&(i==cajaPorSeleccionar)){
					opcionSel.dibujar(context,cajas[i].x-10, cajas[i].y-7, cajas[i].width+22 , cajas[i].height+17);
				}else{
					opcion.dibujar(context,cajas[i].x-10, cajas[i].y-7, cajas[i].width+20 , cajas[i].height+15);
				}
				context.fillStyle = "black";
				context.fillText(actual.op[i],238,(93+(i+1)*60));
			}
		}		
	}else if(inicio){
		for(i = 1; i <4; i++){
			cajas[i].x = 0;
			cajas[i].y = 0;
			cajas[i].width = 0;
			cajas[i].height = 0;
		}
		
		sndFondo1.muted = true;
		sndFondo1.pause();
		sndFondo2.muted = true;
		sndFondo2.pause();
		sndFondo3.muted = true;
		sndFondo3.pause();
		
		cajas[0].x = 230;
		cajas[0].y = 395;
		cajas[0].width = 140;
		cajas[0].height = 30;
		
		fondo.dibujar(context);
		context.fillStyle = "black";
		context.font = "italic 30px Times New Roman";
		imgEnigma.dibujar(context,130,140,170,200);
		opcion.dibujar(context,340,140,170,200);
		context.fillText("Game Over",355,200);
		context.fillText("P: "+puntaje,390,250);
		context.fillRect(cajas[0].x, cajas[0].y, cajas[0].width , cajas[0].height);
		context.fillStyle = "white";
		context.fillText("Reintentar",235,418);
		if(cajaPulsada!=-1){
			tamCola=1;
			puntaje=0;
			tiempo=5;
			tiempoAp=0;
			vel = 1;
			cajaPulsada = -1;
		}
	}
}

function ajusteDeTexto(texto, x, y, maxWidth, alturaDeLinea){
		var palabrasRy = texto.split(" ");
		var lineaDeTexto = "";
				for(var i = 0; i < palabrasRy.length; i++) {
				var testTexto = lineaDeTexto + palabrasRy[i] + " ";
				var textWidth = context.measureText(testTexto).width;
						if (textWidth > maxWidth  && i > 0) {
						context.fillText(lineaDeTexto, x, y);		
						lineaDeTexto = palabrasRy[i]+ " "
						y += alturaDeLinea;
						}else {
						lineaDeTexto = testTexto;
						}
				}
		context.fillText(lineaDeTexto, x, y);
}