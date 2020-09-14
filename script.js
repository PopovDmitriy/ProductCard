const sizes = document.querySelectorAll('.size');               //коллекция всех размеров
const colors = document.querySelectorAll('.color');             //коллекция всех кнопок-цветов
const shoes = document.querySelectorAll('.shoe');               //коллекция всех картинок обуви
const gradients = document.querySelectorAll('.gradient');       //коллекция всех задних фонов
const shoeBg = document.querySelector('.shoeBackground');       // ??

let prevColor = "blue";                                         //цвет по умолчанию
let animationEnd = true;                                        // ??

function changeSize(){                                              //функция, работающая с кнопками размера
    sizes.forEach(size => size.classList.remove('active'));     //удаляет класс .active со всех размеров
    this.classList.add('active');                               //добавляет класс .active к ЭТОМУ размеру
}

function changeColor(){                                                                 //??
    if(!animationEnd) return;                                                       // если анимация (чего??) не закончилась - вернуться
    let primary = this.getAttribute('primary');                                     //создается переменная с атрибутом - цветом(указано в html #)
    let color = this.getAttribute('color');                                         //создается переменная с атрибутом - названием цвета
    let shoe = document.querySelector(`.shoe[color="${color}"]`);                   //созд. перем., в которую заносится картинка-обувь с классом .shoe и аттрибутом [color]
    let gradient = document.querySelector(`.gradient[color="${color}"]`);           //созд. перем., в которую заносится background с классом .gradient и аттрибутом [color]
    let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);   //созд. перем., в которую заносится background с классом .gradient и аттр. [color = предыдущ. цвет]

    if(color == prevColor) return;                                                  //если текущий цвет равен предыдущему - вернуться

    colors.forEach(c => c.classList.remove('active'));                              //удаляет класс .active со всех кнопок-цветов
    this.classList.add('active');                                                   //добавляет класс .active к ЭТОЙ кнопке-цвету

    document.documentElement.style.setProperty('--primary', primary);               //??
    
    shoes.forEach(s => s.classList.remove('show'));                                 //удаляет класс .show со всех картинок-обуви
    shoe.classList.add('show');                                                     //добавляет класс .show текущей картинке-обуви

    gradients.forEach(g => g.classList.remove('first', 'second'));                  //удаляет все классы .first и .second у контейнера градиентов
    gradient.classList.add('first');                                                //добавляет класс .first к градиенту
    prevGradient.classList.add('second');                                           //добавляет класс .second к текущему градиенту

    prevColor = color;
    animationEnd = false;

    gradient.addEventListener('animationend', () => {
        animationEnd = true;
    })
}

sizes.forEach(size => size.addEventListener('click', changeSize));
colors.forEach(c => c.addEventListener('click', changeColor));

let x = window.matchMedia("(max-width: 1000px)");

function changeHeight(){
    if(x.matches){
        let shoeHeight = shoes[0].offsetHeight;
        shoeBg.style.height = `${shoeHeight * 0.9}px`;
    }
    else{
        shoeBg.style.height = "475px";
    }
}

changeHeight();

window.addEventListener('resize', changeHeight);