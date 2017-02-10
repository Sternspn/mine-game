thisfloor = 0;
liftBtn = document.querySelectorAll('.lift-btn label');
floor = document.querySelectorAll('.floors');
doors = document.querySelectorAll('.door');
p = 0.1;
hl = 0;

SoundLiftMove = new Audio();
SoundLiftMove.src = 'sounds/SoundLiftMove.mp3';

function MetanHealth(hl) {
	if (hl == 0) {
		document.querySelector('.health span').innerHTML = 'Норма';
		document.querySelector('.health span').style.color = 'black';
	}
	if (hl > 2) {
		document.querySelector('.health span').innerHTML = 'Легкое головокружение';
		document.querySelector('.health span').style.color = 'black';
	}
	if (hl > 5.5) {
		document.querySelector('.health span').innerHTML = 'Слабость';
		document.querySelector('.health span').style.color = 'black';
	}
	if (hl > 8.5) {
		document.querySelector('.health span').style.color = 'black';
		document.querySelector('.health span').innerHTML = 'Болит голова, дыхание затруднено';
	}
	if (hl > 11.5) {
		document.querySelector('.health span').style.color = 'red';
		document.querySelector('.health span').innerHTML = 'Еле дышу, галлюцинации, клонит в сон';
	}
	if (hl > 15) {
		document.querySelector('.health span').style.color = 'red';
		document.querySelector('.health span').innerHTML = 'Потеря сознания';
	}
}

function MetanDng(p) {
	if (hl > 16) {
		GameOver();
		return false;
	} 
	else if (p > 1.5) {
		document.querySelector('#metan-p').style.color = 'red';
		document.querySelector('#metan-z').style.color = 'red';
		if (typeof(resp) == 'undefined'){hl++;}
		else {hl+=0.2;}
	}
	else {
		document.querySelector('#metan-p').style.color = 'black';
		document.querySelector('#metan-z').style.color = 'black';
		if (hl > 0) {hl--;}
	}
	MetanHealth(hl);
	document.querySelector('#hls').innerHTML = hl;

}

function GameOver() {
	if (typeof(MetanId) !== 'undefined') {clearInterval(MetanId);}
		
	ITS = document.querySelectorAll('.items');
	ITS.forEach(i => i.remove());
	liftBtn.forEach(f => f.style.display = 'none');
	doors.forEach(d => d.style.display = 'none');
	document.querySelector('.this-floor').style.display = 'none';
	document.querySelector('.metan').style.display = 'none';
	document.querySelector('.mainvision').style.transition = 'background 2s';
	document.querySelector('.mainvision').style.background = 'black';

	var SoundSoundDeath = new Audio();
  		SoundSoundDeath.src = 'sounds/SoundDeath.mp3';
  		SoundSoundDeath.play();

	document.querySelector('.message p').innerHTML = 'Вы погибли. Обновите страницу, чтобы начать заново.';

}

function openD() {
	var SoundLiftOpen = new Audio();
  		SoundLiftOpen.src = 'sounds/SoundLiftOpen.mp3';
  		SoundLiftOpen.autoplay = true;

  		SoundWind = new Audio();
  		SoundWind.src = 'sounds/SoundWind.mp3';
  		SoundWind.loop = true;
  		SoundWind.play();

	SoundLiftMove.pause();
	doors.forEach(d => d.style.width = '20px');

	if (p > 1.5) {
		setTimeout(Сough, 1500);
		function Сough() {
			var SoundСough = new Audio();
			  	SoundСough.src = 'sounds/SoundСough.mp3';
			  	SoundСough.play();
		}
	}

	liftBtns();
}

function liftBtns() {
	liftBtn.forEach(f => f.style.visibility = 'visible');
}

function closeD() {
	var SoundLiftClose = new Audio();
  		SoundLiftClose.src = 'sounds/SoundLiftClose.mp3';
  		SoundLiftClose.autoplay = true;
	var doors = document.querySelectorAll('.door');

	doors.forEach(d => d.style.width = '309px');
	if (p > 3) {
		p = 2.9;
	}
}

function lift() {
	var SoundBtn = new Audio();
  		SoundBtn.src = 'sounds/SoundBtn.mp3';
  		SoundBtn.autoplay = true;
	
	for (i = 0; i < floor.length ; i++) {
		if (floor[i].checked) {
			if (floor[i].value == thisfloor) {
				document.querySelector('.message p').innerHTML = 'Я уже на этом этаже.';
				return false;
			}
			else {
				fl = floor[i].value;
				document.querySelector('.message p').innerHTML = 'Еду на ' + fl + ' этаж.';
				closeD();
				liftBtn.forEach(f => f.style.visibility = 'hidden');
				setTimeout(liftmove, 600, fl);
				setTimeout(liftmoveS, 1100, fl);
			}
		}
	}
}
	
function liftmove(fl) {
	document.querySelector('.this-floor span').innerHTML = thisfloor;
	document.querySelector('#metan-p').innerHTML = p.toFixed(1);
	MetanDng(p);
	SoundWind.pause();
		
		if (fl > thisfloor) {
			setTimeout(liftmove, 800, fl);
			thisfloor++;
			p = p - 0.4;
		}
		else if(fl < thisfloor) {
			setTimeout(liftmove, 800, fl);
			thisfloor--;
			p = p + 0.4;
		}
		else {
			setTimeout(openD, 1000);
			setTimeout(liftBtns, 1000);
			setTimeout(events, 1000, fl);
		}
}

function liftmoveS(fl) {
	SoundLiftMove.load();
	SoundLiftMove.play();
}

function events(fl) {
	
	if (fl == 0) {
		document.querySelector('.mainvision').style.background = 'url(images/fl0.jpg)';
		document.querySelector('.message p').innerHTML = 'Здесь хотя бы можно отдышаться...';
		if (hl > 0) {
			hl--;
		}
	} 
	if (fl == -1) {
		document.querySelector('.mainvision').style.background = 'url(images/fl1.jpg)';
		document.querySelector('.message p').innerHTML = 'На этом этаже всего лишь комната отдыха...';
		if (document.querySelector('.notes1') !== null) {document.querySelector('.notes1').style.display = 'block';}
	}
	else {
		if (document.querySelector('.notes1') !== null) {document.querySelector('.notes1').style.display = 'none';}
	}
	if (fl == -2) {
		document.querySelector('.mainvision').style.background = 'url(images/fl2.jpg)';
		document.querySelector('.message p').innerHTML = 'Здесь должны были остаться противогазы и само-спасатели. Воздушный насос, вроде, ниже.';
		if (document.querySelector('.respirator') !== null) {document.querySelector('.respirator').style.display = 'block';}
	}
	else {
		if (document.querySelector('.respirator') !== null) {document.querySelector('.respirator').style.display = 'none';}
	}
	if (fl == -3) {
		document.querySelector('.mainvision').style.background = 'url(images/fl3.jpg)';
		document.querySelector('.message p').innerHTML = 'Это, должно быть, главный штрек...';
		if (document.querySelector('.notes2') !== null) {document.querySelector('.notes2').style.display = 'block';}
	}
	else {
		if (document.querySelector('.notes2') !== null) {document.querySelector('.notes2').style.display = 'none';}
	}
	if (fl == -4) {
		document.querySelector('.mainvision').style.background = 'url(images/fl4.jpg)';
		document.querySelector('.message p').innerHTML = 'Кажется, здесь расположены вентиляционные агрегаты.';
		if (document.querySelector('.notes3') !== null) {document.querySelector('.notes3').style.display = 'block';}
	}
	else {
		if (document.querySelector('.notes3') !== null) {document.querySelector('.notes3').style.display = 'none';}
	}
	if (fl == -5) {
		document.querySelector('.mainvision').style.background = 'url(images/fl5.jpg)';
		if (typeof(jack) == 'undefined'){
			doors.forEach(d => d.style.width = '295px');
			document.querySelector('.message p').innerHTML = 'Внешнюю дверь лифта заклинило...';
		} 
		else if (jack == 1){
			doors.forEach(d => d.style.width = '295px');
			setTimeout("doors.forEach(d => d.style.width = '20px')", 2300); 
			document.querySelector('.message p').innerHTML = 'Самое время применить распорку...';
			jack = 2;
		}
		else {
			document.querySelector('.message p').innerHTML = 'Судя по всему, здесь произошел взрыв газа, проход завален.';
		}
		if (document.querySelector('.notes4') !== null) {document.querySelector('.notes4').style.display = 'block';}
	}
	else {
		if (document.querySelector('.notes4') !== null) {document.querySelector('.notes4').style.display = 'none';}
	}
	if (fl == -6) {
		document.querySelector('.mainvision').style.background = 'url(images/fl6.jpg)';
		document.querySelector('.message p').innerHTML = 'Внешняя дверь не открывается до конца, нужна распорка...';
		doors.forEach(d => d.style.width = '295px');
	}
	if (fl == -7) {
		MetanId = setInterval(Metan7, 3000);
		function Metan7() {
			p += 0.8;
			MetanDng(p);
			document.querySelector('#metan-p').innerHTML = p.toFixed(1);
			if (p > 20) {
			 	clearInterval(MetanId);
			}
			if (thisfloor !== -7) {
				clearInterval(MetanId);
			}
		}

		document.querySelector('.mainvision').style.background = 'url(images/fl7.jpg)';
		document.querySelector('.message p').innerHTML = 'Штрек затоплен. Концентрация газа на этом этаже максимальна. Здесь опасно долго находиться... Кажется, под водой остались какие-то инструменты.';
		if (document.querySelector('.water') !== null) {document.querySelector('.water').style.display = 'block';}
		if (document.querySelector('.water') == null && document.querySelector('.screw_jack') !== null) {document.querySelector('.screw_jack').style.display = 'block';}
	}
	else {
		if (document.querySelector('.water') !== null) {document.querySelector('.water').style.display = 'none';}
		if (document.querySelector('.screw_jack') !== null) {document.querySelector('.screw_jack').style.display = 'none';}
		}
}

function Rem_notes1() {
		document.querySelector('.notes1').remove(); 
		document.querySelector('.message p').innerHTML = 'Тут свежие записи:<br>"10:00 - Спускаемся. Вентиляция опять работает вполсилы, пора нахрен менять инженерную команду.<br>15:00 - Сработал датчик концентрации газа! Срочно вывожу своих.<br>15:15 - Как назло у Олега и новичков наряд на дальний штрек. Предупредил их по рации, но ждать больше не могу. Надеюсь на само-спасателях выберутся. Поднимаюсь."';
}

function Rem_notes2() {
		document.querySelector('.notes2').remove(); 
		document.querySelector('.message p').innerHTML = '"Хочу довести до руководства, хоть и чувствую себя из-за этого стремно... Вообщем механик наш, Андрей, он толи подбухивает, толи чем-то похлеще загоняется. Порой бубнит что-то под нос, смотрит в точку, на слова не сразу реагирует. Короче сранный он. Пацаны его сторонятся. И правильно..."';
}

function Rem_notes3() {
		document.querySelector('.notes3').remove(); 
		document.querySelector('.message p').innerHTML = '"12.04 - Движок пока тарахтит, но это ненадолго. Заказал детали.<br>14.04 - Тарахтит и тарахтит, тарахтит и тарахтит! Не могу больше терпеть, остановлю внепланово, смажу.<br>17.04 - Этой железной скотине лишь бы жрать, все уже поменял, что ей неймется!?<br>18.04 - Сволочь, как живая. Сказать мне что-то хочет. Ну ничего, детали пришли, возьмусь за нее, когда дверь на 5-м уважу, ато та тоже в печали."';
}

function Rem_notes4() {
		document.querySelector('.notes4').remove(); 
		document.querySelector('.message p').innerHTML = '"Четвертые записи"';
}

function Rem_respirator() {
		document.querySelector('.respirator').remove();
		document.querySelector('.tools').innerHTML += '<br><span>Противогаз</span>';
		document.querySelector('.message p').innerHTML = 'Отлично. С противогазом у меня будет значительно больше времени на ремонт.';
		resp = 1;

		var SoundBreath = new Audio();
  		SoundBreath.src = 'sounds/SoundBreath.mp3';
  		SoundBreath.autoplay = true;
}

function Rem_water() {
		if (typeof(bravery) == 'undefined') {
			document.querySelector('.message p').innerHTML = 'Ох, нужно собраться с духом, чтобы рыться в этой жиже...';
			bravery = 1;
		}
		else if (bravery == 1) {
			document.querySelector('.message p').innerHTML = 'Сейчас, сейчас... Жаль, что не захватил перчатки...';
			bravery = 2;
		}
		else if (bravery == 2) {
			liftBtn.forEach(f => f.style.visibility = 'hidden');
			document.querySelector('.water').remove();
			document.querySelector('.message p').innerHTML = 'Ну ладно, посмотрим, что там может быть...';
			
			var SoundWater = new Audio();
  				SoundWater.src = 'sounds/SoundWater.mp3';
  				SoundWater.autoplay = true;

			setTimeout(liftBtns, 5000);
			setTimeout("document.querySelector('.message p').innerHTML = 'Распорка! Винтовая! Их просто не могло не быть в шахте...'", 5000);
			setTimeout("document.querySelector('.screw_jack').style.display = 'block'", 5000);
		}
}

function Rem_screw_jack() {
		document.querySelector('.screw_jack').remove();
		document.querySelector('.tools').innerHTML += '<br><span>Винтовая распорка</span>';
		document.querySelector('.message p').innerHTML = 'Думаю, я найду ей применение.';
		jack = 1;
}