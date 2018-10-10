const say = function (name) {

    let divElement = document.createElement("div");
    divElement.className = 'hello-class-div-element';
    let spanElement = document.createElement('span');
    spanElement.innerHTML = name;
    spanElement.className = 'hello-class-span-element';
    divElement.appendChild(spanElement);
    document.body.appendChild(divElement);
};

export default say;