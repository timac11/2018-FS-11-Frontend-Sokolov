const say = function (name) {

    const divElement = document.createElement('div');
    divElement.className = 'hello-class-div-element';
    const spanElement = document.createElement('span');
    spanElement.innerHTML = name;
    spanElement.className = 'hello-class-span-element';
    divElement.appendChild(spanElement);
    document.body.appendChild(divElement);
};

export default say;