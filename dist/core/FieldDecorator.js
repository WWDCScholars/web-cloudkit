export default function FieldDecorator(target, key) {
    // property getter
    function getter() {
        return this.fields[key] ? this.fields[key].value : undefined;
    }
    // property setter
    function setter(newValue) {
        this.fields[key] = { value: newValue };
        this.updatedKeys.push(key);
    }
    // delete property
    if (delete target[key]) {
        // create new property with getter and setter
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}
//# sourceMappingURL=FieldDecorator.js.map