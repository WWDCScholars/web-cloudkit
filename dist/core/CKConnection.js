var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CloudKit from 'tsl-apple-cloudkit';
import AuthTokenStore from './AuthTokenStore';
import { EventEmitter } from 'events';
export default class CKConnection extends EventEmitter {
    constructor() {
        super();
    }
    configure(config) {
        this.instance = CloudKit.configure({
            containers: [{
                    containerIdentifier: config.containerIdentifier,
                    apiTokenAuth: {
                        apiToken: config.apiToken,
                        persist: true
                    },
                    environment: config.environment
                }],
            services: {
                authTokenStore: new AuthTokenStore()
            }
        });
    }
    get defaultContainer() {
        return this.instance.getDefaultContainer();
    }
    get publicDatabase() {
        return this.defaultContainer.getDatabaseWithDatabaseScope(CloudKit.DatabaseScope.PUBLIC);
    }
    get defaultAuth() {
        return this.defaultContainer['_auth'];
    }
    setUpAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            const userIdentity = yield this.defaultContainer.setUpAuth();
            if (userIdentity) {
                this.gotoAuthenticatedState(userIdentity);
                return userIdentity;
            }
            this.gotoUnauthenticatedState();
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
            this.defaultAuth._setSession(null);
            yield this.defaultAuth._fetchAndHandleCurrentUserIdentity();
            this.defaultAuth.signOut();
        });
    }
    gotoAuthenticatedState(userIdentity) {
        this.emit('authenticated', userIdentity);
        return this.defaultContainer
            .whenUserSignsOut()
            .then(this.gotoUnauthenticatedState.bind(this));
    }
    gotoUnauthenticatedState(error) {
        if (error)
            console.warn(error); // FIXME: remove
        this.emit('unauthenticated', this.defaultContainer);
        return this.defaultContainer
            .whenUserSignsIn()
            .then(this.gotoAuthenticatedState.bind(this));
    }
    fetchFromPublicDatabase(recordName) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.publicDatabase.fetchRecords([recordName]);
            if (!response.records || !response.records[0]) {
                throw new Error(`Empty response when fetching record: ${recordName}`);
            }
            return response.records[0];
        });
    }
    queryFromPublicDatabase(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.publicDatabase.performQuery(query, options);
            if (!response.records) {
                throw new Error('No results'); // TODO: Remove
            }
            return response.records;
        });
    }
    createOrUpdateRecordInPublicDatabase(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.publicDatabase.saveRecords([record]);
            if (response.hasErrors) {
                throw response.errors[0];
            }
            return response.records[0];
        });
    }
    deleteRecordFromPublicDatabase(record) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.publicDatabase.deleteRecords([record]);
        });
    }
}
//# sourceMappingURL=CKConnection.js.map