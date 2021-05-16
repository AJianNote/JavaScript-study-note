function simpleFactory(type, args) {
    switch (type) {
        case 'input':
            return new InputModel(args)
        case 'select':
            return new SelectModel(args)
        default:
            console.error('输入的type错误')
            break;
    }
}

class InputModel {
    constructor({ label, placehold }) {
        this.label = label
        this.placehold = placehold || ''
    }
}

class SelectModel {
    constructor({ label, placehold, options }) {
        this.label = label;
        this.placehold = placehold
        this.options = options || []
    }
}

const input = simpleFactory('input', { label: '输入宽'})
const select = simpleFactory('select', { label: '下拉框', placehold: '请选择下拉框数据' })
console.log(input)
console.log(select)
