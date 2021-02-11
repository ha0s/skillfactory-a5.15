function useRequest(url, callback) { //Функция получения JSON(захотелось по старинке без jquery))
    var xhr = new XMLHttpRequest(); //Создаём новый объект XMLHttpRequest
    xhr.open('GET', url, true); //Конфигурируем его: GET-запрос на URL, приходящий в функцию
    xhr.onreadystatechange = function() { //Подписываемся на получение ответа API
        if (xhr.readyState != 4) return; // Если ответ готов переходим дальше
        if (callback) { // Если был запрошен callback, выполняем
            const obj = JSON.parse(xhr.response); // Парсим json в объект
            return callback(obj); //Возвращаем из функции обект
        };
    }
    xhr.send(); //Отсылаем запрос
}

function templateStr(str, obj) {
    for (const key in obj) {
        str = str.replaceAll(`{${key}}`, obj[key]);
    }
    return str;
}

$(document).ready(function(){

    const requestURL = 'https://api.jsonbin.io/b/5f1759b5c1edc466175baf5f'; //Адресс сервера с объектом шаблона сказки
    
    $('#Create_Text').click(function(){ // Обработчик нажатия кнопки "Создать текст"
        useRequest(requestURL, function(result){ // Вызываем функцию получения JSON объекта в переменную "result"
            let resultText = '';

            //Цикл обработки массива строк
            for(let i=0; i<result.text.length; i++){ 
                resultText = resultText + result.text[i] + '<br>';
            };

            $('#result').html(resultText); // Выводим результат в DIV
        })
    });

    $('#Replace_Variables').click(function(){ // Обработчик нажатия кнопки "Заменить переменные"
        useRequest(requestURL, function(result){ // Вызываем функцию получения JSON объекта в переменную "result"
            let resultText = '';

            // Присваеваем переменным значения из iputов
            let var1 = $("input[name='var1']").val();
            let var2 = $("input[name='var2']").val();
            let var3 = $("input[name='var3']").val();
            let var4 = $("input[name='var4']").val();
            let var5 = $("input[name='var5']").val();
            let var6 = $("input[name='var6']").val();
            let speach = $("input[name='speach']").val();

            //Цикл обработки массива строк с заменой частей
            for(let i=0; i<result.text.length; i++){ 
                resultText = resultText + templateStr(result.text[i], {
                var1: var1, var2: var2, var3: var3, var4: var4, var5: var5, var6: var6, speach: speach}) + '<br>';
            };

            $('#result').html(resultText); // Выводим результат в DIV

        })
    });

});