// ymaps.ready(init)
var myMap
function init(a) {

    let b = a.split(' ,')
    for (let i = 0; i <= b.length; i++) {
        if (b[i] === ' д. ') {
            b.splice(i - 1, 2) // начиная с позиции i-1, удалить 2 элементa
        }
    }
    i=0;
    createMap(b)
    console.log(b)
}
function createMap(b) {
    // Создаем модель мультимаршрута.
    var multiRouteModel = new ymaps.multiRouter.MultiRouteModel(
        b
        , {
            // Путевые точки можно перетаскивать.
            // Маршрут при этом будет перестраиваться.
            wayPointDraggable: true,
            boundsAutoApply: true
        }),

        // Создаём выпадающий список для выбора типа маршрута.
        routeTypeSelector = new ymaps.control.ListBox({
            data: {
                content: 'Как добраться'
            },
            items: [
                new ymaps.control.ListBoxItem({data: {content: 'Авто'}, state: {selected: true}}),
                new ymaps.control.ListBoxItem({data: {content: 'Общественным транспортом'}}),
                new ymaps.control.ListBoxItem({data: {content: 'Пешком'}})
            ],
            options: {
                itemSelectOnClick: false
            }
        }),
        // Получаем прямые ссылки на пункты списка.
        autoRouteItem = routeTypeSelector.get(0),
        masstransitRouteItem = routeTypeSelector.get(1),
        pedestrianRouteItem = routeTypeSelector.get(2)


    // Подписываемся на события нажатия на пункты выпадающего списка.
    autoRouteItem.events.add('click', function (e) {
        changeRoutingMode('auto', e.get('target'))
    })
    masstransitRouteItem.events.add('click', function (e) {
        changeRoutingMode('masstransit', e.get('target'))
    })
    pedestrianRouteItem.events.add('click', function (e) {
        changeRoutingMode('pedestrian', e.get('target'))
    })

    ymaps.modules.require([
        'MultiRouteCustomView'
    ], function (MultiRouteCustomView) {
        // Создаем экземпляр текстового отображения модели мультимаршрута.
        // см. файл custom_view.js
        new MultiRouteCustomView(multiRouteModel)
    })

    // Создаем карту с добавленной на нее кнопкой.


    myMap = new ymaps.Map('map', {
        center: [44.5858, 33.4377],
        zoom: 13,
        controls: [routeTypeSelector]
    }, {
        buttonMaxWidth: 300
    }),

        // Создаем на основе существующей модели мультимаршрут.
        multiRoute = new ymaps.multiRouter.MultiRoute(multiRouteModel, {
            // Путевые точки можно перетаскивать.
            // Маршрут при этом будет перестраиваться.
            wayPointDraggable: true,
            boundsAutoApply: true
        })


    // Добавляем мультимаршрут на карту.
    myMap.geoObjects.add(multiRoute);

    function changeRoutingMode(routingMode, targetItem) {
        multiRouteModel.setParams({routingMode: routingMode}, true);

        // Отменяем выбор элементов.
        autoRouteItem.deselect();
        masstransitRouteItem.deselect();
        pedestrianRouteItem.deselect();

        // Выбираем элемент и закрываем список.
        targetItem.select();
        routeTypeSelector.collapse();
    }
}