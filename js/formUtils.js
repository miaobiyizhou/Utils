/**
 * 获取表单中的数据  包装成对象返回
 * @param formId 表单Id
 * @returns 包装form表单数据返回  属性和表单的名称对应 表单对应ID 和  name必填
 */
function getFormData(formId) {
    var formElement = document.getElementById(formId); // arg is id
    if (formElement != null) {
        var inputs = formElement.elements;
        if (inputs == null) {
            console.log(formId+" 表单下没有对应的输入标签");
            return null;
        }
        var reply = {}, name, value, i,len = inputs.length,inputElement;
        for (i = 0; i < len; i++) {
            inputElement = formElement[i];
            if (inputElement.type in {button: 0, submit: 0, reset: 0, image: 0, file: 0, select: 0, fieldset: 0}) continue;
            if (inputElement.name == undefined || inputElement.name == "") {
                continue;
            }
            //表单为ridio时，因为存在多个 type=‘radio’的输入表单，name一样，id不一样，取被选中的ridio的值
            if (inputElement.type == 'radio') {
                if (inputElement.checked == true) {
                    name = inputElement.name;
                    value = inputElement.value;
                    reply[name] = value;
                    continue;
                }
            }
            //type = 'checkbox' 值去inputElement.checked 选中为true，没选中为false
            if (inputElement.type == 'checkbox') {
                value = inputElement.checked;
            }else if (inputElement.type == 'selected'){
                value = inputElement.value;
            }else{
                value = inputElement.value;
            }
            name = inputElement.name;
            reply[name] = value;
        }
        return reply;
    }
}


/**
 * 填充表单数据 对象的属性和表单的id 和 name想对应
 * @param data 填充的数据对象
 * @param formId 对应的表单ID
 */
function setFormData(data, formId) {
    var formElement = document.getElementById(formId);
    if(formElement == null){
        console.log(formId+'对应表单没有找到');
        return;
    }
    var inputElements = formElement.elements();
    if(inputElements == null){
        console.log(formId+'对应表单没有输入标签');
        return;
    }
    var len = inputElements.length, i,inputElement,type,name,value;
    for (i=0;i<len;i++) {
        inputElement = inputElements[i];
        name = inputElement.name;
        value = data[name];
        if(value == undefined){
            console.log(name+" 标签没有找到对应设置数据");
            continue;
        }
        type = inputElement.type;
        if(type == 'radio'){
            if(inputElement.value == value){
                inputElement.checked = true;
            }
        }else if(type == 'checkbox'){
            inputElement.checked = value;
        }else if(type == 'select'){
            var optionElements = inputElement.elements(), x,option;
            for(x=0;x<optionElements.length;x++ ){
                option = optionElements[x];
                if(option.value = value){
                    option.selected = true;
                    break;
                }
            }
        }else{
            inputElement.value = value;
        }
    }
}
