var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import merge from 'lodash.merge';
import { ck } from '.';
export default class Record {
    constructor() {
        this.fields = {};
        this.updatedKeys = [];
    }
    static clone(instance) {
        const copy = new instance.constructor();
        merge(copy, instance);
        return copy;
    }
    static fromRecordReceived(record) {
        const t = new this();
        t.created = record.created;
        t.modified = record.modified;
        t.recordType = record.recordType;
        t.recordName = record.recordName;
        t.recordChangeTag = record.recordChangeTag;
        t.deleted = record.deleted;
        t.shortGUID = record.shortGUID;
        t.parent = record.parent;
        t.share = record.share;
        t.fields = record.fields;
        return t;
    }
    static fetch(recordName) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield ck.fetchFromPublicDatabase(recordName);
            return this.fromRecordReceived(record);
        });
    }
    static query(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield ck.queryFromPublicDatabase(Object.assign({}, query, { recordType: this.recordType }), options);
            return records.map(record => this.fromRecordReceived(record));
        });
    }
    static create(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const recordToCreate = Object.assign({ recordType: this.recordType }, record);
            const createdRecord = yield ck.createOrUpdateRecordInPublicDatabase(recordToCreate);
            return this.fromRecordReceived(createdRecord);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield ck.deleteRecordFromPublicDatabase(this.recordName);
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.recordName || !this.recordChangeTag) {
                throw new Error('Cannot save Record without recordName or recordChangeTag');
            }
            const Type = this.constructor;
            const recordToSave = {
                recordType: Type.recordType,
                recordName: this.recordName,
                recordChangeTag: this.recordChangeTag,
                fields: {}
            };
            // insert updated fields
            for (const key of this.updatedKeys) {
                recordToSave.fields[key] = this.fields[key];
            }
            // save record
            const savedRecord = yield ck.createOrUpdateRecordInPublicDatabase(recordToSave);
            // update this with new record change tag
            this.recordChangeTag = savedRecord.recordChangeTag;
        });
    }
    setFields(fields) {
        for (const key in fields) {
            this.fields[key] = fields[key];
            this.updatedKeys.push(key);
        }
    }
}
//# sourceMappingURL=Record.js.map