import { Record } from '.'

/**
 * Map a `Record` property to a CloudKit record field.
 * @param target The decorator target `Record` object.
 * @param propertyKey The actual property of the `Record` object.
 * @param fieldName The name of the CloudKit record field.
 */
function FieldDecorator(target: Record, propertyKey: string, fieldName: string) {
  // property getter
  function getter(this: Record) {
    return this.fields[fieldName] ? this.fields[fieldName].value : undefined
  }

  // property setter
  function setter(this: Record, newValue: any) {
    this.fields[fieldName] = { value: newValue }
    this.updatedKeys.push(fieldName)
  }

  // delete property
  if (delete (target as { [key: string]: any })[fieldName]) {
    // create new property with getter and setter
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }
}

export default function Field(target: Record, propertyKey: string): void;
export default function Field(fieldName: string): (target: Record, propertyKey: string) => void;
export default function Field(fieldNameOrTarget: string | Record, propertyKey?: string) {
  if (typeof fieldNameOrTarget !== 'string' && propertyKey) {
    FieldDecorator(fieldNameOrTarget, propertyKey, propertyKey)
  } else if (typeof fieldNameOrTarget === 'string') {
    return function (target: Record, propertyKey: string) {
      FieldDecorator(target, propertyKey, fieldNameOrTarget)
    }
  }
}
