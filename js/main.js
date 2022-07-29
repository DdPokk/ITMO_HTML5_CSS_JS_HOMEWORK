var out = true, //Находится ли курсор вне контекстного меню.
        doc = $(document); //Документ HTML.

/**
 * Удаляет контекстное меню.
 * @returns {undefined}
 */
function menuRemove()
{
    $('#menu').remove();
}

doc.on( "contextmenu", //Задаём контекстное меню.
        
    function(e) //Функция-обработчик.
    {    
        menuRemove(); //Удаляем старое меню.
        var x = e.clientX + document.body.scrollLeft + //Абсцисса меню.
                       document.documentElement.scrollLeft,
            y = e.clientY + document.body.scrollTop +  //Ордината меню.
                       document.documentElement.scrollTop,
            menu = $(document.createElement('menu')); //Контекстное меню.
        menu.attr('id', 'menu'); //Задаём уникальный код.
        menu.css('position', 'absolute'); //Делаем позицию меню абсолютной.
        menu.css('z-index', '10'); //Показываем меню поверх остального.
        menu.css('width', '100px'); //Задаём ширину меню.
        menu.css('padding', '10px'); //Задаём высоту меню.
        menu.css('background-color', 'black'); //Задаём цвет фона.        
        menu.css('color', 'white'); //Задаём цвет текста.
        menu.css('left', x + 'px'); //Задаём абсциссу.
        menu.css('top', y + 'px'); //Задаём ординату.
        menu.on('mouseover', function(){ //Фиксируем вход курсора.
            out = false;
        });
        menu.on('mouseout', function(){ //Фиксируем выход курсора.
            out = true;
        });
        for(var i = 1; i <= 5; i++)
        {
            var item = $(document.createElement('li')); //Пункт меню.
            item.html('Пункт №' + i); //Задаём текст пункта.
            item.css('list-style', 'none'); //Задаём стиль пункта.
            item.css('margin', '0'); //Убираем отступы.
            item.css('border-bottom', 'solid white 1px'); //Задаём нижнюю черту.
            menu.append(item[0]); //Добавляем пункт в меню.
        }
        $('body').append(menu); //Добавляем меню к документу.
        
        //Выделенные пункты делаем серыми.
        $('#menu li').on('mouseover', function(e){
                $(e.toElement).css('background-color', 'gray');
            });
        //Невыделенные пункты делаем чёрными.
        $('#menu li').on('mouseout', function(e){console.log(e.toHlement);
                $('#menu li').css('background-color', 'black');
            });
        return false; //Отключаем стандартное меню.
    }
);


doc.on('click', function(){ //Удаляем меню при клике за его пределами.
    if(out) menuRemove();
});

doc.on('keydown', menuRemove); //Удаляем меню при нажатии клавиш.