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

var bancoPreguntas = [
new pregunta("La protección del conocimiento ha tenido cambios significativos a partir de 1986 esto debido a :"
	,"a. las negociaciones comerciales de la Organización Mundial del Comercio"
	,"b. El inicio de Boom industrial."
	,"c. Las negociaciones Reagan-Xin"
	,"d.La ley de Protección al consumismo"
	,0,1),
new pregunta("Los activos intelectuales se crean cuando:"
	,"a. Se define un estandar para la protección del conocimiento basado en regla definidas por la OMC"
	,"b. se registra por escrito algún conocimiento que permite trasladar y socializar el conocimiento."
	,"c. Se crea un modo de medir el beneficio intelectual de una invención."
	,"d. El gobierno establece normativas sobre la creación de patentes."
	,1,2),
new pregunta("El siguiente hace parte de la propiedad intelectual:"
	,"a.Propiedad industrial"
	,"b.Propiedad Comercial."
	,"c.Derechos de uso"
	,"d.Derechos de distribución"
	,0,3),
new pregunta("De los siguientes cual no hace parte de la propiedad industrital:"
	,"a. Patentes"
	,"b. Modelos de utilidad"
	,"c. Software"
	,"d. Diseños industriales"
	,2,4),
new pregunta("De los siguientes cual no hace parte de los derechos de autor:"
	,"a. Literarios y artísticos"
	,"b. Obras cinematográficas"
	,"c. Algoritmos, fórmulas"
	,"d. Nombres y avisos comerciales"
	,3,5),
new pregunta("El software puede ser protegido en patentes en forma de:"
	,"a. Soporte lógico."
	,"b. Un dispositivo en si."
	,"c. Un sistema."
	,"d. Soporte físico."
	,0,6),
new pregunta("Para que una obra pueda ser objeto de protección a través de derechos de autor es indispensable que ésta se encuentre en forma:"
	,"a. virtual."
	,"b. material"
	,"c. ambas."
	,"d. Ninguna"
	,1,7),
new pregunta("El derecho de autor se basa en el principio de:"
	,"a. declaración de verdad"
	,"b. declaración examinada previamente"
	,"c. declaración de legalidad"
	,"d. ninguna de las anteriores"
	,0,8),
new pregunta("El primer régimen de patentes que presenta las principales características contemporáneas fue el adoptado en:"
	,"a. Venecia"
	,"b. Paris"
	,"c. Roma"
	,"d. Kansas"
	,0,9),
new pregunta("Mencione un ejemplo de un signo distintivo:"
	,"a. Patente"
	,"b. Secreto industrial"
	,"c. Diseño industrial"
	,"d. Nombre Comercial"
	,3,10),	
new pregunta("De acuerdo con “Trade Related Intellectual Property Issues” que no debe ser protegido:"
	,"a. Las invenciones en el áerea de computación"
	,"b. Las invenciones en el áerea de dispositivos"
	,"c.  es falso, todo debe ser protegido."
	,"d. métodos para terapias humanas."
	,3,11),
new pregunta("De los siguientes cual no es un requisito para obtener una patente:"
	,"a. Novedad universal"
	,"b. Grado inventivo."
	,"c. Aplicabilidad industrial."
	,"d. Presupuesto de producción."
	,3,12),
new pregunta("Son  una  forma  de  protección  exclusiva  para  variedades  vegetales. Mediante esta modalidad de la propiedad industrial, se protege el material de propagación de las plantas. La anterior definción se refiere a :"
	,"a. Secreto industrial"
	,"b. Patente"
	,"c. Derecho de obtentor"
	,"d. Derechos de autor"
	,2,13),
new pregunta("En la siguiente el plazo de protección no caduca:"
	,"a. Patentes"
	,"b. Secreto Industrial"
	,"c. Derechos de obtentor"
	,"d. Ninguna"
	,1,14),
new pregunta("En la siguiente no se debe solicitar el registro ante una entidad gubernamental:"
	,"a. Secreto Industrial"
	,"b. Patentes"
	,"c. Derechos de obtentor"
	,"d. Ninguna"
	,0,15),
new pregunta("Para las Bitácoras de investigación el titulo recomendado es:"
	,"a. Patentes"
	,"b. Derechos de obtentor"
	,"c. Secreto Industrial"
	,"d. Ninguna"
	,2,16),
new pregunta("El titulo Derechos de autor, es recomendable para:"
	,"a. Variedades vegetales"
	,"b. Procesos de producción"
	,"c. Productos"
	,"d. Modelos matemáticos"
	,3,17),
new pregunta("El titulo Secreto industrial, es recomendable para:"
	,"a. Circuitos integrados"
	,"b. Procesos de producción"
	,"c. Procedimiento de calidad"
	,"d. Modelos matemáticos"
	,2,18),
new pregunta("Si un software es protegido como soporte lógico, es probable que el producto en si este protegido por:"
	,"a. Patentes"
	,"b. Derechos de obtentor"
	,"c. Secreto Industrial"
	,"d. Ninguna"
	,0,19),
new pregunta("El Objeto de protección de una patente es:"
	,"a. Invención"
	,"b. Información que le confiera una ventaja competitiva a la empresa"
	,"c. Variedades vegetales"
	,"d. Ninguna"
	,0,20),
new pregunta("Un hito histórico de la propiedad intelectual es:"
	,"a. Convenio de Berna para la protección de las obras literarias y artísticas."
	,"b. Convenio de Viena para la protección de las obras literarias y artísticas."
	,"c. Arreglo de Paris relativo al Registro Internacional de Marca."
	,"d. Arreglo de Viena relativo al Registro Internacional de Marca."
	,0,21),
new pregunta("Un tipo de protección de la propiedad intelectual es:"
	,"a. Patente de utilidad."
	,"b. Diseños industriales."
	,"c. Diseños de utilidad."
	,"d. Patente de marca."
	,1,22),
new pregunta("Una de las 4 estrategias de patentamiento que define Archibugi y Pianta es:"
	,"a. La patente selectiva, donde las organizaciones sólo patentan invenciones muy específicas o estratégicas."
	,"b. El patentamiento desenfrenado, donde se recurre continuamente a la solicitud de patentes como forma de proteger sus invenciones."
	,"c. La estrategia de bloqueo, donde se patenta con el propósito de bloquear competidores más que con el fin de introducir innovaciones."
	,"d. El patentamiento sistemático, donde se recurre continuamente a la solicitud de patentes como forma de proteger sus invenciones."
	,3,23),
new pregunta("Cual es el tiempo de duración de una patente para el sistema legal de México?"
	,"a. 5 años."
	,"b. 20 años."
	,"c. 15 años."
	,"d. 30 años."
	,1,24),
new pregunta("Una de las razones que suelen citarse como las preponderantes en la consideración de las patentes como fuente de información tecnológica, es:"
	,"a. El resumen o la información detallada de la invención describen específicamente la solución o la posible solución a un problema determinado."
	,"b. La información de patentes desperdicia tiempo y facilita las labores iniciales de la investigación industrial."
	,"c. El resumen o la información detallada de la invención describen los materiales a utilizar."
	,"d. La información de patentes desperdicia tiempo y complica las labores iniciales de la investigación industrial."
	,0,25),
new pregunta("Uno de los sitios electrónicos de bancos de patentes es:"
	,"a. Banco estadounidense de patentes."
	,"b. Oficina mexicana de patentes."
	,"c. Banco mexicano de patentes."
	,"d. Banco canadiense de patentes."
	,2,26),
new pregunta("Una de las partes de una patente es:"
	,"a. Conclusiones."
	,"b. Reivindicaciones."
	,"c. Metodología."
	,"d. Marco teórico."
	,1,27),
new pregunta("Uno de los elementos que conforman la gestión de la propiedad intelectual es:"
	,"a. Adquisición de licencias para la investigación."
	,"b. Auditoria inventiva."
	,"c. Selección de tecnología."
	,"d. Licenciamiento de propiedad intelectual."
	,0,28),
new pregunta("Que porcentaje le corresponde a un inventor en la UNAM?"
	,"a. 100%"
	,"b. 50%"
	,"c. 20%"
	,"d. 40%"
	,3,29),
new pregunta("Una consideración sobre secretos industriales es:"
	,"a. No se deben realizar ponencias ni artículos los investigadores para evitar fugas de información estratégica."
	,"b. La información que comprenda un secreto industrial no debe estar en un soporte físico por riesgo a robo."
	,"c. No se deben realizar ponencias ni artículos el personal administrativo para evitar fugas de información estratégica."
	,"d. Las personas que tienen acceso a dicha información deberán firmar acuerdos de secrecía y, de preferencia, en los contratos laborales se incluirán disposiciones relativas a la confidencialidad del secreto industrial."
	,3,30),
new pregunta("Un hito histórico de la propiedad intelectual es:"
	,"a. Convenio de París para la protección de la propiedad industria."
	,"b. Convenio de París para la protección de las obras literarias y artísticas."
	,"c. Arreglo de Madrid relativo al depósito internacional de dibujos y modelos industriales."
	,"d. Arreglo de la Haya relativo al Registro Internacional de Marca."
	,0,31),
new pregunta("Un tipo de protección de la propiedad intelectual es:"
	,"a. Patente de utilidad"
	,"b. Secretos industriales"
	,"c. Diseños de utilidad"
	,"d. Patente de marca"
	,1,32),
new pregunta("Una de las 4 estrategias de patentamiento que define Archibugi y Pianta es:"
	,"a. La patente selectiva, donde las organizaciones sólo patentan invenciones muy específicas o estratégicas."
	,"b. El patentamiento desenfrenado, donde se recurre continuamente a la solicitud de patentes como forma de proteger sus invenciones."
	,"c. La estrategia de bloqueo, donde se patenta con el propósito de bloquear competidores más que con el fin de introducir innovaciones."
	,"d. El patentamiento de bloqueo es una estrategia en la cual se patenta con el propósito de bloquear competidores más que con el fin de introducir innovaciones."
	,3,33),
new pregunta("¿Cuál es el tiempo de duración de una patente para el sistema legal de Colombia?"
	,"a. 5 años."
	,"b. 20 años."
	,"c. 15 años."
	,"d. 30 años."
	,1,34),
new pregunta("Una de las razones que suelen citarse como las preponderantes en la consideración de las patentes como fuente de información tecnológica, es:"
	,"a. El resumen o la información detallada de la invención permite desarrollar hipótesis respecto a las posibles tendencias del desarrollo tecnológico e industrial en cada rama, en cada producto y en cada proceso."
	,"b. La información de patentes desperdicia tiempo y facilita las labores iniciales de la investigación industrial."
	,"c. El resumen o la información detallada de la invención describen los materiales a utilizar."
	,"d. La información de patentes desperdicia tiempo y complica las labores iniciales de la investigación industrial."
	,0,35),
new pregunta("Uno de los sitios electrónicos de bancos de patentes es:"
	,"a. Banco estadounidense de patentes."
	,"b. Oficina mexicana de patentes."
	,"c. Oficina alemana de patentes."
	,"d. Banco canadiense de patentes."
	,2,36),
new pregunta("Una de las partes de una patente es:"
	,"a. Conclusiones."
	,"b. Memoria descriptiva."
	,"c. Metodología."
	,"d. Marco teórico."
	,1,37),
new pregunta("Uno de los elementos que conforman la gestión de la propiedad intelectual es:"
	,"a. Valuación de propiedad intelectual."
	,"b. Auditoria inventiva."
	,"c. Selección de tecnología."
	,"d. Licenciamiento de propiedad intelectual."
	,0,38),
new pregunta("¿Qué porcentaje le corresponde a un inventor del MIT?"
	,"a. 100%"
	,"b. 67.4%"
	,"c. 25%"
	,"d. 28.3%"
	,3,39),39];

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