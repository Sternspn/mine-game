thisfloor = 0; //Текущий этаж
liftBtn = document.querySelectorAll('.lift-btn label'); //Массив из кнопок лифта с лэйблами
floor = document.querySelectorAll('.floors'); //Массив из радиокнопок для проверки нажатия
doors = document.querySelectorAll('.door'); //Массив из двух элементов - двух дверей лифта. Используется в нескольких функциях
p = 0.1; //Процент концентрации метана
hl = 0; //Состояние здоровья

SoundLiftMove = new Audio(); //Звук движения лифта, используется в нескольких функциях
SoundLiftMove.src = 'sounds/SoundLiftMove.mp3';

SoundRadio = new Audio();
SoundRadio.src = 'sounds/SoundRadio.mp3';

function MetanHealth(hl) {
	if (hl == 0) {
		document.querySelector('.health span').innerHTML = 'Норма';
		document.querySelector('.health span').style.color = 'black';
	}
	if (hl > 2.4) {
		document.querySelector('.health span').innerHTML = 'Легкое головокружение';
		document.querySelector('.health span').style.color = 'black';
	}
	if (hl > 5.8) {
		document.querySelector('.health span').innerHTML = 'Слабость';
		document.querySelector('.health span').style.color = 'black';
	}
	if (hl > 8.6) {
		document.querySelector('.health span').style.color = 'black';
		document.querySelector('.health span').innerHTML = 'Болит голова, дыхание затруднено';
	}
	if (hl > 12.4) {
		document.querySelector('.health span').style.color = 'red';
		document.querySelector('.health span').innerHTML = 'Еле дышу, клонит в сон';
	}
	if (hl > 15.2) {
		document.querySelector('.health span').style.color = 'red';
		document.querySelector('.health span').innerHTML = 'Теряю сознание';
	}
}

function MetanDng(p) {
	if (hl > 16) {
		GameOver();
		if (typeof(MetanId) !== 'undefined') {clearInterval(MetanId);}
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
	}
	MetanHealth(hl);
	//document.querySelector('#hls').innerHTML = hl;

}

function GameOver() {
	ITS = document.querySelectorAll('.items');
	ITS.forEach(i => i.remove());
	
	document.querySelector('.this-floor').style.display = 'none';
	document.querySelector('.metan').style.display = 'none';
	document.querySelector('.lift-btn').style.display = 'none';
	document.querySelector('.mainvision').style.transition = '6s';
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

	SoundCough = new Audio();
	SoundCough.src = 'sounds/SoundCough.mp3';

	if (thisfloor !== -1) {SoundWind.play();}

	SoundLiftMove.pause();
	doors.forEach(d => d.style.width = '20px');

	if (p > 1.5 && typeof(resp) == 'undefined') {
		setTimeout(Сough, 1500);
	}

	liftBtns();
}

function Сough() {
	SoundCough.play();
}

function liftBtns() {
	liftBtn.forEach(f => f.style.display = 'block');
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
	if (hl > 16) {
		GameOver();
		return false;
	}
	if (typeof(liftstop2) == 'undefined') { 
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
					liftBtn.forEach(f => f.style.display = 'none');
					setTimeout(liftmove, 1000, fl);
					setTimeout(liftmoveS, 1300, fl);
				}
			}
		}
	}
	else {
		liftBtn.forEach(f => f.style.display = 'none');
		document.querySelector('.message p').innerHTML = 'Ну!? Только этого не хватало! Лифт не работает! Я не хочу здесь остаться навечно... Думай!';
		
		SoundFear1 = new Audio();
		SoundFear1.src = 'sounds/SoundFear1.mp3';
		SoundFear1.volume = 0.4;

		setTimeout("SoundFear1.play()", 2500);
		setTimeout("document.querySelector('.message p').innerHTML = 'Так, посмотрим... Нужно выставить контакты в рабочее положение для перезапуска...<br>Рядом со вторым рядом, на панели накорябана цифра 4.'", 4000);
		setTimeout("document.querySelector('.panel').style.display = 'block'", 4000);
		
		MetanId = setInterval(Metan6, 4500);
		function Metan6() {
			MetanDng(p);
			if (thisfloor !== -6) {
				clearInterval(MetanId);
			}
		}
	}
}

function liftmove(fl) {
	document.querySelector('.this-floor span').innerHTML = thisfloor;
	document.querySelector('#metan-p').innerHTML = p.toFixed(1);
	MetanDng(p);
	SoundWind.pause();
	SoundRadio.pause();
	
	if (fl > thisfloor) {
		setTimeout(liftmove, 1700, fl);
		thisfloor++;
		p = p - 0.4;
	}
	else if(fl < thisfloor) {
		setTimeout(liftmove, 1700, fl);
		thisfloor--;
		p = p + 0.4;
	}
	else {
		setTimeout(openD, 1700);
		setTimeout(liftBtns, 1700);
		setTimeout(events, 1700, fl);
	}
}

function liftmoveS(fl) {
	SoundLiftMove.load();
	SoundLiftMove.play();
}

function events(fl) {
	
	if (fl == 0) {
		document.querySelector('.mainvision').style.background = 'url(images/fl0.jpg)';
		if (hl > 5.8) {
			hl = 3.8;
			MetanDng(p);
		}
		if (typeof(d2) !== 'undefined' && d2 == 3 && typeof(liftstop1) == 'undefined') {
			document.querySelector('.message p').innerHTML = 'Нужно еще убедиться, что система заработала, сделав замер в глубине главного штрека.';
		} else {
			document.querySelector('.message p').innerHTML = 'Здесь хотя бы можно отдышаться...';
		}
		
		if (typeof(victory) !== 'undefined') {
			document.querySelector('.this-floor').style.display = 'none';
			document.querySelector('.metan').style.display = 'none';
			document.querySelector('.lift-btn').style.display = 'none';
			document.querySelector('.mainvision').style.transition = '6s';
			document.querySelector('.mainvision').style.background = 'white';
			document.querySelector('.message p').innerHTML = 'Ну наконец-то свежий воздух! Я сделал это!<br>Победа!';
			SoundWind.pause();
		}
	} 
	if (fl == -1) {
		document.querySelector('.mainvision').style.background = 'url(images/fl1.jpg)';
		document.querySelector('.message p').innerHTML = 'На этом этаже всего лишь комната отдыха...';
		document.querySelector('.radio').style.display = 'block';
		if (document.querySelector('.notes1') !== null) {document.querySelector('.notes1').style.display = 'block';}
		if (typeof(d2) !== 'undefined'){
			if (document.querySelector('.details2') !== null) {document.querySelector('.details2').style.display = 'block';}
		}
		if (typeof(rd) !== 'undefined') {
			SoundRadio.load();
			SoundRadio.play();
		}
	}
	else {
		document.querySelector('.radio').style.display = 'none';
		if (document.querySelector('.notes1') !== null) {document.querySelector('.notes1').style.display = 'none';}
		if (document.querySelector('.details2') !== null) {document.querySelector('.details2').style.display = 'none';}
	}
	if (fl == -2) {
		document.querySelector('.mainvision').style.background = 'url(images/fl2.jpg)';
		document.querySelector('.message p').innerHTML = 'Здесь хранится инвентарь, в том числе ИСЗ. Воздушный насос, вроде, ниже.';
		if (document.querySelector('.box') !== null) {document.querySelector('.box').style.display = 'block';}
		if (document.querySelector('.box') == null && document.querySelector('.respirator') !== null) {document.querySelector('.respirator').style.display = 'block';}
	}
	else {
		if (document.querySelector('.box') !== null) {document.querySelector('.box').style.display = 'none';}
		if (document.querySelector('.respirator') !== null) {document.querySelector('.respirator').style.display = 'none';}
	}
	if (fl == -3) {
		document.querySelector('.mainvision').style.background = 'url(images/fl3.jpg)';
		document.querySelector('.message p').innerHTML = 'Это, должно быть, главный штрек...';
		document.querySelector('.tunnel').style.display = 'block';
		if (document.querySelector('.notes2') !== null) {document.querySelector('.notes2').style.display = 'block';}
		if (typeof(d2) !== 'undefined' && typeof(shadow) == 'undefined') {
			document.querySelector('.tunnel').style.display = 'none';
			var SoundFear = new Audio();
			SoundFear.src = 'sounds/SoundFear2.mp3';
			SoundFear.autoplay = true;
			document.querySelector('.shadow').style.display = 'block';
			setTimeout("document.querySelector('.shadow').style.display = 'none'", 1200);
			setTimeout("document.querySelector('.tunnel').style.display = 'block'", 1200);
			setTimeout("document.querySelector('.message p').innerHTML = 'Твою мать! Кто там!? ...Я, кажется, все-таки надышался...'", 1200);
			shadow = 1;
		}
	}
	else {
		document.querySelector('.tunnel').style.display = 'none';
		if (document.querySelector('.notes2') !== null) {document.querySelector('.notes2').style.display = 'none';}
	}
	if (fl == -4) {
		document.querySelector('.mainvision').style.background = 'url(images/fl4.jpg)';
		document.querySelector('.message p').innerHTML = 'Кажется, здесь расположены вентиляционные агрегаты.';
		if (document.querySelector('.ventilation') !== null) {document.querySelector('.ventilation').style.display = 'block';}
		if (document.querySelector('.notes3') !== null) {document.querySelector('.notes3').style.display = 'block';}
	}
	else {
		if (document.querySelector('.notes3') !== null) {document.querySelector('.notes3').style.display = 'none';}
		if (document.querySelector('.ventilation') !== null) {document.querySelector('.ventilation').style.display = 'none';}
	}
	if (fl == -5) {
		document.querySelector('.mainvision').style.background = 'url(images/fl5.jpg)';
		if (typeof(jack5) == 'undefined'){
			doors.forEach(d => d.style.width = '295px');
			document.querySelector('.message p').innerHTML = 'Внешнюю дверь лифта заклинило...';
		} 
		else if (jack5 == 1){
			liftBtn.forEach(f => f.style.display = 'none');
			doors.forEach(d => d.style.width = '295px');
			setTimeout("doors.forEach(d => d.style.width = '20px')", 3500); 
			document.querySelector('.message p').innerHTML = 'Самое время применить распорку...';
			jack5 = 2;
			SoundLiftOpen = new Audio();
			SoundLiftOpen.src = 'sounds/SoundLiftOpen.mp3';
			setTimeout("SoundLiftOpen.play()", 3500);
			setTimeout("document.querySelector('.message p').innerHTML = 'Судя по всему, здесь произошел взрыв газа, проход завален.'", 3500);
			setTimeout("liftBtn.forEach(f => f.style.display = 'block')", 3600); 
		}
		else {
			document.querySelector('.message p').innerHTML = 'Судя по всему, здесь произошел взрыв газа, проход завален.';
		}
		if (document.querySelector('.notes4') !== null) {document.querySelector('.notes4').style.display = 'block';}
		if (document.querySelector('.details1') !== null) {document.querySelector('.details1').style.display = 'block';}
	}
	else {
		if (document.querySelector('.notes4') !== null) {document.querySelector('.notes4').style.display = 'none';}
		if (document.querySelector('.details1') !== null) {document.querySelector('.details1').style.display = 'none';}
	}
	if (fl == -6) {
		document.querySelector('.mainvision').style.background = 'url(images/fl6.jpg)';
		document.querySelector('.stone').style.display = 'block';
		if (typeof(jack6) == 'undefined'){
			doors.forEach(d => d.style.width = '295px');
			document.querySelector('.message p').innerHTML = 'Внешняя дверь не открывается до конца, нужна распорка...';
		} 
		else if (jack6 == 1) {
			liftBtn.forEach(f => f.style.display = 'none');
			doors.forEach(d => d.style.width = '295px');
			setTimeout("doors.forEach(d => d.style.width = '20px')", 3500); 
			document.querySelector('.message p').innerHTML = 'Самое время применить распорку...';
			jack6 = 2;
			SoundLiftOpen = new Audio();
			SoundLiftOpen.src = 'sounds/SoundLiftOpen.mp3';
			setTimeout("SoundLiftOpen.play()", 3500);
			setTimeout("document.querySelector('.message p').innerHTML = 'Этот уровень полностью обвалился...'", 3500);
			setTimeout(liftstop, 3500);
			
			if (typeof(rock) == 'undefined') {
				setTimeout("document.querySelector('.stone').style.top = '467px'; document.querySelector('.stone').style.transform = 'rotate(80deg)'", 5600);
				setTimeout("SoundStone = new Audio(); SoundStone.src = 'sounds/SoundStone.mp3'; SoundStone.play()", 5900);
				setTimeout("liftBtn.forEach(f => f.style.display = 'block')", 6000);
				rock = 1;
			}
		}
		else {
			document.querySelector('.message p').innerHTML = 'Этот уровень полностью обвалился...';
			liftstop();
		}
	}
	else {
		document.querySelector('.stone').style.display = 'none';
		document.querySelector('.panel').style.display = 'none';
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
	document.querySelector('.message p').innerHTML = '"Хочу довести до руководства, хоть и чувствую себя из-за этого стремно... Вообщем, механик наш, Андрей, он толи подбухивает, толи чем-то похлеще загоняется. Порой бубнит что-то под нос, смотрит в точку, на слова не сразу реагирует. Короче, странный он. Пацаны его сторонятся. И правильно..."';
}

function Rem_notes3() {
	document.querySelector('.notes3').remove(); 
	document.querySelector('.message p').innerHTML = '"12.04 - Движок пока дышит, но это ненадолго. Заказал детали.<br>14.04 - Тарахтит и тарахтит, тарахтит и тарахтит! Не могу больше терпеть, остановлю внепланово, смажу.<br>17.04 - Этой железной скотине лишь бы жрать, все уже поменял, что ей неймется!?<br>18.04 - Сволочь, как живая. Сказать мне что-то хочет. Ну ничего, детали пришли, возьмусь за нее, когда дверь на 5-м уважу, ато та тоже в печали."';
}

function Rem_notes4() {
	document.querySelector('.notes4').remove(); 
	document.querySelector('.message p').innerHTML = '"20.04 - Кто-то запер решетку в дальний штрек! Долбаную решетку!<br>Пришлось спускаться по вертикалке, через пятый. Еле выбрались. У меня тут трое новичков. Один успел наглотаться газа.<br>Руководству нужно срочно принять меры. У нас в коллективе крысы..."';
}

function Rem_box() {
	document.querySelector('.box').remove();
	document.querySelector('.respirator').style.display = 'block';
	document.querySelector('.message p').innerHTML = 'Что тут у нас... Вот, кажется, на этом противогазе почти новый фильтр.';
}

function Rem_respirator() {
	document.querySelector('.respirator').remove();
	document.querySelector('.tools').innerHTML += '<br><span>Противогаз</span>';
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
		liftBtn.forEach(f => f.style.display = 'none');
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

function Rem_ventilation() {
	if (typeof(d1) == 'undefined') {
		document.querySelector('.message p').innerHTML = 'А вот и цель моего визита. Посмотрим... отсутствуют некоторые детали двигателя вентиляционной установки. Таких с собой у меня нет, придется найти на месте.';
	}
	else if (d1 == 1) {
		liftBtn.forEach(f => f.style.display = 'none');
		document.querySelector('.message p').innerHTML = 'Итак, приступим. Это вернем сюда, это сюда... Затянем...';
		document.querySelector('.d1').remove();
		d1 = 2;
		d2 = 1;
		rd = 1;

		var SoundRepair = new Audio();
		SoundRepair.src = 'sounds/SoundRepair.mp3';
		SoundRepair.autoplay = true;

		MetanDng(p);	
		setTimeout(liftBtns, 5000);
		setTimeout("document.querySelector('.message p').innerHTML = 'Мда... Нехватает всего-то шкива, пары фланцев и сальника...<br>Видел в рубке какой-то журнал, может он поможет... Так... Вот!<br>&quot;19.04 - Эти придурки оставили часть заказанных деталей в бытовке! Избегают меня... Боятся. Пускай. Мы с болванками им той же монетой отплатим...&quot;'", 5000);
		setTimeout(MetanDng, 5000, p);
	}
	else if (typeof(d2) !== 'undefined' && d2 == 2) {
		liftBtn.forEach(f => f.style.display = 'none');
		document.querySelector('.ventilation').remove();
		document.querySelector('.d2').remove(); 
		document.querySelector('.message p').innerHTML = 'Теперь всего в достатке. Надо заканчивать и убираться отсюда...';
		d2 = 3;

		var SoundRepair = new Audio();
		SoundRepair.src = 'sounds/SoundRepair.mp3';
		SoundRepair.autoplay = true;

		MetanDng(p);		
		setTimeout(liftBtns, 5000);
		setTimeout("document.querySelector('.message p').innerHTML = 'Готово! Почти как новая. Теперь нужно замерить концентрацию газа в глубине главного штрека.'", 5000);
		setTimeout(MetanDng, 5000, p);
	}
}

function Rem_screw_jack() {
	document.querySelector('.screw_jack').remove();
	document.querySelector('.tools').innerHTML += '<br><span>Винтовая распорка</span>';
	document.querySelector('.message p').innerHTML = 'Думаю, я найду ей применение.';
	jack5 = 1;
	jack6 = 1;
}

function Rem_details1() {
	document.querySelector('.details1').remove(); 
	document.querySelector('.message p').innerHTML = 'Здесь куча разносортных деталей, но они все новые. Видимо, недавно заказаны. Посмотрим, что получится использовать.';
	document.querySelector('.tools').innerHTML += '<br><span class="d1">Заказанные детали</span>';
	d1 = 1;
}

function Rem_details2() {
	document.querySelector('.details2').remove(); 
	document.querySelector('.message p').innerHTML = 'Действительно, здесь еще куча деталей справа от лифта.';
	document.querySelector('.tools').innerHTML += '<span class="d2">Недостающие детали</span>';
	d2 = 2;
}

function Rem_radio() {
	if (typeof(rd) == 'undefined') {
		var SoundBtn = new Audio();
		SoundBtn.src = 'sounds/SoundBtn.mp3';
		SoundBtn.autoplay = true;
		
		document.querySelector('.message p').innerHTML = 'Настроен на внутреннюю частоту. Шахтеры могли слышать переговоры своих товарищей.<br>Не работает.';
	}
	else {
		document.querySelector('.message p').innerHTML = 'Какого черта!? Кажется, он все-таки исправен... И даже что-то ловит.';
	}
}

function Rem_tunnel() {
	document.querySelector('.tunnel').style.display = 'none';
	document.querySelector('.mainvision').style.background = 'url(images/fl3_1.jpg)';
	document.querySelector('.arrow').style.display = 'block';
	liftBtn.forEach(f => f.style.display = 'none');

	if (document.querySelector('.notes2') !== null) {document.querySelector('.notes2').style.display = 'none';}

	if (typeof(resp) == 'undefined') {
		Сough();
	}
	if (typeof(d2) == 'undefined' || d2 !== 3) {
		p = 2.1;
		document.querySelector('#metan-p').innerHTML = p.toFixed(1);
		MetanDng(p);
		document.querySelector('.message p').innerHTML = 'Дальше мне не пройти. К тому же, концентрация метана там повышается.';
	}
	else {
		p = 0.9;
		document.querySelector('#metan-p').innerHTML = p.toFixed(1);
		MetanDng(p);
		document.querySelector('.message p').innerHTML = 'Есть! Концентрация снижается! Для верности замерю еще... шестой этаж.';
		liftstop1 = 1;
	}
}

function liftstop() {
	if (typeof(liftstop1) !== 'undefined'){
		p = 2.1;
		document.querySelector('#metan-p').innerHTML = p.toFixed(1);
		document.querySelector('.message p').innerHTML = 'Хоть немного, но и тут метан упал.<br>Работа сделана, пора возвращаться на поверхность.';
		liftstop2 = 1;
	}
}

function Rem_arrow() {
	document.querySelector('.arrow').style.display = 'none';
	liftBtn.forEach(f => f.style.display = 'block');
	p = 1.3;
	document.querySelector('#metan-p').innerHTML = p.toFixed(1);
	MetanDng(p);
	events(fl);
}

function Panel1() {
	rg1 = document.querySelector('#rg1').value;
	rg2 = document.querySelector('#rg2');
	rg3 = document.querySelector('#rg3').value;
	
	rg2.value = rg1 - rg2.value;

	document.querySelector('.rgt1').innerHTML = rg1;
	document.querySelector('.rgt2').innerHTML = rg2.value;
	document.querySelector('.rgt3').innerHTML = rg3;
	Green();
}

function Panel2() {
	rg1 = document.querySelector('#rg1').value;
	rg2 = document.querySelector('#rg2').value;
	rg3 = document.querySelector('#rg3');
	
	rg3.value = rg2*2;

	document.querySelector('.rgt1').innerHTML = rg1;
	document.querySelector('.rgt2').innerHTML = rg2;
	document.querySelector('.rgt3').innerHTML = rg3.value;
	Green();
}

function Panel3() {
	rg1 = document.querySelector('#rg1');
	rg2 = document.querySelector('#rg2').value;
	rg3 = document.querySelector('#rg3').value;
	
	rg1.value -= rg3/3;

	document.querySelector('.rgt1').innerHTML = rg1.value;
	document.querySelector('.rgt2').innerHTML = rg2;
	document.querySelector('.rgt3').innerHTML = rg3;
	Green();
}

function Green() {
	rg1 = document.querySelector('#rg1').value;
	rg2 = document.querySelector('#rg2').value;
	rg3 = document.querySelector('#rg3').value;

	if (rg1 == 6) {
		document.querySelector('.rgt1').style.fontWeight = 'bold';
		document.querySelector('.rgt1').style.color = 'green';
	} else {
		document.querySelector('.rgt1').style.fontWeight = 'normal';
		document.querySelector('.rgt1').style.color = 'black';
	}
	if (rg2 == 6) {
		document.querySelector('.rgt2').style.fontWeight = 'bold';
		document.querySelector('.rgt2').style.color = 'green';
	} else {
		document.querySelector('.rgt2').style.fontWeight = 'normal';
		document.querySelector('.rgt2').style.color = 'black';
	}
	if (rg3 == 6) {
		document.querySelector('.rgt3').style.fontWeight = 'bold';
		document.querySelector('.rgt3').style.color = 'green';
	} else {
		document.querySelector('.rgt3').style.fontWeight = 'normal';
		document.querySelector('.rgt3').style.color = 'black';
	}
	if (rg1 == 6 && rg2 == 6 && rg3 == 6) {
		document.querySelector('.message p').innerHTML = 'Все контакты в 6 зоне. Нужно попробовать запустить лифт!';
		liftstop2 = undefined;
		victory = 1;
		liftBtns();
	}
	else {
		document.querySelector('.message p').innerHTML = 'Так, посмотрим... Нужно выставить контакты в рабочее положение для перезапуска...<br>Рядом со вторым рядом, на панели накорябана цифра 4.';
		liftstop2 = 1;
		victory = undefined;
	}
}