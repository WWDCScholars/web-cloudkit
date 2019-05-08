import { Record } from '.'

export default function FieldDecorator(target: Record, key: string) {
  // property getter
  function getter(this: Record) {
    return this.fields[key] ? this.fields[key].value : undefined
  }

  // property setter
  function setter(this: Record, newValue: any) {
    this.fields[key] = { value: newValue }
    this.updatedKeys.push(key)
  }

  // delete property
  if (delete target[key]) {
    // create new property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }
}
